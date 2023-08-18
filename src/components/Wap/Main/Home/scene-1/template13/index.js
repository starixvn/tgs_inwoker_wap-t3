import React, { useEffect, useState } from "react";
import { connect, Provider } from "react-redux";
import styled from "styled-components";
import { GameService } from "../../../../../../api-services/services/GameService";
import { GameTypeEnum } from "../../../../../../api-services/utils/Enum";
import config from "../../../../../../config/config";
import { AppHistory } from "../../../../../../history/History";
import Common from "../../../../../../utils/Common";
import i18n from "../../../../../../utils/i18n";
import Marquee from "../../Marquee";
import { shared } from "../shared";
import ContentWrapper from "./contentwrapper";
import Slick from "react-slick";
import Partners from "./partners";
import QuickLinks from "./quicklinks";
import Button from "../../../../components/button";
import { playerList, gameList as gameListx } from "./../template11/hardcode";
import News from "./news";
import { hardcodeNews } from "./news/hardcoded";
import Banner from "../banner";
import GamingLicensePNG from "../../../../../../assets/images/gaming-license.png";
import Loading from "../../../../Share/Loading";

const TheContainer = styled.div`
  padding-top: 380px;
`;

const GameLister = styled.div`
  overflow: auto;

  margin-bottom: 10px;
  overflow: auto;
  padding-right: 20px;
  display: -webkit-box;
  ::-webkit-scrollbar {
    display: none;
  }
`;

const TheText = styled.div`
  font-size: ${(props) => (i18n.language === "ta-IN" ? "18px" : "20px")};
  white-space: ${(props) =>
    i18n.language === "ta-IN" ? "break-spaces" : "nowrap"};
  width: 150px;
  text-align: center;
  overflow: hidden;
  text-overflow: ellipsis;
  padding: 10px 0;
  ${(props) => (i18n.language === "ta-IN" ? `height: 55px;` : ``)}

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
  padding: 10px;
  width: 150px;
  background: #27273f;
  color: #fff;
  justify-content: center;
  border: ${({ theme }) => theme.gamelisterBorder};
  ${({ selected, theme }) => {
    return selected
      ? `
   
  background: ${theme.primary};  
  filter: drop-shadow(0 0 2px ${theme.primary})
  drop-shadow(0 0 2px ${theme.primary}) contrast(1)
  brightness(1);

  ${GameListItemIcon}{
    background: #fff;
  }

    `
      : "";
  }};
  border-radius: 20px;
`;

const GridWrapper = styled.div`
  padding: 0 20px 10px 20px;
  display: flex;
  flex-direction: column;
`;

const GameListItemIcon = styled.div`
  min-height: 80px;
  min-width: 80px;

  height: 41px;
  width: 45px;

  mask: ${({ src }) => {
    return `url(${
      process.env.PUBLIC_URL +
      `/assets/images/wapp/resource/T13/homepage/icon/${src}.png`
    }) no-repeat center /
    contain;`;
  }};
  background: ${({ theme }) => theme.primary};
`;

const AnnouncementSection = styled.div`
  background: #27273f;
  margin: 15px 20px;
  color: #fff;
  padding: 10px 20px;
  border-radius: 50px;
  min-height: 50px;
  display: flex;
  align-items: center;
`;

const GameButtonWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 15px;
`;

const GameFrameImg = styled.div`
  display: block;

  aspect-ratio: 1;
  border-radius: 20px;
  background: url(${(props) => props.src}) no-repeat;
  background-position: center;
  background-size: cover;
`;

const Maintenance = styled.div`
  display: none;
  position: absolute;
  width: 100%;
  height: 100%;
  justify-content: center;
  align-items: center;
  color: white;
  z-index: 2;
  font-size: 40px;
  font-weight: bold;
  text-transform: capitalize;
`;

const LogoOverlay = styled.div`
  display: flex;
  position: absolute;
  width: 100%;
  height: 100%;
  justify-content: center;
  align-items: center;
  color: white;
  z-index: 0;
  font-size: 40px;
  font-weight: bold;
  text-transform: capitalize;
  background: rgba(0, 0, 0, 0.5);
`;

const NewWrapper = styled.div`
  position: relative;
  aspect-ratio: 1;
  border-radius: 20px;

  ${({ maintenance }) => {
    return maintenance
      ? `
      ${GameFrameImg}{
        filter: brightness(20%) grayscale(200%);
      }

    
      ${Maintenance}{
        display: flex;
    }
    
    ${LogoOverlay}  { 
      display: none;
    }
    
    `
      : ``;
  }}
