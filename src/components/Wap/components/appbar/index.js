import React from "react";
import { useState } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router";
import { Textfit } from "react-textfit";
import styled from "styled-components";
import { accountAction } from "../../../../api-services/actions/accountAction";
import { walletAction } from "../../../../api-services/actions/walletAction";
import { GameTypeEnum } from "../../../../api-services/utils/Enum";
import config from "../../../../config/config";
import { AppHistory } from "../../../../history/History";
import Common from "../../../../utils/Common";
import { SortedMenuList } from "../../../../utils/HeaderSorting";
import i18n from "../../../../utils/i18n";
import CustomPopover from "../../../Share/custompopover";
import OnlineUserDisplayer from "../../../Share/online-user-displayer";
import { CustomThemedButton } from "./buttons/custom1";
import { CustomThemedButton2 } from "./buttons/custom2";
import { CustomThemedButton3 } from "./buttons/custom3";
import { StandardThemedButton } from "./buttons/standard";

import BalanceDisplayer from "../balance";
import Drawer from "../drawer";

const NewAppBar = styled.div`
  position: fixed;
  top: 0;
  width: 100%;
  z-index: 3;
  height: 125px;
  background: ${({ theme }) => theme.appbar};
  color: white;
  display: flex;
  justify-content: center;
  flex-direction: column;
  padding: 0px 0px 0px 0px;
`;
const TheContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;
const LogoHolder = styled.div`
  background: url("${({ img }) => img}") no-repeat center center;
  background-size: contain;
  width: 200px;
  height: 100px;
  margin-left: 30px;
  ${({ moveUp }) => {
    return moveUp ? `margin-bottom: 30px;` : "";
  }}
`;
const MakeFloatCenter = styled.div`
  display: flex;
  align-items: center;
  padding-right: 20px;
`;
const VerticalLayoutContainer = styled.div`
  display: flex;
  flex-direction: column;
`;
const CustomButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding-right: 20px;
`;
const CustomColoredButton = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background: ${({ primary, theme }) => {
    return primary ? theme.buttonBackground : "transparent";
  }};
  border: ${({ primary, theme }) => {
    return primary
      ? `solid 1px ${theme.buttonBackground}`
      : `solid 1px ${theme.primaryText}`;
  }};
  color: ${({ primary, theme }) => {
    return primary
      ? theme.wapPrimary
        ? theme.wapPrimary
        : theme.buttonText2
      : theme.primaryText;
  }};
  padding: 10px 40px;
  font-size: 28px;
  margin: 0px 10px;
  border-radius: 30px;
`;

const UsernameContainer = styled.div`
  color: ${({ primary, theme }) => {
    return primary ? theme.buttonText2 : "";
  }};
  font-size: 30px;
  font-weight: bold;
  padding-right: 20px;
`;
const Balance = styled.div`
  text-align: right;
  font-weight: normal;
  color: #ff9900;
  display: flex;
  align-self: flex-end;

  span {
    color: ${({ theme }) => theme.primaryText};
  }
`;
const UsernameText = styled.div`
  color: ${({ theme }) => theme.primaryText};
`;
const BrandAndBalance = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 5px 20px;
  font-size: 24px;
  min-width: 400px;
  color: ${({ theme }) => theme.popoverSubWalletText};
`;
const BrandAndBalanceButBigger = styled(BrandAndBalance)`
  border-bottom: solid 1px ${({ theme }) => theme.popoverSubWalletText};
  margin-bottom: 20px;
  padding-bottom: 20px;
  font-weight: bold;
  color: ${({ theme }) =>
    theme.wapPrimary ? theme.wapPrimary : theme.primary};
  font-size: 30px;
  display: flex;
  align-self: flex-end;
`;
const GameType = styled.div`
  display: flex;
  flex-direction: column;
  padding: 10px 20px;
`;

const GameTypeName = styled.div`
  padding-bottom: 10px;
  opacity: 0.65;
  font-size: 24px;
  color: ${({ theme }) => theme.popoverGameTypeText};
`;
const Brand = styled.div`
  padding-left: 5px;
`;
const Balancex = styled.div`
  text-align: right;
  opacity: 0.75;
`;
const PhoneHolder = styled.div`
  font-size: 20px;
  width: 100%;
  padding-bottom: 5px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: absolute;
  bottom: 0;
