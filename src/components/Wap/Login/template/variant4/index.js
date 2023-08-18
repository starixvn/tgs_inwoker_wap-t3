import styled from "styled-components";
import { withStyles } from "@material-ui/core/styles";
import Checkbox from "@material-ui/core/Checkbox";
import ButtonWap from "../../../../Share/ButtonWap";
import i18n from "../../../../../utils/i18n";
import config from "../../../../../config/config";
import { AppHistory } from "../../../../../history/History";
import PhoneField from "../../../components/phonefield";
import TextfieldWithButton from "../../../components/textfieldwithbutton";
import Textfield from "../../../components/textfield";
import Button from "../../../components/button";
import Header from "../../../Share/Header";
import WapModal from "../../../components/modal";
import { connect } from "react-redux";
import { useState } from "react";

const RememberPassContainer = styled.div`
  float: left;
  margin: 10px 0 0 10px;
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
  float: right;
  margin: 10px 10px 0 0;
`;

const ForgotPassLabel = styled(RememberPassLabel)`
  float: right;
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

const CheckBoxUnchecked = styled.div`
  width: 40px;
  height: 40px;
  background: url(${process.env
      .PUBLIC_URL}/assets/images/wapp/icon-unchecked-T11.png)
    no-repeat center / contain;
`;

const CheckBoxChecked = styled.div`
  width: 40px;
  height: 40px;
  background: url(${process.env
      .PUBLIC_URL}/assets/images/wapp/icon-checked-T11.png)
    no-repeat center / contain;
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
  text-align: center;
  padding: 150px 0 50px 0;
  text-transform: uppercase;
  width: 100%;
`;

const ContentGap = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 0 30px 0 20px;
  margin-bottom: 100px;
`;

const LoginAndRegisterContainer = styled.div`
  color: #fff;
  display: flex;
  justify-content: space-around;
  padding: 20px;
`;

const CustomButton = styled.div`
  background: ${({ selected, theme }) =>
    selected ? theme.primary : "transparent"};
  font-size: 30px;
  padding: 20px 40px;
  min-width: 200px;
  text-align: center;
  border-radius: 10px;
  text-transform: uppercase;
  font-weight: bold;
`;

const ModalContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding: 0 20px;
`;

const Buttons = styled.div`
  background: #181c42;
  border-radius: 20px;
  color: #fff;
  padding: 20px;
  text-align: center;
`;

const LanguageButtonContainer = styled.div`
  height: 85px;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 90px;
  padding-right: 20px;
`;

const LanguageIcon = styled.div`
  height: 50px;
  width: 50px;
  mask: url(${process.env.PUBLIC_URL + `/assets/images/wapp/language.svg`})
    no-repeat center;
  mask-size: contain;
  background: #fff;
`;

const ButtonRow = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 24px;
  color: #fff;
  padding: 24px;
`;

const TheButton = styled.div`
  border: solid 1px #fff;
  padding: 18px 36px;
  border-radius: 10px;
  display: flex;
  align-items: center;
  gap: 10px;
`;

const ChatIcon = styled.div`
  height: 30px;
  width: 30px;
  mask: url(${process.env.PUBLIC_URL + `/assets/images/wapp/bottomnav/cs.svg`})
    no-repeat center;
  mask-size: contain;
  background: #fff;
`;

