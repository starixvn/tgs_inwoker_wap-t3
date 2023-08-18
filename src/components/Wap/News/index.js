import React from "react";
import { AppHistory } from "../../../history/History";
import i18n from "../../../utils/i18n";
import News from "../Main/Home/scene-1/template13/news";
import Header from "../Share/Header";
import styled from "styled-components";
import { hardcodeNews } from "../Main/Home/scene-1/template13/news/hardcoded";

const Container = styled.div`
  padding: 110px 40px;
  color: #fff;
`;

const NewsSite = () => {
  const goBack = () => {
    AppHistory.goBack();
  };

  return (
    <div>
      <Header
        background={true}
        onBackClick={goBack}
        title={i18n.t("T13.topNews")}
      ></Header>
      <Container>
        {hardcodeNews.map((data, index) => {
          return (
            <News
              key={index}
              data={data}
              onClick={() => {
                AppHistory.push("/news/" + data.id);
                window.scrollTo(0, 0);
              }}
            />
          );
        })}
      </Container>
    </div>
  );
};

export default NewsSite;