`;

const MaintenanceContentHolder = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
  padding: 50px;
  display: flex;
  justify-content: flex-end;
  align-items: flex-end;
`;

const SlotGameTypeWrapper = styled.div`
  font-size: 28px;
  color: #fff;
`;

const SearchSection = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
`;

const ProviderListWrapper = styled.div`
  background: #24253c;
  border-radius: 50px;
  width: -webkit-fill-available;
  position: relative;
`;
const ProviderList = styled.select`
  background: #24253c;
  border: none;
  border-radius: 50px;
  padding: 20px 40px;
  color: #fff;
  font-size: 28px;
  width: -webkit-fill-available;
  outline: none;
  -webkit-appearance: none;
  -moz-appearance: none;
  text-indent: 1px;
  text-overflow: "";
`;

const SearchBar = styled.input`
  background: #24253c;
  border: none;
  border-radius: 50px;
  padding: 20px 40px;
  color: #fff;
  font-size: 28px;
  font-family: "Montserrat", sans-serif;

  ::placeholder {
    color: #fff;
    font-size: 28px;
    opacity: 1;
  }
`;

const WrapTheGames = styled.div`
  padding-top: 20px;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
`;

const Title = styled.div`
  position: absolute;
  bottom: 0;
  background: rgba(0, 0, 0, 0.8);
  width: 100%;
  padding: 10px;
  text-align: center;
`;

const SectionWrapper = styled.div`
  position: relative;
  color: #fff;
`;

const JackpotWrapper = styled(SectionWrapper)`
  transform: scale(1.1);
`;
const JackpotGif = styled.div`
  height: 355px;
  background: url(${process.env.PUBLIC_URL +
    `/assets/images/wapp/resource/T13/homepage/jackpot.svg`})
    no-repeat center / contain;
`;
const JackpotContainer = styled.div`
  background: url(${process.env.PUBLIC_URL +
    `/assets/images/wapp/resource/T13/homepage/jackpotcontainer.svg`})
    no-repeat center / contain;
  margin: 0 auto;
  height: 180px;
  width: 610px;
  padding-top: 65px;
  text-align: center;
  font-size: 45px;
  line-height: 45px;
`;

const WinnerListWrapper = styled(SectionWrapper)``;
const WinnerListContainer = styled.div``;

const WinnerListScroll = styled.div`
  height: 588px;
  overflow-y: scroll;
`;
const WinnerListItem = styled.div`
  display: flex;
  flex-direction: row;
  height: 125px;
  margin: 20px 0px;
  padding: 0px 10px;
  box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.2);
  border-radius: 25px;
  background: #27273f;
  align-items: center;
  justify-content: space-between;
`;
const WinnerListItemImage = styled.img`
  width: 50px;
  height: 50px;
  margin: 0 5px;
  border-radius: 15px;
  border: 1px solid #ea427b;
`;
const WinnerListItemDescription = styled.div`
  width: 300px;
  font-size: 20px;
  color: #7a7a7a;
  white-space: break-spaces;
`;
const WinnerListItemPrize = styled.div`
  width: 200px;
  font-size: 25px;
  font-weight: bold;
  color: ${({ theme }) => theme.primary};
  text-align: right;
`;
const HighlightText = styled.span`
  color: #fff;
`;
const ListItem = styled.div`
  background: url(${(props) => props.src}) no-repeat center top;
  background-size: contain;
  position: relative;
  width: 690px;
  height: 280px;
  aspect-ratio: 1/1;
`;

const WinnerListxx = styled.div`
  display: flex;
  gap: 20px;
`;

const ArrowDown = styled.div`
  mask: url(${process.env.PUBLIC_URL +
    `/assets/images/wapp/btn-back-white.png`})
    no-repeat center;
  background: ${({ theme }) => theme.primaryText};
  width: 40px;
  height: 30px;

  mask-size: 25%;
  rotate: 275deg;
  position: absolute;
  right: 10px;
  bottom: 20px;
`;

const AlwaysStickTop = styled.div`
  position: fixed;
  top: 120px;
  left: 0;
  right: 0;
  z-index: 3;
  display: flex;
  flex-direction: column;
  background: #000326;
