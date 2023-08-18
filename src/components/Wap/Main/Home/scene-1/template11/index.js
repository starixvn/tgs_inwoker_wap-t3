import { GameTypeEnum } from "../../../../../../api-services/utils/Enum";
import { connect } from "react-redux";
import React, { useEffect, useState } from "react";
import { useLocation, useHistory } from "react-router";
import styled from "styled-components";
import config from "../../../../../../config/config";
import i18n from "../../../../../../utils/i18n";
import Common from "../../../../../../utils/Common";
import Slider from "react-slick";
import { GameService } from "../../../../../../api-services/services/GameService";
import {
  jiliSlot,
  rtSlot,
  jdbSlot,
  jiliFish,
  jdbFish,
  playerList,
  gameList,
} from "./hardcode.js";
import { shared } from "../shared";

const TheContainer = styled.div`
  background: url(${process.env.PUBLIC_URL +
    `/assets/images/wapp/home/T11/jackpot-bg.png`})
    no-repeat;
  background-size: 100% 1564px;
`;

const GameLister = styled.div`
  border-radius: 20px;
  background: ${({ theme }) => theme.gamelisterBg};
  margin: 15px 20px;
  border: ${({ theme }) => theme.gamelisterBorder};
  height: 170px;
`;

const CustomImageWrapper = styled.div`
  padding: 10px 10px;
  display: flex;
  justify-content: center;
`;
const TheText = styled.div`
  font-size: 20px;
  color: ${({ theme }) => theme.gamelisterOriginalText};
  inline-size: max-content;
`;

const CustomImageResizer = styled.div`
  width: 100px;
  height: 75px;
  background: ${({ icon }) => {
    return `url(${
      process.env.PUBLIC_URL + `/assets/images/wapp/home/T11/${icon}.gif`
    }) no-repeat center /
    contain;`;
  }};
`;

const GameListItem = styled.div`
  margin: 5px;
  display: flex;
  align-items: center;
  flex-direction: column;
  position: relative;
  padding: 10px;
  justify-content: center;
  ${({ selected, theme }) => {
    return selected
      ? `
      background:${theme.gamelisterSelectedButton};
      border: ${theme.gamelisterBorder};

    ${TheText}{
      color: ${theme.gamelisterSelectedText};
    }
    `
      : "";
  }};
  border-radius: 20px;
`;

const GameButtonWrapper = styled.div`
  margin-bottom: 10px;
`;

const GameFrameImg = styled.div`
  margin: 0 auto 10px auto;
  display: block;
  width: 95%;
  height: 240px;
  background: url(${(props) => props.src}) no-repeat;
  background-position: center;
  background-size: cover;
`;

const GMOGameFrameImg = styled(GameFrameImg)`
  height: 306px;
  border: ${({ theme }) => theme.gamelisterBorder};
`;

const Maintenance = styled.div`
  display: none;
  position: absolute;
  width: 100%;
  height: 100%;
  justify-content: center;
  align-items: center;
  color: white;
  z-index: 1;
  font-size: 40px;
  font-weight: bold;
  text-transform: capitalize;
`;

const ButtonGradientWrapper = styled.div``;

const ButtonStartGame = styled.div`
  width: 148px;
  height: 43px;
  background: url(${process.env.PUBLIC_URL +
    `/assets/images/wapp/btn-start-game-T11.png`})
    no-repeat;
  background-size: 100%;
  margin: 155px 0 0 76px;
  font-size: 16px;
  font-weight: bold;
  line-height: 37px;
  text-align: center;
  padding-top: 6px;
  color: #fff;
  zoom: 1.3;
`;

const NewWrapper = styled.div`
  position: relative;

  ${({ maintenance }) => {
    return maintenance
      ? `
      ${GameFrameImg}{
        filter: brightness(20%) grayscale(200%);
      }
      ${Maintenance}{
        display: flex;
    
    }`
      : ``;
  }}
`;
const SectionWrapper = styled.div`
  position: relative;
  color: #fff;
  margin: 40px auto;
`;

const JackpotWrapper = styled(SectionWrapper)``;
const JackpotContainer = styled.div`
  width: 700px;
  height: 250px;
  background: url(${process.env.PUBLIC_URL +
    `/assets/images/wapp/home/T11/jackpot-container.png`})
    no-repeat center / contain;
  margin: 0 auto;
  margin: -50px auto 0;
  padding-top: 90px;
  text-align: center;
  font-size: 45px;
  line-height: 45px;
`;
const JackpotGif = styled.div`
  width: 700px;
  height: 250px;
  background: url(${process.env.PUBLIC_URL +
    `/assets/images/wapp/home/T11/jackpot.gif`})
    no-repeat center / contain;
  margin: 0 auto;
`;

