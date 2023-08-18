import React, { Component } from "react";
import { connect } from "react-redux";
import styled from "styled-components";
import { walletAction } from "../../../api-services/actions/walletAction";
import { accountAction } from "../../../api-services/actions/accountAction";
import { RESET_WALLETRESULT } from "../../../api-services/constant/actionType";
import MessageDialog from "../../Wap/Share/MessageDialog";
import Loading from "../../Wap/Share/Loading";
import Header from "../../Wap/Share/Header";
import SwipeToDelete from "react-swipe-to-delete-component";
import i18n from "../../../utils/i18n";
import Common from "../../../utils/Common";
import config from "../../../config/config";
const Container = styled.div`
  width: 100%;
  padding: 110px 0px 200px 0;
`;

const BalanceLabel = styled.div`
  font-size: 36px;

  text-align: center;
  color: ${({ theme }) =>
    theme.customProfileText ? theme.customProfileText : "#ffffff"};
  padding: 15px;
`;

const CardItem = styled.div`
  background: #fff;
  width: 632px;
  height: 170px;
  box-shadow: 0 2px 6px 0 rgba(58, 58, 58, 0.2);
  border-radius: 16px;
  margin-left: 60px;
  padding: 0 0 0 44px;
  color: ${({ theme }) => theme.cardText};
`;
const InfoLabel = styled.div`
  font-size: 18px;

  color: ${({ theme }) =>
    theme.wapSecondary ? theme.wapSecondary : theme.secondary};
  float: right;
  margin-top: 20px;
  background-size: 32px;
  font-size: 24px;

  height: 32px;
`;

const BankName = styled.div`
  font-size: 24px;

  float: left;
  width: 480px;
  margin-top: 40px;
`;
const BankNumber = styled.div`
  font-size: 32px;

  float: left;
  width: 480px;
  margin-top: 15px;
`;
const EmptyCardItem = styled.div`
  width: 632px;

  padding: 40px;
  position: relative;
  border: 2px
    ${({ theme }) =>
      theme.wapSecondary ? theme.wapSecondary : theme.secondary}
    solid;
  border-radius: 40px;
  margin: 30px auto 0;
`;
const EmptyCardTitle = styled.div`
  font-size: 28px;
  font-weight: 600;

  color: ${({ theme }) =>
    theme.wapSecondary ? theme.wapSecondary : theme.secondary};

  margin: 60px 0 0 0px;
`;
const EmptyCardDesc = styled.div`
  font-size: 24px;
  margin-top: 20px;

  color: ${({ theme }) =>
    theme.wapSecondary ? theme.wapSecondary : theme.secondary};

  margin: 10px 0 0 0px;
`;
const EmptyCardAdd = styled.div`
  mask: url(${process.env.PUBLIC_URL +
    `/assets/images/wapp/icon-plus-circle.png`})
    no-repeat center center;
  position: absolute;
  right: 40px;
  top: 20px;
  background: #fff;
  width: 80px;
  height: 80px;
  float: right;
`;

const DisableSwipe = styled.div`
  pointer-events: ${({ disable }) => {
    return disable ? "none" : "auto";
  }};
`;

class Card extends Component {
  state = {
    loading: false,
    bankCardList: [],
    showDialog: false,
    dialogMessage: "",
  };
  componentDidMount() {
    if (this.props.wallet.bankCardList.length === 0) {
      this.props.getBankCardList();
    }
  }
  componentDidUpdate(preProps) {
    if (
      preProps.wallet.deleteBankCardResult !==
        this.props.wallet.deleteBankCardResult &&
      this.props.wallet.deleteBankCardResult !== null
    ) {
      if (this.props.wallet.deleteBankCardResult.IsSuccess) {
        this.props.getBankCardList();
      } else {
        this.setState({
          ...this.state,
          showDialog: true,
          dialogMessage: this.props.wallet.deleteBankCardResult.info,
        });
      }
      this.props.resetResult();
    }
  }
  handleCloseDialog() {
    this.setState({
      ...this.state,
      showDialog: false,
      dialogMessage: "",
    });
  }

