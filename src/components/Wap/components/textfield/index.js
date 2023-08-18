import React from "react";
import styled from "styled-components";
import { wapBorderRadius } from "../../../../config/settings";
import i18n from "../../../../utils/i18n";
const CustomInputfield = styled.input`
  font-size: 28px;
  min-height: 105px;
  border: none;
  color: ${({ theme }) => {
    return theme.textfieldColor ? theme.textfieldColor : "#fff";
  }};

  padding: ${({ withIcon }) => {
    return withIcon ? " 0px 50px 0 25px " : " 0px 50px";
  }};
  background: none;
  width: 100%;

  ::placeholder {
    font-size: ${(props)=> i18n.language === "ta-IN" ? "20px" : "28px"};
    opacity: 0.76;
    font-family: Montserrat;
    color: ${({ theme }) => {
      return theme.textfieldColor ? theme.textfieldColor : "#fff";
    }};
  }
`;

const CustomInput = styled.div`
  display: flex;
  flex-direction: column;
  border-radius: ${({ theme }) => {
    return theme.wapBorderRadius ? theme.wapBorderRadius : "50px";
  }};
  padding: ${({ leaveTopGap }) => {
    return leaveTopGap ? `0 20px` : `20px 20px 0 20px`;
  }};
  margin: 20px auto;
  flex: auto;
  min-width: fit-content;
`;

const DropdownSection = styled.div`
  height: 100%;
  width: 125px;
  position: absolute;
  top: 0;
  right: 0;
  border-radius: 0 50px 50px 0;
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

const CustomWrapper = styled.div`
  border: solid 1px #fff;
  width: 100%;
  position: relative;
  display: flex;
  border-radius: ${({ theme }) => {
    return theme.wapBorderRadius ? theme.wapBorderRadius : "50px";
  }};
  align-items: center;
  background: ${({ theme }) => {
    return theme.inputBackground ? theme.inputBackground : "transparent";
  }};
`;

const Icon = styled.div`
  margin-left: 20px;
  mask: url(${({ icon }) => icon});
  mask-repeat: no-repeat;
  mask-position: center;
  mask-size: 80%;
  background: ${({ theme }) => {
    return theme.textfieldColor ? theme.textfieldColor : "#fff";
  }};
  width: 105px;
  height: 75px;
`;

const Textfield = ({
  title,
  value,
  onChange,
  custom,
  variant,
  icon,
  type,
  placeholder,
  borderRadius,
  pattern,
  actions,
  style,
}) => {
  return (
    <CustomInput leaveTopGap={title !== ""} style={style}>
      {title && <CustomLabel>{title}</CustomLabel>}

      <CustomWrapper borderRadius={borderRadius}>
        {icon && <Icon icon={icon} />}

        <CustomInputfield
          withIcon={icon}
          value={value}
          type={type}
          onChange={onChange}
          placeholder={placeholder}
          pattern={pattern}
        />
        <div>
          {actions} <DropdownSection variant={variant} />
        </div>
      </CustomWrapper>

      {custom && <CustomContainer>{custom}</CustomContainer>}
    </CustomInput>
  );
};

export default Textfield;
