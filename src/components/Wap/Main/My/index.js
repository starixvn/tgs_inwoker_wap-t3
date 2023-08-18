import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import styled from "styled-components";
import { accountAction } from "../../../../api-services/actions/accountAction";
import { walletAction } from "../../../../api-services/actions/walletAction";
import CircularProgress from "@material-ui/core/CircularProgress";
import Common from "../../../../utils/Common";
import i18n from "../../../../utils/i18n";
import config from "../../../../config/config";
import Header from "../../Share/Header";
import Appbar from "../../components/appbar";
import BalanceDisplayer from "../../components/balance";
import Marquee from "../Home/Marquee";

const Container = styled.div`
  width: 100%;
  min-height: 100vh;
  padding: 120px 0 0 0;
`;

const InfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 40px 0 0 0;
`;

const NameContainer = styled.div`
  float: left;
  font-size: 40px;
  color: ${({ theme }) => theme.wapSecondary || theme.secondary};
`;

const WalletContainer = styled.div`
  font-size: 28px;
  margin-top: 12px;
`;

const AmountWrapper = styled.div`
  min-height: 130px;
  padding: 20px 0 0 0;
`;

const WalletLabel = styled.div`
  color: ${({ theme }) => theme.wapPrimary};
  float: left;
`;

const WalletAmount = styled.div`
  color: ${({ theme }) => theme.wapPrimary};
  font-weight: 500;
  float: left;
  margin-left: 15px;
`;

const ListView = styled.div`
  padding: 10px 30px 130px 30px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const RedDot = styled.div`
  width: 10px;
  height: 10px;
  background-color: #e23a3f;
  border-radius: 50%;
  position: absolute;
`;

const MessageRedDot = styled(RedDot)`
  display: block;
  position: relative;
`;

const ProfileMenuHolder = styled.div`
  padding: 0 50px 20px 50px;
  width: 600px;
  border-radius: 50px;
`;

const ProfileMenuWrapper = styled.div`
  padding: 10px 20px;
  border-radius: 20px;
  color: #fff;
`;

const ProfileMenuList = styled.div`
  font-size: 24px;
  padding: 20px 20px 20px 0;
  display: flex;
  border-bottom: solid 1px rgba(255, 255, 255, 1);
  justify-content: space-between;
  align-items: center;

  :last-child {
    border-bottom: 0px;
  }
`;

const TheUserContainer = styled.div`
  padding: 20px 0 10px 0;
`;

const TextAndIcon = styled.div`
  display: flex;
  align-items: center;
`;

const Icon = styled.div`
  width: 40px;
  height: 40px;
  margin-right: 20px;
  background-color: ${({ theme }) => theme.primary};
  mask: ${({ icon }) => {
    return `url(${
      process.env.PUBLIC_URL + `/assets/images/wapp/${icon}.svg`
    }) no-repeat center / contain;`;
  }};
`;

const Notification = styled.div`
  position: relative;
`;

const LogoutButton = styled.div`
  background: ${({ theme }) => theme.primary};
  color: #fff;
  width: fit-content;
  padding: 30px 50px;
  margin-top: 20px;
  border-radius: 50px;
  font-size: 34px;
  text-transform: uppercase;
  filter: drop-shadow(0 0 4px ${({ theme }) => theme.primary})
    drop-shadow(0 0 4px ${({ theme }) => theme.primary}) contrast(1)
    brightness(1);
`;

const UpperPart = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 20vh;
  margin-top: -1px;
  gap: 30px;
  background: #242958;
  .title {
    font-weight: bold;
    font-size: 50px;
  }

  .scaleup {
    transform: scale(1.5);
  }
`;

const LowerPart = styled.div`
  background: #000325;
  min-height: 80vh;

  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 20px;
  padding: 80px 20px 120px 20px;
  align-content: start;
`;

const MinTextSize = styled.div`
  font-size: 30px;
  color: #fff;
`;

const MenuButtons = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  text-align: center;
  font-size: 20px;
  gap: 20px;
  position: relative;
`;

const Icon2 = styled(Icon)`
  width: 80px;
  height: 80px;
  background: #fff;
  margin: 0;
`;

