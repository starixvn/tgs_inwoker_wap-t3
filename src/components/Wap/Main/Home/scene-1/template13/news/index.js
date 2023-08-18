import React from "react";
import styled from "styled-components";

const NewsWrapper = styled.div`
  margin-bottom: 20px;
  border-radius: 40px;
  box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.2);
  background: #27273f;
`;

const Content = styled.div`
  padding: 30px;

  border-radius: 0 0 40px 40px;
`;

const Title = styled.div`
  font-size: 40px;
  padding-bottom: 10px;
  font-weight: bold;
`;

const Description = styled.div`
  font-size: 24px;
  line-height: 1.5em;
  height: 4.5em;
  overflow: hidden;
`;

const ImageWrapper = styled.div`
  height: 300px;
  width: 100%;
  background: url(${({ src }) => src}) no-repeat center;
  background-size: cover;
`;

const News = ({ data, onClick }) => {
  return (
    <NewsWrapper onClick={onClick}>
      <ImageWrapper
        style={{ width: "100%", height: "300px" }}
        src={
          process.env.PUBLIC_URL + "/assets/images/news/w" + data.image + ".jpg"
        }
      />
      <Content>
        <Title>{data.title}</Title> <Description>{data.content}</Description>
      </Content>
    </NewsWrapper>
  );
};

export default News;
