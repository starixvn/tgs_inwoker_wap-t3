import React from "react";
import { connect } from "react-redux";
import styled from "styled-components";
import Common from "../../../../utils/Common";
import i18n from "../../../../utils/i18n";

const BalanceContainer = styled.div`
  background: #000325;
  border-radius: 20px;
  min-width: 250px;
  padding: 10px 20px;

  font-size: 25px;
  color: ${({ theme }) => theme.primary};
  display: flex;
  justify-content: space-between;
  span {
    padding-right: 20px;
  }
`;

const BalanceDisplayer = ({ showBalance, wallet, game }) => {
  return (
    <BalanceContainer>
      {showBalance && (
        <div style={{ paddingRight: 20 }}>{i18n.t("transfer.totalFund")}</div>
      )}
      <div>
        <span>₱</span>
        {wallet.mainSymbol +
          Common.formatNumberWithThousand(
            wallet.mainBalance +
              game.providerList
                .filter(
                  (item) => item.status === 0 && item.transferwallet === true
                )
                .reduce((a, v) => (a = a + v.balance), 0)
          )}
      </div>
      <div style={{ paddingLeft: 20 }}>⟳</div>
    </BalanceContainer>
  );
};
const mapStateToProps = (state) => {
  return {
    wallet: state.wallet,
    game: state.game,
  };
};

export default connect(mapStateToProps, null)(BalanceDisplayer);
