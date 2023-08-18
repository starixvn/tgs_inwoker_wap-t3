import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import styled from "styled-components";
import { GameService } from "../../../../../../api-services/services/GameService";
import { GameTypeEnum } from "../../../../../../api-services/utils/Enum";
import config from "../../../../../../config/config";
import Common from "../../../../../../utils/Common";
import i18n from "../../../../../../utils/i18n";
import { shared } from "../shared";
import { AppHistory } from "../../../../../../history/History";
import SlotTypeGameScene from "./scene/slottype";
import ListTypeGameScene from "./scene/listtype";
import NormalScene from "./scene/normal";
import { useRef } from "react";
import Marquee from "../../Marquee";

const GameLister = styled.div`
  overflow: auto;

  overflow: auto;
  padding-right: 20px;
  display: -webkit-box;
  background: #000325;
  ::-webkit-scrollbar {
    display: none;
  }
`;

const TopSectionWrapper = styled.div`
  padding-top: 130px;
`;

const TheText = styled.div`
  font-size: 20px;
  white-space: nowrap;
  width: 150px;
  text-align: center;
  overflow: hidden;
  text-overflow: ellipsis;
  padding: 10px 0;

  color: ${({ theme }) => theme.gamelisterOriginalText};
  ${() => config.brand === "TIGER" && `font-weight: bold; font-size: 24px;`}
`;

const Arrow = styled.div`
  position: absolute;
  bottom: -2px;
  left: 45%;
  border-left: 10px solid transparent;
  border-right: 10px solid transparent;
  display: none;
`;

const ListerWrapper = styled.div`
  padding-left: 20px;
  ${({ selected }) => {
    return selected
      ? `
      ${Arrow} {
        display: block;
      }
  `
      : "";
  }};
`;

const GameListItem = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  position: relative;
  padding: 20px;
  padding-top: 30px;
  width: 150px;

  color: #ffa200;
  justify-content: center;
  border: ${({ theme }) => theme.gamelisterBorder};

  border-radius: 20px;
`;

const GameListItemIcon = styled.div`
  min-height: 50px;
  min-width: 50px;

  mask: ${({ src }) => {
    return `url(${
      process.env.PUBLIC_URL +
      `/assets/images/wapp/resource/T13/homepage/icon/${src}.svg`
    }) no-repeat center /
    contain;`;
  }};
  background: ${({ theme }) => theme.primary};
`;

const HomePageWrapper = styled.div`
  color: #fff;
  font-size: 24px;
`;

const GridWrapper = styled.div`
  display: flex;
  flex-direction: column;
  background: #000325;
  min-height: 80vh;
  align-content: baseline;
