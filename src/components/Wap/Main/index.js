import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import styled from "styled-components";
import AppBar from "@material-ui/core/AppBar";
import { withStyles } from "@material-ui/core/styles";
import Dialog from "@material-ui/core/Dialog";

import BottomNavigation from "@material-ui/core/BottomNavigation";
import BottomNavigationAction from "@material-ui/core/BottomNavigationAction";

import My from "./My/index";
import Home from "./Home/index";
import i18n from "../../../utils/i18n";
import config from "../../../config/config";
import Support from "./Support/index";
import Download from "../Download";

const StyledBottomAppBar = withStyles({
  root: {
    height: "90px",
    top: "auto",
    bottom: 0,
    background: "none",
  },
})(AppBar);

const CustomStyledAppBar = styled(StyledBottomAppBar)`
  border-radius: ${({ theme }) => theme.bottomnavrad};
`;
const CustomBottomNavigation = withStyles((theme) => ({
  root: {
    background: "none",
  },
}))(BottomNavigation);

const CustomCustomBottomNav = styled(CustomBottomNavigation)`
  background: ${({ theme }) => theme.bottomnav};
  border-radius: ${({ theme }) => theme.bottomnavrad};
`;
const CustomBottomNavigationAction = withStyles({
  root: {
    width: "570px",
    height: "90px",
    "&.Mui-selected": {
      "& .MuiBottomNavigationAction-wrapper>div": {
        backgroundColor: "#C69C6A",
      },
    },
  },
  label: {
    fontSize: config.brand === "TIGER" ? "24px" : "21px",
    marginTop: "5px",

    "&.Mui-selected": {
      fontSize: "21px !important",
      marginTop: "5px",
      color: "#000",
    },
  },
})(BottomNavigationAction);

const CustomCustomBottomNavAction = styled(CustomBottomNavigationAction)`
  color: ${({ theme }) => theme.bottomNavAction};
  & .Mui-selected {
    color: ${({ theme }) =>
      theme.bottomNavActionSelected
        ? theme.bottomNavActionSelected
        : theme.primary};
  }
  &.Mui-selected .MuiBottomNavigationAction-wrapper > div {
    background: ${({ theme }) =>
      theme.bottomNavActionSelected
        ? theme.bottomNavActionSelected
        : theme.primary};
  }
`;

const StyledDialog = withStyles({
  root: {
    "& .MuiDialog-paperWidthSm": {
      width: "100%",
      height: "100%",
      maxWidth: "750px",
      maxHeight: "100%",
      margin: 0,
    },
  },
  paper: {
    backgroundColor: "rgba(0,0,0,0.8)",
  },
})(Dialog);
const MenuContainer = styled.div`
  width: 100%;
  height: 100%;
`;
const ButtonCloseMenu = styled.div`
  background: url(${process.env.PUBLIC_URL +
    `/assets/images/wapp/icon-menu-close.png`})
    no-repeat;
  background-size: 68px;
  width: 68px;
  height: 68px;
  margin: 50px auto;
`;
const MenuItemWrap = styled.div`
  margin-top: 50%;
`;
const MenuImage = styled.div`
  width: 100px;
  height: 100px;
  background-color: #383737;
  border-radius: 50%;
  background-image: url(${(props) => props.img});
  background-repeat: no-repeat;
  background-position: center center;
  background-size: 68px;
  margin: 0 auto;

  width: 100px;
  height: 100px;
  border-radius: 50px;
  border: solid 2px #5ceeff;
`;
const Menuitem = styled.div`
  width: calc(100% / 3);
  float: left;
  margin-top: 50px;
`;
const MenuLabel = styled.div`
  font-size: 22px;
  text-align: center;
  color: #5ceeff;
  margin-top: 10px;
`;

const IconHolder = styled.div`
  width: 40px;
  height: 40px;
  background-color: ${({ theme }) => theme.bottomNavAction};
  mask: ${({ icon }) => {
    return `url(${icon}) no-repeat center /
  contain;`;
  }};
`;

const GifHolder = styled.div`
  width: 45px;
  height: 45px;
  background: ${({ icon }) => {
    return `url(${icon}) no-repeat center /
contain;`;
  }};
`;

const DialogWrapper = styled.div`
  height: calc(100% - 90px);
  background: rgba(0, 0, 0, 0.75);
  width: 100%;
  z-index: 100;
  position: fixed;
  top: 0;
  display: ${({ open }) => {
    return open ? "relative" : "none";
  }};
`;

