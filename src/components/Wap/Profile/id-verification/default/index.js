import React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import Textbox from "../../../Share/Textbox";
import i18n from "../../../../../utils/i18n";
import BaseProfile from "./../../BaseProfile";
import styled from "styled-components";

import { accountAction } from "../../../../../api-services/actions/accountAction";
import { RESET_ACCOUNTRESULT } from "../../../../../api-services/constant/actionType";
import config from "../../../../../config/config";
import DocumentUploader from "../../../components/documentuploader";

class Default extends BaseProfile {
  constructor(props) {
    super(props);
    this.state = {
      uploadFile: this.props.icUpload,
    };
  }

  render() {
    return (
      <React.Fragment>
        <Textbox
          style={{ margin: "50px auto 20px auto" }}
          value={this.props.name}
          onChange={this.props.handleChangeName}
          placeholder={i18n.t("profile.nameVerify.title")}
          label={i18n.t("profile.nameVerify.title")}
          disabled={false}
          maxLength={256}
        ></Textbox>
        {config.features.ICVerification && (
          <Textbox
            style={{ margin: "50px auto 20px auto" }}
            value={this.props.ic}
            onChange={this.props.handleChangeIC}
            placeholder={i18n.t("profile.nameVerify.icNum")}
            label={i18n.t("profile.nameVerify.icNum")}
            disabled={false}
            maxLength={256}
          ></Textbox>
        )}

        {config.features.ICVerificationUpload && (
          <>
            <DocumentUploader
              title={i18n.t("common.upload")}
              onClick={() => {
                document.getElementById("getFile").click();
              }}
              onChange={this.props.handleFileChange}
              upload={this.props.icUpload ? this.props.icUpload[0].name : ""}
            />
          </>
        )}
      </React.Fragment>
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
    getAccountProfile: () => dispatch(accountAction.getAccountProfile()),
    getIDCardNo: () => dispatch(accountAction.getIDCardNo()),
    updateMemberCardNo: (name, number) =>
      dispatch(accountAction.updateMemberCardNo(name, number)),
    resetResult: () =>
      dispatch({
        type: RESET_ACCOUNTRESULT,
      }),
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(Default));
