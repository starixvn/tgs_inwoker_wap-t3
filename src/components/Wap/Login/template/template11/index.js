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
    props.selected === true ? props.theme.accent : props.theme.loginText};
`;

const TNC = styled(RememberPassLabel)`
  width: 515px;
  margin-bottom: 14px;
  font-size: 20px;
`;

const CustomWapButton = styled(ButtonWap)`
  background: url(${process.env.PUBLIC_URL +
    `/assets/images/wapp/btn-login-T11.png`})
    no-repeat center;
  border: none;
  color: #fff;
  background-size: 637px 94px;
  padding-top: 26px;
`;

const CustomInvitationSelect = styled.select`
  position: absolute;
  right: 85px;
  font-size: 25px;
  bottom: 35px;
  border: none;
  outline: none;
  background: none;
  color: #fff;
  & option {
    color: #000;
  }
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

  background: ${() => {
    return `url(${
      process.env.PUBLIC_URL + `/assets/images/wapp/icon-unchecked-T11.png`
    }) no-repeat center /
    contain;`;
  }};
`;

const CheckBoxChecked = styled.div`
  width: 40px;
  height: 40px;

  background: ${() => {
    return `url(${
      process.env.PUBLIC_URL + `/assets/images/wapp/icon-checked-T11.png`
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

const Template11 = ({
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
  const customInputContainerStyle = {
    background: `url(${process.env.PUBLIC_URL}/assets/images/wapp/btn-input-T11.png) no-repeat`,
    backgroundSize: "635px 100px",
    border: "none",
    height: "100px",
  };
  const customIconStyle = {
    margin: "25px 15px 0 40px",
    width: "50px",
    height: "50px",
    mask: "none",
    WebkitMask: "none",
  };
  const customInputStyle = {
    color: "#fff",
    marginTop: "32px",
    placeHolderStyle: ` 
      font-size: 28px;
    `,
  };
  const customRightIconStyle = {
    marginTop: "34px",
  };
  const customVerificationInputContainerStyle = {
    background: `url(${process.env.PUBLIC_URL}/assets/images/wapp/btn-input-T11.png) no-repeat`,
    backgroundSize: "395px 80px",
    border: "none",
    height: "80px",
  };
  const customVerificationInputStyle = {
    color: "#fff",
    marginLeft: "20px",
    placeHolderStyle: ` 
    font-size: 28px;
    `,
  };
  const customSelectInputContainerStyle = {
    background: `url(${process.env.PUBLIC_URL}/assets/images/wapp/btn-input-T11.png) no-repeat`,
    backgroundSize: "445px 80px",
    border: "none",
    height: "80px",
  };

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
                  process.env.PUBLIC_URL +
                  `/assets/images/wapp/icon-user-T11.png`
                }
                style={{ ...customInputContainerStyle, marginTop: "60px" }}
                inputStyle={{ ...customInputStyle }}
                iconStyle={{
                  ...customIconStyle,
                  background: `url(${process.env.PUBLIC_URL}/assets/images/wapp/icon-user-T11.png) no-repeat center / contain`,
                }}
                type={"text"}
                placeholder={i18n.t("common.username")}
                value={username}
                maxLength="16"
                onChange={handleUsernameChange}
              ></Textbox>

              <Textbox
                icon={
                  process.env.PUBLIC_URL +
                  `/assets/images/wapp/icon-unlock-T11.png`
                }
                style={{ ...customInputContainerStyle, marginTop: "20px" }}
                inputStyle={{ ...customInputStyle }}
                iconStyle={{
                  ...customIconStyle,
                  background: `url(${process.env.PUBLIC_URL}/assets/images/wapp/icon-unlock-T11.png) no-repeat center / contain`,
                }}
                rightIconStyle={{ ...customRightIconStyle }}
                type={hidePassword ? "password" : "text"}
                hidePassword={hidePassword}
                placeholder={i18n.t("common.password")}
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
                <CustomWapButton
                  name={i18n.t("common.login")}
                  onClick={handleLoginClick}
                ></CustomWapButton>
                <CustomWapButton
                  name={i18n.t("wap.login.browse")}
                  style={{ "margin-top": "30px" }}
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
                          onClick={() => handleChangeLanguage(lang)}
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
                  process.env.PUBLIC_URL +
                  `/assets/images/wapp/icon-user-T11.png`
                }
                style={{ ...customInputContainerStyle, marginTop: "60px" }}
                inputStyle={{ ...customInputStyle }}
                iconStyle={{
                  ...customIconStyle,
                  background: `url(${process.env.PUBLIC_URL}/assets/images/wapp/icon-user-T11.png) no-repeat center / contain`,
                }}
                rightIconStyle={{ ...customRightIconStyle }}
                type={"text"}
                placeholder={i18n.t("wap.register.username")}
                maxLength="16"
                value={username}
                onChange={handleUsernameChange}
              ></Textbox>

              <Textbox
                icon={
                  process.env.PUBLIC_URL +
                  `/assets/images/wapp/icon-unlock-T11.png`
                }
                style={{ ...customInputContainerStyle, marginTop: "20px" }}
                inputStyle={{ ...customInputStyle }}
                iconStyle={{
                  ...customIconStyle,
                  background: `url(${process.env.PUBLIC_URL}/assets/images/wapp/icon-unlock-T11.png) no-repeat center / contain`,
                }}
                rightIconStyle={{ ...customRightIconStyle }}
                type={hidePassword ? "password" : "text"}
                hidePassword={hidePassword}
                placeholder={i18n.t("wap.register.password")}
                password={true}
                maxLength="20"
                toggleShow={handleToggleShow}
                value={password}
                onChange={handlePasswordChange}
              ></Textbox>
              <Textbox
                icon={
                  process.env.PUBLIC_URL +
                  `/assets/images/wapp/icon-unlock-2-T11.png`
                }
                style={{ ...customInputContainerStyle, marginTop: "20px" }}
                inputStyle={{ ...customInputStyle }}
                iconStyle={{
                  ...customIconStyle,
                  background: `url(${process.env.PUBLIC_URL}/assets/images/wapp/icon-unlock-2-T11.png) no-repeat center / contain`,
                }}
                rightIconStyle={{ ...customRightIconStyle }}
                type={hideConfirmPassword ? "password" : "text"}
                hidePassword={hideConfirmPassword}
                placeholder={i18n.t("wap.register.confirmPassword")}
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
                    inputStyle={{ ...customVerificationInputStyle }}
                    style={{ ...customSelectInputContainerStyle }}
                    primaryBg={true}
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
                    style={{ ...customInputContainerStyle, marginTop: "20px" }}
                    inputStyle={{ ...customInputStyle }}
                    iconStyle={{
                      ...customIconStyle,
                      background: `url(${process.env.PUBLIC_URL}/assets/images/wapp/icon-email.png) no-repeat center / contain`,
                    }}
                    rightIconStyle={{ ...customRightIconStyle }}
                    type={"text"}
                    placeholder={i18n.t("wap.register.email")}
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
                    style={{ ...customInputContainerStyle, marginTop: "20px" }}
                    inputStyle={{ ...customInputStyle }}
                    iconStyle={{
                      ...customIconStyle,
                      width: "0px",
                    }}
                    rightIconStyle={{ ...customRightIconStyle }}
                    type={"text"}
                    placeholder={i18n.t("wap.register.promoteCode")}
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

              <CustomWapButton
                style={{ margin: "150px auto 0px auto" }}
                name={
                  config.features.Register_CustomFlow_IDR
                    ? i18n.t("common.nextStep")
                    : i18n.t("common.register")
                }
                onClick={handleRegisterClick}
                disableButton={!tnc}
              ></CustomWapButton>
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
                inputStyle={{ ...customVerificationInputStyle }}
                style={{ ...customSelectInputContainerStyle }}
                primaryBg={true}
              ></Select>
              {!config.features.SkipSMSVerification && (
                <>
                  <VerificationCode
                    value={code}
                    onChange={handleCodeChange}
                    countdown={countdown}
                    placeholder={i18n.t("common.msgEnterCode")}
                    handleGetCodeClick={handleGetCodeClick}
                    inputStyle={{ ...customVerificationInputStyle }}
                    style={{ ...customVerificationInputContainerStyle }}
                    customWapButton={(props) => (
                      <CustomWapButton {...props}></CustomWapButton>
                    )}
                  ></VerificationCode>
                  {config.features.Custom_Temp_show_verify_SMS_hints && (
                    <Description>
                      {i18n.t("web.register.errorCustomDesc")}
                    </Description>
                  )}
                </>
              )}
              <CustomWapButton
                style={{ margin: "100px auto 0 auto" }}
                name={i18n.t("common.submit")}
                onClick={handleActivationClick}
              ></CustomWapButton>
            </React.Fragment>
          );
        }
      })()}
    </React.Fragment>
  );
};

export default Template11;
