import React from "react";
import styled from "styled-components";
import i18n from "../../../../utils/i18n";
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
  border: solid 1px #fff;
  padding: 0px 50px;

  background: ${({ theme }) => {
    return theme.inputBackground ? theme.inputBackground : "none";
  }};
  width: 100%;
  font-family: "Montserrat", sans-serif;
  ::placeholder {
    font-size: ${(props)=> i18n.language === "ta-IN" ? "20px" : "28px"};
    opacity: 0.76;
    color: ${({ theme }) => {
      return theme.textfieldColor ? theme.textfieldColor : "#fff";
    }};
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
  padding: 20px 20px 0 20px;
  margin: 20px auto;
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

const Button = styled.div`
  font-size: 23px;
  position: absolute;
  text-align: center;
  color: #fff;
  padding: 8px 20px;
  margin-top: 24px;
  top: 10%;
  right: 25px;
  height: 47px;
  border-radius: ${({ theme }) => {
    return theme.wapBorderRadius ? theme.wapBorderRadius : "50px";
  }};
  background: ${({ theme }) => theme.primary};

  ${(props) =>
    i18n.language === "ta-IN"
      ? `
  width: 200px;
  height: 80px;
  margin-top: 4px;
  `
      : ``}

`;

const TextfieldWithButton = ({
  title,
  value,
  onChange,
  buttonlabel,
  placeholder,
  onClick,
  maxLength,
  style,
  borderRadius,
}) => {
  return (
    <CustomInput style={style} borderRadius={borderRadius}>
      {title && <CustomLabel>{title}</CustomLabel>}

      <SelectContainer>
        <CustomInputfield
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          maxLength={maxLength}
        />
        <Button onClick={onClick}>{buttonlabel}</Button>
      </SelectContainer>
    </CustomInput>
  );
};

export default TextfieldWithButton;
