import React from "react";
import styled from "styled-components";

const CustomSelect = styled.select`
  font-size: 28px;
  min-height: 105px;
  border: none;

  border-radius: ${({ theme }) => {
    return theme.wapBorderRadius ? theme.wapBorderRadius : "50px";
  }};
  border: solid 1px #fff;
  padding: 0px 50px;
  background: ${({ theme }) => {
    return theme.inputBackground ? theme.inputBackground : "#fff";
  }};
  color: ${({ theme }) => {
    return theme.textfieldColor ? theme.textfieldColor : "#fff";
  }};
  width: 100%;
  outline: none;
  -webkit-appearance: none;
  -moz-appearance: none;
  text-indent: 1px;
  text-overflow: "";
  z-index: 1;

  option {
    color: #000;
  }
`;

const SelectContainer = styled.div`
  width: 100%;
  position: relative;
  display: flex;
`;

const CustomInput = styled.div`
  display: flex;
  flex-direction: column;
  border-radius: 20px;
  ${({ noGap }) => {
    return noGap
      ? "padding: 0 20px;"
      : "padding: 20px 20px 0 20px; margin: 20px auto;";
  }}

  flex: auto;
`;

const DropdownSection = styled.div`
  height: 100%;
  width: 100px;
  position: absolute;
  padding-right: 10px;
  top: 0;
  right: 0;
  border-radius: 0 50px 50px 0;
  z-index: 0;

  display: flex;
  align-items: center;
  justify-content: center;

  ${({ variant }) => {
    switch (variant) {
      case "bordered":
        return "border-left: solid 2px #fff;";
      case "nothing":
        return "opacity: 0;";
      default:
        return "";
    }
  }};
`;

const CustomLabel = styled.div`
  font-size: 24px;
  font-weight: 600;
  margin-left: 3px;
  padding-bottom: 30px;
  color: ${({ black, theme }) => {
    return black
      ? "#000"
      : theme.wapSecondary
      ? theme.wapSecondary
      : theme.secondary;
  }};
`;

const ArrowDown = styled.div`
  mask: url(${process.env.PUBLIC_URL +
    `/assets/images/wapp/btn-back-white.png`})
    no-repeat center;
  background: ${({ theme }) => {
    return theme.primaryText ? theme.primaryText : "#fff";
  }};
  width: 40px;
  height: 30px;
  rotate: 270deg;
`;

const Select = ({ title, value, onChange, children, variant, noGap }) => {
  return (
    <CustomInput noGap={noGap}>
      {title && <CustomLabel>{title}</CustomLabel>}

      <SelectContainer>
        <CustomSelect value={value} onChange={onChange}>
          {children}
        </CustomSelect>
        <DropdownSection variant={variant}>
          <ArrowDown />
        </DropdownSection>
      </SelectContainer>
    </CustomInput>
  );
};

export default Select;
