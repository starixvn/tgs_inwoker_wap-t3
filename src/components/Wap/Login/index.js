import React, { Component } from "react";
import { connect } from "react-redux";
import styled from "styled-components";
import { withRouter } from "react-router-dom";
import Checkbox from "@material-ui/core/Checkbox";
import { withStyles } from "@material-ui/core/styles";
import { accountAction } from "../../../api-services/actions/accountAction";
import { generalAction } from "../../../api-services/actions/generalAction";
import { walletAction } from "../../../api-services/actions/walletAction";
import { gameAction } from "../../../api-services/actions/gameAction";
import { inboxAction } from "../../../api-services/actions/inboxAction";
import { AccountService } from "../../../api-services/services/AccountService";
import { GeneralService } from "../../../api-services/services/GeneralService";
import ButtonWap from "../../Share/ButtonWap";
import Loading from "../../Wap/Share/Loading";
import i18n from "../../../utils/i18n";
import config from "../../../config/config";
import { uiAction } from "../../../api-services/actions/uiAction";
import ErrorSwitcher from "../../../utils/ErrorSwitcher";
import LoginTemplateSwitcher from "./template";

const Container = styled.div`
  z-index: 10;
  width: 100%;
  height: 100%;
  position: absolute;
  overflow: auto;
  top: 0;

  background-size: 100%;
  background: ${({ theme }) => theme.loginBody};
`;

const ContentWrap = styled.div`
  position: absolute;
  top: 0;
  z-index: 1;
  width: 750px;
  padding-bottom: 60px;
`;

const Version = styled.div`
  position: fixed;
  bottom: 5px;
  right: 5px;
  color: ${({ theme }) => theme.loginText};
`;

class Login extends Component {
  state = {
    selected: 0,
    isUpdate: false,
    hidePassword: true,
    hideConfirmPassword: true,
    username: "",
    password: "",
    phone: "",
    areaCode: config.features.PhonePrefix,
    withPromo:
      config.affiliateId === "" &&
      localStorage.getItem("promotionId") === "" &&
      !localStorage.getItem("promotionId")
        ? false
        : true,
    promoId:
      config.affiliateId !== ""
        ? config.affiliateId
        : localStorage.getItem("promotionId"),

    promotionChannelId: localStorage.getItem("promotionChannelId"),
    withdrawalPassword: "",
    confirmWithdrawalPassword: "",
    confirmPassword: "",
    tnc: false,
    rememberMe: false,
    loading: false,
    code: "",
    countdown: 0,
    securityKey: "",
    upper: localStorage.getItem("upper"),
    promoteType:
      localStorage.getItem("invitationtype") === ""
        ? "a"
        : localStorage.getItem("invitationtype"),
    prefill:
      localStorage.getItem("upper") ||
      localStorage.getItem("promotionId") ||
      localStorage.getItem("invitationtype") !== ""
        ? true
        : false,
    fromCustomDomain: false,
    email: "",
  };

