import React from "react";
import Header from "../../Share/Header";

import i18n from "../../../../utils/i18n";
import styled from "styled-components";
import { AppHistory } from "../../../../history/History";
import { useParams } from "react-router";
import { hardcodeNews } from "../../Main/Home/scene-1/template13/news/hardcoded";

const Container = styled.div`
  padding: 110px 40px 220px 40px;
  color: #fff;
`;

const ImageWrapper = styled.div`
  height: 300px;
  width: 100%;
  background: url(${({ src }) => src}) no-repeat center;
  background-size: cover;
  border-radius: 40px;
`;

const ContentText = styled.div`
  font-size: 28px;
  display: grid;
  grid-template-column: 1fr;
  gap: 20px;
  text-align: justify;
  line-height: 40px;
  opacity: 0.8;
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
  font-size: 40px;
  text-align: center;
  padding: 20px 40px 0px 40px;
  width: 100%;
  height: 120px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ByWho = styled.div`
  font-size: 28px;
  text-align: center;
  padding: 20px 0;
`;
const Date = styled.div`
  font-size: 28px;
  text-align: center;
  padding: 20px 0;
`;
const TitleContainer = styled.div`
  display: flex;
  align-items: center;
  padding-top: 30px;
`;

const Content = styled.div`
  padding-top: 20px;
`;

const DetailedNews = ({ newsid }) => {
  let { id } = useParams();

  const goBack = () => {
    AppHistory.goBack();
  };

  const reference = (content) => {
    return hardcodeNews
      .filter((e) => {
        return e.id === id;
      })
      .map((data) => {
        if (content === "content2") {
          return (
            <ContentText
              dangerouslySetInnerHTML={{
                __html: data[content],
              }}
            ></ContentText>
          );
        } else {
          return data[content];
        }
      });
  };

  const changePage = (nextprev) => {
    if (nextprev === "next") {
      if (parseInt(id) + 1 > hardcodeNews.length) {
        AppHistory.push("/news/1");
      } else {
        AppHistory.push("/news/" + (parseInt(id) + 1));
      }
    }

    if (nextprev === "prev") {
      if (parseInt(id) - 1 <= 0) {
        AppHistory.push("/news/" + hardcodeNews.length);
      } else {
        AppHistory.push("/news/" + (parseInt(id) - 1));
      }
    }
  };

  return (
    <div>
      <Header
        background={true}
        onBackClick={goBack}
        title={i18n.t("T13.topNews")}
      ></Header>
      <Container>
        <ImageWrapper
          style={{ width: "100%", height: "300px" }}
          src={
            process.env.PUBLIC_URL +
            "/assets/images/news/w" +
            reference("image") +
            ".jpg"
          }
        />
        <TitleContainer>
          <ArrowLeft
            onClick={() => {
              changePage("prev");
            }}
          />
          <Title>{reference("title")}</Title>
          <ArrowRight
            onClick={() => {
              changePage("next");
            }}
          />
        </TitleContainer>

        <ByWho>By {reference("writer")}</ByWho>
        <Date> {reference("date")}</Date>
        <Content>{reference("content2")}</Content>
      </Container>
    </div>
  );
};

export default DetailedNews;
