import React, { Component } from "react";
import styled from "styled-components";
const CustomText = styled.div`
  width: 700px;
  min-height: 170px;

  margin: 20px auto;
  display: flex;
  flex-direction: column;
`;
const CustomLabel = styled.div`
  font-size: 24px;
  font-weight: 600;
  margin-left: 3px;
  color: ${({ black, theme }) => {
    return black
      ? "#000"
      : theme.wapSecondary
      ? theme.wapSecondary
      : theme.secondary;
  }};
`;
const CustomInput = styled.input`
  font-size: 28px;
  margin-top: 18px;
  border-radius: ${({ theme }) => {
    return theme.wapBorderRadius ? theme.wapBorderRadius : "50px";
  }};
  min-height: 71px;
  background: none;
  padding: 16px 54px;
  font-weight: 500;
  border: 0;
  display: flex;
  flex: 1;
  background: ${({ theme }) => {
    return theme.inputBackground ? theme.inputBackground : "transparent";
  }};
  color: ${({ theme }) => {
    return theme.textfieldColor ? theme.textfieldColor : "#fff";
  }};
  border: solid 1px #fff;
  font-family: "Montserrat", sans-serif;
  ::placeholder,
  ::-webkit-input-placeholder {
    color: ${({ theme }) => {
      return theme.textfieldColor ? theme.textfieldColor : "#fff";
    }};
    font-size: 28px;
  }
  &:disabled {
    opacity: 1;
  }
`;

const LabelContainer = styled.div`
  display: flex;
  align-items: center;
  padding-bottom: 20px;
  justify-content: space-between;
`;
class Textbox extends Component {
  render() {
    return (
      <CustomText
        // style={{ ...this.props.style }}
        onClick={this.props.onClick}
      >
        <LabelContainer>
          <CustomLabel black={this.props.black}>{this.props.label}</CustomLabel>
          {this.props.custom && <div>{this.props.custom}</div>}
        </LabelContainer>
        <CustomInput
          style={this.props.color ? { color: this.props.color } : {}}
          type={this.props.type ? this.props.type : "text"}
          value={this.props.value}
          placeholder={this.props.placeholder}
          disabled={this.props.disabled ? this.props.disabled : false}
          onChange={this.props.onChange}
          onBlur={this.props.onBlur}
          maxLength={this.props.maxLength ? this.props.maxLength : 50}
        ></CustomInput>
      </CustomText>
    );
  }
}

export default Textbox;
