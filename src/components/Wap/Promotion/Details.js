import React, { Component } from "react";
import { connect } from "react-redux";
import styled from "styled-components";
import { withRouter } from "react-router-dom";
import Button from "../../Wap/Share/Button";
import { generalAction } from "../../../api-services/actions/generalAction";
import i18n from "../../../utils/i18n";
import config from "../../../config/config";
import AppBarExtrator from "./../../Wap/components/appbar";
const moment = require("moment");
const PromoDetailImage = styled.div`
  height: 280px;
  width: 690px;
  background: url(${(props) => props.img}) no-repeat;
  background-size: 100% 100%;
  border-radius: 40px;
`;

const EventText = styled.div`
  font-size: 22px;

  line-height: 26px;
  margin-bottom: 20px;
`;
const PromoDesc = styled.div`
  font-size: 22px;
`;

const TheEntireWrapper = styled.div`
  padding: 110px 30px 220px 30px;
  background: #000326;
  color: #fff;
  min-height: 100vh;
`;

const SubTitle = styled.div`
  color: #fff;
  font-size: 32px;
  text-align: center;
  width: 100%;
  padding: 20px 0;
`;

const TheActualContent = styled.div`
  padding: 20px 40px;
  background: #0e0f1a;
  border-radius: 40px;
  color: #fff;
`;
const TNCToggle = styled.div`
  display: flex;
  color: #ffffff;
  font-weight: bold;
  place-self: flex-start;
  display: flex;
  align-items: center;
  padding-top: 20px;
  span {
    font-size: 28px;
  }
  &:before {
    content: ${(props) => (props.active ? `"—"` : `"+"`)};
    color: ${({ theme }) => theme.primary};
    width: 28px;
    height: 28px;
    margin: 0 5px;
    margin-right: 20px;
    line-height: 23px;
    font-size: ${(props) => (props.active ? `30px` : `60px`)};
    text-align: center;
  }
`;

const TNCContainer = styled.div`
  color: #ffffff;
  padding: 0 35px;
  margin-bottom: 40px;
  font-size: 28px;
`;

const Arrow = styled.div`
  mask: url(${process.env.PUBLIC_URL +
    `/assets/images/wapp/btn-back-white.png`})
    no-repeat center;
  background: ${({ theme }) => theme.primaryText};
  width: 40px;
  height: 30px;
`;

const ArrowLeft = styled(Arrow)`
  rotate: 0deg;
`;

const ArrowRight = styled(Arrow)`
  rotate: 180deg;
`;

const Title = styled.div`
  font-size: 32px;
  padding: 0 40px;
  text-align: center;
`;

const TitleContainer = styled.div`
  display: flex;
  align-items: center;
  padding: 30px 0;
  justify-content: space-between;
`;

const MakeItFloatCenter = styled.div`
  display: flex;
  justify-content: center;
`;

class Details extends Component {
  constructor(props) {
    super(props);
    var index = -1;
    var details = null;
    for (var i = 0; i < this.props.general.promotionList.items.length; i++) {
      if (
        this.props.general.promotionList.items[i].id ===
        this.props.match.params.id
      ) {
        index = i;
        details = this.props.general.promotionList.items[i];
        break;
      }
    }

    if (index === -1) {
      this.props.appHistory.replace({
        pathname: "/promotion-list",
      });
    }

    this.state = {
      details: details,
      index: index,
      loading: false,
      isTNCToggled: false,
    };

    document.getElementsByTagName("body")[0].style.background = "#fff";
  }
  componentDidUpdate(prevProps, prevState) {
    if (
      this.props.general.joinPromoResult !== null &&
      prevProps.general.joinPromoResult !== this.props.general.joinPromoResult
    ) {
      if (this.props.general.joinPromoResult.success === true) {
        this.props.alert("", i18n.t("promotion.joinSuccess"));
      } else {
        if (this.props.general.joinPromoResult.err === 0) {
          this.props.alert("", i18n.t("promotion.promoJoint"));
        }
      }
    }

    if (
      prevProps.match.params.id !== null &&
      this.props.match.params.id != null &&
      prevProps.match.params.id !== this.props.match.params.id
    ) {
      for (var i = 0; i < this.props.general.promotionList.items.length; i++) {
        if (
          this.props.general.promotionList.items[i].id ===
          this.props.match.params.id
        ) {
          var term = "";
          if (this.props.general.promotionList.items[i]) {
            if (
              JSON.stringify(
                this.props.general.promotionList.items[i].localization
              ) !== "{}" &&
              (this.props.general.promotionList.items[i].localization[
                i18n.language
              ] !== "" ||
                this.props.general.promotionList.items[i].localization[
                  i18n.language
                ] !== null)
            ) {
              term = this.props.general.promotionList.items[i].localization[
                i18n.language
              ].terms
                ? this.props.general.promotionList.items[i].localization[
                    i18n.language
                  ].terms
                : this.props.general.promotionList.items[i].terms;
            } else {
              term = this.props.general.promotionList.items[i].terms || "";
            }
          }
          this.setState({
            ...this.state,
            index: i,
            details: this.props.general.promotionList.items[i],
            term: term,
            joined: false,
            openDialog: false,
            isTNCToggled: false,
          });
          break;
        }
      }
    }
  }

