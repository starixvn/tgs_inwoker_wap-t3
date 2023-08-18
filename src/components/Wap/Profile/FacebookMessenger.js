import React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import Textbox from "../Share/Textbox";
import BaseProfile from "./BaseProfile";
import i18n from "../../../utils/i18n";
import { accountAction } from "../../../api-services/actions/accountAction";
import { AccountService } from "../../../api-services/services/AccountService";
import config from "../../../config/config";
import BottomNote from "../Share/BottomNote";
class FacebookMessenger extends BaseProfile {
  state = {
    fb: "",
    isConfigured: false,
  };
  componentDidMount() {
    let isConfigured = false;
    if (this.props.account.info.member_fb) isConfigured = true;
    this.setState({
      fb: isConfigured ? this.props.account.info.member_fb : "",
      isConfigured: isConfigured,
    });
  }

  handleChangeNumber = (e) => {
    this.setState({ fb: e.target.value });
    this.onTextChanged();
  };

  isDisableButton = () => {
    return !this.state.fb;
  };
  handleSubmitClicked = () => {
    const fb = this.state.fb;

    this.showLoading(true);
    //api
    AccountService.UpdateIM(fb, "fb", "facebookmessenger")
      .then((response) => {
        if (response.IsSuccess) {
          this.props.getAccountProfile().then((responseUpdate) => {
            if (responseUpdate.IsSuccess) {
              this.setState({
                ...this.state,
                fb: fb,
                isConfigured: true,
              });
            }
            this.showLoading(false);
            this.props.alert("", i18n.t("common.msgSuccessUpdateProfile"));
          });
        } else {
          this.props.alert("", response.msg);
          this.showLoading(false);
          // this.props.enqueueSnackbar(response.msg, {
          //   key: "error"
          // });
        }
      })
      .catch((err) => {
        this.props.alert("", err);
        this.showLoading(false);
      });
  };

  render() {
    return this.setupContent(
      i18n.t("T13.facebook.fb_title"),
      <Textbox
        style={{ margin: "50px auto 20px auto" }}
        value={this.state.fb}
        onChange={this.handleChangeNumber}
        placeholder={i18n.t("T13.facebook.fb_placeholder")}
        label={i18n.t("T13.facebook.fb_label")}
        disabled={
          this.state.isConfigured &&
          (config.features.ChangesNotAllowed ||
            config.features.Profile_ExistingDetails_ViewOnly)
            ? true
            : false
        }
        maxLength={15}
      ></Textbox>,
      i18n.t("common.submit"),
      <BottomNote
        text1={i18n.t("T13.help_footer.break1")}
        text2={i18n.t("T13.help_footer.break2")}
        text3={i18n.t("T13.help_footer.break3")}
        link={"../chat"}
      ></BottomNote>
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
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(FacebookMessenger));