  componentDidMount() {
    if (this.state.areaCode !== config.features.PhonePrefix) {
      this.setState({ ...this.state, areaCode: config.features.PhonePrefix });
    }
    const promotionId = this.props.match.params.promotionid;
    const promotionChannelId = this.props.match.params.promotionchannelid;

    if (this.props.general.brand.hasInvitationCode) {
      this.getInvitationCode();
    }

    if (!isNaN(promotionId) && !isNaN(promotionChannelId)) {
      GeneralService.AffiliateClick(promotionId, promotionChannelId);
    }

    if (this.props.token != null) {
      this.props.appHistory.replace("/main/home");
    } else {
      let urlParams = new URLSearchParams(this.props.location.search);
      if (urlParams.has("do")) {
        const doValue = urlParams.get("do");
        switch (doValue) {
          case "login":
          case "login_auth":
            this.handleChangeSelection(0);
            break;
          case "register":
          case "register_auth":
            this.handleChangeSelection(1);
            break;
          default:
            break;
        }
      } else {
        const username = localStorage.getItem("username");
        const remember = localStorage.getItem("remember");
        if (remember == "true") {
          this.setState({
            ...this.state,
            username: username,
            rememberMe: true,
          });
        } else {
          this.setState({
            ...this.state,
          });
        }
      }
    }
  }
  getInvitationCode = () => {
    this.props.getInvitationCode().then((result) => {
      if (result.IsSuccess && result.data.invitationCode) {
        this.setState({
          ...this.state,
          promoteType: "a",
          promoId: result.data.invitationCode,
          prefill: true,
          fromCustomDomain: true,
        });
      }
    });
  };
  componentDidUpdate(preProps, prevState) {
    if (
      preProps.general.brand.hasInvitationCode !==
        this.props.general.brand.hasInvitationCode &&
      this.props.general.brand.hasInvitationCode === true
    ) {
      this.getInvitationCode();
    }
  }
  handleChangeSelection = (index) => {
    if (this.state.selected !== index) {
      this.setState({
        ...this.state,
        selected: index,
        isUpdate: true,
      });
    }
  };
  handleLoginSuccess = async (token) => {
    let urlParams = new URLSearchParams(this.props.location.search);
    if (urlParams.has("return_url")) {
    }
    var bankInfoAuthentication = null;
    await this.props.getAccountInfo().then((response) => {
      if (response.IsSuccess) {
        bankInfoAuthentication = response.data.bankinfoauthentication;
        if (
          response.data.registercompleted === false &&
          config.features.Register_ShowPhone &&
          config.features.ForcedVerification
        ) {
          if (
            config.features.Register_CustomFlow_IDR &&
            config.features.NavigateToAddCard
          ) {
            if (response.data.phone === null) {
              this.props.history.push({
                pathname: "/profile/phone",
                state: { forced: true },
              });
            } else if (response.data.email === null) {
              this.props.history.push({
                pathname: "/profile/email",
                state: { forced: true },
              });
            } else if (!response.data.registercompleted) {
              this.props.appHistory.replace("/card/add");
            }
          } else {
            this.props.history.push({
              pathname: "/profile/phone",
              state: { forced: true },
            });
          }
        } else {
          if (
            !config.features.Register_CustomFlow_IDR ||
            (config.features.Register_CustomFlow_IDR && bankInfoAuthentication)
          ) {
            this.props.getBalanceList();
            this.props.getMessageList(i18n.language, 1, 99);
            this.props.getBankCardList();
            this.props.getPromotion();
            this.props.getPromotionRouletteCount();
            this.props.getWithdrawalChannel();
          }
          if (this.state.rememberMe === true) {
            localStorage.setItem("remember", true);
            localStorage.setItem("username", this.state.username);
          } else {
            localStorage.removeItem("remember");
            localStorage.removeItem("username");
          }
          if (
            this.state.selected === 1 ||
            this.state.selected === 2 ||
            (config.features.Register_CustomFlow_IDR && !bankInfoAuthentication)
          ) {
            if (config.features.NavigateToAddCard) {
              if (response.data.phone === null) {
                this.props.history.push({
                  pathname: "/profile/phone",
                  state: { forced: true },
                });
              } else if (response.data.email === null) {
                this.props.history.push({
                  pathname: "/profile/email",
                  state: { forced: true },
                });
              } else if (!response.data.registercompleted) {
                this.props.appHistory.replace("/card/add");
              }
            } else {
              this.props.appHistory.replace("/main/home");
            }
          } else {
            this.props.appHistory.replace("/main/home");
          }
        }
      }
    });
  };
  handleBackToHomeClick = () => {
    this.props.appHistory.replace("/main/home");
  };
  handleLoginClick = () => {
    const username = this.state.username;
    const password = this.state.password;
    this.doLogin(username, password);
  };
  doLogin = (username, password) => {
    if (username === "") {
      this.props.alert("", i18n.t("web.login.errorMsg.emptyUsername"));
      return;
    }
    if (username === "") {
      this.props.alert("", i18n.t("web.login.errorMsg.emptyPassword"));
      return;
    }
    this.setState({ ...this.state, loading: true });
    this.props.accountLogin(username, password).then((result) => {
      if (result.IsSuccess) {
        this.handleLoginSuccess(result.data);
      } else {
        if (result.code === 210) {
          this.props.appHistory.push("/banned");
        } else {
          if (result.data.self_control === 1) {
            this.props.showLogin(false);
            this.setState({
              ...this.state,
              expired_time: result.data.expired_time,
              openSelfControlDialog: true,
              openDialog: false,
              loading: false,
            });
          } else {
            this.props.alert("", i18n.t("common.msgInvalidUsername"));
            this.setState({
              ...this.state,

              loading: false,
            });
          }
        }
      }
    });
  };
  doLoginWithHp = async (
    username,
    password,
    phone,
    areacode,
    setPhoneDontCareDuplicate
  ) => {
    this.setState({ ...this.state, loading: true });
    const result = await this.props.accountLogin(username, password);
    if (result.IsSuccess) {
      if (setPhoneDontCareDuplicate) {
        await this.props
          .newRegister("SetPhoneDontCareDuplicate", {
            areacode: areacode,
            phone: phone,
          })
          .then(async (response) => {
            this.handleLoginSuccess(result.data);
          });
      } else {
        this.props
          .newRegister("InitPhone", {
            input: "Init",
            data: {
              areacode: areacode,
              phone: phone,
            },
          })
          .then(async (response) => {
            if (response.IsSuccess) {
              this.props
                .newRegister("InitPhone", {
                  input: "Valid",
                  data: {
                    securitykey: response.data.stepResponse,
                    validatecode: "123456",
                  },
                })
                .then(async (response) => {
                  this.handleLoginSuccess(result.data);
                });
            } else {
              this.handleLoginSuccess(result.data);
            }
          });
      }
    }
  };
  doLoginWithHpEmail = async (username, password, phone, areacode, email) => {
    this.setState({ ...this.state, loading: true });

    const result = await this.props.accountLogin(username, password);
    if (result.IsSuccess) {
      AccountService.NewRegister("InitPhone", {
        input: "Init",
        data: {
          areacode: areacode,
          phone: phone,
        },
      }).then(async (response) => {
        if (response.IsSuccess) {
          AccountService.NewRegister("InitPhone", {
            input: "Valid",
            data: {
              securitykey: response.data.stepResponse,
              validatecode: "123456",
            },
          });
        }
      });

      AccountService.NewRegister("InitMail", {
        input: "Init",
        data: {
          email: email,
        },
      }).then(async (response) => {
        if (response.IsSuccess) {
          AccountService.NewRegister("InitMail", {
            input: "Init",
            data: {
              securitykey: response.data.stepResponse,
              validatecode: "123456",
            },
          });
        }
      });
      this.handleLoginSuccess(result.data);
    }
  };
  performLoginWithPhoneAndEmail = async (
    username,
    password,
    phone,
    areacode,
    email,
    setPhoneDontCareDuplicate
  ) => {
    this.setState({ ...this.state, loading: true });
    const result = await this.props.accountLogin(username, password);
    if (result.IsSuccess) {
      if (setPhoneDontCareDuplicate) {
        await this.props
          .newRegister("SetPhoneDontCareDuplicate", {
            areacode: areacode,
            phone: phone,
          })
          .then(async (response) => {
            if (response.IsSuccess) {
              if (response.data.nextStepType === "SetEmailDontCareDuplicate")
                await this.props.newRegister("SetEmailDontCareDuplicate", {
                  email: email,
                });
            }
          });
      } else {
        await this.props
          .newRegister("InitPhone", {
            input: "Init",
            data: {
              areacode: areacode,
              phone: phone,
            },
          })
          .then(async (response) => {
            if (response.IsSuccess) {
              await this.props
                .newRegister("InitPhone", {
                  input: "Valid",
                  data: {
                    securitykey: response.data.stepResponse,
                    validatecode: "123456",
                  },
                })
                .then(async (response) => {
                  if (response.IsSuccess) {
                    await this.props
                      .newRegister("InitMail", {
                        input: "Init",
                        data: {
                          email: email,
                        },
                      })
                      .then(async (response) => {
                        if (response.IsSuccess) {
                          await this.props.newRegister("InitMail", {
                            input: "Valid",
                            data: {
                              securitykey: response.data.stepResponse,
                              validatecode: "123456",
                            },
                          });
                        }
                      });
                  }
                });
            }
          });
      }
      this.handleLoginSuccess(result.data);
    }
  };
  handleForgotpasswordClick = () => {
    this.props.appHistory.push("/forgot-password");
  };

