import React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import Textbox from "../Share/Textbox";
import TextboxWithButton from "../Share/TextboxWithButton";
import BaseProfile from "./BaseProfile";
import { accountAction } from "../../../api-services/actions/accountAction";
import { AccountService } from "../../../api-services/services/AccountService";
import BottomNote from "../Share/BottomNote";

import i18n from "../../../utils/i18n";
import config from "../../../config/config";
import TextfieldWithButton from "../components/textfieldwithbutton";
import Textfield from "../components/textfield";
class Email extends BaseProfile {
  state = {
    countdownToken: 0,
    email: "",
    code: "",
    isConfigured: false,
    isNew: false,
    securityKey: "",
  };
  componentDidMount() {
    var isConfigured = false;
    if (this.props.account.info.check_pass_email) isConfigured = true;
    this.setState({
      ...this.state,
      email: isConfigured ? this.props.account.info.member_email : "",
      code: "",
      isConfigured: isConfigured,
      countdownToken: 0,
      isNew: !this.props.account.info.check_pass_email,
    });
  }
  handleChangeEmail = (e) => {
    this.setState({ ...this.state, email: e.target.value });
    if (
      config.features.Register_CustomFlow_IDR &&
      !this.props.account.registercompleted
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
    if (!this.state.email)
      return this.showErrorMessage(i18n.t("common.msgEnterEmail"));
    this.showLoading(true);
    AccountService.VerifyEmail(this.state.email)
      .then((response) => {
        if (response.IsSuccess) {
          this.setState({
            ...this.state,
            securityKey: response.data,
            countdownToken: 60,
          });
          this.showInfoMessage(i18n.t("common.msgTokenSent"));
          setTimeout(() => {
            this.checkCountdownToken();
          }, 1000);
        } else {
          this.showErrorMessage(response.info);
          // if (response.code === 402) {
          //   this.showErrorMessage(i18n.t('common.msgInvalidEmail'))
          // } else {
          //   this.showErrorMessage(response.info)
          // }
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
    const email = this.state.email;
    return config.features.Register_CustomFlow_IDR &&
      !this.props.account.registercompleted
      ? !email
      : !(code && email);
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
      config.features.Register_CustomFlow_IDR &&
      !this.props.account.registercompleted
    ) {
      this.props
        .newRegister("InitMail", {
          input: "Init",
          data: {
            email: this.state.email,
          },
        })
        .then(async (response) => {
          if (response.IsSuccess) {
            this.props
              .newRegister("InitMail", {
                input: "Valid",
                data: {
                  securitykey: response.data.stepResponse,
                  validatecode: "123456",
                },
              })
              .then(async (response) => {
                if (response.IsSuccess) {
                  this.props.getAccountProfile().then((responseUpdate) => {
                    if (responseUpdate.IsSuccess) {
                      if (!responseUpdate.data.registercompleted) {
                        this.props.history.replace("/card/add");
                      }
                      this.showLoading(false);
                    }
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
      AccountService.UpdateEmail(this.state.securityKey, this.state.code)
        .then((response) => {
          if (response.IsSuccess) {
            this.props.getAccountProfile().then((responseUpdate) => {
              if (responseUpdate.IsSuccess) {
                this.setState({
                  ...this.state,
                  code: "",
                  securityKey: "",
                  isConfigured: true,
                  countdownToken: 0,
                  isNew: false,
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
          this.showLoading(false);
          this.showErrorMessage(err);
        });
    }
  };

  render() {
    const { location } = this.props;

    var cannotAccessOther = location.state && location.state.forced ? true : "";

    return this.setupContent(
      i18n.t("extended.email"),
      <React.Fragment>
        <Textfield
          style={{ margin: "50px auto 20px auto" }}
          value={this.state.email}
          onChange={this.handleChangeEmail}
          placeholder={i18n.t("common.msgEnterEmail")}
          title={i18n.t("common.emailAddress")}
          disabled={this.state.isConfigured}
        ></Textfield>
        {(() => {
          if (
            !(
              config.features.Register_CustomFlow_IDR &&
              !this.props.account.registercompleted
            ) &&
            !this.state.isConfigured
          ) {
            return (
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
                placeholder={i18n.t("T13.misc.msgEnterCode")}
                title={i18n.t("common.token")}
                onClick={this.handleGetCodeClick}
                maxLength={6}
                type={"text"}
              ></TextfieldWithButton>
            );
          }
        })()}
      </React.Fragment>,
      this.state.isConfigured
        ? i18n.t("common.submit")
        : i18n.t("common.submit"),
      (() => {
        if (
          this.state.isConfigured &&
          !(
            config.features.ChangesNotAllowed ||
            config.features.Profile_ExistingDetails_ViewOnly
          )
        ) {
          return (
            <BottomNote
              variant="original"
              text1={i18n.t("profile.email.toEdit")}
              link={"./changeemail"}
              text2={i18n.t("profile.email.here")}
            ></BottomNote>
          );
        } else {
          return <BottomNote></BottomNote>;
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
    getAccountProfile: (token) =>
      dispatch(accountAction.getAccountProfile(true)),
    newRegister: (type, input) =>
      dispatch(accountAction.newRegister(type, input)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Email));
