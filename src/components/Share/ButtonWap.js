import React, { Component } from "react";
import styled from "styled-components";
const StyleButton = styled.div`
  ${(props) =>
    props.disabled
      ? `background-color: #A5A5A5;`
      : `background-color: ${props.theme.primary};
       filter: drop-shadow(0 0 5px ${props.theme.primary})
    drop-shadow(0 0 5px ${props.theme.primary}) contrast(1)
    brightness(1);`}
  height: 93px;
  border-radius: 50px;
  width: fit-content;
  font-size: 34px;

  color: ${({ theme }) =>
    theme.customButtonText ? theme.customButtonText : "#ffffff"};
  text-align: center;
  min-width: 400px;
  display: flex;
  padding: 0 50px;
  align-items: center;
  justify-content: center;
`;

class ButtonWap extends Component {
  render() {
    return (
      <StyleButton onClick={this.props.onClick} {...this.props}>
        {this.props.name}
      </StyleButton>
    );
  }
}
export default ButtonWap;
