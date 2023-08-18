import React from "react";
import styled from "styled-components";
import ButtonSwitch from "../../ButtonSwitch";
import Textbox from "../../Textbox";
import Select from "../../Select";
import VerificationCode from "../../VerificationCode";
import Checkbox from "@material-ui/core/Checkbox";
import { withStyles } from "@material-ui/core/styles";
import ButtonWap from "../../../../Share/ButtonWap";

import i18n from "../../../../../utils/i18n";
import config from "../../../../../config/config";

const Logo = styled.div`
  width: 300px;
  height: 200px;
  margin: 60px auto 60px auto;
  background: url("${(props) => props.img}") no-repeat center center;
  background-size: contain;
`;
const RememberPassContainer = styled.div`
  float: left;
  margin: 10px 0 0 70px;
`;
const RememberPassLabel = styled.div`
  float: left;
  font-size: 28px;
  margin-top: 14px;
  color: ${({ theme }) => theme.loginText};
`;
const CustomCheck = withStyles({
  root: {
    width: "50px",
    height: "50px",
    fontSize: "50px",
    float: "left",
  },
})(Checkbox);
const ForgotPassContainer = styled.div`
  float: righht;
  margin: 10px 70px 0 0;
`;
const ForgotPassLabel = styled(RememberPassLabel)`
  float: right;
`;
const LoginActionContainer = styled.div`
  margin: 100px 0 0 0;
`;

const LanguageWrap = styled.div`
  text-align: center;
  color: ${({ theme }) => theme.loginText};
  font-size: 28px;
  margin-top: 20px;
`;

const DownloadButtonHolder = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const DownloadButton = styled(LanguageWrap)`
  font-size: 30px;
  font-weight: bold;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 10px 20px;
`;
const LanguageLink = styled.span`
  text-align: center;
  color: ${(props) =>
    props.selected === true
      ? props.theme.wapPrimary
        ? props.theme.wapPrimary
        : props.theme.primary
      : props.theme.loginText};
`;

const TNC = styled(RememberPassLabel)`
  width: 515px;
  margin-bottom: 14px;
`;

const CustomWapButton = styled(ButtonWap)`
  background: transparent;
  border: solid 2px
    ${({ theme }) => (theme.wapPrimary ? theme.wapPrimary : theme.primary)};
  color: ${({ theme }) => theme.loginText};
`;

const CustomInvitationSelect = styled.select`
  position: absolute;
  right: 85px;
  font-size: 25px;
  bottom: 25px;
  border: none;
  outline: none;
`;

const CustomWrapper = styled.div`
  position: relative;
`;

const Icon = styled.div`
  width: 40px;
  height: 40px;
  margin-right: 20px;
  background-color: ${({ theme }) =>
    theme.wapPrimary ? theme.wapPrimary : theme.primary};
  mask: ${({ icon }) => {
    return `url(${
      process.env.PUBLIC_URL + `/assets/images/wapp/${icon}.svg`
    }) no-repeat center /
    contain;`;
  }};
`;

const CheckBoxUnchecked = styled.div`
  width: 40px;
  height: 40px;

  background-color: ${({ theme }) =>
    theme.wapPrimary ? theme.wapPrimary : theme.primary};
  mask: ${({ icon }) => {
    return `url(${
      process.env.PUBLIC_URL + `/assets/images/wapp/icon-unchecked.png`
    }) no-repeat center /
    contain;`;
  }};
`;

const CheckBoxChecked = styled.div`
  width: 40px;
  height: 40px;

  background-color: ${({ theme }) =>
    theme.wapPrimary ? theme.wapPrimary : theme.primary};
  mask: ${({ icon }) => {
    return `url(${
      process.env.PUBLIC_URL + `/assets/images/wapp/icon-checked.png`
    }) no-repeat center /
    contain;`;
  }};
`;

const Description = styled.div`
  float: left;
  padding-right: 30px;
  padding-left: 30px;
  font-size: 30px;
  margin: 5px 0px 25px 30px;
  color: red;
`;

