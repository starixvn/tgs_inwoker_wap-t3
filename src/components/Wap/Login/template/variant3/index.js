import React from "react";
import styled from "styled-components";

import Checkbox from "@material-ui/core/Checkbox";
import { withStyles } from "@material-ui/core/styles";
import ButtonWap from "../../../../Share/ButtonWap";

import i18n from "../../../../../utils/i18n";
import config from "../../../../../config/config";
import { AppHistory } from "../../../../../history/History";
import PhoneField from "../../../components/phonefield";
import TextfieldWithButton from "../../../components/textfieldwithbutton";
import Textfield from "../../../components/textfield";
import Button from "../../../components/button";
import Header from "../../../Share/Header";

const RememberPassContainer = styled.div`
  float: left;
  margin: 10px 0 0 10px;
`;
const RememberPassLabel = styled.div`
  float: left;
  font-size: ${(props) => i18n.language === "ta-IN" ? "22px" : "28px"};
  margin-top: 14px;
  color: ${({ theme }) => theme.loginText};

  ${(props) =>
    i18n.language === "ta-IN"
      ? `
  white-space: break-spaces;
  width: 220px;
  `
      : ``}

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
  margin: 10px 10px 0 0;
`;
const ForgotPassLabel = styled(RememberPassLabel)`
  float: right;
`;

const LanguageWrap = styled.div`
  text-align: center;
  color: ${({ theme }) => theme.loginText};
  font-size: 28px;
`;

const ButtonHolder = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const DownloadButton = styled(LanguageWrap)`
  font-size: 24px;
  font-weight: bold;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 10px 20px;
`;

const TNC = styled(RememberPassLabel)`
  width: 515px;
  margin-bottom: 14px;
  font-size: 20px;
`;

const CustomInvitationSelect = styled.select`
  position: absolute;
  right: 85px;
  font-size: 25px;
  top: 37px;
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

const Container = styled.div`
  flex-direction: column;
  align-items: center;
  display: flex-root;
  padding: 0px 20px;
`;

const Title = styled.div`
  color: #fff;
  font-size: 88px;
  font-weight: bold;
  font-style: italic;
  text-align: center;
  padding: 150px 0 100px 0;
  text-transform: uppercase;
  width: 100%;
`;

const ContentGap = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 0 30px 0 20px;
  margin-bottom: 100px;
`;

const LanguageWrapper = styled.div`
  display: flex;
  text-align: center;
  color: ${({ theme }) => theme.loginText};
  font-size: 28px;
  gap: 10px;
  justify-content: center;
  align-items: center;
`;

