import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import styled from "styled-components";
import { generalAction } from "../../../api-services/actions/generalAction";
import i18n from "../../../utils/i18n";
import config from "../../../config/config";
import Header from "../Share/Header";
import Common from "../../../utils/Common";
import VIPTable from "./table";

const Container = styled.div`
  width: 100%;
  overflow: hidden;
  min-height: 100vh;
  padding: 20px;
  padding-bottom: 120px;
  color: #fff;
  background: #000215;
`;

const VIP = (props) => {
  const { getVIP } = props;
  const [vipBenefit, setVipBenefits] = useState([]);
  useEffect(() => {
    if (vipBenefit.length === 0) {
      getVIP().then((result) => {
        if (result.IsSuccess) {
          setVipBenefits(result.data);
        }
      });
    }
  }, []);

  var vipBenefitList =
    vipBenefit.items &&
    vipBenefit.items.sort((a, b) => {
      return a.level < b.level ? -1 : a.level > b.level ? 1 : 0;
    });

  const handleBackClick = () => {
    props.appHistory.goBack();
  };

  return (
    <Container>
      <Header title="VIP" onBackClick={handleBackClick}></Header>
      <div style={{ height: 90 }} />
      {<VIPTable data={vipBenefitList} />}
    </Container>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    getVIP: () => dispatch(generalAction.getVIP()),
  };
};
const mapStateToProps = (state) => {
  return "";
};
export default connect(mapStateToProps, mapDispatchToProps)(VIP);
