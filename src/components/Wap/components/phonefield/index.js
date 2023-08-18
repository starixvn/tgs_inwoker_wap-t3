import React from "react";
import styled from "styled-components";

const CustomInputfield = styled.input`
  font-size: 28px;
  min-height: 105px;
  border: none;
  color: ${({ theme }) => {
    return theme.textfieldColor ? theme.textfieldColor : "#fff";
  }};
  border-radius: ${({ theme }) => {
    return theme.wapBorderRadius ? theme.wapBorderRadius : "50px";
  }};
  border: ${({ variant }) => border(variant)};
  padding: 0px 20px;

  background: ${({ variant, theme }) => background(variant, theme)};
  font-family: "Montserrat", sans-serif;
  ::placeholder {
    font-size: 28px;
    opacity: 0.76;
    color: ${({ theme }) => {
      return theme.textfieldColor ? theme.textfieldColor : "#fff";
    }};
  }
`;

const InputContainer = styled.div`
  width: 100%;
  position: relative;
  display: grid;
  grid-template-columns: 20% 1fr;
  gap: 20px;
`;

const CustomInput = styled.div`
  display: flex;
  flex-direction: column;
  border-radius: ${({ theme }) => {
    return theme.wapBorderRadius ? theme.wapBorderRadius : "50px";
  }};
  padding: ${({ variant }) => padding(variant)};
  margin: ${({ variant }) => gapLeaver(variant)};
`;

const DropdownSection = styled.div`
  height: 100%;

  position: absolute;
  top: 40px;
  right: 5px;

  z-index: 0;

  ${({ variant }) => {
    switch (variant) {
      case "bordered":
        return "border-left: solid 2px #fff;";
      case "secondary":
        return "background: #fff;";
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
  float: left;
`;

const CustomContainer = styled.div`
  display: flex;
  justify-content: center;
  padding: 20px 0;
  flex-direction: column;
  align-items: center;
  gap: 10px;
`;

const SelectContainer = styled.div`
  width: 100%;
  position: relative;
  display: flex;
`;

const CustomSelect = styled.select`
  font-size: 28px;
  min-height: 105px;
  border: none;
  color: ${({ theme }) => {
    return theme.textfieldColor ? theme.textfieldColor : "#fff";
  }};
  border-radius: ${({ theme }) => {
    return theme.wapBorderRadius ? theme.wapBorderRadius : "50px";
  }};
  border: ${({ variant }) => border(variant)};
  padding: 0px 10px 0 20px;
  background: ${({ variant, theme }) => background(variant, theme)};
  width: 100%;

  -webkit-appearance: none;
  -moz-appearance: none;
  text-indent: 1px;
  text-overflow: "";
  z-index: 1;

  option {
    color: #000;
  }
`;

const ArrowDown = styled.div`
  mask: url(${process.env.PUBLIC_URL +
    `/assets/images/wapp/btn-back-white.png`})
    no-repeat center;
  background: ${({ theme }) => theme.primaryText};
  width: 70px;
  transform: scale(0.7);
  height: 30px;
  rotate: 270deg;
`;

const gapLeaver = (variant) => {
  switch (variant) {
    case "loginregister":
      return "";
    default:
      return "20px auto";
  }
};

const padding = (variant) => {
  switch (variant) {
    case "loginregister":
      return "0 20px";
    default:
      return "20px 20px 0 20px";
  }
};

const background = (variant, theme) => {
  switch (variant) {
    case "loginregister":
      return "none";
    default:
      return theme.inputBackground ? theme.inputBackground : "transparent";
  }
};

const border = (variant, theme) => {
  switch (variant) {
    case "loginregister":
      return "solid 1px #fff";
    default:
      return "solid 1px #fff";
  }
};

const PhoneField = ({
  title,
  value,
  onChange,
  custom,
  variant,
  placeholder,
  onSelect,
  children,
  phonePrefix,
  maxLength,
}) => {
  return (
    <CustomInput variant={variant}>
      {title && <CustomLabel>{title}</CustomLabel>}

      <InputContainer>
        <SelectContainer>
          <CustomSelect
            value={phonePrefix}
            onChange={onSelect}
            variant={variant}
          >
            {children}
          </CustomSelect>
          <DropdownSection>
            <ArrowDown />
          </DropdownSection>
        </SelectContainer>
        <CustomInputfield
          maxLength={maxLength}
          variant={variant}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
        />
      </InputContainer>
      {custom && <CustomContainer>{custom}</CustomContainer>}
    </CustomInput>
  );
};

export default PhoneField;