const WinnerListWrapper = styled(SectionWrapper)``;
const WinnerListContainer = styled.div`
  width: 644px;
  height: 961px;
  background: url(${process.env.PUBLIC_URL +
    `/assets/images/wapp/home/T11/winner-list.png`})
    no-repeat center center / contain;
  margin: 0 auto;
  padding: 240px 30px 30px;
`;
const WinnerListHeader = styled.div`
  font-size: 30px;
  text-align: center;
  margin: 20px auto;
`;
const WinnerListScroll = styled.div`
  height: 588px;
  overflow-y: scroll;
  margin: 0 15px;
`;
const WinnerListItem = styled.div`
  display: flex;
  flex-direction: row;
  height: 125px;
  margin: 20px 5px;
  padding: 0px 20px;
  border: 1px solid #fff;
  border-radius: 25px;
  background: #232323;
  align-items: center;
`;
const WinnerListItemImage = styled.img`
  width: 50px;
  height: 50px;
  margin: 0 5px;
  border-radius: 15px;
  border: 1px solid #ea427b;
`;
const WinnerListItemDescription = styled.div`
  width: 200px;
  font-size: 20px;
  color: #7a7a7a;
  white-space: break-spaces;
`;
const WinnerListItemPrize = styled.div`
  width: 150px;
  font-size: 25px;
  font-weight: bold;
  color: ${({ theme }) => theme.accent};
  text-align: right;
`;

const HighlightText = styled.span`
  color: #fff;
`;

const RecommendedGPWrapper = styled(SectionWrapper)`
  margin: 40px;
  margin-right: 0px;
`;
const RecommendedGameHeader = styled.div`
  width: 90%;
  background: linear-gradient(
    to right,
    ${({ theme }) => theme.accent},
    transparent
  );
  border-radius: 25px;
  font-size: 38px;
  padding-left: 20px;
  font-weight: bold;
`;
const RecommendedGameContainer = styled.div`
  margin: 20px auto;
`;
const RecommendedGameItem = styled.div`
  display: flex;
  width: 175px;
  height: 250px;
  border-radius: 25px;
  background-color: #232323;
  flex-direction: column;
  padding: 20px 0 10px 0;
  text-align: center;
`;
const RecommendedStar = styled.div`
  width: 75px;
  height: 75px;
  background: url(${process.env.PUBLIC_URL +
    `/assets/images/wapp/home/T11/recommend-star.png`})
    no-repeat center center / contain;
  position: absolute;
  top: 0;
  transform: translateX(-15px);
`;
const RecommendedGameName = styled.div`
  margin-top: 15px;
`;
const RecommendedGameImage = styled.div`
  width: 175px;
  height: 175px;
  border: 1px solid ${({ theme }) => theme.accent};
  border-radius: 25px;
`;

const GameImage = styled.div`
  background: url(${({ img }) => img});
  background-size: 100%;
  background-repeat: no-repeat;
  aspect-ratio: 1;
`;

const settings = {
  dots: false,
  arrows: false,
  slidesToShow: 3.5,
  slidesToScroll: 3,
  infinite: false,
};

