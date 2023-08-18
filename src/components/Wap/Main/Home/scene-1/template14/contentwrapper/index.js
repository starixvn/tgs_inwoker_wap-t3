import React from "react";
import styled from "styled-components";
import config from "../../../../../../../config/config";
import Common from "../../../../../../../utils/Common";
import i18n from "../../../../../../../utils/i18n";
import Button from "../../../../../components/button";
import FavButton from "../favbutton";

const ContentWrapperx = styled.div`
  border-radius: 50px;
  color: #fff;
  display: flex;
  flex-direction: column;
  padding: 20px 10px 20px 10px;

  background: ${({ darktone }) => {
    return darktone && darktone;
  }};

  margin-bottom: ${({ darktone }) => {
    return darktone ? "20px" : "0px";
  }};
`;

const TitleSection = styled.div`
  display: flex;
  font-size: 40px;
  gap: 10px;
  align-items: center;
  padding: 10px 0 30px 0;
  color: ${({ theme }) => theme.primary};
  text-transform: uppercase;
`;

const IconHolder = styled.img`
  height: 40px;
  width: 40px;
`;

const ContentHolder = styled.div`
  display: grid;
  grid-template-columns: ${({ content }) => {
    return content ? "" : "repeat(3, 1fr)";
  }};
  gap: ${({ noGap }) => {
    return noGap ? "0px" : "20px";
  }};

  padding: ${({ type }) => {
    return type === "text" ? "0px 20px 40px 20px" : "0 0 20px 0 ";
  }};
  font-size: 24px;
`;

const TheGamesOrContent = styled.div`
  background: url(${({ background }) => {
      return background;
    }})
    no-repeat center;
  background-size: 100%;
  height: 200px;
  width: 200px;
  position: relative;
  border-radius: 250px;
`;

const TheOverlay = styled.div`
  height: 100%;
  width: 100%;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: none;
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  background: rgba(27, 29, 48, 0.75);
  :active {
    opacity: 1;
  }

  /** make opacity animation**/
  transition: opacity 0.5s;
`;

const JoinButton = styled.div`
  width: 150px;
  height: 60px;
  background: ${({ theme }) => theme.primary};
  border-radius: 50px;

  filter: drop-shadow(0 0 10px ${({ theme }) => theme.primary})
    drop-shadow(0 0 10px ${({ theme }) => theme.primary}) contrast(1)
    brightness(1);
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 20px;

  text-transform: uppercase;
`;

const TheContent = styled.div``;

const FavUnfav = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-end;
  padding: 20px;
`;

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
const Title = styled.div`
  width: 100%;
  padding: 10px;
  text-align: center;

  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const FavButtonHolder = styled.div`
  transform: scale(0.8);
  display: flex;
  align-items: center;
  gap: 20px;
  justify-content: center;
  padding-bottom: 20px;
`;

const ContentWrapper = React.memo(
  ({
    title,
    children,
    icon,
    games,
    joinGame,
    seeMoreAt,
    darktone,
    noGap,
    type,
    style,
    favGame,
    setFavGame,
    removeFavGame,
  }) => {
    return (
      <ContentWrapperx darktone={darktone}>
        <TitleSection>
          <IconHolder
            src={
              process.env.PUBLIC_URL +
              "/assets/images/wapp/resource/T14/homepage/wrapper-icon/" +
              icon +
              ".svg"
            }
          />
          <div>{title}</div>
        </TitleSection>
        <ContentHolder
          content={children}
          noGap={noGap}
          type={type}
          style={style}
        >
          {children ? (
            children
          ) : (
            <>
              {games.length >= 0 &&
                games.slice(0, 6).map((row, index) => {
                  return (
                    <OuterWrapper>
                      <NewWrapper
                        key={index}
                        onClick={() => {
                          joinGame(row);
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
                          active={favGame.includes(row.id)}
                          handleClick={(e) => {
                            e.stopPropagation();
                            if (!favGame.includes(row.id)) {
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
            </>
          )}
        </ContentHolder>
        {seeMoreAt && (
          <Button
            style={{ width: "100%" }}
            label={i18n.t("common.more")}
            onClick={seeMoreAt}
          />
        )}
      </ContentWrapperx>
    );
  }
);

export default ContentWrapper;