const Variant3 = ({
  handleChangeSelection,
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
  handleChangeLanguage,
  haveAffiliate,
}) => {
  const handleBackClick = () => {
    AppHistory.push("/");
  };

  return (
    <React.Fragment>
      {(() => {
        if (selected === 0) {
          return (
            <Container>
              <Header
                token={null}
                balance={0}
                background={true}
                textposition="left"
                onBackClick={handleBackClick}
                title={i18n.t("common.back")}
              ></Header>
              <Title>{i18n.t("common.login")}</Title>
              <Textfield
                icon={
                  process.env.PUBLIC_URL +
                  `/assets/images/wapp/icon-user-T11.png`
                }
                type={"text"}
                borderRadius="30px"
                placeholder={i18n.t("common.username")}
                value={username}
                maxLength="16"
                onChange={handleUsernameChange}
              ></Textfield>

              <Textfield
                icon={
                  process.env.PUBLIC_URL +
                  `/assets/images/wapp/icon-unlock-T11.png`
                }
                borderRadius="30px"
                type={hidePassword ? "password" : "text"}
                hidePassword={hidePassword}
                placeholder={i18n.t("common.password")}
                password={true}
                toggleShow={handleToggleShow}
                value={password}
                onChange={handlePasswordChange}
              ></Textfield>
              <ContentGap>
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
              </ContentGap>

              <Button
                minWidth="400px"
                label={i18n.t("common.login")}
                onClick={handleLoginClick}
              ></Button>

              <ButtonHolder>
                <div style={{ color: "white", fontSize: 24 }}>
                  {i18n.t("T13.proceedRegister")}
                </div>{" "}
                <DownloadButton
                  onClick={() => {
                    handleChangeSelection(1);
                  }}
                >
                  {i18n.t("wap.main.home.steps.step1")}
                </DownloadButton>
              </ButtonHolder>
              {
                //     <LanguageWrapper>
                //     {(() => {
                //       return brandLanguage.map((lang, index) => {
                //         return (
                //           <React.Fragment>
                //             <div
                //               selected={i18n.language === lang.culturecode}
                //               onClick={() => handleChangeLanguage(lang)}
                //             >
                //               {i18n.t("lang." + lang.culturecode)}
                //             </div>
                //
                //             {brandLanguage.length - 1 !== index ? (
                //               <div> | </div>
                //             ) : (
                //               ""
                //             )}
                //           </React.Fragment>
                //         );
                //       });
                //     })()}
                //   </LanguageWrapper>
              }
            </Container>
          );
        } else if (selected === 1) {
          return (
            <Container>
              <Header
                token={null}
                balance={0}
                textposition="left"
                background={true}
                onBackClick={handleBackClick}
                title={i18n.t("common.back")}
              ></Header>
              <Title>{i18n.t("common.register")}</Title>
              <Textfield
                icon={
                  process.env.PUBLIC_URL +
                  `/assets/images/wapp/icon-user-T11.png`
                }
                borderRadius="30px"
                type={"text"}
                placeholder={i18n.t("common.username")}
                maxLength="16"
                value={username}
                onChange={handleUsernameChange}
              ></Textfield>
              <Textfield
                icon={
                  process.env.PUBLIC_URL +
                  `/assets/images/wapp/icon-unlock-T11.png`
                }
                type={hidePassword ? "password" : "text"}
                hidePassword={hidePassword}
                placeholder={i18n.t("common.password")}
                password={true}
                maxLength="20"
                borderRadius="30px"
                toggleShow={handleToggleShow}
                value={password}
                onChange={handlePasswordChange}
              ></Textfield>
              <Textfield
                icon={
                  process.env.PUBLIC_URL +
                  `/assets/images/wapp/icon-unlock-2-T11.png`
                }
                type={hideConfirmPassword ? "password" : "text"}
                hidePassword={hideConfirmPassword}
                placeholder={i18n.t("T13.register.confirmPassword")}
                password={true}
                maxLength="20"
                borderRadius="30px"
                toggleShow={handleToggleConfirmPasswordShow}
                value={confirmPassword}
                onChange={handleConfirmPasswordChange}
              ></Textfield>
              {config.features.Register_ShowPhone && (
                <PhoneField
                  variant="loginregister"
                  placeholder={i18n.t("common.msgEnterPhone")}
                  value={phone}
                  onChange={handlePhoneChange}
                  borderRadius="30px"
                  maxLength={config.features.MAX_PHONE_LENGTH || 10}
                  phonePrefix={areaCode}
                  onSelect={handleAreaCodeChange}
                >
                  <option value={config.features.PhonePrefix}>
                    {config.features.PhonePrefix}
                  </option>
                </PhoneField>
              )}
              {config.features.Register_ShowEmail && (
                <Textfield
                  borderRadius="30px"
                  icon={
                    process.env.PUBLIC_URL +
                    `/assets/images/wapp/icon-email.png`
                  }
                  type={"text"}
                  placeholder={i18n.t("wap.register.email")}
                  maxLength="50"
                  value={email}
                  onChange={handleEmailChange}
                ></Textfield>
              )}
              {!(
                config.features.Register_HideInvitation && fromCustomDomain
              ) && (
                <Textfield
                  icon={
                    process.env.PUBLIC_URL +
                    `/assets/images/wapp/icon-promo.png`
                  }
                  placeholder={i18n.t("wap.register.promoteCode")}
                  value={promoteType === "a" ? promoId : upper}
                  onChange={
                    promoteType === "a"
                      ? handlePromoCodeChange
                      : handleUpperChange
                  }
                  disabled={prefill}
                  borderRadius="30px"
                  actions={
                    haveAffiliate && (
                      <CustomInvitationSelect
                        disabled={prefill}
                        value={promoteType}
                        selected={promoteType}
                        onChange={handleSwitchType}
                      >
                        <option value="a">{i18n.t("usertype.agent")}</option>
                        <option value="p">{i18n.t("usertype.player")}</option>
                      </CustomInvitationSelect>
                    )
                  }
                ></Textfield>
              )}
              <div style={{ padding: "10px 40px 0 10px" }}>
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
              </div>
              <Button
                label={
                  config.features.Register_CustomFlow_IDR
                    ? i18n.t("common.nextStep")
                    : i18n.t("T13.register.btn")
                }
                minWidth="400px"
                onClick={handleRegisterClick}
                disableButton={!tnc}
              ></Button>
              <ButtonHolder>
                <div style={{ color: "white", fontSize: 24 }}>
                  {i18n.t("T13.proceedLogin")}
                </div>{" "}
                <DownloadButton
                  onClick={() => {
                    handleChangeSelection(0);
                  }}
                >
                  {i18n.t("common.login")}
                </DownloadButton>
              </ButtonHolder>{" "}
              {
                //     <LanguageWrapper>
                //     {(() => {
                //       return brandLanguage.map((lang, index) => {
                //         return (
                //           <React.Fragment>
                //             <div
                //               selected={i18n.language === lang.culturecode}
                //               onClick={() => handleChangeLanguage(lang)}
                //             >
                //               {i18n.t("lang." + lang.culturecode)}
                //             </div>
                //
                //             {brandLanguage.length - 1 !== index ? (
                //               <div> | </div>
                //             ) : (
                //               ""
                //             )}
                //           </React.Fragment>
                //         );
                //       });
                //     })()}
                //   </LanguageWrapper>
              }
            </Container>
          );
        } else if (selected === 2) {
          return (
            <React.Fragment>
              <PhoneField
                title={i18n.t("common.phoneNumber")}
                placeholder={i18n.t("common.msgEnterPhone")}
                value={phone}
                onChange={handlePhoneChange}
                maxLength={config.features.MAX_PHONE_LENGTH || 10}
                phonePrefix={areaCode}
                onSelect={handleAreaCodeChange}
              >
                <option value={config.features.PhonePrefix}>
                  {config.features.PhonePrefix}
                </option>
              </PhoneField>

              {!config.features.SkipSMSVerification && (
                <>
                  <TextfieldWithButton
                    buttonlabel={
                      countdown <= 0
                        ? i18n.t("common.msgSendToken")
                        : i18n.t("common.btnTokenResendLabel") +
                          "(" +
                          countdown +
                          "s)"
                    }
                    style={{ margin: "20px auto 20px auto" }}
                    value={code}
                    onChange={handleCodeChange}
                    placeholder={i18n.t("common.msgEnterCode")}
                    title={i18n.t("common.token")}
                    onClick={handleGetCodeClick}
                  ></TextfieldWithButton>

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

export default Variant3;
