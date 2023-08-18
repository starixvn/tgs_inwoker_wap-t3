import React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

import BaseProfile from "./BaseProfile";
import { accountAction } from "../../../api-services/actions/accountAction";
import { AccountService } from "../../../api-services/services/AccountService";

import BottomNote from "../Share/BottomNote";

import i18n from "../../../utils/i18n";
import config from "../../../config/config";
import TextfieldWithButton from "../components/textfieldwithbutton";
import PhoneField from "../components/phonefield";

class Phone extends BaseProfile {
  state = {
    countdownToken: 0,
    areacode: config.features.PhonePrefix,
    phone: "",
    code: "",
    isNew: false,
    isConfigured: false,
    securityKey: "",
  };
  componentDidMount() {
    let isConfigured = false;
    if (this.props.account.info.check_pass_phone) isConfigured = true;
    this.setState({
      ...this.state,
      phone: isConfigured ? this.props.account.info.member_phone : "",
      code: "",
      isNew: !this.props.account.info.check_pass_phone,
      isConfigured: isConfigured,
    });
  }

  handleChangePhone = (e) => {
    this.setState({ ...this.state, phone: e.target.value });
    if (
      (config.features.Register_CustomFlow_IDR &&
        !this.props.account.registercompleted) ||
      config.features.InitPhone_WithoutVerify
    ) {
      this.onTextChanged();
    }
  };

  handleChangeCode = (e) => {
    this.setState({ ...this.state, code: e.target.value });
    this.onTextChanged();
  };
  checkCountdownToken = () => {
    if (this.state.countdownToken > 0) {
      this.setState({
        ...this.state,
        countdownToken: this.state.countdownToken - 1,
      });
      setTimeout(() => {
        this.checkCountdownToken();
      }, 1000);
    } else {
      this.setState({
        ...this.state,
        countdownToken: this.state.countdownToken - 1,
      });
    }
  };
  handleGetCodeClick = (e) => {
    if (this.state.countdownToken > 0) return;
    if (!this.state.phone)
      return this.showErrorMessage(i18n.t("common.msgEnterPhone"));
    if (
      this.state.phone.length < 8 ||
      this.state.phone.length > (config.features.MAX_PHONE_LENGTH || 10)
    ) {
      this.props.alert(
        "",
        i18n
          .t("common.noReachMin")
          .replace(/{maxlength}/g, config.features.MAX_PHONE_LENGTH || 10)
      );
      return;
    }
    this.showLoading(true);

    AccountService.VerifyPhone(this.state.phone, this.state.areacode)
      .then((response) => {
        if (response.IsSuccess) {
          this.setState({
            ...this.state,
            countdownToken: 60,
            securityKey: response.data,
          });
          this.showInfoMessage(i18n.t("common.msgTokenSent"));
          setTimeout(() => {
            this.checkCountdownToken();
          }, 1000);
        } else {
          this.showErrorMessage(response.info);
        }
        this.showLoading(false);
      })
      .catch((err) => {
        this.showErrorMessage(err);

        this.showLoading(false);
      });
  };