`;

const Template13 = ({
  gameMenu2,
  changeShowGame,
  homePageGameList,
  getImgPrefix,
  handleGameClick,
  token,
  game,
  general,
  alert,
}) => {
  const [selected, setSelected] = useState("");
  var currentType = -1;
  const navigateTo = (to) => {
    AppHistory.push("/" + to);
    window.scrollTo(0, 0);
  };
  const [selectedBrand, setSelectedBrand] = useState("");
  const [keyword, setKeyword] = useState("");
  const [gameList, setGameList] = useState([]);
  const [prizeMin, sePrizeMin] = useState(5000);
  const [prizeMax, setPrizeMax] = useState(5);
  const [list, setList] = useState([]);

  const [loading, setLoading] = useState(false);

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

  const initialJackpotAmount = 1822085;

  const [jackpotAmount, setJackpotAmount] = useState(initialJackpotAmount);

  var gameTypeToDisplayDifferently = (selectedGameType) => {
    return (
      selectedGameType[0] === GameTypeEnum.FISH ||
      selectedGameType[0] === GameTypeEnum.SLOT ||
      selectedGameType[0] === GameTypeEnum.TABLEGAME
    );
  };

  useEffect(() => {
    const updateJackpotAmount = () => {
      //random digit from 0.05 to  0.2
      var randomDigit = Math.floor(Math.random() * 15 + 5) / 100;
      if (jackpotAmount < 9999999.99) {
        setJackpotAmount(
          (currentJackpotAmount) => currentJackpotAmount + randomDigit
        );
      } else {
        setJackpotAmount(initialJackpotAmount);
      }
    };

    const interval = setInterval(updateJackpotAmount, 2000);
    return () => {
      clearInterval(interval);
    };
  });

  const randomize = (array) => {
    const randomIndex = Math.floor(Math.random() * array.length);
    const item = array[randomIndex];
    return item;
  };

  const Jackpot = () => {
    return (
      <JackpotWrapper>
        <JackpotGif></JackpotGif>
        <JackpotContainer>
          {config.currency} {Common.formatNumberWithCommas(jackpotAmount)}
        </JackpotContainer>
      </JackpotWrapper>
    );
  };

  const generateList = () => {
    let tempList = [];
    for (var i = 0; i < 10; i++) {
      let name = randomize(playerList);
      let game = randomize(gameListx);
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

  const WinnerList = ({ list }) => {
    const [winnerList, setWinnerList] = useState(list);
    useEffect(() => {
      const updateList = () => {
        let newList = [...winnerList];
        newList.pop();
        let name = randomize(playerList);
        let game = randomize(gameListx);
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
          <WinnerListScroll>
            <FakeWinners list={winnerList}></FakeWinners>
          </WinnerListScroll>
        </WinnerListContainer>
      </WinnerListWrapper>
    );
  };

  const FakeWinners = ({ list }) => {
    return list.map((item, index) => {
      return (
        <WinnerListItem key={item.id}>
          <WinnerListxx>
            <WinnerListItemImage src={item.img}></WinnerListItemImage>
            <WinnerListItemDescription>
              Player <HighlightText>{item.playerName}</HighlightText> at{"\n"}
              <HighlightText>{item.gameName}</HighlightText> won
            </WinnerListItemDescription>
          </WinnerListxx>
          <WinnerListItemPrize>₱ {item.prize}</WinnerListItemPrize>
        </WinnerListItem>
      );
    });
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

  useEffect(() => {
    setLoading(false);
    if (gameTypeToDisplayDifferently(selected)) {
      setLoading(true);
      var result = GameService.GetGameList(selectedBrand, selected);
      result.then((e) => {
        if (e.IsSuccess) {
          setGameList(e.data);
          setLoading(false);
        }
      });
    }
  }, [selected, selectedBrand]);

  useEffect(() => {
    if (list.length <= 0) {
      generateList();
    }
  });

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

  const checking = (variant) => {
    return gameList.filter((a) => {
      return a.tag[variant] === true;
    });
  };

  const navigateToSlot = () => {
    setLoading(true);
    setSelected([GameTypeEnum.SLOT]);
    changeShowGame([GameTypeEnum.SLOT]);
    window.scrollTo(0, 0);
  };

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
    appendDots: (dots) => (
      <div
        style={{
          marginBottom: "30px",
        }}
      >
        <ul style={{ margin: "0px" }}> {dots} </ul>
      </div>
    ),
    customPaging: (a) => {
      return (
        <div
          style={{
            border: "2px solid #fff",
            borderRadius: "50%",
            width: "12px",
            height: "12px",
          }}
        ></div>
      );
    },
    beforeChange: (current, next) => {},
  };

  return (
    <>
      <AlwaysStickTop>
        <AnnouncementSection>
          <Marquee withOnlineUser />
        </AnnouncementSection>
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
                  style={{ position: "relative", paddingBottom: 5 }}
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
                        setKeyword("");
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
      </AlwaysStickTop>
      <TheContainer>
        {!selected && (
          <Banner
            height={config.brand === "GMO" && "315px"}
            sameAsText={config.brand === "GMO"}
            noPadding={true}
            updown="only-banner"
            banner={general.banner}
            // appHistory={this.props.appHistory}
            token={token}
          />
        )}

        <GridWrapper>
          {selected && gameTypeToDisplayDifferently(selected) ? (
            <SlotGameTypeWrapper>
              <SearchSection>
                <SearchBar
                  placeholder={i18n.t("T13.slot.search")}
                  value={keyword}
                  onChange={(e) => {
                    setKeyword(e.target.value);
                  }}
                />
                <ProviderListWrapper>
                  <ProviderList
                    onChange={(e) => {
                      setSelectedBrand(e.target.value);
                    }}
                  >
                    <option value="" selected>
                      {i18n.t("T13.slot.provider")}
                    </option>
                    {homePageGameList
                      .filter((game) => selected.indexOf(game.type) >= 0)
                      .sort((a, b) => {
                        if (config.features.LiveGame_Sorting_SKY) {
                          var sortDGFirst = ["DG"];
                          return (
                            sortDGFirst.indexOf(b.abbreviation) -
                            sortDGFirst.indexOf(a.abbreviation)
                          );
                        } else return b - a;
                      })
                      .map((data, index) => {
                        return (
                          <option key={index} value={data.gpcode}>
                            {data.name}
                          </option>
                        );
                      })}
                  </ProviderList>{" "}
                  <ArrowDown />
                </ProviderListWrapper>
              </SearchSection>
              <WrapTheGames>
                {gameList
                  .filter((a) => {
                    if (keyword === "") return true;
                    else
                      return a.name
                        .toUpperCase()
                        .includes(keyword.toUpperCase());
                  })
                  .filter((s) => {
                    return s.isactive === true; // show only active game.
                  })
                  .map((row, index) => {
                    return (
                      <NewWrapper
                        key={index}
                        onClick={() => {
                          handleJoinGameClick(row);
                        }}
                      >
                        <Title>{row.name}</Title>
                        <GameFrameImg
                          src={`${
                            config.sourceUrl
                          }${row.gpcode.toUpperCase()}/${Common.getCDNLanguagePrefix()}/${
                            row.code
                          }.png`}
                          id={
                            currentType !== row.type
                              ? `gameType${row.type}`
                              : `gameId${row.id}`
                          }
                        ></GameFrameImg>
                      </NewWrapper>
                    );
                  })}
              </WrapTheGames>
            </SlotGameTypeWrapper>
          ) : selected ? (
            <GameButtonWrapper>
              {(() => {
                return homePageGameList
                  .filter((game) => selected.indexOf(game.type) >= 0)
                  .sort((a, b) => {
                    if (config.features.LiveGame_Sorting_SKY) {
                      var sortDGFirst = ["DG"];
                      return (
                        sortDGFirst.indexOf(b.abbreviation) -
                        sortDGFirst.indexOf(a.abbreviation)
                      );
                    } else return b - a;
                  })
                  .map((row, index) => {
                    return (
                      <NewWrapper maintenance={row.status !== 0} key={index}>
                        <Maintenance>
                          <MaintenanceContentHolder>
                            <img
                              src={
                                process.env.PUBLIC_URL +
                                "/assets/images/wapp/resource/T13/homepage/notavailable.png"
                              }
                              alt={"not available"}
                              style={{
                                width: "200px",

                                transform: "rotate(-35deg)",
                              }}
                            />
                          </MaintenanceContentHolder>
                        </Maintenance>
                        <LogoOverlay
                          onClick={() =>
                            handleGameClick(
                              row.type,
                              row.gpcode,
                              row.game_platform_id
                            )
                          }
                        >
                          <img
                            src={
                              process.env.PUBLIC_URL +
                              `/assets/images/provider/${row.abbreviation.toLowerCase()}.png`
                            }
                            style={{ width: "200px", height: "auto" }}
                            alt={row.abbreviation.toLowerCase()}
                          />
                        </LogoOverlay>
                        <GameFrameImg
                          src={`${
                            process.env.PUBLIC_URL
                          }/assets/images/wapGame/T13/${getImgPrefix(
                            row.type
                          )}-${row.abbreviation.toLowerCase()}.png`}
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
                        ></GameFrameImg>
                      </NewWrapper>
                    );
                  });
              })()}
            </GameButtonWrapper>
          ) : (
            <>
              <ContentWrapper title="jackpot" icon="jackpot">
                <Jackpot />
              </ContentWrapper>
              {checking("hot").length > 0 && (
                <ContentWrapper
                  title={i18n.t("T13.topGames")}
                  type="game"
                  icon="games"
                  joinGame={handleJoinGameClick}
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
                  icon="games"
                  joinGame={handleJoinGameClick}
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
                  icon="games"
                  joinGame={handleJoinGameClick}
                  games={checking("new")}
                  seeMoreAt={() => {
                    navigateToSlot();
                  }}
                />
              )}
              <ContentWrapper
                title={i18n.t("common.promotion")}
                icon="promotions"
                noGap
              >
                <Slick {...settings}>
                  {general.promotionList.items.length > 0 &&
                    general.promotionList.items.map((data, index) => {
                      return (
                        <ListItem
                          onClick={() => {
                            AppHistory.push({
                              pathname: "/promotion/" + data.id,
                            });
                          }}
                          src={
                            data.localization[i18n.language] &&
                            (data.localization[i18n.language].mobileBanner ||
                              data.mobileBanner)
                          }
                          alt={index}
                        />
                      );
                    })}
                </Slick>
                <div>
                  <Button
                    label={i18n.t("common.more")}
                    onClick={() => {
                      AppHistory.push("/promotion-list");
                      window.scrollTo(0, 0);
                    }}
                  />
                </div>
              </ContentWrapper>
              <ContentWrapper title={i18n.t("T13.winner")} icon="winners">
                <WinnerList list={list} />
              </ContentWrapper>
              <ContentWrapper title={i18n.t("T13.topNews")} icon="news" noGap>
                {hardcodeNews.slice(0, 6).map((data, index) => {
                  return (
                    <News
                      key={index}
                      data={data}
                      onClick={() => {
                        AppHistory.push("/news/" + data.id);
                        window.scrollTo(0, 0);
                      }}
                    />
                  );
                })}

                <div>
                  <Button
                    label={i18n.t("common.more")}
                    onClick={() => {
                      AppHistory.push("/news");
                      window.scrollTo(0, 0);
                    }}
                  />
                </div>
              </ContentWrapper>
              <ContentWrapper
                darktone="#0e0f1a"
                title={i18n
                  .t("T13.brandTag")
                  .replace("{brandName}", config.brandName)}
                icon="pg"
                type="text"
              >
                <div style={{ display: "flex", justifyContent: " center" }}>
                  <img
                    src={general.brand.mobileLogoUrl}
                    alt="logo"
                    style={{ height: 100 }}
                  />
                </div>
                {i18n
                  .t("T13.brandDescription")
                  .replace("{brandName}", config.brandName)}
              </ContentWrapper>
              <ContentWrapper
                style={{ lineHeight: 1.75 }}
                title={i18n.t("T13.gamingLicense")}
                type="game"
                darktone="#0e0f1a"
                icon="about"
              >
                <div
                  style={{
                    padding: "0 20px",
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  <img
                    src={GamingLicensePNG}
                    alt="logo"
                    style={{ width: 350, marginBottom: 15 }}
                  />
                  {i18n
                    .t("T13.footer.copyright")
                    .replace(/{brand}/g, config.brandName)}
                  <br /> {i18n.t("T13.footer.rights")}
                  <br />
                  Version {process.env.REACT_APP_VERSION}
                </div>
              </ContentWrapper>

              <ContentWrapper
                title={i18n.t("T13.quickLink.title")}
                icon="links"
                darktone="#0e0f1a"
              >
                <div style={{ padding: "0 20px" }}>
                  <QuickLinks navigateTo={navigateTo} alert={alert} />
                </div>
              </ContentWrapper>
              <ContentWrapper
                title={i18n.t("T13.partners")}
                icon="partners"
                darktone="#0e0f1a"
              >
                <div style={{ padding: "0 20px" }}>
                  <Partners providers={game.providerList} />
                </div>
              </ContentWrapper>
            </>
          )}
        </GridWrapper>
        <Loading show={loading} />
      </TheContainer>
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    game: state.game,
    token: state.account.token,
    general: state.general,
  };
};

export default connect(mapStateToProps, null)(Template13);