  handleGoDownloadPage = () => {
    this.props.appHistory.push("/main/download");
  };
  handleUsernameChange = (e) => {
    this.setState({
      ...this.state,
      username: e.target.value,
    });
  };
  handlePasswordChange = (e) => {
    this.setState({
      ...this.state,
      password: e.target.value,
    });
  };
  handleAreaCodeChange = (e) => {
    this.setState({
      ...this.state,
      areaCode: e.target.value,
    });
  };
  handlePhoneChange = (e) => {
    this.setState({
      ...this.state,
      phone: e.target.value,
    });
  };
  handleCodeChange = (e) => {
    this.setState({
      ...this.state,
      code: e.target.value,
    });
  };
  handleConfirmPasswordChange = (e) => {
    this.setState({
      ...this.state,
      confirmPassword: e.target.value,
    });
  };
  handleWithdrawalPasswordChange = (e) => {
    this.setState({
      ...this.state,
      withdrawalPassword: e.target.value,
    });
  };
  handleConfirmWithdrawalPasswordChange = (e) => {
    this.setState({
      ...this.state,
      confirmWithdrawalPassword: e.target.value,
    });
  };
  handlePromoCodeChange = (e) => {
    this.setState({
      ...this.state,
      promoId: e.target.value,
    });
  };

