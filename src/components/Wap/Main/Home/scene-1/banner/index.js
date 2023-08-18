import React from "react";
import Slider from "react-slick";
import styled from "styled-components";
import config from "../../../../../../config/config";
import i18n from "../../../../../../utils/i18n";
import OnlineUserDisplayer from "../../../../../Share/online-user-displayer";
import Marquee from "../../Marquee";

const CustomContainer = styled.div`
  height: 400px;
`;

const SliderContainer = styled.div`
  padding: 10px 10px 10px 10px;
`;

const TheImageWrapper = styled.div`
  ${({ withPadding }) => {
    return (
      withPadding &&
      ` padding: 0px 10px;
  `
    );
  }}
`;

const NoGapContainer = styled.div`
  padding: 0;
`;

const AnnouncementContainer = styled.div`
  display: flex;
  align-items: center;

  position: ${({ up }) => {
    return up ? "" : "absolute";
  }};
  bottom: 0;
`;
const AnnouncementTitle = styled.div`
  ${() => (config.brand === "TIGER" ? `font-size: 24px;` : `font-size: 28px;`)}
  color: ${({ theme }) =>
    theme.wapSecondary ? theme.wapSecondary : theme.secondary};
  font-weight: bold;
  display: flex;
  flex: none;
  align-items: center;
`;
const MarqueeContainer = styled.div`
  white-space: nowrap;
  letter-spacing: 1.5px;
  font-size: 21px;
  line-height: 26px;
  overflow: hidden;

  height: 36px;
  border-radius: 17px;
  ${({ hasBackground, theme }) =>
    hasBackground ? ` background: ${theme.wapMarqueeBg}` : ``};
`;

const TheIcon = styled.div`
  width: 80px;
  height: 80px;
  mask: ${({ icon }) => {
    return `url(${icon}) no-repeat center /
  contain;`;
  }};
`;

const AnnounceIcon = styled(TheIcon)`
  background: ${({ sameAsText, theme }) => {
    return sameAsText
      ? theme.primaryText
      : theme.wapPrimary
      ? theme.wapPrimary
      : theme.primary;
  }};
  width: 40px;
  height: 40px;
  margin-right: 10px;
`;

const FixedContainer = styled.div`
  position: fixed;
  top 125px;
  min-height: 390px;
  width: 100vw;
  background: ${({ theme }) => theme.body};
  z-index:2;
`;

const ScrollContainer = styled.div`
  padding-top: ${({ noPadding }) => (noPadding ? "0" : "125px")};
  height: 520px;
  position: relative;
  border-radius: ${({ noBorderRadius }) => (noBorderRadius ? "0" : "20px")};
`;

const NoGapAtAllContainer = styled.div`
  height: 450px;
  padding-top: 50px;
  position: relative;
`;

const NoGapDownContainer = styled.div`
  height: 520px;
  padding-top: 125px;
`;

const NoMarqueeContainer = styled.div`
  padding-top: 125px;
  height: 450px;
  position: relative;
  border-radius: 20px;
`;

const BannerImgs = styled.div`
  background: url(${({ src }) => src}) no-repeat center;
  background-size: cover;
  height: ${({ height }) => (height ? height : "300px")};
  border-radius: ${({ noBorderRadius }) => (noBorderRadius ? "0" : "30px")};
  width: ${(props) => (config.theme.toLowerCase() === "pb" ? "95%" : "100%")};
  margin: auto;
`;
const ATag = styled.a`
  text-decoration: none;
`;

const MarqueeWrapper = styled.div`
  display: grid;
  padding: 0 20px;
  align-items: center;
  grid-template-columns: 125px auto auto auto;
  padding-bottom: 10px;
`;

const ButtonContainer = styled.div`
  display: flex;
  gap: 10px;
  padding: 0px 20px;
  z-index: 10;
`;

const Button = styled.div`
  padding: 10px 20px;
  font-size: 20px;
  cursor: pointer;
  white-space: nowrap;
  min-width: 105px;
  text-align: center;
  border-radius: 10px;
  ${({ primary, theme }) => {
    return primary
      ? `
  
    background: ${theme.wapPrimary ? theme.wapPrimary : theme.primary};
    color: ${theme.primaryText};
    `
      : `
      border: solid 1px ${theme.wapPrimary ? theme.wapPrimary : theme.primary}; 
      color:  ${theme.wapPrimary ? theme.wapPrimary : theme.primary}; 
    `;
  }}
`;