const Template1 = ({
  template,
  logoImg,
  handleChangeSelection,
  isUpdate,
  selected,
  username,
  password,
  hidePassword,
  rememberMe,
  hideConfirmPassword,
  confirmPassword,
  areaCode,
  phone,
  email,
  fromCustomDomain,
  promoteType,
  promoId,
  upper,
  prefill,
  tnc,
  code,
  countdown,
  handleToggleShow,
  handleUsernameChange,
  handlePasswordChange,
  handleRememberMeChange,
  handleForgotpasswordClick,
  handleLoginClick,
  handleBackToHomeClick,
  handleChangeLanguage,
  handleGoDownloadPage,
  handleToggleConfirmPasswordShow,
  handleConfirmPasswordChange,
  handleAreaCodeChange,
  handlePhoneChange,
  handleEmailChange,
  handlePromoCodeChange,
  handleUpperChange,
  handleSwitchType,
  handleTncClick,
  handleRegisterClick,
  handleCodeChange,
  handleGetCodeClick,
  handleActivationClick,
  brandLanguage,
  haveAffiliate,
}) => {
  return (
    <React.Fragment>
      <Logo img={logoImg}></Logo>
      <ButtonSwitch
        handleChangeSelection={handleChangeSelection}
        isUpdate={isUpdate}
        selected={selected}
      ></ButtonSwitch>
      {(() => {
        if (selected === 0) {
          return (
            <React.Fragment>
              <Textbox
                icon={
                  process.env.PUBLIC_URL + `/assets/images/wapp/icon-user.png`
                }
                type={"text"}
                placeholder={i18n.t("common.username")}
                style={{ marginTop: "60px" }}
                value={username}
                maxLength="16"
                onChange={handleUsernameChange}
              ></Textbox>

              <Textbox
                icon={
                  process.env.PUBLIC_URL + `/assets/images/wapp/icon-unlock.png`
                }
                type={hidePassword ? "password" : "text"}
                hidePassword={hidePassword}
                placeholder={i18n.t("common.password")}
                style={{ marginTop: "20px" }}
                password={true}
                toggleShow={handleToggleShow}
                value={password}
                onChange={handlePasswordChange}
              ></Textbox>
              <RememberPassContainer>
                <CustomCheck
                  style={{ fontSize: "30px" }}
                  icon={<CheckBoxUnchecked />}
                  checkedIcon={<CheckBoxChecked />}
                  checked={rememberMe}
                  onChange={handleRememberMeChange}
                />
                <RememberPassLabel>
                  {i18n.t("wap.login.rememberMe")}
                </RememberPassLabel>
              </RememberPassContainer>
              <ForgotPassContainer onClick={handleForgotpasswordClick}>
                <ForgotPassLabel>
                  {i18n.t("wap.login.forgetPass")}
                </ForgotPassLabel>
              </ForgotPassContainer>

              <LoginActionContainer>
                <ButtonWap
                  name={
                    i18n.exists(`${config.brand}.login`)
                      ? i18n.t(`${config.brand}.login`)
                      : i18n.t(`common.login`)
                  }
                  onClick={handleLoginClick}
                ></ButtonWap>
                <CustomWapButton
                  name={i18n.t("wap.login.browse")}
                  style={{ "margin-top": "20px" }}
                  onClick={handleBackToHomeClick}
                ></CustomWapButton>
              </LoginActionContainer>
              <LanguageWrap>
                {(() => {
                  return brandLanguage.map((lang, index) => {
                    return (
                      <React.Fragment>
                        <LanguageLink
                          selected={i18n.language === lang.culturecode}
                          onClick={() => {
                            handleChangeLanguage(lang);
                          }}
                        >
                          {i18n.t("lang." + lang.culturecode)}
                        </LanguageLink>

                        {brandLanguage.length - 1 !== index ? (
                          <LanguageLink> | </LanguageLink>
                        ) : (
                          ""
                        )}
                      </React.Fragment>
                    );
                  });
                })()}
              </LanguageWrap>
              {config.features.HaveDownloadFeature && (
                <DownloadButtonHolder>
                  <DownloadButton onClick={handleGoDownloadPage}>
                    <Icon icon="icon-download" />
                    {i18n.t("wap.main.account.appDownload")}
                  </DownloadButton>
                </DownloadButtonHolder>
              )}
            </React.Fragment>
          );
        } else if (selected === 1) {
          return (
            <React.Fragment>
              <Textbox
                icon={
                  process.env.PUBLIC_URL + `/assets/images/wapp/icon-user.png`
                }
                type={"text"}
                placeholder={i18n.t("wap.register.username")}
                style={{ marginTop: "60px" }}
                maxLength="16"
                value={username}
                onChange={handleUsernameChange}
              ></Textbox>

              <Textbox
                icon={
                  process.env.PUBLIC_URL + `/assets/images/wapp/icon-unlock.png`
                }
                type={hidePassword ? "password" : "text"}
                hidePassword={hidePassword}
                placeholder={i18n.t("wap.register.password")}
                style={{ marginTop: "20px" }}
                password={true}
                maxLength="20"
                toggleShow={handleToggleShow}
                value={password}
                onChange={handlePasswordChange}
              ></Textbox>
              <Textbox
                icon={
                  process.env.PUBLIC_URL + `/assets/images/wapp/icon-unlock.png`
                }
                type={hideConfirmPassword ? "password" : "text"}
                hidePassword={hideConfirmPassword}
                placeholder={i18n.t("wap.register.confirmPassword")}
                style={{ marginTop: "20px" }}
                password={true}
                maxLength="20"
                toggleShow={handleToggleConfirmPasswordShow}
                value={confirmPassword}
                onChange={handleConfirmPasswordChange}
              ></Textbox>

              {config.features.Register_ShowPhone && (
                <CustomWrapper>
                  <Select
                    type={"text"}
                    placeholder={i18n.t("forgotPassword.plsEnterPhoneNumber")}
                    selectValue={areaCode}
                    onSelectChange={handleAreaCodeChange}
                    value={phone}
                    maxLength={config.features.MAX_PHONE_LENGTH || 10}
                    onChange={handlePhoneChange}
                  ></Select>
                </CustomWrapper>
              )}

              {config.features.Register_ShowEmail && (
                <CustomWrapper>
                  <Textbox
                    icon={
                      process.env.PUBLIC_URL +
                      `/assets/images/wapp/icon-email.png`
                    }
                    type={"text"}
                    placeholder={i18n.t("wap.register.email")}
                    style={{ marginTop: "20px" }}
                    maxLength="50"
                    value={email}
                    onChange={handleEmailChange}
                  ></Textbox>
                </CustomWrapper>
              )}

              {!(
                config.features.Register_HideInvitation && fromCustomDomain
              ) && (
                <CustomWrapper>
                  <Textbox
                    icon={
                      process.env.PUBLIC_URL +
                      `/assets/images/wapp/icon-promo.png`
                    }
                    type={"text"}
                    placeholder={i18n.t("wap.register.promoteCode")}
                    style={{ marginTop: "20px" }}
                    value={promoteType === "a" ? promoId : upper}
                    onChange={
                      promoteType === "a"
                        ? handlePromoCodeChange
                        : handleUpperChange
                    }
                    disabled={prefill}
                  ></Textbox>
                  {haveAffiliate && (
                    <CustomInvitationSelect
                      disabled={prefill}
                      value={promoteType}
                      selected={promoteType}
                      onChange={handleSwitchType}
                    >
                      <option value="a">{i18n.t("usertype.agent")}</option>
                      <option value="p">{i18n.t("usertype.player")}</option>
                    </CustomInvitationSelect>
                  )}
                </CustomWrapper>
              )}

              <RememberPassContainer>
                <CustomCheck
                  style={{ fontSize: "30px" }}
                  icon={<CheckBoxUnchecked />}
                  checkedIcon={<CheckBoxChecked />}
                  checked={tnc}
                  onChange={handleTncClick}
                />
                <TNC>{i18n.t("web.register.contract")}</TNC>
              </RememberPassContainer>

              <ButtonWap
                style={{ margin: "100px auto 150px auto" }}
                name={
                  config.features.Register_CustomFlow_IDR
                    ? i18n.t("common.nextStep")
                    : i18n.t("common.register")
                }
                onClick={handleRegisterClick}
                disableButton={!tnc}
              ></ButtonWap>
            </React.Fragment>
          );
        } else if (selected === 2) {
          return (
            <React.Fragment>
              <Select
                type={"text"}
                placeholder={i18n.t("forgotPassword.plsEnterPhoneNumber")}
                selectValue={areaCode}
                onSelectChange={handleAreaCodeChange}
                value={phone}
                onChange={handlePhoneChange}
                leaveGap={config.features.SkipSMSVerification}
              ></Select>
              {!config.features.SkipSMSVerification && (
                <>
                  <VerificationCode
                    value={code}
                    onChange={handleCodeChange}
                    countdown={countdown}
                    placeholder={i18n.t("common.msgEnterCode")}
                    handleGetCodeClick={handleGetCodeClick}
                  ></VerificationCode>
                  {config.features.Custom_Temp_show_verify_SMS_hints && (
                    <Description>
                      {i18n.t("web.register.errorCustomDesc")}
                    </Description>
                  )}
                </>
              )}
              <ButtonWap
                style={{ margin: "100px auto 0 auto" }}
                name={i18n.t("common.submit")}
                onClick={handleActivationClick}
              ></ButtonWap>
            </React.Fragment>
          );
        }
      })()}
    </React.Fragment>
  );
};

export default Template1;
