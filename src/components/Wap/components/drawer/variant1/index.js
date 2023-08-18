import React from "react";
import styled from "styled-components";
import i18n from "../../../../../utils/i18n";
import BalanceDisplayer from "../../balance";
import { AppHistory } from "../../../../../history/History";

const Overlay = styled.div`
  position: fixed;
  z-index: 99999999;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.7);
  display: ${({ show }) => {
    return show ? "flex" : "none";
  }};
  flex-direction: column;
  font-size: 30px;
  transition: all 0.3s ease-in-out;
`;

const Drawer = styled.div`
  position: absolute;
  background: #181c42;
  right: 0;
  top: 0;
  width: 60vw;
  height: 100vh;
`;

const UserSection = styled.div`
  background: #242958;
  height: 300px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: relative;
`;

const CloseButton = styled.div`
  position: absolute;
  background: #fff;
  border-radius: 50px;
  right: 20px;
  top: 20px;
  height: 50px;
  width: 50px;
  font-size: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  color: #000;
`;

const UserSectionContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  justify-content: center;
  text-align: center;
`;

const Username = styled.div`
  font-size: 50px;
`;

const MenuSection = styled.div`
  display: flex;
  flex-direction: column;
`;

const MenuButtonWrapper = styled.div`
  padding: 30px 40px;
  display: flex;
  gap: 30px;
  align-items: center;
`;

const Icon = styled.div`
  height: 40px;
  width: 40px;
  mask: url(${({ src }) => {
    return process.env.PUBLIC_URL + "/assets/images/wapp/" + src + ".svg";
  }});
  background: #fff;
  mask-size: contain;
  mask-repeat: no-repeat;
`;

const MenuButton = ({ title, path, handleClick }) => {
  const whenClick = () => {
    if (path) {
      AppHistory.push(path);
    }
    if (handleClick) {
      handleClick();
    }
  };

  return (
    <MenuButtonWrapper onClick={whenClick}>
      <Icon src={title} />
      <div>{i18n.t(title)}</div>
    </MenuButtonWrapper>
  );
};

const Variant1 = ({ open, handleClose, account, logout }) => {
  const menuItems = [
    { title: "message", path: "/inbox" },
    { title: "announcement", path: "/news" },
    { title: "changepassword", path: "/profile/changepassword" },

    { title: "betrecord", path: "/report/2" },
    { title: "language", path: "/setting/language" },
    {
      title: "signout",
      handleClick: () => {
        logout(account.token);
      },
    },
  ];
  return (
    <Overlay show={open} onClick={handleClose}>
      <Drawer
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        <UserSection>
          {account.token ? (
            <UserSectionContent>
              <Username>{account.info.member_username}</Username>
              <BalanceDisplayer />
            </UserSectionContent>
          ) : (
            <div>{i18n.t("wap.main.home.profile.pleaseLogin")}</div>
          )}
          <CloseButton onClick={handleClose}>✖</CloseButton>
        </UserSection>
        <MenuSection>
          {menuItems
            .filter((item) => {
              if (account.token) {
                return true;
              } else {
                return item.notRequiredLogin;
              }
            })
            .map((item, index) => (
              <MenuButton
                key={index}
                title={item.title}
                path={item.path}
                handleClick={item.handleClick}
              />
            ))}
        </MenuSection>
      </Drawer>
    </Overlay>
  );
};

export default Variant1;
