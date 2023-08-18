import React, { Component } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import i18n from "../../../utils/i18n";
import { connect } from "react-redux";
const Content = styled.div`
  width: 750px;
  margin: 0 auto;
  font-size: 26px;

  text-align: center;
  margin-top: 20px;
  padding: 0 30px;
  color: ${({ theme }) =>
    theme.wapSecondary ? theme.wapSecondary : theme.secondary};
`;
const LabelLink = styled(Link)`
  color: ${({ theme }) => theme.primary};
  text-decoration: none;
`;
const LabelNormal = styled.span`
  color: ${({ theme }) => theme.primary};
  text-decoration: none;
`;
class BottomNote extends Component {
  GetSupportUrl = (userid, name, question, email) => {
    var newURL = this.props.general.livechat
      ? this.props.general.livechat.setting.url
          .replace("{name}", name)
          .replace("{lang}", i18n.language)
          .replace("{email}", email || "")
      : "";

    if (newURL.length) {
      window.open(newURL, "_blank");
    } else {
    }
  };

  handleCSClick = () => {
    if (this.props.account.token == null) {
      // AppHistory.push(value);
      this.GetSupportUrl("", "", "", "");
    } else {
      this.GetSupportUrl(
        "",
        this.props.account.info.member_username,
        "",
        this.props.account.info.member_email
      );
    }
  };

  render() {
    const variantSwitcher = (variant) => {
      switch (variant) {
        case "original":
          return (
            <Content>
              {this.props.text1 || i18n.t("share.bottomNote.pleaseContact")}{" "}
              {(() => {
                if (this.props.toEdit) {
                  return (
                    <LabelNormal onClick={this.props.toEdit}>
                      {this.props.text2 || i18n.t("share.bottomNote.liveChat")}
                    </LabelNormal>
                  );
                } else if (this.props.link) {
                  return (
                    <LabelLink to={this.props.link}>
                      {this.props.text2 || i18n.t("share.bottomNote.liveChat")}
                    </LabelLink>
                  );
                } else {
                  return (
                    <LabelNormal onClick={this.handleCSClick}>
                      {this.props.text2 || i18n.t("share.bottomNote.liveChat")}
                    </LabelNormal>
                  );
                }
              })()}
              {this.props.text3 && " " + this.props.text3}
            </Content>
          );
        default:
          return (
            <Content>
              {i18n.t("T13.help_footer.break1")}{" "}
              <LabelLink to={"../chat"}>
                {i18n.t("T13.help_footer.break2")}{" "}
              </LabelLink>
              {i18n.t("T13.help_footer.break3")}
            </Content>
          );
      }
    };

    return !this.props.empty && variantSwitcher(this.props.variant);
  }
}

const mapStateToProps = (state) => {
  return {
    account: state.account,
    general: state.general,
  };
};

export default connect(mapStateToProps, null)(BottomNote);
