import React from "react";
import styled from "styled-components";
import i18n from "../../../../../../utils/i18n";
import { connect } from "react-redux";
import { useState } from "react";
import { AppHistory } from "../../../../../../history/History";
import { useEffect } from "react";
import Drawer from "../../../drawer";

const Variant4Wrapper = styled.div`
  display: flex;
  gap: 20px;
  font-size: 28px;
  padding-right: 30px;
  align-items: center;
`;

const VipButton = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  font-size: 20px;
`;

const Button = styled.div`
  padding: 10px 20px;
  border-radius: 15px;
  border: solid 1px
    ${({ theme }) => {
      return theme.primary;
    }};
`;

const LoginButton = styled(Button)`
  color: ${({ theme }) => {
    return theme.primary;
  }};
`;
const RegisterButton = styled(Button)`
  background: ${({ theme }) => {
    return theme.primary;
  }};
  margin-right: 10px;
`;

const Variant4 = () => {
  return (
    <>
      <Variant4Wrapper>
        <VipButton
          onClick={() => {
            window.scrollTo(0, 0);
            AppHistory.push("/vip");
          }}
        >
          <img
            src={process.env.PUBLIC_URL + "/assets/images/wapp/home-vip.png"}
            alt=""
            style={{ height: 20, marginRight: 10 }}
          />
          VIP
        </VipButton>
        <LoginButton
          onClick={() => {
            AppHistory.push("/login");
          }}
        >
          {i18n.t("common.login")}
        </LoginButton>
        <RegisterButton
          onClick={() => {
            AppHistory.push("/login?do=register");
          }}
        >
          {i18n.t("common.register")}
        </RegisterButton>
      </Variant4Wrapper>
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    account: state.account,
  };
};

export default connect(mapStateToProps, null)(Variant4);