`;

const Icon = styled.div`
  width: 20px;
  height: 20px;
  margin-right: 5px;
  background: #fff;
  margin-right: 10px;
  mask: ${({ src }) => {
    return `url(${src}) no-repeat center /
contain;`;
  }};
`;

const LeftContainer = styled.div`
  display: flex;
`;
const RightContainer = styled.div`
  padding-right: 215px;
`;

const BalanceContainer = styled.div`
  background: #000325;
  border-radius: 20px;
  width: 300px;
  padding: 10px 20px;

  font-size: 30px;
  color: ${({ theme }) => theme.primary};
  display: flex;
  justify-content: space-between;
  span {
    padding-right: 20px;
  }
`;

const AppBarExtrator = ({
  account,
  general,
  wallet,
  game,
  accountLogout,
  navigate,
  handleSignupClick,
}) => {
  const getVIPName = (id) => {
    switch (id) {
      case 1:
        return "VIP1";
      case 2:
        return "Silver";
      case 3:
        return "Gold";
      case 4:
        return "Platinum";
      case 5:
        return "Diamond";
      default:
        return "";
    }
  };

  const buttonTypeSwitcher = (template) => {
    switch (parseInt(template)) {
      case 10:
        return <CustomThemedButton handleSignupClick={handleSignupClick} />;
      case 11:
        return <CustomThemedButton2 handleSignupClick={handleSignupClick} />;
      case 14:
      case 13:
        return <CustomThemedButton3 handleSignupClick={handleSignupClick} />;

      default:
        return <StandardThemedButton handleSignupClick={handleSignupClick} />;
    }
  };

  const [anchorEl, setAnchorEl] = useState();

  const handleClick = (e) => {
    setAnchorEl(e.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    accountLogout(account.token).then((response) => {});
  };

  const AppBarVariant1 = () => {
    return (
      <>
        <UsernameContainer
          onClick={() => {
            AppHistory.push("/profile");
          }}
        >
          <UsernameText
            style={{
              fontSize: config.features.NewTransferUI && 15,
              textAlign: config.features.NewTransferUI && "right",
            }}
          >
            {account.info.member_username}
          </UsernameText>

          {(config.features.HomePageDisplayBalance ||
            config.features.NewTransferUI) && (
            <div
              style={{
                display: "flex",
                width: 250,
                justifyContent: "flex-end",
              }}
            >
              <Textfit mode="single" min={20}>
                <Balance
                  onClick={(e) => {
                    handleClick(e);
                  }}
                >
                  <span>{i18n.t("web.header.mainAccount")}:</span>
                  {wallet.mainSymbol +
                    Common.formatNumberWithThousand(
                      wallet.mainBalance +
                        game.providerList
                          .filter(
                            (item) =>
                              item.status === 0 && item.transferwallet === true
                          )
                          .reduce((a, v) => (a = a + v.balance), 0)
                    )}
                </Balance>
              </Textfit>
              <CustomPopover
                CustomPopover
                height="1000px"
                open={Boolean(anchorEl)}
                anchorEl={anchorEl}
                handleClose={handleClose}
              >
                <div>
                  <BrandAndBalanceButBigger>
                    <span style={{ paddingRight: 30 }}>
                      {i18n.t("web.header.mainAccount")}
                    </span>
                    <div
                      style={{
                        width: 300,
                        display: "flex",
                        alignSelf: "flex-end",
                        justifyContent: "flex-end",
                      }}
                    >
                      <Textfit mode="single">
                        {wallet.mainSymbol +
                          Common.formatNumberWithThousand(
                            wallet.mainBalance +
                              game.providerList
                                .filter(
                                  (item) =>
                                    item.status === 0 &&
                                    item.transferwallet === true
                                )
                                .reduce((a, v) => (a = a + v.balance), 0)
                          )}
                      </Textfit>
                    </div>
                  </BrandAndBalanceButBigger>
                </div>
                {SortedMenuList.map((item, key) => {
                  return (
                    <GameType>
                      <GameTypeName>{i18n.t(item.title)}</GameTypeName>
                      {game.homePageGameList
                        .filter((game) => {
                          return (
                            (item.gameType.indexOf(game.type) >= 0 &&
                              game.gameType !== GameTypeEnum.RNGSPORTS) ||
                            (game.gameType === GameTypeEnum.RNGSPORTS &&
                              game.abbreviation === "PPTF")
                          );
                        })
                        .map((brand, index) => {
                          return game.providerList
                            .filter((item) => {
                              return (
                                item.abbreviation === brand.abbreviation &&
                                item.transferwallet === true
                              );
                            })
                            .map((data, index) => {
                              return (
                                <BrandAndBalance key={index}>
                                  <Brand>
                                    {i18n.t(
                                      `${data.abbreviation}.${item.path}`
                                    )}
                                  </Brand>
                                  <Balancex>
                                    {data.maintenance === 1
                                      ? i18n.t("transfer.maintenance")
                                      : Common.formatNumberWithCommas(
                                          data.balance
                                        )}
                                  </Balancex>
                                </BrandAndBalance>
                              );
                            });
                        })}
                    </GameType>
                  );
                })}
              </CustomPopover>
            </div>
          )}
        </UsernameContainer>
        <CustomColoredButton primary onClick={handleLogout}>
          {i18n.t("web.header.logout")}
        </CustomColoredButton>
      </>
    );
  };

  const AppBarVariant2 = () => {
    return <BalanceDisplayer />;
  };

  const appbarSwitcher = (template) => {
    switch (template) {
      case 14:
        return <AppBarVariant2 />;
      default:
        return <AppBarVariant1 />;
    }
  };

  return (
    <NewAppBar>
      <div>
        <TheContainer>
          <LogoHolder
            moveUp={config.features.DisplayPhone || config.features.CustomVIP}
            img={general.brand && general.brand.mobileLogoUrl}
          />
          {(() => {
            if (!account.token) {
              return (
                <MakeFloatCenter>
                  {buttonTypeSwitcher(config.wapVersion)}
                  {config.wapVersion === 14 && <Drawer />}
                </MakeFloatCenter>
              );
            } else {
              return (
                <MakeFloatCenter>
                  <VerticalLayoutContainer>
                    <CustomButtonContainer>
                      {config.features.HaveVIPFeature &&
                        config.features.HomePage_DisplayVIP && (
                          <div
                            onClick={() => {
                              window.scrollTo(0, 0);
                              AppHistory.push("/vip");
                            }}
                            style={{
                              padding: "10px 20px",
                              display: "flex",
                              flexDirection: "column",
                              gap: 5,
                              alignItems: "center",
                            }}
                          >
                            <img
                              src={
                                process.env.PUBLIC_URL +
                                "/assets/images/wapp/home-vip.png"
                              }
                              alt=""
                              style={{ height: 30 }}
                            />
                            VIP
                          </div>
                        )}
                      {appbarSwitcher(config.wapVersion)}
                      {config.wapVersion === 14 && <Drawer />}
                    </CustomButtonContainer>
                    {config.wapVersion === 11 && config.features.OnlineUser && (
                      <OnlineUserDisplayer
                        textAlign="right"
                        size="20px"
                        color="#fff"
                        padding="10px 30px 0 0"
                      />
                    )}
                  </VerticalLayoutContainer>
                </MakeFloatCenter>
              );
            }
          })()}
        </TheContainer>
      </div>
      {config.features.DisplayPhone && general.brandsSupport.length > 0 && (
        <PhoneHolder>
          <LeftContainer>
            <Icon
              src={process.env.PUBLIC_URL + `/assets/images/wapp/phone.png`}
            ></Icon>
            {general.brandsSupport &&
              general.brandsSupport.length > 0 &&
              general.brandsSupport[0].phone}

            {account.token && config.features.CustomVIP && (
              <React.Fragment>
                <Icon
                  style={{ marginLeft: "10px" }}
                  src={process.env.PUBLIC_URL + `/assets/images/wapp/vip.png`}
                ></Icon>
                {getVIPName(account.info.member_level_id)}
              </React.Fragment>
            )}
          </LeftContainer>
          <RightContainer></RightContainer>
        </PhoneHolder>
      )}
    </NewAppBar>
  );
};

const mapStateToProps = (state) => {
  return {
    account: state.account,
    ui: state.ui,
    wallet: state.wallet,
    game: state.game,
    general: state.general,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    accountLogout: (token) => dispatch(accountAction.accountLogout(token)),
    getGameBalance: (gpcode) => dispatch(walletAction.getGameBalance(gpcode)),
    updateBalanceList: (loading) => dispatch(walletAction.updateBalanceList()),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(AppBarExtrator));
