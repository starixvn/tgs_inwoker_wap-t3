import React from "react";
import styled from "styled-components";
import i18n from "../../../../utils/i18n";

const AnotherWrapper = styled.div`
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
const InputWrapper = styled.div`
  background: #fff;

  width: 700px;
  margin-top: 10px;
  min-height: 105px;
  display: flex;
  width: 100%;
  align-items: center;
  color: #fff;
  border-radius: ${({ theme }) => {
    return theme.wapBorderRadius ? theme.wapBorderRadius : "50px";
  }};
  border: solid 1px #fff;
  padding: 0px 50px;
  background: none;
`;

const CustomButton = styled.button`
  background: transparent;

  border: none;
  font-size: 28px;

  color: ${({ uploaded }) => {
    return uploaded ? ` rgba(255, 255, 255, 1)` : ` rgba(255, 255, 255, 0.75)`;
  }};
`;

const DocumentUploader = ({ title, onClick, onChange, upload }) => {
  return (
    <AnotherWrapper>
      <CustomLabel>{title}</CustomLabel>
      <InputWrapper style={{}}>
        <CustomButton
          onClick={onClick}
          style={{ marginRight: 10 }}
          uploaded={upload}
        >
          {upload ? upload : i18n.t("common.upload2")}
        </CustomButton>
        <input
          type="file"
          id="getFile"
          onChange={onChange}
          accept="image/jpg, image/jpeg, image/png, image/tiff"
          style={{ display: "none" }}
        />
      </InputWrapper>
    </AnotherWrapper>
  );
};

export default DocumentUploader;