  handleUpperChange = (e) => {
    this.setState({
      ...this.state,
      upper: e.target.value,
    });
  };

  handleEmailChange = (e) => {
    this.setState({
      ...this.state,
      email: e.target.value,
    });
  };

  handleToggleShow = () => {
    this.setState({ ...this.state, hidePassword: !this.state.hidePassword });
  };
  handleRememberMeChange = (e) => {
    this.setState({ ...this.state, rememberMe: e.target.checked });
  };
  handleToggleConfirmPasswordShow = () => {
    this.setState({
      ...this.state,
      hideConfirmPassword: !this.state.hideConfirmPassword,
    });
  };

  smsVerification = (securityKey, code) => {
    AccountService.VerifyActivation(securityKey, code).then(
      async (response) => {
        if (response.IsSuccess) {
          this.props.appHistory.replace("/main/home");
        } else {
          this.props.alert("", response.info);
        }
      }
    );
  };

  handleActivationClick = async () => {
    const username = this.state.username;
    const password = this.state.password;
    const code = this.state.code;
    const securityKey = this.state.securityKey;

    var expr = /^[a-zA-Z0-9]{6,16}$/;
    if (!expr.test(username)) {
      this.props.alert("", i18n.t("common.msgRegisterUserNameInvalid"));
      return;
    }
    expr = /^.{6,20}$/;
    if (!expr.test(password)) {
      this.props.alert("", i18n.t("common.msgRegisterPassInvalid"));
      return;
    }

    if (config.features.SkipSMSVerification) {
      const result = await this.props.accountLogin(username, password);
      if (result.IsSuccess) {
        this.props.getAccountInfo();

        AccountService.NewRegister("InitPhone", {
          input: "Init",
          data: {
            areacode: this.state.areaCode,
            phone: this.state.phone,
          },
        }).then(async (response) => {
          if (response.IsSuccess) {
            this.smsVerification(securityKey, "123456");
          } else {
            this.props.alert("", response.info);
          }
        });
      }
    } else {
      var exprx = /^[a-zA-Z0-9]{6}$/;
      if (!exprx.test(code)) {
        this.props.alert("", i18n.t("common.msgEnterCode"));
        return;
      }
      this.smsVerification(securityKey, code);
    }
  };

  handleSwitchType = (e) => {
    this.setState({
      ...this.state,
      promoteType: e.target.value,
      upper: "",
      promoId: "",
    });
  };

