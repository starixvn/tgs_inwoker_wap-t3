import React from "react";
import { Faq } from "../../App/QuickLinks";
import styled from "styled-components";
import { AppHistory } from "../../../history/History";
import i18n from "../../../utils/i18n";
import Header from "../Share/Header";

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

const FAQs = () => {
  const handleBackClick = () => {
    AppHistory.goBack();
  };
  return (
    <>
      <Header
        title={i18n.t("T13.quickLink.faq")}
        onBackClick={() => {
          handleBackClick();
        }}
      />
      <Section>
        <Faq />
      </Section>
    </>
  );
};

export default FAQs;
