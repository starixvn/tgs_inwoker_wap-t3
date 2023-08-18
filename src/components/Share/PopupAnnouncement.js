import React, { Component } from "react";
import Dialog from "@material-ui/core/Dialog";
import styled from "styled-components";
import { withStyles } from "@material-ui/core/styles";

import i18n from "../../utils/i18n";
import { AppHistory } from "../../history/History";
import config from "../../config/config";
const StyledDialog = withStyles({
  root: {
    boxShadow: "0 3px 5px 2px rgba(255, 105, 135, .3)",

    "& .MuiPaper-root": {
      backgroundColor: "transparent",
      borderRadius: "15px",
    },
  },
})(Dialog);
const Container = styled.div`
  width: 80vw;
  background: #27273f;
  background-attachment: fixed;
  background-position: center;
  color: #fff;
  display: flex;
  padding: 50px;

  justify-content: center;
  flex-direction: column;
  align-items: center;
  border-radius: 50px;
`;
const CloseButton = styled.div`
  background: ${({ theme }) => theme.primary};
  color: white;
  padding: 20px 30px;
  margin-bottom: 10px;
  width: 100%;
  text-align: center;
  letter-spacing: 3px;
  font-size: 30px;
  border-radius: 50px;
  filter: drop-shadow(0 0 4px ${({ theme }) => theme.primary})
    drop-shadow(0 0 4px ${({ theme }) => theme.primary}) contrast(1)
    brightness(1);
`;
const TitleContainer = styled.div`
  text-align: center;

  font-size: 50px;
  margin-top: 30px;
`;
const FormContainer = styled.div`
  margin: 30px 60px 40px 60px;
  padding: 0 3px;
  width: 100%;
  min-height: 300px;
  font-size: 30px;
  text-align: justify;
  overflow: auto;
  max-height: 50vh;
`;

const ContentContainer = styled.div`
  margin: 20px 20px 10px 20px;
  padding: 0 3px;
  overflow: auto;
  height: 800px;
`;

const ImageBanner = styled.div`
  background: url(${({ img }) => img}) no-repeat center;
  height: 227px;
  width: 560px;
  border-radius: 50px;
  background-size: 100%;
  padding: 10px;
  margin-bottom: 20px;
  display: flex;
  justify-content: flex-end;
  align-items: flex-end;
  box-shadow: 0 4px 6px -1px rgb(0 0 0/0.1), 0 2px 4px -2px rgb(0 0 0/0.1);
`;

const TheButton = styled.div`
  padding: 5px 20px;
  background: ${({ theme }) => theme.primary};
  color: ${({ theme }) => theme.primaryText};
  border-radius: 10px;
  cursor: pointer;
  box-shadow: 0 4px 6px -1px rgb(0 0 0/0.1), 0 2px 4px -2px rgb(0 0 0/0.1);
`;

const CustomContainer = styled.div`
  width: 80vw;
  background: transparent;
  background-attachment: fixed;
  background-position: center;
  display: flex;
  padding: 30px;
  justify-content: center;
  flex-direction: column;
  position: relative;
  align-items: center;
`;
const CustomEmptyHeader = styled.div`
  width: 80vw;
  height: 16vh;
  background: url(${process.env.PUBLIC_URL +
    `/assets/images/wapp/resource/T${config.wapVersion}/dialog-header.png`})
    no-repeat;
  background-size: 80vw 16vh;
  padding: 6vh 6vw;
  font-size: 3em;
  font-weight: bold;
  font-style: italic;
  color: #fff;
  text-shadow: 0 0 10px #222;
`;
const CustomHeaderImage = styled.div`
  width: 80vw;
  height: 18vh;
  position: absolute;
  top: -1vh;
  background: url(${process.env.PUBLIC_URL +
    `/assets/images/wapp/resource/T${config.wapVersion}/dialog-header-image.png`})
    no-repeat;
  background-size: contain;
  background-position: right;
  filter: drop-shadow(-1px -2px 5px #222);
`;
const CustomTitleContainer = styled(TitleContainer)`
  color: #fff;
  font-style: italic;
  font-size: 30px;
  margin: 15px auto 10px;
`;
const CustomBodyContainer = styled.div`
  width: 80vw;
  height: 30vh;
  text-align: center;
  background: url(${process.env.PUBLIC_URL +
    `/assets/images/wapp/resource/T${config.wapVersion}/dialog-body.png`})
    no-repeat;
  background-size: 80vw 30vh;
  margin-top: -10px;
`;
const CustomFormContainer = styled.div`
  margin: 0 auto;
  padding: 2em;
  width: 70vw;
  font-size: 22px;
  text-align: justify;
  overflow: auto;
  height: 22vh;
  background: url(${process.env.PUBLIC_URL +
    `/assets/images/wapp/resource/T${config.wapVersion}/dialog-content.png`})
    no-repeat;
  background-size: 70vw 22vh;
  color: #fff;
`;

