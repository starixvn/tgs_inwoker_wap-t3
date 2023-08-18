import React, { Component } from "react";
import styled from "styled-components";
import config from "../../../config/config";
const Container = styled.div`
  margin: 0 auto;

  width: 635px;
  height: 80px;
  border-radius: 6px;
  border: solid 1px #676666;
  background-color:  ${(props) =>
    props.primaryBg ? props.theme.wapPrimary : `#ffffff`}
  box-shadow: 0px 2px 10px 0px rgba(0, 0, 0, 0.4);
`;

const InputTextBox = styled.input`
  width: 300px;
  color: #000;
  font-size: 30px;
  float: left;
  background: none;
  border: none;
  padding-left: 0;

  margin: 20px 10px;
  &::-webkit-input-placeholder {
    color: #b7b7b7;
    font-size: 23px;
  }
  &:-webkit-autofill {
    -webkit-text-fill-color: #b7b7b7;
  }
`;
const SelectContainer = styled.select`
  width: 100%;
  height: 100%;
  border: none;
  color: ${(props) => (props.primaryBg ? `#fff` : `#000`)}};
  font-size: 30px;
  ${(props) =>
    props.primaryBg ? `background: ${props.theme.wapPrimary};` : ``}}
`;
const TextContainer = styled.div`
  float: right;
  width: 100%;
  height: 100%;
`;

class Select extends Component {
  render() {
    return (
      <React.Fragment>
        <Container
          style={{
            margin: this.props.leaveGap
              ? "20px 0px 20px 57px"
              : "20px 0px 0px 57px",
            width: "180px",
            float: "left",
            padding: "10px",
          }}
          primaryBg={this.props.primaryBg}
        >
          <SelectContainer
            style={{ ...this.props.selectStyle }}
            primaryBg={this.props.primaryBg}
            value={this.props.selectValue}
            onChange={this.props.onSelectChange}
          >
            <option value={config.features.PhonePrefix}>
              {config.features.PhonePrefix}
            </option>
          </SelectContainer>
        </Container>

        <Container
          style={{
            margin: " 20px 57px 0px 0",
            width: "445px",
            float: "right",
            ...this.props.style,
          }}
        >
          <TextContainer>
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
        </Container>
      </React.Fragment>
    );
  }
}
export default Select;
