import React, { Component } from "react";
import styled from "styled-components";
const ContentWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  padding: 0 20px;
`;
const Content = styled.div`
  ${(props) =>
    props.disabled
      ? `background-color: #A5A5A5;`
      : `background-color: ${props.theme.primary};
         filter: drop-shadow(0 0 5px ${props.theme.primary})
      drop-shadow(0 0 5px ${props.theme.primary}) contrast(1)
      brightness(1);`}
  height: 105px;
  border-radius: ${({ theme }) => {
    return theme.wapBorderRadius ? theme.wapBorderRadius : "50px";
  }};
  width: fit-content;
  font-size: 34px;
  min-width: 100%;
  color: ${({ theme }) =>
    theme.customButtonText ? theme.customButtonText : "#ffffff"};
  text-align: center;

  display: flex;
  padding: 0 50px;
  align-items: center;
  justify-content: center;
`;

const ButtonWrapper = styled.div`
  display: flex;
  flex-direction: column;
  border-radius: 20px;
  padding: 0 20px;
  margin: 20px auto;
  flex: auto;
  padding: 10px 0;
  min-width: fit-content;
  align-items: center;
  justify-content: center;
`;
class CustomButton extends Component {
  render() {
    return (
      <ContentWrapper>
        <ButtonWrapper>
          <Content
            onClick={this.props.disabled === true ? null : this.props.onClick}
            disabled={this.props.disabled ? this.props.disabled : false}
          >
            {this.props.label}
          </Content>
        </ButtonWrapper>
      </ContentWrapper>
    );
  }
}
export default CustomButton;