  handleGetCodeClick = async () => {
    const username = this.state.username;
    const password = this.state.password;

    const countdown = this.state.countdown;
    const areacode = this.state.areaCode;
    const phone = this.state.phone;

    var result = null;

    if (countdown <= 0) {
      var expr = /^[a-zA-Z0-9]{6,16}$/;
      if (!expr.test(username)) {
        this.props.alert("", i18n.t("common.msgRegisterUserNameInvalid"));
        return;
      }
      var expr = /^.{6,20}$/;
      if (!expr.test(password)) {
        this.props.alert("", i18n.t("common.msgRegisterPassInvalid"));
        return;
      }

      var expr = new RegExp(
        `^[0-9]{8,${config.features.MAX_PHONE_LENGTH || 10}}`
      );
      if (!expr.test(phone)) {
        this.props.alert(
          "",
          i18n
            .t("common.noReachMin")
            .replace(/{maxlength}/g, config.features.MAX_PHONE_LENGTH || 10)
        );
        return;
      }
      // if(!isLoggedIn)
      // {
      result = await AccountService.Login(username, password);
      // }
      if (result !== null && result.IsSuccess /*|| isLoggedIn*/) {
        AccountService.NewRegister("InitPhone", {
          input: "Init",
          data: {
            areacode: areacode,
            phone: phone,
          },
        }).then(async (response) => {
          if (response.IsSuccess) {
            this.props.alert("", i18n.t("common.msgTokenSent"));
            this.setState({
              ...this.state,
              countdown: 60,
              securitykey: response.data.stepResponse,
            });
            this.checkCountdown();
          } else {
            this.props.alert("", response.info);
          }
        });
      }
    }
  };
  timer = null;
  checkCountdown = () => {
    if (this.state.countdown > 0) {
      this.timer = setTimeout(() => {
        this.setState({ ...this.state, countdown: this.state.countdown - 1 });
        this.checkCountdown();
      }, 1000);
    }
  };
  handleTncClick = (e) => {
    this.setState({
      ...this.state,
      tnc: !this.state.tnc,
    });
  };
  handleRegisterClick = () => {
    const username = this.state.username;
    const password = this.state.password;
    const phone = this.state.phone;
    const areaCode = this.state.areaCode;
    const confirmPassword = this.state.confirmPassword;
    const email = this.state.email;
    const promotion_id = this.state.promoId;
    const upper = this.state.upper;
    const tnc = this.state.tnc;

    var expr = /^[a-zA-Z0-9]{6,16}$/;
    if (!expr.test(username)) {
      this.props.alert("", i18n.t("common.msgRegisterUserNameInvalid"));
      return;
    }
    var expr = /^.{6,20}$/;
    if (!expr.test(password)) {
      this.props.alert("", i18n.t("common.msgRegisterPassInvalid"));

      return;
    }

    if (password !== confirmPassword) {
      this.props.alert("", i18n.t("common.msgRegisterPassMatchInvalid"));

      return;
    }

    var expr = new RegExp(
      `^[0-9]{8,${config.features.MAX_PHONE_LENGTH || 10}}`
    );
    if (config.features.Register_ShowPhone) {
      if (!expr.test(phone)) {
        this.props.alert(
          "",
          i18n
            .t("common.noReachMin")
            .replace(/{maxlength}/g, config.features.MAX_PHONE_LENGTH || 10)
        );
        return;
      }
    }
    var expr =
      /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    if (config.features.Register_ShowEmail) {
      if (!expr.test(email)) {
        this.props.alert("", i18n.t("common.msgInvalidEmail"));

        return;
      }
    }

    if (tnc) {
      this.setState({ ...this.state, loading: true });

      this.props
        .register(username, password, confirmPassword, promotion_id, upper)
        .then(async (response) => {
          if (response.IsSuccess && response.data.isnew === false) {
            this.props.alert("", i18n.t("common.msgAlreadyExist"));
            this.setState({ ...this.state, loading: false });
          } else if (response.IsSuccess) {
            if (config.features.SMSVerification) {
              this.setState({
                ...this.state,
                selected: 2,
                loading: false,
              });
            } else if (
              config.features.Register_ShowPhone &&
              config.features.Register_ShowEmail
            ) {
              this.doLoginWithHpEmail(
                username,
                password,
                phone,
                areaCode,
                email
              );
            } else if (config.features.Register_ShowPhone) {
              this.doLoginWithHp(username, password, phone, areaCode);
            } else {
              this.doLogin(username, password);
            }
          } else {
            this.props.alert("", response.info);
            this.setState({ ...this.state, loading: false });
          }
        });
    } else {
      this.props.alert("", i18n.t("common.msgRegisterTermAndCondition"));
    }
  };

