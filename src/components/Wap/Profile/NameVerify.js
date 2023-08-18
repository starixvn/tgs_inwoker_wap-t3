import React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import Textbox from "../Share/Textbox";
import i18n from "../../../utils/i18n";
import BottomNote from "../Share/BottomNote";
import BaseProfile from "./BaseProfile";
import styled from "styled-components";

import { accountAction } from "../../../api-services/actions/accountAction";
import { RESET_ACCOUNTRESULT } from "../../../api-services/constant/actionType";
import config from "../../../config/config";
import { AccountService } from "../../../api-services/services/AccountService";
import DocumentUploader from "../components/documentuploader";

class NameVerify extends BaseProfile {
  constructor(props) {
    super(props);

    const name = this.props.account.info.member_name;
    const ic = this.props.account.info.member_card_no;
    const isConfigured = this.checkisConfigure();
    this.state = {
      name: name,
      ic: ic,
      isConfigured: isConfigured,
      icUpload: "",
    };
  }

  componentDidUpdate(preProps) {
    if (
      preProps.account.info.member_card_no !==
      this.props.account.info.member_card_no
    ) {
      const ic = this.props.account.info.member_card_no;
      const isConfigured = this.checkisConfigure();
      this.setState({ ...this.state, ic: ic, isConfigured: isConfigured });
    }
    if (
      preProps.account.updateCardResult !==
        this.props.account.updateCardResult &&
      this.props.account.updateCardResult !== null
    ) {
      if (this.props.account.updateCardResult.IsSuccess) {
        this.props.resetResult();
        this.setState({ disableButton: true });

        this.props.appHistory.replace("/profile");
      } else {
        this.props.alert("", this.props.account.updateCardResult.info);
        this.showLoading(false);
      }
    }
  }
  checkisConfigure = () => {
    var check_pass_account = false;
    if (config.features.ICVerification) {
      if (
        this.props.account.info.member_name !== "" &&
        this.props.account.info.member_name !== null
      ) {
        check_pass_account = this.props.account.info.check_pass_account;
      }
    } else {
      check_pass_account = this.props.account.info.check_pass_account;
    }
    return check_pass_account;
  };
  handleChangeName = (e) => {
    this.setState({ ...this.state, name: e.target.value });
    this.onTextChanged();
  };
  handleChangeIC = (e) => {
    this.setState({ ...this.state, ic: e.target.value });
    this.onTextChanged();
  };
  handleSubmitClicked = () => {
    if (config.features.ICVerificationUpload && this.state.icUpload === "") {
      return this.props.alert("", i18n.t("deposit.msgPlsSelectFile"));
    }
    const name = this.state.name || "";
    const ic = this.state.ic || "";
    this.showLoading(true);
    this.props.performUpdateMemberNameAndIC(
      name,
      ic,
      config.features.ICVerificationUpload ? this.state.icUpload[0] : null
    );
    this.showLoading(false);
  };

  isDisableButton = () => {
    const name = this.state.name || "";
    const ic = this.state.ic || "";

    const isDisableButton = config.features.ICVerification
      ? !(name && ic)
      : name === "";
    return isDisableButton;
  };

  handleFileChange = (e) => {
    var files = e.target.files;
    var fileName = e.target.value.toLowerCase();
    if (files.length > 0) {
      if (
        !fileName.endsWith(".jpg") &&
        !fileName.endsWith(".jpeg") &&
        !fileName.endsWith(".png") &&
        !fileName.endsWith(".tiff")
      ) {
        this.props.alert("", i18n.t("deposit.msgInvalidFileType"));

        e.target.value = null;
        return false;
      }
      const fileSize = Math.round(files[0].size / 1024);
      if (fileSize > 5120) {
        this.props.alert("", i18n.t("deposit.msgInvalidFileSize"));
        e.target.value = null;
      } else {
        this.setState({
          ...this.state,
          icUpload: files,
        });
      }
    }
  };

  render() {
    return this.setupContent(
      i18n.t("profile.nameVerify.title"),
      <React.Fragment>
        <Textbox
          style={{ margin: "50px auto 20px auto" }}
          value={
            this.props.account.info.check_pass_account ? this.state.name : ""
          }
          onChange={this.handleChangeName}
          placeholder={i18n.t("profile.nameVerify.title")}
          label={i18n.t("profile.nameVerify.title")}
          disabled={this.state.isConfigured === true}
          maxLength={256}
        ></Textbox>
        {this.state.isConfigured === false && config.features.ICVerification ? (
          <Textbox
            style={{ margin: "50px auto 20px auto" }}
            value={this.state.ic}
            onChange={this.handleChangeIC}
            placeholder={i18n.t("profile.nameVerify.icNum")}
            label={i18n.t("profile.nameVerify.icNum")}
            disabled={this.props.account.info.check_pass_account === true}
            maxLength={256}
          ></Textbox>
        ) : (
          <React.Fragment></React.Fragment>
        )}

        {this.state.isConfigured === false &&
        config.features.ICVerificationUpload ? (
          <>
            <DocumentUploader
              title={i18n.t("common.upload2")}
              onClick={() => {
                document.getElementById("getFile").click();
              }}
              onChange={this.handleFileChange}
              upload={this.props.icUpload ? this.props.icUpload[0].name : ""}
            />
          </>
        ) : (
          <React.Fragment></React.Fragment>
        )}
      </React.Fragment>,
      this.state.isConfigured && config.features.ICVerification
        ? i18n.t("common.configured")
        : i18n.t("common.complete"),
      <BottomNote
        text1={i18n.t("profile.nameVerify.toEdit")}
        link={"../chat"}
        text2={i18n.t("common.customerService")}
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
    performUpdateMemberNameAndIC: (name, number, file) =>
      dispatch(accountAction.performUpdateMemberNameAndIC(name, number, file)),
    resetResult: () =>
      dispatch({
        type: RESET_ACCOUNTRESULT,
      }),
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(NameVerify));
