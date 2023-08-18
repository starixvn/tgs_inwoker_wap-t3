import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { connect } from "react-redux";
import i18n from "../../../../utils/i18n";
import QRCode from "react-qr-code";
import { Dialog } from "@material-ui/core";
import { generalAction } from "../../../../api-services/actions/generalAction";
import config from "../../../../config/config";
import IMHandler from "./IMHandler";
import Header from "../../Share/Header";
import PageTitle from "../../components/pagetitle";
import { AppHistory } from "../../../../history/History";

const ButtonContainer = styled.div`
  display: grid;
  grid-template-columns: auto;
  padding-bottom: 100px;
`;

const TheSupportButton = styled.div`
  margin: 10px 20px;
  color: #fff;
  background: #212237;
  height: 100px;
  border-radius: 10px;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1),
    0 2px 4px -1px rgba(0, 0, 0, 0.06);
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0px 20px;
  border-radius: ${({ theme }) => {
    return theme.wapBorderRadius ? theme.wapBorderRadius : "50px";
  }};
  font-size: 30px;
`;

const TheRedText = styled.div`
  color: ${({ theme }) =>
    theme.customButtonText
      ? theme.customButtonText
      : theme.wapPrimary
      ? theme.wapPrimary
      : theme.primary};
  background: ${({ theme }) => {
    return theme.primary;
  }};
  padding: 10px 20px;
  border-radius: ${({ theme }) => {
    return theme.wapBorderRadius ? theme.wapBorderRadius : "50px";
  }};
`;
const TitleHeader = styled.div`
  background: ${({ theme }) =>
    theme.wapPrimary ? theme.wapPrimary : theme.primary};
  height: 90px;
  display: flex;
  align-items: center;
`;

const BackButton = styled.div`
  background: url(${process.env.PUBLIC_URL +
    `/assets/images/wapp/btn-back-white.png`})
    no-repeat center;
  width: 80px;
  height: 90px;
  z-index: 1;
`;
const Background = styled.div`
  min-height: 100%;
`;

const QRTitle = styled.div`
  width: calc(100%);
  margin-left: -80px;
  text-align: center;
  color: white;
  font-size: 34px;
`;

const QRCodeContainer = styled.div`
  min-height: 300px;
  display: grid;
  grid-template-columns: auto;
  padding: 30px;
`;

const QRCodeHolder = styled.div`
  margin: 50px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const QRCodeText = styled.div`
  padding: 10px 0px;
  font-weight: bold;
  font-size: 34px;
`;

const IDText = styled.div`
  font-size: 24px;
`;

const CustomDialog = styled(Dialog)`
  .MuiDialog-paper {
    background: #000326;
    color: #fff;
    border-radius: 30px;
  }
`;

const iconSwitcher = (icon) => {
  switch (icon) {
    case "WeChat":
      return "support-wechat.svg";
    case "Line":
      return "support-line.svg";
    case "Telegram":
      return "support-telegram.svg";
    case "Skype":
      return "support-skype.svg";
    case "KakaoTalk":
      return "support-kakaotalk.svg";
    case "Viber":
      return "support-viber.svg";
    case "WhatsApp":
      return "support-whatsapp.svg";
    case "Zalo":
      return "support-zalo.svg";
    case "copy":
      return "copy.png";
    default:
      return "support-call.svg";
  }
};

const IconTextContainer = styled.div`
  display: flex;
  flex: 1;
  align-items: center;
`;

const Icon = styled.div`
  width: 60px;
  height: 60px;
  margin-right: 20px;
  background-color: ${({ theme }) =>
    theme.wapPrimary ? theme.wapPrimary : theme.primary};
  mask: ${({ icon }) => {
    return `url(${
      process.env.PUBLIC_URL + "/assets/images/wapp/" + iconSwitcher(icon)
    }) no-repeat center /
    contain;`;
  }};
`;

const QRCodeImage = styled.img`
  height: 350px;
  width: 350px;
`;

const Support = (props) => {
  const [scene, setScene] = useState("initial");

  useEffect(() => {
    setScene("initial");
  }, []);

  const InitialScene = () => {
    const [open, setOpen] = useState("");

    const handleClose = (value) => {
      setOpen(false);
    };

    return (
      <div>
        <Header
          onBackClick={() => {
            AppHistory.goBack();
          }}
          title={i18n.t("common.contactus")}
          position={"sticky"}
          backgroundColor={"transparent"}
        ></Header>
        <PageTitle>{i18n.t("common.customerService")}</PageTitle>

        <ButtonContainer>
          {(config.features.LiveChatVendor ||
            (props.general.livechat.setting &&
              props.general.livechat.setting.url !== undefined)) && (
            <TheSupportButton
              onClick={() => {
                props.GetSupportUrl();
              }}
            >
              <IconTextContainer>
                <Icon icon="wechat" />
                <div>{i18n.t("support.online")}</div>
              </IconTextContainer>
              <TheRedText>{i18n.t("support.contact")}</TheRedText>
            </TheSupportButton>
          )}

          {props.general.brandsSupport.map((data, index) => {
            return (
              <div>
                <TheSupportButton
                  key={index}
                  onClick={() => {
                    if (data.qrcodeurl) {
                      setOpen(index);
                    } else {
                      IMHandler(data.type, data.phone);
                    }
                  }}
                >
                  <IconTextContainer>
                    <Icon icon={data.type} />
                    <div>
                      <div>{data.type}</div>
                    </div>
                  </IconTextContainer>
                  <div>{<TheRedText>{i18n.t("support.join")}</TheRedText>}</div>
                </TheSupportButton>
                <CustomDialog open={open === index} onClose={handleClose}>
                  {data.qrcodeurl ? (
                    <QRCodeHolder>
                      <QRCodeImage src={data.qrcodeurl} />
                      <QRCodeText>{data.type}</QRCodeText>
                    </QRCodeHolder>
                  ) : (
                    <QRCodeHolder>
                      <QRCodeText>{data.type}</QRCodeText>
                      <IDText>ID: {data.appid}</IDText>
                    </QRCodeHolder>
                  )}
                </CustomDialog>
              </div>
            );
          })}
        </ButtonContainer>
      </div>
    );
  };

  const QRScene = ({ back }) => {
    return (
      <Background>
        <TitleHeader>
          <BackButton onClick={back} />
          <QRTitle>{i18n.t("support.qr")}</QRTitle>
        </TitleHeader>
        <QRCodeContainer>
          {props.general.brandsSupport.map((data, index) => {
            return (
              <QRCodeHolder>
                <QRCode size={150} value={data.qrcodeurl} />

                <QRCodeText>{data.type}</QRCodeText>
              </QRCodeHolder>
            );
          })}
        </QRCodeContainer>
      </Background>
    );
  };

  const goBack = () => {
    setScene("initial");
  };

  const switchScene = (scene) => {
    switch (scene) {
      case "initial":
        return <InitialScene />;
      case "qr":
        return <QRScene back={goBack} />;
      default:
        return <InitialScene />;
    }
  };

  return switchScene(scene);
};

const mapDispatchToProps = (dispatch) => {
  return {
    getBrandCommunicationList: (language) =>
      dispatch(generalAction.getBrandCommunication()),
  };
};
const mapStateToProps = (state) => {
  return { general: state.general };
};

export default connect(mapStateToProps, mapDispatchToProps)(Support);
