import React from "react";
import { TermsAndConditions } from "../../App/QuickLinks";
import styled from "styled-components";
import Header from "../Share/Header";
import i18n from "../../../utils/i18n";
import { AppHistory } from "../../../history/History";

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

const Terms = () => {
  const handleBackClick = () => {
    AppHistory.goBack();
  };
  return (
    <>
      <Header
        title={i18n.t("T13.quickLink.tnc")}
        onBackClick={() => {
          handleBackClick();
        }}
      />
      <Section>
        <TermsAndConditions />
      </Section>
    </>
  );
};

export default Terms;
