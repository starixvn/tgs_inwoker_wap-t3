import React from "react";
import styled from "styled-components";
import ContentWrapper from "../../contentwrapper";
import i18n from "../../../../../../../../utils/i18n";
import { AppHistory } from "../../../../../../../../history/History";
import Marquee from "../../../../Marquee";
import Banner from "../../../banner";
import config from "../../../../../../../../config/config";

const MarqueeContainer = styled.div`
  background: #181c42;
  padding: 10px;
`;

const UserInformation = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
`;
const AlignItemCenter = styled.div`
  display: flex;
  align-items: center;
`;

const QuickAction = styled(AlignItemCenter)`
  min-height: 175px;
  padding: 20px;
  background: #252958;
`;

const UserContainer = styled(AlignItemCenter)`
  justify-content: center;
  background: #181c42;
`;

const Icons = styled.div`
  height: 80px;
  width: 80px;
  mask: ${({ src }) => {
    return `url(${
      process.env.PUBLIC_URL + `/assets/images/wapp/bottomnav/${src}.svg`
    }) no-repeat center /
    contain;`;
  }};
  background: #ffa200;
`;

const QuickActionButton = styled.div`
  color: #ffa200;
  gap: 10px;
`;

const GameWrapper = styled.div`
  padding: 0 20px 10px 20px;
`;

const quickAction = [
  { title: "common.deposit", type: "deposit", path: "/deposit" },
  { title: "common.withdrawal", type: "withdrawal", path: "/withdrawal" },
];

const NormalScene = ({
  checking,
  account,
  favList,
  handleJoinGameClick,
  navigateToSlot,
  setFavGame,
  removeFavGame,
  general,
}) => {
  return (
    <>
      {" "}
      <Banner
        height={config.brand === "GMO" && "315px"}
        sameAsText={config.brand === "GMO"}
        noPadding={true}
        updown="only-banner"
        banner={general.banner}
        // appHistory={this.props.appHistory}
        token={account.token}
      />
      <MarqueeContainer>
        <Marquee />
      </MarqueeContainer>
      <UserInformation>
        <UserContainer>
          {!account.token
            ? i18n.t("wap.main.home.profile.pleaseLogin")
            : `Hi, ${account.info.member_username}`}
        </UserContainer>
        <QuickAction>
          {quickAction.map((item, index) => {
            return (
              <QuickActionButton
                key={index}
                style={{
                  width: "50%",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  flexDirection: "column",
                }}
                onClick={() => {
                  AppHistory.push(item.path);
                }}
              >
                <Icons src={item.type} style={{ width: 50, height: 50 }} />
                <div>{i18n.t(item.title)}</div>
              </QuickActionButton>
            );
          })}
        </QuickAction>
      </UserInformation>
      <GameWrapper>
        {checking("hot").length > 0 && (
          <ContentWrapper
            title={i18n.t("T13.topGames")}
            type="game"
            icon="star"
            favGame={favList}
            joinGame={handleJoinGameClick}
            setFavGame={setFavGame}
            removeFavGame={removeFavGame}
            games={checking("hot")}
            seeMoreAt={() => {
              navigateToSlot();
            }}
          />
        )}
        {checking("recommend").length > 0 && (
          <ContentWrapper
            title={i18n.t("T13.recommeneddGames")}
            type="game"
            icon="star"
            favGame={favList}
            joinGame={handleJoinGameClick}
            setFavGame={setFavGame}
            removeFavGame={removeFavGame}
            games={checking("recommend")}
            seeMoreAt={() => {
              navigateToSlot();
            }}
          />
        )}
        {checking("new").length > 0 && (
          <ContentWrapper
            title={i18n.t("T13.newGames")}
            type="game"
            icon="star"
            favGame={favList}
            setFavGame={setFavGame}
            removeFavGame={removeFavGame}
            joinGame={handleJoinGameClick}
            games={checking("new")}
            seeMoreAt={() => {
              navigateToSlot();
            }}
          />
        )}
      </GameWrapper>
    </>
  );
};

export default NormalScene;
