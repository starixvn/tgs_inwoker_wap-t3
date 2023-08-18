import React, { useState } from "react";

import styled from "styled-components";

import { Dialog } from "@material-ui/core";
import { wapBorderRadius } from "../../../config/settings";
const moment = require("moment");
const CheckboxContainer = styled.div`
  float: left;
  width: 46px;
  height: 46px;
  margin: 56px 0 0 20px;

  ${(props) => (props.edit ? `display:block` : `display:none`)};
`;
const ContentContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: relative;
  font-size: 28px;

  background: #202137;
  color: #fff;
  border-radius: ${wapBorderRadius ? wapBorderRadius : "75px"};
  padding: 40px 70px;
`;

const ListItem = styled.div`
  width: 100%;
  margin: 20px auto;
`;

const MsgTitleSpan = styled.span`
  float: left;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  width: 100%;
`;
const MsgDate = styled.div`
  font-size: 28px;
  opacity: 0.5;
`;

const AnotherMsgDate = styled(MsgDate)`
  text-align: center;
  padding: 20px 0;
`;

const ItemContainer = styled.div`
  float: right;
  width: ${(props) => (props.edit ? `648px` : `688px`)};
  border-radius: 12px;
  color: white;
  margin-right: 30px;
`;
const CheckboxCircle = styled.div`
  width: 46px;
  height: 46px;

  ${(props) =>
    props.checked
      ? `background: url(${
          process.env.PUBLIC_URL + `/assets/images/wapp/icon-inbox-checked.png`
        }) no-repeat;`
      : `border-radius: 23px;
    border: 2px solid #949494;`}
`;

const LetterContent = styled.div`
  font-size: 30px;
  padding: 0 20px;
  background: #202137;
  color: #fff;

  max-height: 400px;
  overflow-y: auto;

  ${({ opened }) =>
    opened
      ? `

  `
      : `
  display: none;
      `}
`;

const Lettercontainer = styled.div`
  background: #202137;
  color: #fff;
  display: flex;
  flex-direction: column;
  padding: 40px 40px 40px 40px;
`;

const LetterTitle = styled.div`
  font-size: 60px;
  font-weight: bold;
  text-align: center;
  justify-content: center;
`;

const CustomDialog = styled(Dialog)`
  .MuiPaper-root {
    background: none;
    border-radius: 25px;
    min-width: 80vw;
  }
`;

const InboxList = ({
  index,
  row,
  edit,
  handleCheckboxClick,
  selected,
  handleItemClick,
}) => {
  const [opened, setOpened] = useState(false);

  const handleShowDetail = (index, isread) => {
    if (!opened && isread === false) handleItemClick(row.id);
    setOpened(!opened);
  };

  return (
    <ListItem>
      <CheckboxContainer edit={edit}>
        <CheckboxCircle
          onClick={() => handleCheckboxClick(row.id, row.id)}
          checked={selected.includes(row.id)}
        ></CheckboxCircle>
      </CheckboxContainer>
      <ItemContainer key={row.id} edit={edit}>
        <ContentContainer
          onClick={() => handleShowDetail(index, row.isread)}
          opened={opened}
        >
          <div>
            <div isread={row.isread}>
              <MsgTitleSpan>
                <div
                  dangerouslySetInnerHTML={{
                    __html:
                      row.localization !== null && row.localization.subject
                        ? row.localization.subject
                        : row.subject,
                  }}
                />
              </MsgTitleSpan>
            </div>
            <MsgDate>
              {moment(row.createon).format("YYYY-MM-DD hh:mm a")}
            </MsgDate>
          </div>
        </ContentContainer>
      </ItemContainer>{" "}
      <CustomDialog
        open={opened}
        onClose={() => {
          setOpened(false);
        }}
      >
        <Lettercontainer>
          <LetterTitle>
            <div
              dangerouslySetInnerHTML={{
                __html:
                  row.localization !== null && row.localization.subject
                    ? row.localization.subject
                    : row.subject,
              }}
            />
          </LetterTitle>
          <AnotherMsgDate>
            {moment(row.createon).format("YYYY-MM-DD hh:mm a")}
          </AnotherMsgDate>
          <LetterContent
            opened={opened}
            dangerouslySetInnerHTML={{
              __html:
                "<div style='width: 100%; height: 1px; background: #efefef;margin-top: 2px;'>123</div>" +
                  row.localization !==
                  null && row.localization.content
                  ? row.localization.content
                  : row.content,
            }}
          />
        </Lettercontainer>
      </CustomDialog>
    </ListItem>
  );
};

export default InboxList;