const Template11 = ({
  token,
  gameMenu2,
  changeShowGame,
  homePageGameList,
  getImgPrefix,
  handleGameClick,
}) => {
  const location = useLocation();
  const history = useHistory();
  const [selected, setSelected] = useState("");
  const [list, setList] = useState([]);
  const [prizeMin, sePrizeMin] = useState(5000);
  const [prizeMax, setPrizeMax] = useState(5);
  const [recommendedGames, setRecommendedGames] = useState({
    games: [
      {
        title: "JILITF.slots",
        list: jiliSlot,
        type: GameTypeEnum.SLOT,
        platform: "JILITF",
        gameList: [],
      },
      {
        title: "RTTF.slots",
        list: rtSlot,
        type: GameTypeEnum.SLOT,
        platform: "RTTF",
        gameList: [],
      },
      {
        title: "JDBTF.slots",
        list: jdbSlot,
        type: GameTypeEnum.SLOT,
        platform: "JDBTF",
        gameList: [],
      },

      {
        title: "JILITF.fish",
        list: jiliFish,
        type: GameTypeEnum.FISH,
        platform: "JILITF",
        gameList: [],
      },
      {
        title: "JDBTF.fish",
        list: jdbFish,
        type: GameTypeEnum.FISH,
        platform: "JDBTF",
        gameList: [],
      },
    ],
    isInitialized: false,
  });
  var currentType = -1;

  useEffect(() => {
    if (list.length <= 0) {
      generateList();
    }

    if (location.state && location.state.resetPage) {
      setSelected("");
    }

    if (!recommendedGames.isInitialized) {
      getGameList();
    }
  }, [location.state]);

  const generateJackpotAmount = ({ min, max }) => {
    let date = new Date();
    let dayIndex = date.getDay() === 0 ? 6 : date.getDay() - 1;
    let maxPerDay = (max - min) / 7;
    let minWithDay = Math.floor(min + maxPerDay * dayIndex);
    let maxWithDay = Math.floor(max * ((dayIndex + 1) / 7));
    let amount = Math.floor(
      Math.random() * (maxWithDay - minWithDay + 1) + minWithDay
    );
    return Common.formatNumberWithCommas(amount);
  };

  const [jackpotAmount, setJackpotAmount] = useState(
    generateJackpotAmount({ min: 200000, max: 5000000 })
  );

  const getGameList = () => {
    var temp = recommendedGames;
    temp.games.map(async (game, index) => {
      GameService.GetGameList(game.platform, game.type).then((response) => {
        if (response.IsSuccess) {
          var data = response.data;
          game.list.map((item) => {
            var index = data.findIndex((item2) => item2.code === item.code);
            if (index >= 0 && data[index] !== null) {
              game.gameList.push(data[index]);
              game.gameList.filter((item, index) => {
                return game.gameList.indexOf(item) === index;
              });
            }
            return null;
          });
        }
      });
      return null;
    });
    temp.isInitialized = true;
    setRecommendedGames(temp);
  };

  const randomize = (array) => {
    const randomIndex = Math.floor(Math.random() * array.length);
    const item = array[randomIndex];
    return item;
  };

  const generateList = () => {
    let tempList = [];
    for (var i = 0; i < 10; i++) {
      let name = randomize(playerList);
      let game = randomize(gameList);
      let prize = Math.floor(
        Math.random() * (prizeMax - prizeMin + 1) + prizeMin
      );
      tempList.push({
        id: Math.random().toString(16).slice(2),
        img: `${
          config.sourceUrl
        }${game.gpcode.toUpperCase()}/${Common.getCDNLanguagePrefix()}/${
          game.code
        }.jpg`,
        playerName: name,
        gameName: game.name,
        prize: Common.formatNumberWithThousand(prize),
      });
    }
    setList(tempList);
  };

  const FakeWinners = ({ list }) => {
    return list.map((item, index) => {
      return (
        <WinnerListItem key={item.id}>
          <WinnerListItemImage src={item.img}></WinnerListItemImage>
          <WinnerListItemDescription>
            Player <HighlightText>{item.playerName}</HighlightText> at{"\n"}
            <HighlightText>{item.gameName}</HighlightText> won
          </WinnerListItemDescription>
          <WinnerListItemPrize>₱ {item.prize}</WinnerListItemPrize>
        </WinnerListItem>
      );
    });
  };

  const handleRecommendedGameClick = (gpcode, gpid, gptype) => {
    if (token) {
      if (document.getElementById("audio") != null)
        document.getElementById("audio").volume = 0;

      Common.closePreviousPopup();
      Common.PopupCenter(`/joingame/${gptype}/${gpcode}/${gpid}`, "gamewindow");
    } else {
      history.push(`/login`);
    }
  };

  const Jackpot = () => {
    return (
      <JackpotWrapper>
        <JackpotGif></JackpotGif>
        <JackpotContainer>₱ {jackpotAmount}</JackpotContainer>
      </JackpotWrapper>
    );
  };

  const WinnerList = ({ list }) => {
    const [winnerList, setWinnerList] = useState(list);
    useEffect(() => {
      const updateList = () => {
        let newList = [...winnerList];
        newList.pop();
        let name = randomize(playerList);
        let game = randomize(gameList);
        let prize = Math.floor(
          Math.random() * (prizeMax - prizeMin + 1) + prizeMin
        );
        newList.unshift({
          id: Math.random().toString(16).slice(2),
          img: `${
            config.sourceUrl
          }${game.gpcode.toUpperCase()}/${Common.getCDNLanguagePrefix()}/${
            game.code
          }.jpg`,
          playerName: name,
          gameName: game.name,
          prize: Common.formatNumberWithThousand(prize),
        });
        setWinnerList(newList);
      };

      const interval = setInterval(updateList, 10000);
      return () => {
        clearInterval(interval);
      };
    }, [winnerList]);
    return (
      <WinnerListWrapper>
        <WinnerListContainer>
          <WinnerListHeader>
            <b>WIN</b> LIST
          </WinnerListHeader>
          <WinnerListScroll>
            <FakeWinners list={winnerList}></FakeWinners>
          </WinnerListScroll>
        </WinnerListContainer>
      </WinnerListWrapper>
    );
  };

  const RecommendedGP = () => {
    return (
      <RecommendedGPWrapper>
        {recommendedGames.games.map((item) => {
          return (
            item.gameList.length > 0 && (
              <React.Fragment>
                <RecommendedGameHeader>
                  {i18n.t(item.title)}
                </RecommendedGameHeader>
                <RecommendedGameContainer>
                  <Slider {...settings}>
                    {(() => {
                      return item.gameList.map((row) => {
                        return (
                          <React.Fragment>
                            <RecommendedGameItem
                              onClick={() =>
                                handleRecommendedGameClick(
                                  row.gpcode,
                                  row.id,
                                  row.type
                                )
                              }
                            >
                              <RecommendedGameImage>
                                <GameImage
                                  img={`${
                                    config.sourceUrl
                                  }${row.gpcode.toUpperCase()}/${Common.getCDNLanguagePrefix()}/${
                                    row.code
                                  }.png`}
                                ></GameImage>
                                <RecommendedStar></RecommendedStar>
                              </RecommendedGameImage>
                              <RecommendedGameName>
                                {row.name}
                              </RecommendedGameName>
                            </RecommendedGameItem>
                          </React.Fragment>
                        );
                      });
                    })()}
                  </Slider>
                </RecommendedGameContainer>
              </React.Fragment>
            )
          );
        })}
      </RecommendedGPWrapper>
    );
  };
  const gameListSettings = {
    dots: false,
    arrows: false,
    slidesToShow: 5,
    slidesToScroll: 5,
    infinite: false,
  };

  const hasGameType = (type) => {
    return homePageGameList.length > 0
      ? homePageGameList.findIndex((game) => game.type === type) >= 0
      : false;
  };

  return (
    <TheContainer>
      <GameLister>
        <Slider {...gameListSettings}>
          {shared
            .theSorter(gameMenu2)
            .filter((item) => {
              return hasGameType(item.type[0]);
            })
            .map((i, index) => {
              return (
                <React.Fragment>
                  <GameListItem
                    selected={selected === i.type}
                    onClick={() => {
                      history.replace({ state: { resetPage: false } });
                      changeShowGame(i.type);
                      setSelected(i.type);
                    }}
                  >
                    <CustomImageWrapper>
                      <CustomImageResizer icon={i.image} />
                    </CustomImageWrapper>
                    <TheText>{i18n.t(i.title)}</TheText>
                  </GameListItem>
                </React.Fragment>
              );
            })}
        </Slider>
      </GameLister>
      <div>
        {(() => {
          return homePageGameList
            .sort((a, b) => {
              if (config.features.LiveGame_Sorting_SKY) {
                var sortDGFirst = ["DG"];
                return (
                  sortDGFirst.indexOf(b.abbreviation) -
                  sortDGFirst.indexOf(a.abbreviation)
                );
              } else return b - a;
            })
            .filter((game) => selected.indexOf(game.type) >= 0)
            .map((row, index) => {
              return (
                <GameButtonWrapper>
                  <ButtonGradientWrapper>
                    <NewWrapper maintenance={row.status !== 0}>
                      <Maintenance>
                        {i18n.t("transfer.maintenance")}
                      </Maintenance>
                      <GMOGameFrameImg
                        src={`${
                          process.env.PUBLIC_URL
                        }/assets/images/wapGame/T11/${getImgPrefix(
                          row.type
                        )}-${row.abbreviation.toLowerCase()}.jpg`}
                        id={
                          currentType !== row.type
                            ? `gameType${row.type}`
                            : `gameId${row.id}`
                        }
                        onClick={() =>
                          handleGameClick(
                            row.type,
                            row.gpcode,
                            row.game_platform_id
                          )
                        }
                      >
                        <ButtonStartGame>
                          {i18n.t("common.startGame")}
                        </ButtonStartGame>
                      </GMOGameFrameImg>
                    </NewWrapper>
                  </ButtonGradientWrapper>
                </GameButtonWrapper>
              );
            });
        })()}

        {selected === "" && (
          <React.Fragment>
            <Jackpot />
            {list.length > 0 && <WinnerList list={list} />}
            <RecommendedGP />
          </React.Fragment>
        )}
      </div>
    </TheContainer>
  );
};

const mapStateToProps = (state) => {
  return {
    token: state.account.token,
  };
};

export default connect(mapStateToProps, null)(Template11);
