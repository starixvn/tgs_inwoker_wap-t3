import React from "react";
import styled from "styled-components";
import config from "../../../../../../../../config/config";

const GameButtonWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-gap: 15px;
  padding: 20px 20px 10px 20px;
  align-content: baseline;
  min-height: 80vh;
  background: #000325;
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

const MaintenanceContentHolder = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
  padding: 50px;
  display: flex;
  justify-content: flex-end;
  align-items: flex-end;
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

const ListTypeGameScene = ({ filtering, handleGameClick, getImgPrefix }) => {
  return (
    <GameButtonWrapper>
      {(() => {
        return filtering
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
                    handleGameClick(row.type, row.gpcode, row.game_platform_id)
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
                  onClick={() =>
                    handleGameClick(row.type, row.gpcode, row.game_platform_id)
                  }
                ></GameFrameImg>
              </NewWrapper>
            );
          });
      })()}
    </GameButtonWrapper>
  );
};

export default ListTypeGameScene;
