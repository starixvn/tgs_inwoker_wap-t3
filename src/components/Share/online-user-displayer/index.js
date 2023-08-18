import i18next from "i18next";
import React, { useEffect, useState } from "react";
import styled from "styled-components";

import config from "../../../config/config";
const OnlineDisplayerText = styled.div`
  color: ${({ color, theme }) => {
    return color ? color : theme.secondary;
  }};
  font-size ${({ size }) => {
    return size ? size : "";
  }};
  text-align: ${({ textAlign }) => {
    return textAlign ? textAlign : "unset";
  }};
  display: flex;
   gap: 5px;
  min-width: fit-content;
  padding: ${({ padding }) => {
    return padding ? padding : "0 10px 0 0";
  }};
  ${({ iconOnly }) => (iconOnly ? `align-items: center;` : ``)}
`;

const OnlineUserText = styled.span`
  font-weight: bold;
`;

const UserIcon = styled.div`
  mask: url(${({ icon }) => {
      return icon;
    }})
    no-repeat center;
  mask-size: 100%;

  background-color: #fff;
  width: 20px;
  height: 30px;
`;

const OnlineUserDisplayer = ({ color, size, textAlign, padding, iconOnly }) => {
  function randomNumberGenerator(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }

  const [totalPlayer, setTotalPlayer] = useState(
    sessionStorage.getItem("userOnlineCount") ?? null
  );

  useEffect(() => {
    if (totalPlayer === null) {
      setTimeout(() => {
        var userRange = randomNumberGenerator(
          config.features.Home_OnlineUsers.min,
          config.features.Home_OnlineUsers.max
        );
        sessionStorage.setItem("userOnlineCount", userRange);
        setTotalPlayer(userRange);
      }, 1000);
    }

    const interval = setInterval(() => {
      var userRange = randomNumberGenerator(
        config.features.Home_OnlineUsers.min,
        config.features.Home_OnlineUsers.max
      );
      setTotalPlayer(userRange);
    }, 10000);

    return () => {
      clearInterval(interval);
    };
  });

  return (
    <OnlineDisplayerText
      color={color}
      size={size}
      textAlign={textAlign}
      padding={padding}
      iconOnly={iconOnly}
    >
      {iconOnly ? (
        <UserIcon
          icon={process.env.PUBLIC_URL + "/assets/images/wapp/user.png"}
        />
      ) : (
        i18next.t("common.playeronline") + ": "
      )}{" "}
      <OnlineUserText>{totalPlayer}</OnlineUserText>
    </OnlineDisplayerText>
  );
};

export default OnlineUserDisplayer;
