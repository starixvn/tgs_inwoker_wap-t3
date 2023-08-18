import React, { Component } from "react";
import { connect } from "react-redux";
import styled from "styled-components";
import { withRouter } from "react-router-dom";
import Header from "../Share/Header";

import i18n from "../../../utils/i18n";
import config from "../../../config/config";
const Container = styled.div`
  width: 100%;
  overflow: hidden;

  min-height: 100vh;
  padding-bottom: 120px;
`;

const BlockContainer = styled.div`
  background-color: #202137;
  width: 700px;
  color: #fff;
  padding: 30px 0;
  border-radius: 20px;
  margin: 30px auto;
`;
const ItemContainer = styled.div`
  min-height: 100px;

  margin: 30px 0 0 30px;
`;

const ItemContentContainer = styled.div`
  float: left;
  margin: 0 0 0 10px;
  padding: 10px;
`;

const ItemContentData = styled.div`
  opacity: 0.5;
  padding: 20px 0;
`;
const ItemTitle = styled.div`
  font-size: 32px;
  font-weight: 500;

  color: #fff;
`;
const NotSetLabel = styled.div`
  margin-top: 5px;

  font-size: 32px;

  color: #afafaf;
`;
const SettedLabel = styled(NotSetLabel)`
  color: ${({ theme }) =>
    theme.customProfileText
      ? theme.customProfileText
      : theme.wapPrimary
      ? theme.wapPrimary
      : theme.primary};
`;
const BtnBack = styled.div`
  height: 100px;

  width: 50px;
  mask: url(${process.env.PUBLIC_URL + `/assets/images/wapp/btn-back.png`})
    no-repeat right center;
  background: #fff;
  float: right;
  margin: 0 50px 0 0px;
`;
const ContentItem = (
  icon,
  title,
  isConfigured,
  onClickEvent,
  configuredValue,
  category,
  disabled
) => {
  var configureElement = isConfigured ? (
    <SettedLabel>{configuredValue}</SettedLabel>
  ) : (
    <NotSetLabel>{i18n.t("profile.notSet")}</NotSetLabel>
  );
  var disable = false;
  if (category === "member_phone") {
    if (config.features.Profile_NotAllowChangePhone && isConfigured) {
      disable = true;
    }
  }
  return (
    <ItemContainer onClick={!disable && !disabled && onClickEvent}>
      <ItemContentContainer>
        <ItemTitle>{title}</ItemTitle>
        {configureElement && (
          <ItemContentData>{configureElement}</ItemContentData>
        )}
      </ItemContentContainer>
      {!disable && !disabled && <BtnBack></BtnBack>}
    </ItemContainer>
  );
};

class Profile extends Component {
  state = {};
  componentDidMount() {
    if (this.props.account.token === null) {
      this.props.appHistory.replace("/login");
    }
  }
  handleBackClick = () => {
    this.props.appHistory.goBack();
  };
  handleNavigate = (path) => {
    this.props.appHistory.push(path);
  };
  isConfigured(value) {
    if (value) return true;
    return false;
  }

  getStatus = () => {
    var currentFormStatus = this.props.account.info.identityformstatus;
    var hasSubmitted = this.props.account.info.identityformid ? true : false;

    var status = "";

    if (currentFormStatus === 0 && hasSubmitted === false) {
      //api沒給表單id ，表示可以上傳
      return (status = "no");
    }
    if (
      (currentFormStatus === 1 && hasSubmitted === true) ||
      currentFormStatus === 1
    ) {
      return (status = "yes");
    }
    if (
      (currentFormStatus === 2 && hasSubmitted === true) ||
      currentFormStatus === 2
    ) {
      //有給表單id但是狀態是拒絕，也可以上傳
      return (status = "rejected");
    }
    if (currentFormStatus === 0 && hasSubmitted === true) {
      //有給表單id但狀態沒驗證，不能上傳
      return (status = "verifying");
    }
    return status;
  };

  getCustomMessagingIcon = (platform) => {
    switch (platform) {
      case "qq":
        return process.env.PUBLIC_URL + `/assets/images/wapp/icon-qq.png`;
      case "wechat":
        return process.env.PUBLIC_URL + `/assets/images/wapp/icon-wechat.png`;
      default:
        return (
          process.env.PUBLIC_URL + `/assets/images/wapp/icon-${platform}.svg`
        );
    }
  };

  getCustomMessagingTranslation = (platform) => {
    switch (platform) {
      case "qq":
        return "QQ";
      case "wechat":
        return i18n.t("T13.wechat.wc_title");
      default:
        return i18n.t("T13.socials." + platform.toLowerCase() + "_title");
    }
  };

