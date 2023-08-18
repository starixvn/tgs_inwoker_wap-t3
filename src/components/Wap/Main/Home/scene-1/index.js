import React from "react";

import Template11 from "./template11";
import Template13 from "./template13";
import Template14 from "./template14";

const TemplateSwitcher = ({
  template,
  gameTypeListSorting,
  homePageGameList,
  getImgPrefix,
  selectedGameType,
  convertGameTypeToText,
  handleGameTypeClick,
  handleGameClick,
  gameMenu,
  gameMenu2,
  shiftScene,
  changeShowGame,
  scrollRef,
  handleSignupClick,
  listOfGame,
  getBannerTemplate,
  token,
  alert,
}) => {
  const commonprops = {
    gameTypeListSorting,
    homePageGameList: homePageGameList,
    getImgPrefix,
    selectedGameType,
    convertGameTypeToText,
    handleGameTypeClick,
    handleGameClick,
    gameMenu,
    gameMenu2,
    shiftScene,
    changeShowGame,
    template,
    scrollRef: scrollRef,
    handleSignupClick,
    listOfGame,
    getBannerTemplate: getBannerTemplate,
    token,
    alert,
  };

  const switchTemplate = (template) => {
    switch (template) {
      case 11:
        return <Template11 {...commonprops} />;
      case 13:
        return <Template13 {...commonprops} />;
      case 14:
        return <Template14 {...commonprops} />;
      default:
        <Template13 {...commonprops} />;
    }
  };
  return switchTemplate(template);
};

export default TemplateSwitcher;
