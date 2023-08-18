import React from "react";
import styled from "styled-components";
import AppBar from "@material-ui/core/AppBar";
import { withStyles } from "@material-ui/core/styles";
import BottomNavigation from "@material-ui/core/BottomNavigation";
import BottomNavigationAction from "@material-ui/core/BottomNavigationAction";
import config from "../../../../config/config";
import i18n from "../../../../utils/i18n";
import { AppHistory } from "../../../../history/History";
import { connect } from "react-redux";

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
  
  & .MuiBottomNavigationAction-label {
    ${(props)=> i18n.language === "ta-IN" ? "font-size: 13px !important;" : ""}
  }

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

const BottomNavBar = (props) => {
  const [currentPage, setCurrentPage] = React.useState("");
  const hideAppBar = [
    "login",
    "register",
    "forgot-password",
    "login?do=register",
  ];
  const currentPath = props.link.split("/");
  const currentPathName = currentPath[currentPath.length - 1];

  const handleChangeSelection = (value, resetPage) => {
    if (
      !(value === "/promotion-list" || value === "/") &&
      props.account.token == null
    ) {
      AppHistory.push("/login");
    } else {
      AppHistory.push({
        pathname: value,
        state: { resetPage: resetPage },
      });
    }
    setCurrentPage(value);
  };

  React.useEffect(() => {
    window.onpopstate = () => {
      setCurrentPage(window.location.pathname);
    };
  }, []);

  const bottomNavButtonT13 = [
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

  const bottomNavButtonT14 = [
    {
      icon: "home.svg",
      text: "wap.main.homePage",
      to: "/",
    },
    {
      icon: "promotion.svg",
      text: "wap.main.promo",
      to: "/promotion-list",
    },
    {
      icon: "deposit.svg",
      text: "common.deposit",
      to: "/deposit",
    },
    {
      icon: "cs.svg",
      text: "onlinechat",
      to: "/main/support",
    },
    {
      icon: "me.svg",
      text: i18n.exists(`${config.brand}.my`)
        ? `${config.brand}.my`
        : "wap.main.my",
      to: "/main/profile",
    },
  ];
  return (
    <div>
      {!hideAppBar.includes(currentPathName) ? (
        <CustomStyledAppBar position="fixed" color="default">
          <CustomCustomBottomNav
            value={currentPage}
            showLabels
            style={{ width: "750px", height: "90px" }}
          >
            {(config.wapVersion === 13
              ? bottomNavButtonT13
              : bottomNavButtonT14
            ).map((data, index) => {
              return (
                <CustomCustomBottomNavAction
                  label={i18n.t(data.text)}
                  value={data.to}
                  onClick={() => handleChangeSelection(data.to, data.resetPage)}
                  icon={
                    data.isGif ? (
                      <GifHolder
                        icon={
                          process.env.PUBLIC_URL +
                          `/assets/images/wapp/bottomnav/${data.icon}.gif`
                        }
                      />
                    ) : (
                      <IconHolder
                        icon={
                          process.env.PUBLIC_URL +
                          `/assets/images/wapp/bottomnav/${data.icon}`
                        }
                      />
                    )
                  }
                />
              );
            })}
          </CustomCustomBottomNav>
        </CustomStyledAppBar>
      ) : (
        <></>
      )}
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    account: state.account,
    wallet: state.wallet,
    game: state.game,
  };
};

export default connect(mapStateToProps, null)(BottomNavBar);
