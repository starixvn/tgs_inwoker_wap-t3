import React, { useEffect, useState } from "react";
import Header from "../Share/Header";
import i18n from "../../../utils/i18n";
import styled from "styled-components";
import { GameService } from "../../../api-services/services/GameService";
import { GameTypeEnum } from "../../../api-services/utils/Enum";
import config from "../../../config/config";
import Common from "../../../utils/Common";

const Container = styled.div`
  color: #fff;
  padding: 120px 20px;
  font-size: 20px;
`;

const GameDisplayer = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
`;

const GameItem = styled.div`
  height: 200px;
  width: 200px;
  border-radius: 250px;

  background-image: url(${(props) => props.image});
  background-size: cover;
`;

const DisplayTheItem = styled.div`
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
`;

const NoContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  height: 70vh;
  justify-content: center;
`;

const NoContentImage = styled.div`
  background: url(${(props) => props.image});
  height: 200px;
  width: 200px;
  background-size: cover;
`;

const MyFavorites = () => {
  const [list, setList] = useState([]);
  const [gameList, setGameList] = useState([]);

  function getFavoriteGames(type) {
    var result = GameService.GetFavoriteGame(type);
    result.then((response) => {
      if (response.IsSuccess) {
        var data = response.data;
        // Check if type already exists in list
        const typeIndex = list.findIndex((item) => item.type === type);
        if (typeIndex === -1) {
          // Type does not exist, add it to the list
          setList((prevList) => [...prevList, { type, games: data }]);
        } else {
          // Type already exists, update its games
          const newList = [...list];
          newList[typeIndex].games = data;
          setList(newList);
        }
      }
    });
  }

  function getGameList(type) {
    var result = GameService.GetGameList("", type);
    result.then((response) => {
      if (response.IsSuccess) {
        var data = response.data;
        // Check if type already exists in list
        setGameList((prevList) => [...prevList, { type, games: data }]);
      }
    });
  }

  const [filteredGame, setFilteredGame] = useState([]);

  var gameToLoop = [
    GameTypeEnum.SLOT,
    GameTypeEnum.FISH,
    GameTypeEnum.TABLEGAME,
  ];

  useEffect(() => {
    gameToLoop.forEach((type) => {
      getFavoriteGames(type);
      getGameList(type);
    });
  }, []);

  function findSimilarIds(list1, list2) {
    const similarData = [];

    for (const item1 of list1) {
      for (const item2 of list2) {
        if (item1.type === item2.type) {
          const similarGames = [];
          for (const gameId of item1.games) {
            for (const gameObj of item2.games) {
              if (gameId === gameObj.id) {
                similarGames.push(gameObj);
              }
            }
          }
          if (similarGames.length > 0) {
            const typeIndex = similarData.findIndex(
              (item) => item.type === item1.type
            );
            if (typeIndex === -1) {
              similarData.push({ type: item1.type, games: similarGames });
            } else {
              similarData[typeIndex].games = [
                ...similarData[typeIndex].games,
                ...similarGames,
              ];
            }
          }
        }
      }
    }

    return similarData;
  }

  useEffect(() => {
    setFilteredGame(findSimilarIds(list, gameList));
  }, [gameList]);

  const triggerGame = (gptype, gpcode, gpid) => {
    Common.closePreviousPopup();
    Common.PopupCenter(`/joingame/${gptype}/${gpcode}/${gpid}`, "gamewindow");
  };

  return (
    <>
      <Header
        title={i18n.t("myfavorite")}
        onBackClick={() => {
          window.history.back();
        }}
      />
      <Container>
        {filteredGame.length ? (
          <GameDisplayer>
            {filteredGame.map((data1, index) => {
              return (
                <>
                  {data1.games &&
                    data1.games.map((data2, index) => {
                      return (
                        <DisplayTheItem
                          onClick={() => {
                            triggerGame(data2.type, data2.gpcode, data2.id);
                          }}
                        >
                          <GameItem
                            image={
                              config.sourceUrl +
                              data2.gpcode +
                              "/" +
                              i18n.language +
                              "/" +
                              data2.code +
                              ".jpg"
                            }
                          ></GameItem>
                          <div>{data2.name}</div>
                        </DisplayTheItem>
                      );
                    })}
                </>
              );
            })}
          </GameDisplayer>
        ) : (
          <NoContent>
            <NoContentImage
              image={
                process.env.PUBLIC_URL +
                "/assets/images/pcAccountMenu/no-favorite.svg"
              }
              alt=""
            />
            <div>{i18n.t("myfavoriteDescription1")}</div>
            <div>{i18n.t("myfavoriteDescription2")}</div>
          </NoContent>
        )}
      </Container>
    </>
  );
};

export default MyFavorites;
