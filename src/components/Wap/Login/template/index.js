import React from "react";
import Template1 from "./template1";
import Template11 from "./template11";
import Variant3 from "./variant3";
import Variant4 from "./variant4";

const LoginTemplateSwitcher = ({
  template,
  logoImg,
  handleChangeSelection,
  isUpdate,
  ...props
}) => {
  const commonProps = {
    template,
    logoImg,
    handleChangeSelection,
    isUpdate,
    ...props,
  };

  const switchTemplate = (template) => {
    switch (template) {
      case 11:
        return <Template11 {...commonProps} />;
      case 13:
        return <Variant3 {...commonProps} />;
      case 14:
        return <Variant4 {...commonProps} />;
      default:
        return <Template1 {...commonProps} />;
    }
  };

  return switchTemplate(template);
};

export default LoginTemplateSwitcher;
