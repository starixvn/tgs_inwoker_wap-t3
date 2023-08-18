import React, { useState, useEffect } from "react";
import styled from "styled-components";
import i18n from "../../../utils/i18n";
import { Dialog } from "@material-ui/core";
import config from "../../../config/config";
import QRCode from "react-qr-code";
import { utility } from "../../../utils/utility";
import Header from "../Share/Header";
import { AppHistory } from "../../../history/History";

const Container = styled.div`
  width: 100%;
  padding: 110px 0;
  height: 100vh;
  position: relative;
  background: url(${({ language }) => {
      return process.env.PUBLIC_URL + `/assets/images/download/bg.jpg`;
    }})
    no-repeat;
  background-size: cover;
  position: relative;
  display: flex;
  justify-content: center;
`;

const ContentPlacedHere = styled.div`
  position: relative;
  overflow: auto;
`;

const TheFirstSection = styled.div`
  margin-top: 10px;
  display: flex;
  min-height: 150px;
  justify-content: center;
`;

const SectionContentItem = styled.div`
  padding-left: 15px;
`;

const InstallationGuideButton = styled.div`
  color: #fff;
  background: #cf2029;
  border-radius: 75px;
  padding: 10px 40px;
  font-size: 30px;
  cursor: pointer;
  user-select: none;
`;

const Text = styled.div`
  font-size: 40px;
  color: #fff;
`;

const Icons = styled.div`
  width: 60px;
  height: 60px;

  background: #fff;
  mask: url(${({ icon }) => {
      return (
        process.env.PUBLIC_URL + `/assets/images/download/icons/${icon}.png`
      );
    }})
    no-repeat center / contain;
  background-size: 100%;
`;

const CustomModal = styled(Dialog)`
  .MuiBackdrop-root {
  }

  .MuiDialog-paper {
    min-width: 80vw;
    color: #fff;

    border-radius: 16px;
    background: #000326;
    min-height: 200px;
  }
`;

const DialogTitle = styled.div`
  background: #000326;
  min-height: 50px;
  display: flex;
  align-items: center;
  padding: 20px 30px;
  font-size: 40px;
  font-weight: bold;
  justify-content: space-between;
`;

const DialogContent = styled.div`
  padding: 40px;
  font-size: 40px;
`;

const DialogTitle2 = styled(DialogTitle)`
  background: #000326;
  color: white;
`;

const CloseButton = styled.div`
  cursor: pointer;
  position: absolute;
  right: 30px;
`;

const DeviceGuide = styled.div`
  padding-bottom: 20px;
`;

const DownloadSection = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  width: 700px;
  align-items: flex-end;
  padding-right: 125px;
`;

const QRCodeContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 20px;
  align-items: center;
`;

const DeviceText = styled.div`
  padding: 20px 0px;
  font-size: 30px;
  color: #fff;
`;

const QRCodeHolder = styled.div`
  height: 240px;
  width: 240px;
  padding: 30px;
  background: #fff;
  border-radius: 20px;
  border: solid 1px rgba(0, 0, 0, 0.5);
`;

const DownloadButton = styled.div`
  color: #fff;
  background: #cf2029;
  border-radius: 75px;
  padding: 10px 40px;
  cursor: pointer;
  font-size: 30px;
  user-select: none;
  min-width: 100px;
  text-align: center;
`;

const TheGuide = styled.div`
  display: flex;
  justify-content: center;
  padding: 50px 0;
`;

const PointlessShit = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
  margin-bottom: 10px;
`;

const HiddenDialogContainer = styled.div`
  display: flex;
  justify-content: center;
`;

const DeviceName = styled.div`
  font-weight: bold;
`;

const Links = styled.div`
  opacity: 0.75;
  font-size: 24px;
  cursor: pointer;
`;

const FirstPart = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  justify-content: center;
  align-items: center;
`;

const IconsContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 30px;
`;

const Download = ({ alert }) => {
  const [open, setOpen] = useState(false);
  const [download, setDownload] = useState([]);

  const [pointlessDialog, setPointlessDialog] = useState(false);

  function getJsonData() {
    return fetch(
      "https://app12.s3.ap-east-1.amazonaws.com/version_" +
        config.brand +
        ".json"
    )
      .then((response) => response.json())
      .then((responseJson) => {
        setDownload(responseJson);
      })
      .catch((error) => {
        console.error(error);
      });
  }
  function copyStupidLink(link) {
    alert("", i18n.t("pointless.copy"));
    utility.copy(link);
  }

  useEffect(() => {
    if (download.length === 0) {
      getJsonData();
    } else {
    }
  }, []);

  function logoSwitcher(brand) {
    switch (brand) {
      case "Atinbet":
      case "PB2":
        return "Atinbet";
      default:
        return "PB";
    }
  }
  const handleBackClick = () => {
    AppHistory.push("/main/profile");
  };

  const fakeData = [
    {
      link: "https://google.com",
      platform: "android",
    },
    {
      link: "https://google.com",
      platform: "ios",
    },
    {
      link: "https://google.com",
      platform: "android",
    },
  ];

  return (
    <Container language={i18n.language}>
      <Header
        token={null}
        balance={0}
        background={true}
        onBackClick={handleBackClick}
        title={i18n.t("common.download")}
      ></Header>
      <ContentPlacedHere>
        <TheFirstSection>
          <FirstPart>
            <Text style={{ display: "flex", alignItems: "center", gap: 30 }}>
              <Icons icon="support" />
              {i18n.t("download.supported")}
            </Text>
            <IconsContainer>
              <Icons icon="android" /> <Icons icon="ios" />
            </IconsContainer>
          </FirstPart>
        </TheFirstSection>
        <TheGuide>
          <SectionContentItem>
            <InstallationGuideButton
              onClick={() => {
                setOpen(true);
              }}
            >
              {i18n.t("download.openGuide")}
            </InstallationGuideButton>
          </SectionContentItem>
        </TheGuide>
        <DownloadSection>
          {download.map((data, index) => {
            return (
              <QRCodeContainer>
                <QRCodeHolder>
                  <QRCode value={data.link} size="180" />
                </QRCodeHolder>
                <DeviceText>{data.platform}</DeviceText>
                <DownloadButton
                  onClick={() => {
                    window.open(data.link, "_blank");
                  }}
                >
                  {i18n.t("download.title")}
                </DownloadButton>
              </QRCodeContainer>
            );
          })}
        </DownloadSection>{" "}
        <HiddenDialogContainer>
          {config.features.Download_PointlessDialog && (
            <>
              <QRCodeContainer>
                <QRCodeHolder style={{ padding: 0, marginBottom: 20 }}>
                  <img
                    src={
                      process.env.PUBLIC_URL +
                      `/assets/images/download/brand/${logoSwitcher(
                        config.brand
                      )}_logo.png`
                    }
                    style={{ width: 200 }}
                    alt="pointless download section"
                  />
                </QRCodeHolder>
                <DownloadButton
                  onClick={() => {
                    setPointlessDialog(true);
                  }}
                >
                  {i18n.t("pointless.link")}
                </DownloadButton>
              </QRCodeContainer>
              <CustomModal
                maxWidth="md"
                open={pointlessDialog}
                onClose={() => {
                  setPointlessDialog(false);
                }}
              >
                <DialogTitle2>
                  <div>{i18n.t("pointless.download")}</div>
                  <CloseButton
                    onClick={() => {
                      setPointlessDialog(false);
                    }}
                  >
                    ✖
                  </CloseButton>
                </DialogTitle2>
                <DialogContent>
                  {download.map((data, index) => {
                    return (
                      <PointlessShit>
                        <DeviceName>{data.platform}</DeviceName>
                        <Links
                          onClick={() => {
                            copyStupidLink(data.link);
                          }}
                        >
                          {data.link}
                        </Links>
                      </PointlessShit>
                    );
                  })}
                </DialogContent>
              </CustomModal>
            </>
          )}
        </HiddenDialogContainer>
      </ContentPlacedHere>
      <CustomModal
        open={open}
        onClose={() => {
          setOpen(false);
        }}
        maxWidth="md"
      >
        <DialogTitle2>
          <div>{i18n.t("download.openGuide")}</div>
          <CloseButton
            onClick={() => {
              setOpen(false);
            }}
          >
            ✖
          </CloseButton>
        </DialogTitle2>
        <DialogContent>
          <DeviceGuide>
            {i18n.t("download.iphone.title")} <br />
            {i18n.t("download.iphone.point1")} <br />
            {i18n.t("download.iphone.point2")} <br />
          </DeviceGuide>
          <DeviceGuide>
            {i18n.t("download.android.title")} <br />
            {i18n.t("download.android.point1")} <br />
            {i18n.t("download.android.point2")} <br />
          </DeviceGuide>
        </DialogContent>
      </CustomModal>
    </Container>
  );
};

export default Download;