  performNewRegister = async () => {
    const username = this.state.username;
    const password = this.state.password;
    const phone = this.state.phone;
    const areaCode = this.state.areaCode;
    const confirmPassword = this.state.confirmPassword;
    const email = this.state.email;
    const tnc = this.state.tnc;
    var expr = /^[a-zA-Z0-9]{6,16}$/;
    if (!expr.test(username)) {
      this.props.alert("", i18n.t("common.msgRegisterUserNameInvalid"));
      return;
    }
    var expr = /^.{6,20}$/;
    if (!expr.test(password)) {
      this.props.alert("", i18n.t("common.msgRegisterPassInvalid"));

      return;
    }

    if (password !== confirmPassword) {
      this.props.alert("", i18n.t("common.msgRegisterPassMatchInvalid"));

      return;
    }
    var expr = new RegExp(
      `^[0-9]{8,${config.features.MAX_PHONE_LENGTH || 10}}`
    );
    if (config.features.Register_ShowPhone) {
      if (!expr.test(phone)) {
        this.props.alert(
          "",
          i18n
            .t("common.noReachMin")
            .replace(/{maxlength}/g, config.features.MAX_PHONE_LENGTH || 10)
        );
        return;
      }
    }
    var expr =
      /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    if (config.features.Register_ShowEmail) {
      if (!expr.test(email)) {
        this.props.alert("", i18n.t("common.msgInvalidEmail"));

        return;
      }
    }

    if (tnc === false) {
      this.props.alert("", i18n.t("common.msgRegisterTermAndCondition"));
    }

    if (tnc) {
      this.setState({ ...this.state, loading: true });
      this.props
        .newRegister("CreatePlayer", {
          username: username,
          pwd: password,
          upper: this.state.upper,
          invitationcode: this.state.promoId,
        })
        .then(async (response) => {
          if (
            response.IsSuccess &&
            response.data.stepResponse.isnew === false
          ) {
            this.props.alert("", i18n.t("common.msgAlreadyExist"));
            this.setState({ ...this.state, loading: false });
          } else if (response.IsSuccess) {
            let setPhoneDontCareDuplicate =
              response.data.nextStepType === "SetPhoneDontCareDuplicate";

            if (config.features.SMSVerification) {
              this.setState({
                ...this.state,
                selected: 2,
                loading: false,
              });
            } else if (
              config.features.Register_ShowPhone &&
              config.features.Register_ShowEmail
            ) {
              this.performLoginWithPhoneAndEmail(
                username,
                password,
                phone,
                areaCode,
                email,
                setPhoneDontCareDuplicate
              );
            } else if (config.features.Register_ShowPhone) {
              this.doLoginWithHp(
                username,
                password,
                phone,
                areaCode,
                setPhoneDontCareDuplicate
              );
            } else {
              this.doLogin(username, password);
            }
          } else {
            this.props.alert("", response.info);
            this.setState({ ...this.state, loading: false });
          }
        });
    }
  };

  handleChangeLanguage = (lang) => {
    i18n.changeLanguage(lang.culturecode);
    this.props.getBanner();
    this.props.getMarquee(lang.culturecode);
    this.props.getAnnouncement(lang.culturecode);

    //trigger setstate after 3second

    GeneralService.GetLocalization().then((response) => {
      if (response.IsSuccess) {
        ErrorSwitcher.setTranslation(response.data);
      }
    });
  };

