import React from "react";
import styled from "styled-components";
import i18n from "../../../../../../../../utils/i18n";
import { useState } from "react";
import config from "../../../../../../../../config/config";
import Common from "../../../../../../../../utils/Common";
import FavButton from "../../favbutton";
import { wapBorderRadius } from "../../../../../../../../config/settings";

const GameFrameImg = styled.div`
  display: block;

  aspect-ratio: 1;

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

const OuterWrapper = styled.div`
  position: relative;
`;

const NewWrapper = styled.div`
  position: relative;
  aspect-ratio: 1;
  border-radius: 200px;

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

const SlotGameTypeWrapper = styled.div`
  font-size: 28px;
  padding: 20px;
  color: #fff;
`;

const SearchSection = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
`;

const ProviderListWrapper = styled.div`
  background: #1f213a;
  width: -webkit-fill-available;
  position: relative;
  border-radius: ${({ theme }) => {
    return theme.wapBorderRadius ? theme.wapBorderRadius : "50px";
  }};
`;
const ProviderList = styled.select`
  background: #1f213a;
  border: none;

  padding: 20px 40px;
  color: #fff;
  font-size: 28px;
  width: -webkit-fill-available;
  outline: none;
  -webkit-appearance: none;
  -moz-appearance: none;
  text-indent: 1px;
  text-overflow: "";
  border-radius: ${({ theme }) => {
    return theme.wapBorderRadius ? theme.wapBorderRadius : "50px";
  }};
`;

const SearchBar = styled.input`
  background: #1f213a;
  border: none;
  border-radius: ${({ theme }) => {
    return theme.wapBorderRadius ? theme.wapBorderRadius : "50px";
  }};
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
  grid-template-columns: 1fr 1fr 1fr;
  gap: 20px;
`;

const Title = styled.div`
  width: 100%;
  padding: 10px;
  text-align: center;

  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const TitleAndAction = styled.div`
  position: absolute;
  bottom: 0;
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

const FavButtonHolder = styled.div`
  transform: scale(0.8);
  display: flex;
  align-items: center;
  gap: 20px;
  justify-content: center;
  padding-bottom: 20px;
`;

const SlotTypeGameScene = ({
  filtering,
  gameList,
  handleJoinGameClick,
  favList,
  setFavGame,
  removeFavGame,

  setSelectedBrand,
}) => {
  const [keyword, setKeyword] = useState("");

  return (
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
            {filtering
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
          </ProviderList>
          <ArrowDown />
        </ProviderListWrapper>
      </SearchSection>
      <WrapTheGames>
        {gameList
          .filter((a) => {
            if (keyword === "") return true;
            else return a.name.toUpperCase().includes(keyword.toUpperCase());
          })
          .filter((s) => {
            return s.isactive === true; // show only active game.
          })
          .map((row, index) => {
            return (
              <OuterWrapper>
                <NewWrapper
                  key={index}
                  onClick={() => {
                    handleJoinGameClick(row);
                  }}
                >
                  <GameFrameImg
                    src={`${
                      config.sourceUrl
                    }${row.gpcode.toUpperCase()}/${Common.getCDNLanguagePrefix()}/${
                      row.code
                    }.jpg`}
                  ></GameFrameImg>
                </NewWrapper>
                <Title>{row.name}</Title>
                <FavButtonHolder>
                  <FavButton
                    active={favList.includes(row.id)}
                    handleClick={(e) => {
                      e.stopPropagation();
                      if (!favList.includes(row.id)) {
                        setFavGame(row.id);
                      } else {
                        removeFavGame(row.id);
                      }
                    }}
                  />
                  <div>{i18n.t("collect")}</div>
                </FavButtonHolder>
              </OuterWrapper>
            );
          })}
      </WrapTheGames>
    </SlotGameTypeWrapper>
  );
};

export default SlotTypeGameScene;
