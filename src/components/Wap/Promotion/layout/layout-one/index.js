import React from "react";
import styled from "styled-components";
import i18n from "../../../../../utils/i18n";
import PageTitle from "../../../components/pagetitle";

const ListItem = styled.div`
  background: url(${(props) => props.src}) no-repeat right top;

  position: relative;

  border-radius: ${({ theme }) => {
    return theme.wapBorderRadius ? theme.wapBorderRadius : "40px";
  }};

  height: 280px;
  width: 690px;

  background-size: 100% 100%;
  aspect-ratio: 1;
`;

const ListItemWrapper = styled.div`
  gap: 20px;
  display: flex;
  flex-direction: column;
`;
const LayoutOne = (props) => {
  return (
    <div>
      <PageTitle>{i18n.t("common.promotion")}</PageTitle>
      <ListItemWrapper>
        {props.promotionList.items
          .sort((a, b) => {
            return a.order - b.order;
          })
          .map((row, index) => {
            const checkIfLocaleExist = row.localization[i18n.language];
            if (row.localization !== null) {
              return (
                <ListItem
                  key={index}
                  order={row.order}
                  src={
                    checkIfLocaleExist
                      ? checkIfLocaleExist.mobileBanner
                      : row.mobileBanner
                  }
                  onClick={() => props.handlePromoClick(row.id)}
                ></ListItem>
              );
            } else {
              return (
                <ListItem
                  key={index}
                  src={row.mobileBanner}
                  onClick={() => props.handlePromoClick(row.id)}
                ></ListItem>
              );
            }
          })}
      </ListItemWrapper>
    </div>
  );
};

export default LayoutOne;