  render() {
    return (
      <Container selected={this.state.selected}>
        <ContentWrap>
          <LoginTemplateSwitcher
            template={config.wapVersion}
            logoImg={
              this.props.general.brand && this.props.general.brand.mobileLogoUrl
            }
            handleChangeSelection={this.handleChangeSelection}
            isUpdate={this.state.isUpdate}
            selected={this.state.selected}
            username={this.state.username}
            password={this.state.password}
            hidePassword={this.state.hidePassword}
            rememberMe={this.state.rememberMe}
            hideConfirmPassword={this.state.hideConfirmPassword}
            confirmPassword={this.state.confirmPassword}
            areaCode={this.state.areaCode}
            phone={this.state.phone}
            email={this.state.email}
            fromCustomDomain={this.state.fromCustomDomain}
            promoteType={this.state.promoteType}
            promoId={this.state.promoId}
            upper={this.state.upper}
            prefill={this.state.prefill}
            tnc={this.state.tnc}
            code={this.state.code}
            countdown={this.state.countdown}
            handleToggleShow={this.handleToggleShow}
            handleUsernameChange={this.handleUsernameChange}
            handlePasswordChange={this.handlePasswordChange}
            handleRememberMeChange={this.handleRememberMeChange}
            handleForgotpasswordClick={this.handleForgotpasswordClick}
            handleLoginClick={this.handleLoginClick}
            handleBackToHomeClick={this.handleBackToHomeClick}
            handleChangeLanguage={this.handleChangeLanguage}
            handleGoDownloadPage={this.handleGoDownloadPage}
            handleToggleConfirmPasswordShow={
              this.handleToggleConfirmPasswordShow
            }
            handleConfirmPasswordChange={this.handleConfirmPasswordChange}
            handleAreaCodeChange={this.handleAreaCodeChange}
            handlePhoneChange={this.handlePhoneChange}
            handleEmailChange={this.handleEmailChange}
            handlePromoCodeChange={this.handlePromoCodeChange}
            handleUpperChange={this.handleUpperChange}
            handleSwitchType={this.handleSwitchType}
            handleTncClick={this.handleTncClick}
            handleRegisterClick={this.performNewRegister}
            handleCodeChange={this.handleCodeChange}
            handleGetCodeClick={this.handleGetCodeClick}
            handleActivationClick={this.handleActivationClick}
            brandLanguage={this.props.general.brandLanguage}
            haveAffiliate={this.props.general.haveAffiliate}
          ></LoginTemplateSwitcher>
        </ContentWrap>

        <Version>
          Version {process.env.REACT_APP_VERSION} (
          {process.env.REACT_APP_CUSTOM_NODE_ENV})
        </Version>
        <Loading show={this.state.loading}></Loading>
      </Container>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    screenHeight: state.ui.screenHeight,
    token: state.account.token,
    mobilePrefix: state.general.mobilePrefix,
    general: state.general,
    account: state.account,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getBanner: () => dispatch(generalAction.getBanner()),
    getMarquee: (language) => dispatch(uiAction.getMarquee(language)),
    getAnnouncement: (language) => dispatch(uiAction.getAnnouncement(language)),
    closeModal: () => {
      dispatch({ type: "close" });
    },
    accountLogin: (username, password) =>
      dispatch(accountAction.accountLogin(username, password)),
    getAccountInfo: (token) => dispatch(accountAction.getAccountInfo(token)),
    checkGame: () => dispatch(accountAction.checkGame()),
    getAccountProfile: (token, showVip) =>
      dispatch(accountAction.getAccountProfile(token, showVip)),
    register: (username, pwd, confirmpwd, invitationcode, upper) =>
      dispatch(
        accountAction.registerAccount(
          username,
          pwd,
          confirmpwd,
          invitationcode,
          upper
        )
      ),
    getDepositChannel: () => dispatch(walletAction.getDepositChannel()),
    getBalanceList: (token) => dispatch(walletAction.getBalanceList()),
    getIDCardNo: () => dispatch(accountAction.getIDCardNo()),
    getHomePageGameList: () => dispatch(gameAction.getHomePageGameList()),
    getInviteLink: () => dispatch(accountAction.getInviteLink()),
    getMessageList: (language, pages, limit) =>
      dispatch(inboxAction.getMessages(language, pages, limit, true, true)),
    getBankCardList: () => dispatch(walletAction.getBankCardList()),
    getInvitationCode: () => dispatch(generalAction.getInvitationCode()),
    getPlayerPromotionList: (language) =>
      dispatch(
        generalAction.getPlayerPromotionList(language, 1, 99, true, "", true)
      ),
    getWithdrawalChannel: () => {
      dispatch(walletAction.getWithdrawalChannel());
    },
    getPromotion: () => dispatch(generalAction.getPromotion()),
    newRegister: (type, input) =>
      dispatch(accountAction.newRegister(type, input)),
    getPromotionRouletteCount: () =>
      dispatch(generalAction.getPromotionRouletteCount()),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Login));