const Variant4 = ({
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

  haveAffiliate,
  general,
}) => {
  const handleBackClick = () => {
    AppHistory.push("/");
  };

  const ButtonSwitcher = ({ selected }) => {
    const Button = ({ value, children }) => (
      <CustomButton
        selected={selected === parseInt(value)}
        onClick={() => handleChangeSelection(parseInt(value))}
      >
        {children}
      </CustomButton>
    );

    return (
      <LoginAndRegisterContainer>
        <Button value="0">{i18n.t("common.login")}</Button>
        <Button value="1">{i18n.t("common.register")}</Button>
      </LoginAndRegisterContainer>
    );
  };

  const [showLanguageDialog, setShowLanguageDialog] = useState(false);

  const showLanguageModal = () => {
    setShowLanguageDialog(true);
  };

  const closeLanguageModal = () => {
    setShowLanguageDialog(false);
  };

  const LanguageButton = () => {
    return (
      <LanguageButtonContainer>
        <LanguageIcon
          onClick={() => {
            showLanguageModal();
          }}
        />
      </LanguageButtonContainer>
    );
  };

  const ActionButtonRow = () => {
    return (
      <ButtonRow>
        <TheButton
          onClick={() => {
            AppHistory.push("/main/support");
          }}
        >
          <ChatIcon />
          <div>{i18n.t("onlinechat")}</div>
        </TheButton>
      </ButtonRow>
    );
  };
  return (
    <>
      {selected === 0 && (
        <Container>
          <Header
            token={null}
            balance={0}
            background={true}
            textposition="left"
            onBackClick={handleBackClick}
            title={i18n.t("common.back")}
            rightContent={<LanguageButton />}
          />
          <Title>{i18n.t("common.login")}</Title>
          <ButtonSwitcher selected={selected} />
          <Textfield
            icon={`${process.env.PUBLIC_URL}/assets/images/wapp/icon-user-T11.png`}
            type="text"
            borderRadius="30px"
            placeholder={i18n.t("common.username")}
            value={username}
            maxLength="16"
            onChange={handleUsernameChange}
          />
          <Textfield
            icon={`${process.env.PUBLIC_URL}/assets/images/wapp/icon-unlock-T11.png`}
            borderRadius="30px"
            type={hidePassword ? "password" : "text"}
            hidePassword={hidePassword}
            placeholder={i18n.t("common.password")}
            password={true}
            toggleShow={handleToggleShow}
            value={password}
            onChange={handlePasswordChange}
          />
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
          />
          <ActionButtonRow />
        </Container>
      )}

      {selected === 1 && (
        <Container>
          <Header
            token={null}
            balance={0}
            textposition="left"
            background={true}
            rightContent={<LanguageButton />}
            onBackClick={handleBackClick}
            title={i18n.t("common.back")}
          />
          <Title>{i18n.t("common.register")}</Title>
          <ButtonSwitcher selected={selected} />
          <Textfield
            icon={`${process.env.PUBLIC_URL}/assets/images/wapp/icon-user-T11.png`}
            borderRadius="30px"
            type="text"
            placeholder={i18n.t("common.username")}
            maxLength="16"
            value={username}
            onChange={handleUsernameChange}
          />
          <Textfield
            icon={`${process.env.PUBLIC_URL}/assets/images/wapp/icon-unlock-T11.png`}
            type={hidePassword ? "password" : "text"}
            hidePassword={hidePassword}
            placeholder={i18n.t("common.password")}
            password={true}
            maxLength="20"
            borderRadius="30px"
            toggleShow={handleToggleShow}
            value={password}
            onChange={handlePasswordChange}
          />
          <Textfield
            icon={`${process.env.PUBLIC_URL}/assets/images/wapp/icon-unlock-2-T11.png`}
            type={hideConfirmPassword ? "password" : "text"}
            hidePassword={hideConfirmPassword}
            placeholder={i18n.t("T13.register.confirmPassword")}
            password={true}
            maxLength="20"
            borderRadius="30px"
            toggleShow={handleToggleConfirmPasswordShow}
            value={confirmPassword}
            onChange={handleConfirmPasswordChange}
          />
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
              icon={`${process.env.PUBLIC_URL}/assets/images/wapp/icon-email.png`}
              type="text"
              placeholder={i18n.t("wap.register.email")}
              maxLength="50"
              value={email}
              onChange={handleEmailChange}
            />
          )}
          {!(config.features.Register_HideInvitation && fromCustomDomain) && (
            <Textfield
              icon={`${process.env.PUBLIC_URL}/assets/images/wapp/icon-promo.png`}
              placeholder={i18n.t("wap.register.promoteCode")}
              value={promoteType === "a" ? promoId : upper}
              onChange={
                promoteType === "a" ? handlePromoCodeChange : handleUpperChange
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
            />
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
          />
          <ActionButtonRow />
        </Container>
      )}

      {selected === 2 && (
        <>
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
                    : `${i18n.t("common.btnTokenResendLabel")}(${countdown}s)`
                }
                style={{ margin: "20px auto 20px auto" }}
                value={code}
                onChange={handleCodeChange}
                placeholder={i18n.t("common.msgEnterCode")}
                title={i18n.t("common.token")}
                onClick={handleGetCodeClick}
              />

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
          />
        </>
      )}

      <WapModal
        title="language"
        open={showLanguageDialog}
        handleClose={closeLanguageModal}
      >
        <ModalContent>
          {general.brandLanguage &&
            general.brandLanguage.map((item, index) => {
              return (
                <Buttons
                  key={index}
                  onClick={() => {
                    i18n.changeLanguage(item.culturecode);
                    closeLanguageModal();
                  }}
                >
                  {i18n.t("lang." + item.culturecode)}
                </Buttons>
              );
            })}
        </ModalContent>
      </WapModal>
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    general: state.general,
  };
};

export default connect(mapStateToProps, null)(Variant4);