  render() {
    return (
      <Container>
        <Header
          token={null}
          balance={0}
          background={true}
          onBackClick={this.handleBackClick}
          title={i18n.t("profile.title")}
        ></Header>{" "}
        <div style={{ height: 90 }} />
        <div style={{ marginBottom: "-30px" }}>
          <BlockContainer>
            {config.features.ICVerification &&
              ContentItem(
                process.env.PUBLIC_URL + `/assets/images/wapp/icon-user.png`,
                i18n.t("common.realName"),
                this.isConfigured(
                  this.props.account.info.member_name !== "" &&
                    this.props.account.info.member_name !== null
                ),
                () => {
                  this.handleNavigate("/profile/name");
                },
                this.props.account.info.member_name +
                  (this.props.account.info.member_name +
                    this.props.account.info.check_pass_account &&
                    "(" + i18n.t("verified." + this.getStatus()) + ")")
              )}

            {(config.features.SMSVerification ||
              config.features.PromoRoulette_SMSVerification ||
              config.features.Register_ShowPhone) &&
              ContentItem(
                process.env.PUBLIC_URL + `/assets/images/wapp/icon-phone.png`,
                i18n.t("profile.phone.title"),
                this.isConfigured(this.props.account.info.member_phone),
                () => {
                  this.handleNavigate("/profile/phone");
                },
                this.props.account.info.member_phone
                  ? this.props.account.info.member_phone.substring(0, 1) + "**"
                  : "",
                "member_phone"
              )}
            {config.features.EmailVerification &&
              ContentItem(
                process.env.PUBLIC_URL + `/assets/images/wapp/icon-email.png`,
                i18n.t("extended.email"),
                this.isConfigured(this.props.account.info.member_email),
                () => {
                  this.handleNavigate("/profile/email");
                },
                this.props.account.info.member_email
              )}

            {ContentItem(
              process.env.PUBLIC_URL + `/assets/images/wapp/icon-birthdate.png`,
              i18n.t("profile.birthdate.title"),
              this.isConfigured(this.props.account.info.member_birthdate),
              () => {
                this.handleNavigate("/profile/birthdate");
              },
              this.props.account.info.member_birthdate
                ? this.props.account.info.member_birthdate
                : ""
            )}
          </BlockContainer>

          {(config.features.QQWeChat ||
            config.features.CustomMessaging.length > 0) && (
            <BlockContainer>
              {config.features.QQWeChat &&
                ContentItem(
                  process.env.PUBLIC_URL + `/assets/images/wapp/icon-qq.png`,
                  "QQ",
                  this.isConfigured(this.props.account.info.member_qq),
                  () => {
                    this.handleNavigate("/profile/qq");
                  },
                  this.props.account.info.member_qq
                    ? this.props.account.info.member_qq.substring(0, 1) + "**"
                    : ""
                )}

              {config.features.QQWeChat &&
                ContentItem(
                  process.env.PUBLIC_URL +
                    `/assets/images/wapp/icon-wechat.png`,
                  i18n.t("T13.wechat.wc_title"),
                  this.isConfigured(this.props.account.info.member_wechat),
                  () => {
                    this.handleNavigate("/profile/wechat");
                  },
                  this.props.account.info.member_wechat
                    ? this.props.account.info.member_wechat.substring(0, 1) +
                        "**"
                    : ""
                )}

              {config.features.CustomMessaging &&
                config.features.CustomMessaging.map((platform) => {
                  return ContentItem(
                    this.getCustomMessagingIcon(platform),
                    this.getCustomMessagingTranslation(platform),
                    this.isConfigured(
                      this.props.account.info["member_" + platform]
                    ),
                    () => {
                      this.handleNavigate("/profile/" + platform);
                    },
                    this.props.account.info["member_" + platform]
                      ? this.props.account.info["member_" + platform].substring(
                          0,
                          1
                        ) + "**"
                      : ""
                  );
                })}
            </BlockContainer>
          )}
        </div>
        <BlockContainer>
          {ContentItem(
            process.env.PUBLIC_URL + `/assets/images/wapp/icon-unlock.png`,
            i18n.t("profile.password.title"),
            true,
            () => {
              this.handleNavigate("/profile/changepassword");
            },
            ""
          )}
        </BlockContainer>
      </Container>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    account: state.account,
  };
};
export default connect(mapStateToProps, null)(withRouter(Profile));
