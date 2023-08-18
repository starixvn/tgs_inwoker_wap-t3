import { Grid } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import i18n from "../../../utils/i18n";
import config from "../../../config/config";
import IMHandler from "../Main/Support/IMHandler";
import { UiService } from "../../../api-services/services/UiService";
const MaintenanceBg = styled.div`
  z-index: 10;
  overflow-y: scroll;
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  background: url(${process.env.PUBLIC_URL +
    `/assets/images/maintenance/maintenance.png`})
    no-repeat;

  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  overflow-y: scroll;
`;

const CustomContainer = styled.div`
  padding: 70px 0px 20px 0px;
  display: flex;
  flex-direction: column;

  justify-content: flex-start;
`;
const Text = styled.div`
  color: white;
  font-size: 30px;

  padding: 5px 40px;
  white-space: pre-wrap;
`;

const Hyperlink = styled.span`
  :focus,
  :active {
    text-decoration: underline;
  }
`;

const Overlay = styled.div`
  position: fixed;
  display: ${({ open }) => {
    return open ? "flex" : "none";
  }};
  width: 100vw;
  justify-content: center;
  align-items: center;
  height: 100vh;
  top: 0;
  bottom: 0;
  padding: 80px;
`;

const OverlayContent = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  height: 100%;
  border-radius: 10px;
  background: white;
`;

const OverlayHeader = styled.div`
  background: ${({ theme }) =>
    theme.wapPrimary ? theme.wapPrimary : theme.primary};
  color: white;
  padding: 20px;
  font-size: 28px;
  display: flex;
  justify-content: space-between;
`;

const OverlayBody = styled.div`
  display: grid;
  grid-template-columns: 50% 50%;
`;

const IMWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-size: 32px;
  padding: 20px;
`;

const Icon = styled.div`
  width: 150px;
  height: 150px;

  background: ${({ icon }) => {
    return `url(${
      process.env.PUBLIC_URL + "/assets/images/icon/" + icon
    }) no-repeat center /
    contain;`;
  }};
`;
const ButtonContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding-left: 40px;
  gap: 20px;
`;
const Button = styled.div`
  color: white;
  font-size: 30px;
  background: ${({ theme }) => {
    return theme.primary;
  }};
  color: #fff;
  padding: 10px;
  border-radius: 50px;
  width: max-content;
  min-width: 200px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const AnotherButton = styled(Button)`
  color: ${({ theme }) => {
    return theme.primary;
  }};
  background: none;
  border: solid 1px
    ${({ theme }) => {
      return theme.primary;
    }};
`;

const SMType = styled.div`
  padding: 5px 0px;
  font-weight: bold;
`;

const TheText = styled.div`
  font-size: 20px;
`;

const TextContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const Maintenance = (props) => {
  function csClick() {
    props.GetSupportUrl("", "", "", "");
  }

  const maintenanceImageSwitcher = (template) => {
    switch (template) {
      case 8:
      case "8":
        return "maintenance-new";
      default:
        return "maintenance";
    }
  };

  const [open, setOpen] = useState(false);
  const [imList, setIMList] = useState([]);

  const [beginTime, setBeginTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [content, setContent] = useState("");
  const [isFailed, setFailed] = useState(false);
  useEffect(() => {
    props.brandComm().then((e) => {
      if (e.IsSuccess) {
        setIMList(e.data);
      }
    });

    UiService.GetMaintenance().then((result) => {
      if (result.IsSuccess) {
        if (result.data) {
          if (result.data.beginTime) {
            setBeginTime(result.data.beginTime);
          }
          if (result.data.beginTime) {
            setEndTime(result.data.endTime);
          }
          if (result.data.content) {
            setContent(result.data.content);
          }
        }
      } else {
        setFailed(true);
      }
    });
  }, []);
  const handleCSClick = (userid, name = "", question, email = "") => {
    props.GetSupportUrl("", "", "");
  };

  useEffect(() => {
    if (!props.isMaintenance) {
      props.appHistory.push("/");
    }
  });

  const formatTime = (isoString) => {
    var newDate = new Date(isoString);
    var hours = newDate.getHours();
    var minutes = newDate.getMinutes();
    var ampm = hours >= 12 ? "PM" : "AM";
    hours = hours % 12;
    hours = hours ? hours : 12;
    hours = hours < 10 ? "0" + hours : hours;
    minutes = minutes < 10 ? "0" + minutes : minutes;
    var strTime = hours + ":" + minutes + " " + ampm;
    return strTime;
  };

  const Api = () => {
    return (
      <TextContainer>
        <Text>
          {i18n.t("common.maintenance")}: <br />
          {beginTime} ~ {endTime} (GMT+8){" "}
        </Text>
        <Text
          style={{ color: "#fff" }}
          dangerouslySetInnerHTML={{
            __html: content,
          }}
        />
      </TextContainer>
    );
  };

  const Local = ({ beginTime, endTime }) => {
    return (
      <>
        <Text>我们现正维护中，请稍后再试。 </Text>
        <Text>
          如您有任何问题，请
          <Hyperlink onClick={csClick}>联系客服</Hyperlink>。
        </Text>
        {(() => {
          if (i18n.language === "vi-VN") {
            return (
              <React.Fragment>
                <Text>
                  Chúng tôi hiện đang được bảo trì, vui lòng thử lại sau.
                </Text>
              </React.Fragment>
            );
          }
        })()}
        <Text>
          We are currently under maintenance, <br /> please try again later.
        </Text>
        <Text>
          If you have any questions, <br />
          please contact our{" "}
          <Hyperlink onClick={csClick}>customer service</Hyperlink>.
        </Text>
      </>
    );
  };

  return (
    <MaintenanceBg image={maintenanceImageSwitcher(config.wapVersion)}>
      <CustomContainer container justify="center" alignItems="center">
        {isFailed ? (
          <Local />
        ) : content ? (
          <Api />
        ) : (
          <Local beginTime={beginTime} endTime={endTime} />
        )}
      </CustomContainer>{" "}
      <ButtonContainer>
        <AnotherButton
          onClick={() => {
            handleCSClick();
          }}
        >
          {i18n.t("support.online")}
        </AnotherButton>
        {(() => {
          if (imList.length > 0) {
            return (
              <Button
                onClick={() => {
                  setOpen(true);
                }}
              >
                {i18n.t("panel.im")}
              </Button>
            );
          }
        })()}
      </ButtonContainer>
      <Overlay open={open}>
        <OverlayContent>
          <OverlayHeader>
            <div>{i18n.t("panel.im")}</div>
            <div
              onClick={() => {
                setOpen(false);
              }}
            >
              ✖
            </div>
          </OverlayHeader>
          <OverlayBody>
            {imList.map((data, index) => {
              return (
                <IMWrapper
                  onClick={() => {
                    IMHandler(data.type, data.phone);
                    // props.alert('', i18n.t('affiliate.copied'))
                  }}
                >
                  <Icon icon={`${data.type}.png`} />
                  <SMType>{data.type}</SMType>
                  <TheText style={{ textAlign: "center" }}>
                    {i18n.t("common.phoneNumber")}: {data.phone}
                  </TheText>
                  <TheText>ID: {data.appid}</TheText>
                </IMWrapper>
              );
            })}
          </OverlayBody>
        </OverlayContent>
      </Overlay>
    </MaintenanceBg>
  );
};

export default Maintenance;