  handleBackClick = () => {
    this.props.appHistory.goBack();
  };
  handleDeleteCard = (e) => {
    if (
      this.props.wallet.bankCardList.length > 0 &&
      (config.features.ChangesNotAllowed ||
        config.features.AddCard_NotAllowedEditDelete ||
        config.features.AddCard_DisableCreateUpdateDelete)
    ) {
      this.props.alert("", i18n.t("card.toEdit"));

      this.props.getBankCardList();
    } else {
      this.props.deleteBankCard(e.item.id);
    }
  };
  render() {
    return (
      <Container>
        <Header
          onBackClick={this.handleBackClick}
          title={i18n.t("wap.main.account.manageBank")}
          position={"fixed"}
          backgroundColor={"transparent"}
        ></Header>
        <BalanceLabel>
          {Common.formatNumberWithThousand(
            this.props.game.providerList.reduce(
              (total, item) =>
                item.transferwallet === true
                  ? (total += item.balance)
                  : (total += 0),
              0
            ) + this.props.wallet.mainBalance
          )}
        </BalanceLabel>

        {!(
          config.features.AddCard_NotAllowedEditDelete ||
          config.features.ChangesNotAllowed ||
          (this.props.wallet.bankCardList.length >=
            config.features.AddCard_MaximumCardAllowed &&
            config.features.AddCard_DisableCreateUpdateDelete)
        ) && (
          <div style={{ display: "flex", justifyContent: "center" }}>
            <InfoLabel>{i18n.t("card.msgSlideToDelete")}</InfoLabel>
          </div>
        )}

        {this.props.wallet.bankCardList.map((row) => {
          return (
            <DisableSwipe
              disable={
                config.features.AddCard_NotAllowedEditDelete ||
                config.features.ChangesNotAllowed ||
                config.features.AddCard_DisableCreateUpdateDelete
              }
            >
              <SwipeToDelete
                key={row.id}
                item={row}
                deleteSwipe={0.1}
                onDelete={this.handleDeleteCard}
              >
                <CardItem>
                  <BankName>{row.banktype}</BankName>
                  <BankNumber>
                    {row.detail.address ||
                      row.detail.bankAccount ||
                      row.detail.phone}
                  </BankNumber>
                </CardItem>
              </SwipeToDelete>
            </DisableSwipe>
          );
        })}

        {!(
          config.features.AddCard_NotAllowedEditDelete ||
          config.features.ChangesNotAllowed ||
          (this.props.wallet.bankCardList.length >=
            config.features.AddCard_MaximumCardAllowed &&
            config.features.AddCard_DisableCreateUpdateDelete)
        ) && (
          <>
            <div className="clear"></div>
            <EmptyCardItem
              onClick={() => {
                this.props.wallet.bankCardList.length > 0 &&
                (config.features.ChangesNotAllowed ||
                  config.features.AddCard_NotAllowedEditDelete ||
                  this.props.wallet.bankCardList.length >=
                    config.features.AddCard_MaximumCardAllowed)
                  ? this.props.alert("", i18n.t("card.toEdit"))
                  : this.props.navigate("/card/add");
              }}
            >
              <EmptyCardAdd></EmptyCardAdd>
              <EmptyCardTitle>{i18n.t("T13.misc.addBankCard")}</EmptyCardTitle>
              <EmptyCardDesc>
                {i18n
                  .t("T13.misc.msgAddCardDesc")
                  .replace(
                    "{maxCardCount}",
                    config.features.AddCard_MaximumCardAllowed
                  )}
              </EmptyCardDesc>
            </EmptyCardItem>
          </>
        )}
        <MessageDialog
          onClose={() => this.handleCloseDialog()}
          open={this.state.showDialog}
          message={this.state.dialogMessage}
          onClick={() => this.handleCloseDialog()}
        ></MessageDialog>
        <Loading
          show={this.state.loading || this.props.wallet.loading}
        ></Loading>
      </Container>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    account: state.account,
    wallet: state.wallet,
    game: state.game,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    accountLogout: (token) => dispatch(accountAction.accountLogout(token)),
    getBankCardList: () => dispatch(walletAction.getBankCardList()),
    getWithdrawalChannel: () => dispatch(walletAction.getWithdrawalChannel()),
    deleteBankCard: (id) => dispatch(walletAction.deleteBankCard(id)),
    resetResult: () =>
      dispatch({
        type: RESET_WALLETRESULT,
      }),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Card);
