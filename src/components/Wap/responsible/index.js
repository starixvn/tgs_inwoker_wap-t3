import React from "react";
import { ResponsibleGaming } from "../../App/QuickLinks";
import styled from "styled-components";
import Header from "../Share/Header";
import { AppHistory } from "../../../history/History";
import i18n from "../../../utils/i18n";

const Section = styled.div`
  div {
    width: 100%;
    padding: 100px 40px;
    h1 {
      font-size: 36px;
    }

    p {
      font-size: 24px;
    }
  }
`;

const Responsible = () => {
  const handleBackClick = () => {
    AppHistory.goBack();
  };
  return (
    <>
      <Header
        title={i18n.t("T13.quickLink.reponsible")}
        onBackClick={() => {
          handleBackClick();
        }}
      />
      <Section>
        <ResponsibleGaming />
      </Section>
    </>
  );
};

export default Responsible;