  componentWillUnmount() {
    document.getElementsByTagName("body")[0].style.background = "";
  }
  handleBonusChange = (e) => {
    this.setState({ ...this.state, bonusSubId: parseInt(e.target.value) });
  };

  performRedirect = (id, promotionType) => {
    this.props.joinPromotion(id);
    if (
      [
        "FirstDeposit",
        "DailySecondDeposit",
        "DailyFirstDeposit",
        "DepositReward",
        "DepositAccumulateRoulette",
      ].indexOf(promotionType) >= 0
    ) {
      this.props.appHistory.push({
        pathname: "/deposit/" + id,
      });
    }
  };

  handleJoinClick = (id, promotionType) => {
    if (this.props.token === null || this.props.token === "") {
      this.props.appHistory.replace({
        pathname: "/login",
      });
    } else {
      this.props.joinPromotion(id);
      if (
        [
          "FirstDeposit",
          "DailySecondDeposit",
          "DailyFirstDeposit",
          "DepositReward",
          "DepositAccumulateRoulette",
        ].indexOf(promotionType) >= 0
      ) {
        this.props.appHistory.push({
          pathname: "/deposit/" + id,
        });
      }
    }
  };

  handleBackClick = () => {
    this.props.appHistory.replace("/promotion-list");
  };

  handleToggleTnC = () => {
    this.setState({ ...this.state, isTNCToggled: !this.state.isTNCToggled });
  };

  render() {
    if (this.state.details === null) return <React.Fragment></React.Fragment>;
    var isDummy = this.state.details.promotionType.toUpperCase() === "DUMMY";
    var isPromoteDepositChannel = this.state.details.promotionType.toUpperCase() === "PROMOTEDEPOSITCHANNEL";
    var checkIfLocalizationIsEmpty =
      JSON.stringify(this.state.details.localization) === "{}";

    const simplifyCode = (item) => {
      return (
        (!checkIfLocalizationIsEmpty &&
          this.state.details.localization[i18n.language][item]) ||
        this.state.details[item] ||
        ""
      );
    };

    var checkIfExist = this.state.details.localization[i18n.language];

    const navigatePromotion = (isLeft) => {
      var newPromotionId = "";
      var newIndex;
      if (isLeft) {
        newIndex =
          this.state.index - 1 < 0
            ? this.props.general.promotionList.items.length - 1
            : this.state.index - 1;
        newPromotionId = this.props.general.promotionList.items[newIndex].id;
      } else {
        newIndex =
          this.state.index + 1 >= this.props.general.promotionList.items.length
            ? 0
            : this.state.index + 1;
        newPromotionId = this.props.general.promotionList.items[newIndex].id;
      }
      if (newPromotionId !== "") {
        this.props.appHistory.push({
          pathname: "/promotion/" + newPromotionId,
        });
      }
    };

    return (
      <>
        <AppBarExtrator />
        <TheEntireWrapper>
          <TitleContainer>
            <ArrowLeft
              onClick={() => {
                navigatePromotion(true);
              }}
            />
            <Title>{simplifyCode("name")}</Title>
            <ArrowRight
              onClick={() => {
                navigatePromotion(false);
              }}
            />
          </TitleContainer>
          <MakeItFloatCenter>
            {(() => {
              if (this.state.details.localization !== null) {
                return (
                  <PromoDetailImage
                    img={
                      checkIfExist
                        ? checkIfExist.mobileBanner
                        : this.state.details.mobileBanner
                    }
                  />
                );
              } else {
                return (
                  <PromoDetailImage img={this.state.details.mobileBanner} />
                );
              }
            })()}
          </MakeItFloatCenter>

          <SubTitle>{simplifyCode("subSubject")}</SubTitle>
          <TheActualContent>
            <PromoDesc
              dangerouslySetInnerHTML={{
                __html: "<div>" + simplifyCode("content") + "</div>",
              }}
            />
            <EventText>
              {i18n.t("promotion.promoDate")}：
              <br />
              {moment(this.state.details.from).format("YYYY/MM/DD HH:mm:ss")}
              {" - "}
              {moment(this.state.details.to).format("YYYY/MM/DD HH:mm:ss")}
            </EventText>
          </TheActualContent>

          {this.state.term !== "" && (
            <>
              <TNCToggle
                onClick={this.handleToggleTnC}
                active={this.state.isTNCToggled}
              >
                <span>{i18n.t("common.termsAndCondition")}</span>
              </TNCToggle>
              {this.state.isTNCToggled && (
                <TNCContainer
                  dangerouslySetInnerHTML={{
                    __html: "<div >" + simplifyCode("terms") + "</div>",
                  }}
                ></TNCContainer>
              )}
            </>
          )}

          {!(isDummy || isPromoteDepositChannel) && (
            <Button
              style={{ margin: "40px auto 0 auto" }}
              label={i18n.t("T13.promo.join")}
              onClick={() =>
                this.handleJoinClick(
                  this.state.details.id,
                  this.state.details.promotionType
                )
              }
            ></Button>
          )}
        </TheEntireWrapper>
      </>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    general: state.general,
    token: state.account.token,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    joinPromotion: (id) => {
      dispatch(generalAction.joinPromotion(id));
    },
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(Details));