const MarqueeContainer = styled.div`
  background: #242958;
`;
const My = ({
  account,
  wallet,
  game,
  general,
  appHistory,
  accountLogout,
  getBalanceList,
  navigate,
}) => {
  const [balance, setBalance] = useState(0);
  const [balanceLoaded, setBalanceLoaded] = useState(true);

  useEffect(() => {
    window.scrollTo(0, 0);
    if (!account.token) {
      appHistory.replace("/login");
    }
    if (wallet.balanceList.length === 0) {
      getBalanceList();
    }
  }, []);

  useEffect(() => {
    if (
      wallet.balanceList.length > 0 &&
      wallet.balanceList.length !== balance.length
    ) {
      setBalance(getTotalBalance());
      setBalanceLoaded(true);
    }
  }, [wallet.balanceList]);

  const getTotalBalance = () => {
    return wallet.balanceList.reduce((totalBalance, item) => {
      try {
        return totalBalance + parseFloat(item.balance.replace(/,/g, ""));
      } catch (e) {
        return totalBalance;
      }
    }, 0);
  };

  const handleLogoutClick = () => {
    accountLogout(account.token).then((response) => {
      if (response.IsSuccess) {
        navigate("/");
      }
    });
  };

  const navigateTo = (to) => {
    window.scrollTo(0, 0);
    navigate(to);
  };

  const profileMenu = React.useMemo(
    () => [
      {
        icon: "icon-profile-profile",
        title: i18n.t("wap.main.account.personalInfo"),
        to: "/profile",
      },
      {
        icon: "icon-profile-inbox",
        title: i18n.t("wap.main.account.inbox"),
        to: "/inbox",
        notification: account.info.message_num > 0 ? true : false,
      },
      {
        icon: "icon-profile-inbox",
        title: i18n.t("memo"),
        to: "/memo",
      },
      {
        icon: "announcement",
        title: i18n.t("announcement"),
        to: "/news",
      },
      {
        icon: "icon-profile-report",
        title: i18n.t("report.bettingDetails"),
        to: "/report/2",
      },
      {
        icon: "icon-profile-withdrawal",
        title: i18n.t("wap.main.account.withdrawal"),
        to: "/report/3",
      },
      {
        icon: "icon-profile-topup",
        title: i18n.t("wap.main.account.deposit"),
        to: "/report/4",
      },
      {
        icon: "icon-profile-report-transfer",
        title: i18n.t("wap.main.account.transfer"),
        to: "/report/6",
      },
      {
        icon: "icon-profile-report",
        title: i18n.t("report.joinedPromo.title"),
        to: "/report/7",
      },
      {
        icon: "icon-profile-report-transfer",
        title: i18n.t("report.balanceChanges.title"),
        to: "/report/8",
      },
      {
        icon: "collection",
        title: i18n.t("myfavorite"),
        to: "/favorite",
      },
      {
        icon: "icon-vip",
        title: "VIP",
        to: "/vip",
      },
    ],
    [account.info.message_num]
  );

  const handleBackClick = () => {
    appHistory.goBack();
  };

  const variantSwitcher = (variant) => {
    switch (variant) {
      case 14:
        return <Variant2 />;
      default:
        return <Variant1 />;
    }
  };

  const Variant1 = () => {
    return (
      <>
        <Header
          onBackClick={handleBackClick}
          title={i18n.t("wap.main.my")}
          position="fixed"
          backgroundColor="transparent"
        />
        <TheUserContainer>
          <InfoContainer>
            <NameContainer>{account.info.member_username}</NameContainer>
            <AmountWrapper>
              <WalletContainer>
                <WalletLabel>
                  {i18n.t("wap.main.account.mainAccount")}
                </WalletLabel>
                <WalletAmount>
                  {wallet.mainSymbol}
                  {Common.formatNumberWithThousand(wallet.mainBalance)}
                </WalletAmount>
              </WalletContainer>
              <WalletContainer>
                <WalletLabel>
                  {i18n.t("wap.main.account.totalFund")}
                </WalletLabel>
                <WalletAmount>
                  {balanceLoaded ? (
                    wallet.mainSymbol +
                    Common.formatNumberWithThousand(
                      wallet.mainBalance +
                        game.providerList
                          .filter(
                            (item) =>
                              item.status === 0 && item.transferwallet === true
                          )
                          .reduce((a, v) => (a = a + v.balance), 0)
                    )
                  ) : (
                    <CircularProgress
                      size={25}
                      color="secondary"
                      style={{ margin: "6px 0 0 10px" }}
                    />
                  )}
                </WalletAmount>
              </WalletContainer>
            </AmountWrapper>
          </InfoContainer>
        </TheUserContainer>
        <ListView>
          <ProfileMenuHolder>
            <ProfileMenuWrapper>
              {profileMenu
                .filter((data) => {
                  return game.containTransferWallet || data.to !== "/report/6";
                })
                .filter((data) =>
                  config.features.HaveVIPFeature ? data : data.to !== "/vip"
                )
                .map((data, index) => (
                  <ProfileMenuList
                    key={index}
                    onClick={() => navigateTo(data.to)}
                  >
                    <TextAndIcon>
                      <Icon icon={data.icon} />
                      <div>{data.title}</div>
                    </TextAndIcon>
                    <Notification>
                      {data.title === i18n.t("wap.main.account.inbox") &&
                        account.info.message_num > 0 && <MessageRedDot />}
                    </Notification>
                  </ProfileMenuList>
                ))}
              {config.features.HaveDownloadFeature && (
                <ProfileMenuList onClick={() => navigateTo("/main/download")}>
                  <TextAndIcon>
                    <Icon icon="icon-download" />
                    <div>{i18n.t("wap.main.account.appDownload")}</div>
                  </TextAndIcon>
                </ProfileMenuList>
              )}
              {general.haveAffiliate && (
                <ProfileMenuList onClick={() => navigateTo("/affiliate")}>
                  <TextAndIcon>
                    <Icon icon="icon-affiliate" />
                    <div>{i18n.t("web.account.affiliate")}</div>
                  </TextAndIcon>
                </ProfileMenuList>
              )}
              <ProfileMenuList
                onClick={() => {
                  if (
                    wallet.bankCardList != null &&
                    wallet.bankCardList.length === 0 &&
                    config.features.AddCard_NotAllowedEditDelete
                  ) {
                    alert("", i18n.t("card.toEdit"));
                  } else {
                    navigateTo("/card");
                  }
                }}
              >
                <TextAndIcon>
                  <Icon icon="icon-profile-card" />
                  <div>{i18n.t("wap.main.account.manageBank")}</div>
                </TextAndIcon>
              </ProfileMenuList>
              {config.features.Wap_ShowProfileTransfer && (
                <ProfileMenuList onClick={() => navigateTo("/transfer")}>
                  <TextAndIcon>
                    <Icon icon="icon-profile-transfer" />
                    <div>{i18n.t("common.transfer")}</div>
                  </TextAndIcon>
                </ProfileMenuList>
              )}
              <ProfileMenuList onClick={() => navigateTo("/setting/language")}>
                <TextAndIcon>
                  <Icon icon="icon-profile-language" />
                  <div>{i18n.t("common.language")}</div>
                </TextAndIcon>
              </ProfileMenuList>
            </ProfileMenuWrapper>
          </ProfileMenuHolder>
          <div class="clear"></div>
          <LogoutButton onClick={handleLogoutClick}>
            {i18n.t("web.header.logout")}
          </LogoutButton>
        </ListView>
      </>
    );
  };

  const Variant2 = () => {
    return (
      <MinTextSize>
        <Appbar />
        <MarqueeContainer>
          <Marquee variant="2" />
        </MarqueeContainer>

        <UpperPart>
          <div className="title">{account.info.member_username}</div>
          <div className="scaleup">
            <BalanceDisplayer showBalance={true} />
          </div>
        </UpperPart>
        <LowerPart>
          {profileMenu
            .filter((data) => {
              return game.containTransferWallet || data.to !== "/report/6";
            })
            .filter((data) =>
              config.features.HaveVIPFeature ? data : data.to !== "/vip"
            )
            .map((data, index) => (
              <div key={index} onClick={() => navigateTo(data.to)}>
                <MenuButtons>
                  <Notification style={{ position: "absolute", right: "10px" }}>
                    {data.title === i18n.t("wap.main.account.inbox") &&
                      account.info.message_num > 0 && <MessageRedDot />}
                  </Notification>
                  <Icon2 icon={data.icon} />
                  <div>{data.title}</div>
                </MenuButtons>
              </div>
            ))}
          {config.features.HaveDownloadFeature && (
            <div onClick={() => navigateTo("/main/download")}>
              <MenuButtons>
                <Icon2 icon="icon-download" />
                <div>{i18n.t("wap.main.account.appDownload")}</div>
              </MenuButtons>
            </div>
          )}
          {general.haveAffiliate && (
            <div onClick={() => navigateTo("/affiliate")}>
              <MenuButtons>
                <Icon2 icon="icon-affiliate" />
                <div>{i18n.t("web.account.affiliate")}</div>
              </MenuButtons>
            </div>
          )}
          <div
            onClick={() => {
              if (
                wallet.bankCardList != null &&
                wallet.bankCardList.length === 0 &&
                config.features.AddCard_NotAllowedEditDelete
              ) {
                alert("", i18n.t("card.toEdit"));
              } else {
                navigateTo("/card");
              }
            }}
          >
            <MenuButtons>
              <Icon2 icon="icon-profile-card" />
              <div>{i18n.t("wap.main.account.manageBank")}</div>
            </MenuButtons>
          </div>
          {config.features.Wap_ShowProfileTransfer && (
            <div onClick={() => navigateTo("/transfer")}>
              <MenuButtons>
                <Icon2 icon="icon-profile-transfer" />
                <div>{i18n.t("common.transfer")}</div>
              </MenuButtons>
            </div>
          )}
          <div onClick={() => navigateTo("/setting/language")}>
            <MenuButtons>
              <Icon2 icon="language" />
              <div>{i18n.t("common.language")}</div>
            </MenuButtons>
          </div>
          <div onClick={() => accountLogout(account.token)}>
            <MenuButtons>
              <Icon2 icon="signout" />
              <div>{i18n.t("signout")}</div>
            </MenuButtons>
          </div>
        </LowerPart>
      </MinTextSize>
    );
  };

  return <Container>{variantSwitcher(config.wapVersion)}</Container>;
};

const mapStateToProps = (state) => ({
  account: state.account,
  wallet: state.wallet,
  game: state.game,
  general: state.general,
});

const mapDispatchToProps = (dispatch) => ({
  accountLogout: (token) => dispatch(accountAction.accountLogout(token)),
  getBalanceList: () => dispatch(walletAction.getBalanceList()),
});

export default connect(mapStateToProps, mapDispatchToProps)(React.memo(My));
