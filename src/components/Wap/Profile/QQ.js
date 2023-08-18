import React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import Textbox from "../Share/Textbox";
import i18n from "../../../utils/i18n";
import { accountAction } from "../../../api-services/actions/accountAction";
import { AccountService } from "../../../api-services/services/AccountService";
import BaseProfile from "./BaseProfile";
import config from "../../../config/config";
import BottomNote from "../Share/BottomNote";

class QQ extends BaseProfile {
  state = {
    qq: "",
    isConfigured: false,
  };
  componentDidMount() {
    let isConfigured = false;
    if (this.props.account.info.member_qq) isConfigured = true;
    this.setState({
      qq: isConfigured ? this.props.account.info.member_qq : "",
      isConfigured: isConfigured,
    });
  }

  handleChangeNumber = (e) => {
    this.setState({ qq: e.target.value });
    this.onTextChanged();
  };

  isDisableButton = () => {
    return !this.state.qq;
  };

  handleSubmitClicked = () => {
    const qq = this.state.qq;

    const re = new RegExp("^[1-9]\\d{4,14}$");
    if (!qq.match(re)) {
      this.props.alert("", i18n.t("profile.qq.msgInvalidQQ"));

      return;
    }

    this.showLoading(true);
    //api
    AccountService.UpdateIM(qq, "qq", "qq")
      .then((response) => {
        if (response.IsSuccess) {
          this.props.getAccountProfile().then((responseUpdate) => {
            if (responseUpdate.IsSuccess) {
              this.setState({
                ...this.state,
                qq: qq,
                isConfigured: true,
              });
            }
            this.props.alert("", i18n.t("common.msgSuccessUpdateProfile"));
            this.showLoading(false);
          });
        } else {
          this.props.alert("", response.msg);
          this.showLoading(false);
        }
      })
      .catch((err) => {
        this.props.alert("", err);
        this.showLoading(false);
      });
  };

  render() {
    return this.setupContent(
      i18n.t("T13.qq.qq_title"),
      <Textbox
        style={{ margin: "50px auto 20px auto" }}
        value={this.state.qq}
        onChange={this.handleChangeNumber}
        placeholder={i18n.t("T13.qq.qq_placeholder")}
        disabled={
          this.state.isConfigured &&
          (config.features.ChangesNotAllowed ||
            config.features.Profile_ExistingDetails_ViewOnly)
            ? true
            : false
        }
        type={"text"}
        label={i18n.t("T13.qq.qq_label")}
      ></Textbox>,
      this.state.isConfigured && config.features.ChangesNotAllowed
        ? i18n.t("common.submit")
        : this.state.qq !== this.props.account.member_qq &&
            i18n.t("common.submit"),

      (() => {
        if (
          this.state.isConfigured &&
          (config.features.ChangesNotAllowed ||
            config.features.Profile_ExistingDetails_ViewOnly)
        ) {
          return (
            <BottomNote
              text1={i18n.t("profile.qq.toEdit")}
              link={"../chat"}
              text2={i18n.t(
                config.features.ChangesNotAllowed ||
                  config.features.Profile_ExistingDetails_ViewOnly
                  ? "common.customerService"
                  : "profile.qq.here"
              )}
            ></BottomNote>
          );
        }
      })()
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
    getAccountProfile: () => dispatch(accountAction.getAccountProfile(true)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(QQ));