`;

const MarqueeContainer = styled.div``;

const Template14 = ({
  gameMenu2,
  changeShowGame,
  homePageGameList,
  getImgPrefix,
  handleGameClick,
  token,
  general,
  account,
}) => {
  const [selected, setSelected] = useState("");

  const [selectedBrand, setSelectedBrand] = useState("");
  const [gameList, setGameList] = useState([]);

  const [loading, setLoading] = useState(false);

  var gameTypeToDisplayDifferently = (selectedGameType) => {
    return (
      selectedGameType[0] === GameTypeEnum.FISH ||
      selectedGameType[0] === GameTypeEnum.SLOT ||
      selectedGameType[0] === GameTypeEnum.TABLEGAME
    );
  };

  const [favList, setFavList] = useState([]);

  useEffect(() => {
    if (favList.length <= 0 && account.token !== "") {
      getFav(selected);
    } else {
    }
  }, [favList]);

  const getFav = (type) => {
    if (account.token) {
      var result = GameService.GetFavoriteGame(type || GameTypeEnum.SLOT);
      result.then((response) => {
        if (response.IsSuccess) {
          var data = response.data;
          setFavList(data);
        }
      });
    }
  };

  const redirectUserToLogin = () => {
    AppHistory.push("/login");
  };

  const setFavGame = (gameId) => {
    if (account.token) {
      var result = GameService.SetFavoriteGame(gameId);
      result.then((response) => {
        if (response.IsSuccess) {
          getFav(selected);
        }
      });
    } else {
      redirectUserToLogin();
    }
  };

  const removeFavGame = (gameId) => {
    if (account.token) {
      var result = GameService.RemoveFavoriteGame(gameId);
      result.then((response) => {
        if (response.IsSuccess) {
          getFav(selected);
        }
      });
    } else {
      redirectUserToLogin();
    }
  };

  useEffect(() => {
    if (gameList.length <= 0) {
      var result = GameService.GetGameList("", GameTypeEnum.SLOT);
      result.then((e) => {
        if (e.IsSuccess) {
          setGameList(e.data);
          setLoading(false);
        }
      });
    }
  }, []);

  const filtering = homePageGameList.filter(
    (game) => selected.indexOf(game.type) >= 0
  );

  const prevSelected = useRef(selected);
  const prevSelectedBrand = useRef(selectedBrand);

  useEffect(() => {
    if (gameTypeToDisplayDifferently(selected)) {
      setLoading(true);
      if (
        prevSelected.current === selected &&
        prevSelectedBrand.current === selectedBrand
      ) {
        setLoading(false);
        return;
      }
      var result = GameService.GetGameList(selectedBrand, selected);
      result.then((e) => {
        if (e.IsSuccess) {
          setSelectedBrand(
            selectedBrand === "" ? filtering[0].gpcode : selectedBrand
          );
          getFav(selected);
          setGameList(e.data);
          setLoading(false);
        }
      });
      prevSelected.current = selected;
      prevSelectedBrand.current = selectedBrand;
    }
  }, [selected, selectedBrand]);

  const checking = (variant) => {
    return gameList.filter((a) => {
      return a.tag[variant] === true;
    });
  };
  const handleJoinGameClick = (row) => {
    Common.closePreviousPopup();
    if (token) {
      Common.PopupCenter(
        `/joingame/${selected || GameTypeEnum.SLOT}/${row.gpcode}/${row.id}`,
        "gamewindow"
      );
    } else {
      AppHistory.push("/login");
    }
  };
  const navigateToSlot = () => {
    setLoading(true);
    setSelected([GameTypeEnum.SLOT]);
    changeShowGame([GameTypeEnum.SLOT]);
    window.scrollTo(0, 0);
  };

  const normalsceneprops = {
    checking: checking,
    account: account,
    favList: favList,
    general: general,
    handleJoinGameClick: handleJoinGameClick,
    navigateToSlot: navigateToSlot,
    setFavGame: setFavGame,
    removeFavGame: removeFavGame,
  };

  const listsceneprops = {
    filtering: filtering,
    handleGameClick: handleGameClick,
    getImgPrefix: getImgPrefix,
  };

  const slottypesceneprops = {
    filtering: filtering,
    gameList: gameList,
    handleJoinGameClick: handleJoinGameClick,
    favList: favList,
    setFavGame: setFavGame,
    removeFavGame: removeFavGame,
    selectedBrand: selectedBrand,
    setSelectedBrand: setSelectedBrand,
  };

  const sceneTypeSwitcher = () => {
    switch (true) {
      case gameTypeToDisplayDifferently(selected):
        return <SlotTypeGameScene {...slottypesceneprops} />;
      case selected !== "":
        return <ListTypeGameScene {...listsceneprops} />;
      default:
        return <NormalScene {...normalsceneprops} />;
    }
  };

  return (
    <HomePageWrapper>
      <TopSectionWrapper>
        {(gameTypeToDisplayDifferently(selected) || selected !== "") && (
          <MarqueeContainer>
            <Marquee variant="2" />
          </MarqueeContainer>
        )}
        <GameLister>
          {shared.theSorter(gameMenu2).map((i, index) => {
            //hide if 0 game found.
            var newList = homePageGameList.filter(
              (game) => i.type.indexOf(game.type) >= 0
            );
            if (newList.length > 0) {
              return (
                <ListerWrapper
                  index={index}
                  style={{ position: "relative" }}
                  selected={selected === i.type}
                >
                  <GameListItem
                    selected={selected === i.type}
                    onClick={() => {
                      window.scrollTo(0, 0);
                      setLoading(false);
                      if (selected === i.type) {
                        setSelected("");
                      } else {
                        if (gameTypeToDisplayDifferently(selected)) {
                          setLoading(true);
                        }

                        changeShowGame(i.type);
                        setSelected(i.type);
                      }
                    }}
                  >
                    <GameListItemIcon src={i.type} />
                    <TheText style={{ zIndex: 1 }}>{i18n.t(i.title)}</TheText>
                  </GameListItem>
                </ListerWrapper>
              );
            }
          })}
        </GameLister>
      </TopSectionWrapper>
      <GridWrapper>{sceneTypeSwitcher()}</GridWrapper>
    </HomePageWrapper>
  );
};

const mapStateToProps = (state) => {
  return {
    account: state.account,
    game: state.game,
    token: state.account.token,
    general: state.general,
  };
};

export default connect(mapStateToProps, null)(Template14);