const settings = {
  dots: false,
  className: "center",
  centerMode: true,
  infinite: true,
  centerPadding: "0",
  slidesToShow: 1,
  speed: 500,
  arrows: false,
  autoplay: true,
};
const Banner = React.memo(
  ({ updown, banner, height, sameAsText, appHistory, token, noPadding }) => {
    const SliderWrapper = ({ withPadding, noBorderRadius }) => {
      return (
        <Slider {...settings}>
          {banner.map((data, index) => {
            return (
              <TheImageWrapper withPadding={withPadding}>
                <ATag href={data.navurl} key={index} target="_blank">
                  <BannerImgs
                    noBorderRadius={noBorderRadius}
                    height={height}
                    src={data.mobileurl}
                    alt={data.alt}
                    title={data.alt}
                  />
                </ATag>
              </TheImageWrapper>
            );
          })}
        </Slider>
      );
    };

    function navigateTo(location) {
      if (token) {
        appHistory.push({
          pathname: "/" + location,
        });
      } else {
        appHistory.push({
          pathname: "/login",
        });
      }
    }

    const MarqueeSection = () => {
      return !config.features.HideMarquee ? (
        <MarqueeWrapper>
          {config.features.OnlineUser && (
            <OnlineUserDisplayer size={config.brand === "TIGER" && "24px"} />
          )}
          <AnnouncementTitle>
            <AnnounceIcon
              sameAsText={sameAsText}
              icon={process.env.PUBLIC_URL + `/assets/images/wapp/announce.svg`}
            />
            {!config.features.Wap_DisplayButton && (
              <div>{i18n.t("wap.main.home.profile.announcement")}</div>
            )}
          </AnnouncementTitle>
          <MarqueeContainer>
            <Marquee />
          </MarqueeContainer>

          {config.features.Wap_DisplayButton && (
            <ButtonContainer>
              <Button
                onClick={() => {
                  navigateTo("deposit");
                }}
                primary
              >
                {i18n.t("common.deposit")}
              </Button>
              <Button
                onClick={() => {
                  navigateTo("withdrawal");
                }}
              >
                {i18n.t("common.withdrawal")}
              </Button>
            </ButtonContainer>
          )}
        </MarqueeWrapper>
      ) : (
        <div></div>
      );
    };

    const MarqueeOnlySection = () => {
      return !config.features.HideMarquee ? (
        <MarqueeWrapper>
          <AnnouncementTitle>
            <AnnounceIcon
              sameAsText={sameAsText}
              icon={process.env.PUBLIC_URL + `/assets/images/wapp/announce.svg`}
              style={{ width: "110px", height: "50px" }}
            />
          </AnnouncementTitle>
          <MarqueeContainer hasBackground={true}>
            <Marquee />
          </MarqueeContainer>
        </MarqueeWrapper>
      ) : (
        <div></div>
      );
    };

    const bannerPositionSwitcher = (position, height) => {
      switch (position) {
        case "fixed":
          return (
            <FixedContainer>
              <SliderContainer>
                <SliderWrapper height={height} />
              </SliderContainer>
              <AnnouncementContainer up={false}>
                <MarqueeSection></MarqueeSection>
              </AnnouncementContainer>
            </FixedContainer>
          );
        case "scroll":
          return (
            <ScrollContainer>
              <AnnouncementContainer up={true}>
                <MarqueeSection />
              </AnnouncementContainer>
              <SliderContainer>
                <SliderWrapper height={height} withPadding={true} />
              </SliderContainer>
            </ScrollContainer>
          );
        case "no-gap-down":
          return (
            <NoGapDownContainer>
              <AnnouncementContainer up={true}>
                <MarqueeSection />
              </AnnouncementContainer>
              <NoGapContainer>
                <SliderWrapper height={height} />
              </NoGapContainer>
            </NoGapDownContainer>
          );
        case "no-gap-up":
          return (
            <ScrollContainer>
              <NoGapContainer>
                <SliderWrapper height={height} />
              </NoGapContainer>
              <AnnouncementContainer up={false}>
                <MarqueeSection />
              </AnnouncementContainer>
            </ScrollContainer>
          );
        case "no-gap-at-all":
          return (
            <NoGapAtAllContainer>
              <NoGapContainer>
                <SliderWrapper height={height} />
              </NoGapContainer>
              <AnnouncementContainer up={false}>
                <MarqueeSection />
              </AnnouncementContainer>
            </NoGapAtAllContainer>
          );
        case "down":
          return (
            <CustomContainer>
              <SliderContainer>
                <SliderWrapper height={height} />
              </SliderContainer>
              <AnnouncementContainer up={true}>
                <MarqueeSection />
              </AnnouncementContainer>
            </CustomContainer>
          );
        case "no-marquee":
          return (
            <NoMarqueeContainer>
              <NoGapContainer>
                <SliderWrapper height={height} />
              </NoGapContainer>
              <AnnouncementContainer up={false}></AnnouncementContainer>
            </NoMarqueeContainer>
          );
        case "compact-marquee":
          return (
            <ScrollContainer>
              <NoGapContainer>
                <SliderWrapper height={height} />
              </NoGapContainer>
              <AnnouncementContainer up={false} style={{ bottom: "15px" }}>
                <MarqueeOnlySection />
              </AnnouncementContainer>
            </ScrollContainer>
          );
        case "only-online-user":
          return (
            <ScrollContainer style={{ height: 470 }} noPadding={noPadding}>
              <NoGapContainer>
                <SliderWrapper height={height} />
              </NoGapContainer>
              <AnnouncementContainer
                up={false}
                style={{
                  justifyContent: "center",
                  width: "100%",
                  paddingBottom: 10,
                }}
              >
                <OnlineUserDisplayer color="#fff" />
              </AnnouncementContainer>
            </ScrollContainer>
          );
        case "only-banner":
          return (
            <ScrollContainer
              style={{ height: 300 }}
              noPadding={noPadding}
              noBorderRadius={noPadding}
            >
              <NoGapContainer>
                <SliderWrapper height={height} noBorderRadius={noPadding} />
              </NoGapContainer>
              <AnnouncementContainer
                up={false}
                style={{
                  justifyContent: "center",
                  width: "100%",
                  paddingBottom: 10,
                }}
              ></AnnouncementContainer>
            </ScrollContainer>
          );
        default:
          return "";
      }
    };

    return bannerPositionSwitcher(updown);
  }
);

export default Banner;
