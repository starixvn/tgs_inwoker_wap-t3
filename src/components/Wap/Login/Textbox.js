import React, { Component } from "react";
import styled from "styled-components";

const Container = styled.div`
  margin: 0 auto;

  width: 620px;
  height: 80px;
  border-radius: 6px;
  border: solid 1px #676666;
  background-color: #ffffff;
  box-shadow: 0px 2px 10px 0px rgba(0, 0, 0, 0.4);
`;

const TextSpan = styled.span`
  margin: 22px 15px 0 15px;
  width: 56px;
  height: 38px;
  float: left;

  background-color: ${({ notNull }) => {
    return !notNull ? "#ABABAB" : "black";
  }};

  mask: url(${(props) => {
      return props.icon;
    }})
    no-repeat center / contain;
  -webkit-mask: url(${(props) => {
      return props.icon;
    }})
    no-repeat center / contain;
  background-size: 100%;
`;

const InputTextBox = styled.input`
  width: 410px;
  color: #000;
  font-size: 30px;
  float: left;
  background: none;
  border: none;
  padding-left: 0;

  margin-top: 20px;
  &::-webkit-input-placeholder {
    color: #b7b7b7;
    font-size: 23px;
    ${(props) => props.style.placeHolderStyle}
  }
  &:-webkit-autofill {
    -webkit-text-fill-color: #b7b7b7;
  }
`;
const TextContainer = styled.div`
  float: left;
  width: 550px;
  height: 100%;
`;

const RightIcon = styled.div`
  width: 40px;
  height: 60px;
  background: url(${(props) =>
      props.password === true
        ? props.hidden
          ? process.env.PUBLIC_URL + `/assets/images/wapp/hide-password.png`
          : process.env.PUBLIC_URL + `/assets/images/wapp/show-password.png`
        : ""})
    no-repeat;
  background-size: contain;
  margin: 25px 25px 0 0;
  display: inline-block;
  float: left;
`;
class TextBox extends Component {
  render() {
    return (
      <Container style={{ ...this.props.style }}>
        <TextContainer>
          <TextSpan
            style={{ ...this.props.iconStyle }}
            icon={this.props.icon}
            notNull={this.props.value}
          ></TextSpan>
          <InputTextBox
            style={{ ...this.props.inputStyle }}
            type={this.props.type}
            value={this.props.value}
            onChange={this.props.onChange}
            maxLength={this.props.maxLength}
            placeholder={this.props.placeholder}
            disabled={this.props.disabled === true ? true : false}
          />
        </TextContainer>
        {this.props.password && (
          <RightIcon
            style={{ ...this.props.rightIconStyle }}
            onClick={this.props.toggleShow}
            password={this.props.password}
            hidden={this.props.hidePassword}
          ></RightIcon>
        )}
      </Container>
    );
  }
}
export default TextBox;