const CloseIcon = styled.div`
  background: url(${process.env.PUBLIC_URL +
    `/assets/images/wapp/icons/close.svg`})
    no-repeat;
  width: 40px;
  height: 40px;
  position: absolute;
  right: 20px;
  top: 20px;
  background-size: 100%;
`;

const ContainerSwitcher = (props) => {
  if (props.isCustom)
    return (
      <CustomContainer>
        <CustomEmptyHeader>WELCOME</CustomEmptyHeader>
        <CustomHeaderImage></CustomHeaderImage>
        <CustomBodyContainer>{props.children}</CustomBodyContainer>
      </CustomContainer>
    );
  else
    return (
      <Container>
        {props.children}{" "}
        <CloseButton onClick={props.onClose}>
          {i18n.t("T13.dialog.confirm")}
        </CloseButton>
      </Container>
    );
};

const TitleSwitcher = (props) => {
  if (props.isCustom)
    return <CustomTitleContainer>{props.children}</CustomTitleContainer>;
  else return <TitleContainer>{props.children}</TitleContainer>;
};

const FormContainerSwitcher = (props) => {
  if (props.isCustom)
    return (
      <CustomFormContainer
        dangerouslySetInnerHTML={props.dangerouslySetInnerHTML}
      ></CustomFormContainer>
    );
  else
    return (
      <FormContainer
        dangerouslySetInnerHTML={props.dangerouslySetInnerHTML}
      ></FormContainer>
    );
};

class PopupAnnouncement extends Component {
  handlePromotionClick = (id) => {
    AppHistory.push({
      pathname: "/promotion/" + id,
    });
    this.props.onClose();
  };

  render() {
    return (
      <StyledDialog open={this.props.open} onClose={this.props.onClose}>
        <ContainerSwitcher
          isCustom={this.props.isCustom}
          onClose={this.props.onClose}
        >
          <div className="clear"></div>
          <TitleSwitcher isCustom={this.props.isCustom}>
            {this.props.header}
          </TitleSwitcher>
          {this.props.type === "promo" ? (
            <ContentContainer>
              {this.props.content
                .sort((a, b) => {
                  return a.order - b.order;
                })
                .map((data, index) => {
                  var checkLocale = data.localization[i18n.language];
                  return (
                    <ImageBanner
                      key={index}
                      order={data.order}
                      img={
                        checkLocale
                          ? checkLocale.mobileBanner
                          : data.mobileBanner
                      }
                      onClick={() => {
                        this.handlePromotionClick(data.id);
                      }}
                    ></ImageBanner>
                  );
                })}
            </ContentContainer>
          ) : (
            <FormContainerSwitcher
              isCustom={this.props.isCustom}
              dangerouslySetInnerHTML={{
                __html: this.props.text.replace(/\n/g, "<br />"),
              }}
            ></FormContainerSwitcher>
          )}
          {/* <CloseButton onClick={this.props.onClose}>
            {i18n.t("common.confirm")}
          </CloseButton> */}
        </ContainerSwitcher>
      </StyledDialog>
    );
  }
}

export default PopupAnnouncement;