  isDisableButton = () => {
    const code = this.state.code;
    const phone = this.state.phone;
    return config.features.Register_CustomFlow_IDR &&
      !this.props.account.registercompleted
      ? !phone
      : !(code && phone);
  };
  showErrorMessage = (msg) => {
    this.props.alert("", msg);
  };
  showInfoMessage = (msg) => {
    this.props.alert("", msg);
  };
  handleSubmitClicked = () => {
    this.showLoading(true);

    if (
      (config.features.Register_CustomFlow_IDR &&
        !this.props.account.registercompleted) ||
      config.features.InitPhone_WithoutVerify
    ) {
      this.props
        .newRegister("InitPhone", {
          input: "Init",
          data: {
            areacode: this.state.areacode,
            phone: this.state.phone,
          },
        })
        .then(async (response) => {
          if (response.IsSuccess) {
            this.props
              .newRegister("InitPhone", {
                input: "Valid",
                data: {
                  securitykey: response.data.stepResponse,
                  validatecode: "123456",
                },
              })
              .then(async (response) => {
                if (response.IsSuccess) {
                  this.props.getAccountInfo().then((responseUpdate) => {
                    if (responseUpdate.IsSuccess) {
                      if (
                        responseUpdate.data.email === null &&
                        !responseUpdate.data.registercompleted
                      ) {
                        this.props.history.push({
                          pathname: "/profile/email",
                          state: { forced: true },
                        });
                      } else {
                        this.setState({
                          ...this.state,
                          code: "",
                          securityKey: "",
                          countdownToken: 0,
                          isNew: false,
                          isConfigured: true,
                        });
                        this.showLoading(false);
                      }
                    }
                    this.showLoading(false);
                  });
                } else {
                  this.showErrorMessage(response.info);
                  this.showLoading(false);
                }
              });
          } else {
            this.showErrorMessage(response.info);
          }
          this.showLoading(false);
        });
    } else {
      AccountService.UpdatePhone(this.state.securityKey, this.state.code)
        .then((response) => {
          if (response.IsSuccess) {
            this.props.getAccountInfo().then((responseUpdate) => {
              if (responseUpdate.IsSuccess) {
                this.setState({
                  ...this.state,
                  code: "",
                  securityKey: "",
                  countdownToken: 0,
                  isNew: false,
                  isConfigured: true,
                });
              }
              this.showLoading(false);
            });
          } else {
            this.showErrorMessage(response.info);
            this.showLoading(false);
          }
        })
        .catch((err) => {
          this.showErrorMessage(err);
          this.showLoading(false);
        });
    }
  };

  render() {
    const { location } = this.props;

    var cannotAccessOther = location.state && location.state.forced ? true : "";

    return this.setupContent(
      i18n.t("common.phoneNumber"),
      <React.Fragment>
        <PhoneField
          title={i18n.t("common.phoneNumber")}
          placeholder={i18n.t("common.msgEnterPhone")}
          value={this.state.phone}
          onChange={this.handleChangePhone}
          maxLength={config.features.MAX_PHONE_LENGTH || 10}
          phonePrefix={this.state.areacode}
          onSelect={(e) => {
            this.setState({ ...this.state, areacode: e.target.value });
          }}
        >
          <option value={config.features.PhonePrefix}>
            {config.features.PhonePrefix}
          </option>
        </PhoneField>

        {(() => {
          if (
            !(
              config.features.Register_CustomFlow_IDR &&
              !this.props.account.registercompleted
            ) &&
            !this.state.isConfigured
          ) {
            return (
              !config.features.Profile_DisableVerifyPhone &&
              !config.features.InitPhone_WithoutVerify && (
                <TextfieldWithButton
                  buttonlabel={
                    this.state.countdownToken <= 0
                      ? i18n.t("common.msgSendToken")
                      : i18n.t("common.btnTokenResendLabel") +
                        "(" +
                        this.state.countdownToken +
                        "s)"
                  }
                  style={{ margin: "20px auto 20px auto" }}
                  value={this.state.code}
                  onChange={this.handleChangeCode}
                  placeholder={i18n.t("common.msgEnterPhoneCode")}
                  title={i18n.t("common.token")}
                  onClick={this.handleGetCodeClick}
                ></TextfieldWithButton>
              )
            );
          }
        })()}
      </React.Fragment>,
      this.state.isConfigured || config.features.InitPhone_WithoutVerify
        ? i18n.t("common.configured")
        : i18n.t("common.complete"),
      (() => {
        if (this.state.isConfigured) {
          return config.features.Profile_DisableEditPhone ? (
            <BottomNote
              text1={i18n.t("profile.phone.toEdit")}
              link={"../chat"}
              text2={i18n.t("common.customerService")}
            ></BottomNote>
          ) : (
            <BottomNote
              text1={i18n.t("profile.phone.toEdit")}
              link={
                config.features.ChangesNotAllowed ||
                config.features.Profile_ExistingDetails_ViewOnly
                  ? "../chat"
                  : "./changephone"
              }
              text2={i18n.t(
                config.features.ChangesNotAllowed ||
                  config.features.Profile_ExistingDetails_ViewOnly
                  ? "common.customerService"
                  : "profile.phone.here"
              )}
            ></BottomNote>
          );
        }
      })(),
      cannotAccessOther
    );
  }
}

const mapStateToProps = (state) => {
  return {
    account: state.account,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    getAccountInfo: () => dispatch(accountAction.getAccountInfo()),
    newRegister: (type, input) =>
      dispatch(accountAction.newRegister(type, input)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Phone));
