import React from "react";
import styled from "styled-components";

const FavUnfav = styled.div`
  background: url(${({ fav }) => {
      return (
        process.env.PUBLIC_URL +
        "/assets/images/wapp/resource/T14/homepage/wrapper-icon/" +
        (fav ? "faved" : "unfav") +
        ".png"
      );
    }})
    no-repeat center;
  width: 40px;
  height: 40px;
  background-size: 100%;
`;

const FavButton = ({ active, handleClick }) => {
  return <FavUnfav fav={active} onClick={handleClick} />;
};

export default FavButton;
