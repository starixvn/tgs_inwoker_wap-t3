import React from "react";
import Variant1 from "./variant1";
import config from "../../../../config/config";

const variantComponents = {
  13: Variant1,
};

const WapModal = ({ title, children, open, handleClose }) => {
  const CommonProps = {
    title: title,
    children: children,
    open: open,
    handleClose: handleClose,
  };
  const VariantComponent = variantComponents[config.wapVersion] || Variant1;
  return <VariantComponent {...CommonProps} />;
};

export default WapModal;
