import React from "react";
import styled from "styled-components";

const PageLabel = styled.div`
  padding: 30px;
  text-align: ${({ position }) => {
    return position ? position : "center";
  }};
  width: 100%;
  font-size: 30px;
  text-transform: uppercase;
  color: ${({ theme }) =>
    theme.wapSecondary ? theme.wapSecondary : theme.secondary};
`;

const PageTitle = ({ children, position }) => {
  return <PageLabel position={position}>{children}</PageLabel>;
};

export default PageTitle;
