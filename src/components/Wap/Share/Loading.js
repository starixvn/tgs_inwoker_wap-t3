import React from "react";
import { connect } from "react-redux";
import styled, { keyframes } from "styled-components";

const spinner = keyframes`
 0% { transform: rotateY(0deg);  }

 100% {  transform: rotateY(-360deg);}
`;
const Container = styled.div`
  width: 100%;

  top: 0;
  left: 0;
  position: fixed;
  transition: opacity 0.2s linear, height 0.02s linear 0.2s;
  background-color: rgba(
    0,
    0,
    0,
    ${(props) => (props.opacity ? props.opacity : 0.7)}
  );
  ${(props) =>
    props.open ? "opacity:1;height: 100%;" : "opacity:0;height:0px;"};
  z-index: 9999;
`;
const Inner = styled.div`
  margin: 0;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;
const LogoImg = styled.img`
  margin: 0 auto;
  display: block;
  width: 250px;

  animation-name: ${spinner};
  animation-timing-function: ease;
  animation-iteration-count: infinite;
  animation-duration: 0.6s;
`;

function Loading(props) {
  return (
    <Container open={props.show} opacity={props.opacity}>
      <Inner>
        <LogoImg src={props.general.brand && props.general.brand.loadingUrl} />
        <div className="clear"></div>
      </Inner>
    </Container>
  );
}
const mapStateToProps = (state) => {
  return {
    general: state.general,
  };
};

export default connect(mapStateToProps, null)(Loading);