const DialogAction = styled.div`
  position: absolute;
  bottom: 0px;
  display: grid;
  grid-template-columns: auto auto auto;

  background: #707070;
  height: 100px;
  width: 100%;
  padding: 0px 10px;
`;

const CustomButton = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 20px 10px;
  background: ${({ color }) => color};
  font-size: 24px;
  color: white;

  border-radius: 8px;
`;

const ActionButtonIcon = styled(IconHolder)`
  background-color: #fff;
  margin-right: 10px;
  height: 40px;
  width: 40px;
`;
class Main extends Component {
  customDialogActionButton = [
    {
      icon: "deposit",
      color: "#0A9D4C",
      text: "common.deposit",
      to: "/deposit",
    },
    {
      icon: "withdrawal-piso",
      color: "#F79319",
      text: "common.withdrawal",
      to: "/withdrawal",
    },
  ];

  bottomNavButton = [
    {
      icon: "home.svg",
      text: "wap.main.homePage",
      to: "/",
    },
    {
      icon: "deposit.svg",
      text: "common.deposit",
      to: "/deposit",
    },
    {
      icon: "withdrawal.svg",
      text: "common.withdrawal",
      to: "/withdrawal",
    },
    {
      icon: "promotion.svg",
      text: "wap.main.promo",
      to: "/promotion-list",
    },
    {
      icon: "me.svg",
      text: i18n.exists(`${config.brand}.my`)
        ? `${config.brand}.my`
        : "wap.main.my",
      to: "/main/profile",
    },
  ];

  state = {
    currentPage: this.props.history.location.pathname,
    showMenu: false,
  };

  handleContactCs = () => {
    if (this.props.account.token == null) {
      this.props.GetSupportUrl("", "", "", "");
    } else {
      this.props.GetSupportUrl(
        "",
        this.props.account.info.member_username,
        "",
        this.props.account.info.member_email
      );
    }
  };

  handleChangeSelection = (value, resetPage) => {
    if (value === "/main/profile" && this.props.account.token == null) {
      this.props.appHistory.push("/login");
    } else {
      this.setState({
        ...this.state,
        currentPage: value,
      });
      this.props.appHistory.push({
        pathname: value,
        state: { resetPage: resetPage },
      });
      if (this.state.showMenu) {
        this.setState({
          ...this.state,
          showMenu: false,
        });
      }
    }
  };
  toggleMenu = () => {
    if (this.props.account.token == null) {
      this.props.appHistory.push("/login");
    } else {
      this.setState({ ...this.state, showMenu: true });
    }
  };
  handleCloseMenu = () => {
    this.setState({ ...this.state, showMenu: false });
  };

  componentRenderer = (route) => {
    switch (route) {
      case "main":
        return (
          <Home
            navigate={this.props.navigate}
            appHistory={this.props.appHistory}
            alert={this.props.alert}
          />
        );
      case "profile":
        return (
          <My
            navigate={this.props.navigate}
            appHistory={this.props.appHistory}
            alert={this.props.alert}
          />
        );
      case "support":
        return (
          <Support
            alert={this.props.alert}
            navigate={this.props.navigate}
            GetSupportUrl={this.handleContactCs}
          />
        );
      case "download":
        if (config.features.HaveDownloadFeature)
          return <Download alert={this.props.alert} />;
        else this.props.navigate("/");
        break;
      default:
        return (
          <Home
            navigate={this.props.navigate}
            appHistory={this.props.appHistory}
            alert={this.props.alert}
          />
        );
    }
  };

  switchBottomNav = (template) => {
    let bottomNav = [];
    switch (template) {
      default:
        bottomNav = this.bottomNavButton;
        break;
    }
    return bottomNav;
  };

  render() {
    const { page } = this.props.match.params;

    return (
      <React.Fragment>
        {this.componentRenderer(page)}

        <DialogWrapper
          open={this.state.showMenu}
          onClick={this.handleCloseMenu}
        >
          <DialogAction>
            {this.props.game.containTransferWallet &&
              !config.features.NewTransferUI && (
                <CustomButton
                  color="#3C92C5"
                  onClick={() => {
                    this.handleChangeSelection("/transfer");
                  }}
                >
                  <ActionButtonIcon
                    icon={
                      process.env.PUBLIC_URL +
                      `/assets/images/wapp/bottomnav/transfer.svg`
                    }
                  />
                  {i18n.t("common.transfer")}
                </CustomButton>
              )}
            <CustomButton
              color="#0A9D4C"
              onClick={() => {
                this.handleChangeSelection("/deposit");
              }}
            >
              <ActionButtonIcon
                icon={
                  process.env.PUBLIC_URL +
                  `/assets/images/wapp/bottomnav/deposit.svg`
                }
              />
              {i18n.t("common.deposit")}
            </CustomButton>
            <CustomButton
              color="#F79319"
              onClick={() => {
                if (
                  this.props.wallet.bankCardList != null &&
                  this.props.wallet.bankCardList.length === 0 &&
                  config.features.AddCard_NotAllowedEditDelete
                ) {
                  this.props.alert(
                    "",
                    i18n.t("disabledAddCard.title") +
                      " " +
                      i18n.t("disabledAddCard.description")
                  );
                } else {
                  this.handleChangeSelection("/withdrawal");
                }
              }}
            >
              <ActionButtonIcon
                icon={
                  process.env.PUBLIC_URL +
                  `/assets/images/wapp/bottomnav/withdrawal-piso.svg`
                }
              />
              {i18n.t("common.withdrawal")}
            </CustomButton>
          </DialogAction>
        </DialogWrapper>

        <StyledDialog>
          <MenuContainer>
            <MenuItemWrap>
              <Menuitem onClick={() => this.handleChangeSelection("/deposit")}>
                <MenuImage
                  img={
                    process.env.PUBLIC_URL +
                    `/assets/images/wapp/icon-menu-deposit.png`
                  }
                ></MenuImage>
                <MenuLabel>{i18n.t("wap.main.menuDrawer.deposit")}</MenuLabel>
              </Menuitem>
              {this.props.game.containTransferWallet && (
                <Menuitem
                  onClick={() => this.handleChangeSelection("/transfer")}
                >
                  <MenuImage
                    img={
                      process.env.PUBLIC_URL +
                      `/assets/images/wapp/icon-menu-transfer.png`
                    }
                  ></MenuImage>
                  <MenuLabel>
                    {i18n.t("wap.main.menuDrawer.transfer")}
                  </MenuLabel>
                </Menuitem>
              )}

              <Menuitem
                onClick={() => this.handleChangeSelection("/withdrawal")}
              >
                <MenuImage
                  img={
                    process.env.PUBLIC_URL +
                    `/assets/images/wapp/icon-menu-withdrawal.png`
                  }
                ></MenuImage>
                <MenuLabel>
                  {i18n.t("wap.main.menuDrawer.withdrawal")}
                </MenuLabel>
              </Menuitem>

              <Menuitem onClick={() => this.handleChangeSelection("/report/2")}>
                <MenuImage
                  img={
                    process.env.PUBLIC_URL +
                    `/assets/images/wapp/icon-menu-report.png`
                  }
                ></MenuImage>
                <MenuLabel>{i18n.t("wap.main.account.betReport")}</MenuLabel>
              </Menuitem>

              <Menuitem onClick={() => this.handleChangeSelection("/report/3")}>
                <MenuImage
                  img={
                    process.env.PUBLIC_URL +
                    `/assets/images/wapp/icon-menu-report.png`
                  }
                ></MenuImage>
                <MenuLabel>
                  {i18n.t("wap.main.menuDrawer.withdrawalReport")}
                </MenuLabel>
              </Menuitem>
              <Menuitem onClick={() => this.handleChangeSelection("/report/4")}>
                <MenuImage
                  img={
                    process.env.PUBLIC_URL +
                    `/assets/images/wapp/icon-menu-report.png`
                  }
                ></MenuImage>
                <MenuLabel>
                  {i18n.t("wap.main.menuDrawer.depositReport")}
                </MenuLabel>
              </Menuitem>
              <Menuitem onClick={() => this.handleChangeSelection("/card")}>
                <MenuImage
                  img={
                    process.env.PUBLIC_URL +
                    `/assets/images/wapp/icon-menu-card.png`
                  }
                ></MenuImage>
                <MenuLabel>{i18n.t("wap.main.menuDrawer.bankCard")}</MenuLabel>
              </Menuitem>

              <Menuitem onClick={() => this.handleChangeSelection("/inbox")}>
                <MenuImage
                  img={
                    process.env.PUBLIC_URL +
                    `/assets/images/wapp/icon-menu-inbox.png`
                  }
                ></MenuImage>
                <MenuLabel>{i18n.t("wap.main.menuDrawer.inbox")}</MenuLabel>
              </Menuitem>
            </MenuItemWrap>
            <ButtonCloseMenu onClick={this.handleCloseMenu}></ButtonCloseMenu>
          </MenuContainer>
        </StyledDialog>
      </React.Fragment>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    account: state.account,
    game: state.game,
    wallet: state.wallet,
  };
};

export default connect(mapStateToProps, null)(withRouter(Main));
