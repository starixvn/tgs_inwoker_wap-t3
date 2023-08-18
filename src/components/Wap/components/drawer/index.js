import React from "react";
import Variant1 from "./variant1";
import config from "../../../../config/config";
import { connect } from "react-redux";
import styled from "styled-components";
import { useState } from "react";
import { accountAction } from "../../../../api-services/actions/accountAction";

const HamburgerButton = styled.div`
  height: 30px;
  width: 30px;
  margin-left: 20px;
  mask: url(${process.env.PUBLIC_URL + "/assets/images/wapp/hamburger.svg"});
  background: ${({ theme }) => {
    return theme.primary;
  }};
  mask-size: contain;
  mask-repeat: no-repeat;
`;

const Drawer = ({ account, logout }) => {
  const [open, setOpen] = useState(false);

  const handleClose = (e) => {
    setOpen(false);
  };

  const commonprops = {
    open: open,
    handleClose: handleClose,
    account: account,
    logout: logout,
  };

  const variantSwitcher = (variant) => {
    switch (variant) {
      case 1:
        return <Variant1 {...commonprops} />;
      default:
        return <Variant1 {...commonprops} />;
    }
  };

  return (
    <div>
      <HamburgerButton
        onClick={() => {
          setOpen(true);
        }}
      />
      {variantSwitcher(config.wapVersion)}
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    account: state.account,
  };
};

const mapDispatchToProps = (dispatch) => {
  return { logout: (token) => dispatch(accountAction.accountLogout(token)) };
};

export default connect(mapStateToProps, mapDispatchToProps)(Drawer);
