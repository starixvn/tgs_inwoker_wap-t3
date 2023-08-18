import React, { Component } from "react";
import { connect } from "react-redux";
import styled from "styled-components";
import Tooltip from "@material-ui/core/Tooltip";
import Header from "../../Wap/Share/Header";
import { withStyles } from "@material-ui/core/styles";
import Loading from "../../Wap/Share/Loading";
import i18n from "../../../utils/i18n";
import QRCode from "react-qr-code";
import { utility } from "../../../utils/utility";
import PageTitle from "../components/pagetitle";
import Select from "../components/select";
import { generalAction } from "../../../api-services/actions/generalAction";

const QRCodeContainer = styled.div`
  padding: 20px;
  margin: 50px auto;
  display: table;
  background-color: #fff;
`;
const QRCodeActionContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: center;
  gap: 40px;
  padding: 20px 0px 10px 0px;
`;
const CustomText = styled.div`
  width: 700px;
  font-size: 28px;
  box-shadow: 0 2px 6px 0 rgba(58, 58, 58, 0.2);
  background-color: #27273f;
  border-radius: ${({ theme }) => {
    return theme.wapBorderRadius ? theme.wapBorderRadius : "50px";
  }};
  padding: 0 20px 0 40px;
  margin: 20px auto;

  display: grid;
  align-items: center;
  grid-template-columns: 30% auto;
`;
const CustomLabel = styled.div`
  float: left;
  color: #fff;
`;
const CustomInput = styled.input`
  width: 330px;
  color: #fff;
  background: transparent;
  font-size: 28px;
  margin: 25px 0 25px 10px;
  font-weight: 500;
  border: 0;
  font-family: "Montserrat";
  padding: 0;
  ::placeholder,
  ::-webkit-input-placeholder {
    color: #c3c3c3;
  }
  &:disabled {
    opacity: 1;
  }
`;
const Button = styled.div`
  width: 100px;
  height: 60px;
  font-size: 24px;
  font-weight: 600;
  text-align: center;
  color: #fff;
  background: ${({ theme }) => {
    return theme.primary;
  }};
  border-radius: ${({ theme }) => {
    return theme.wapBorderRadius ? theme.wapBorderRadius : "50px";
  }};
  display: flex;
  align-items: center;
  padding: 10px 20px;
`;

const DownloadButton = styled(Button)`
  width: max-content;
`;

const CustomSelectContainer = styled.div`
  width: 700px;
  height: 170px;
  margin: 20px auto;
  display: flex;
  flex-direction: column;
`;

const CustomSelectGapLeaver = styled.div`
  padding: 5px;
`;

const CustomSelect = styled.select`
  height: 104px;
  font-size: 28px;
  margin-top: 18px;
  border-radius: 16px;
  border: solid 1px transparent;
  width: 100%;
  padding: 16px 32px;
  background: #fff;
  color: #000;

  &:focus {
    outline: none;
  }
`;

const AnotherCustomLabel = styled.div`
  font-size: 24px;
  font-weight: 600;
  margin-left: 3px;
  color: ${({ theme }) =>
    theme.wapSecondary ? theme.wapSecondary : theme.secondary};
`;

const Table = styled.table`
  width: 700px;
  margin: 0 auto;
  border-collapse: collapse;
  border-spacing: 0;
  background: #27273f;
  border-radius: 30px;

  font-size: 24px;
  font-weight: 600;
  color: #fff;
  text-align: center;
  thead {
    tr {
      th {
        padding: 20px 0;
        border-bottom: 1px solid #e5e5e5;
      }
    }
  }
  tbody {
    tr {
      td {
        padding: 20px 0;
        font-weight: 200;
        border-top: 1px solid #e5e5e5;
      }
    }
  }
`;

const Content = styled.div`
  padding: 90px 0 220px 0;
  min-height: 100vh;
  overflow: auto;
`;

const Container = styled.div`
  min-height: 100vh;
`;

const FlexCenterContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
`;
const LightTooltip = withStyles((theme) => ({
  tooltip: {
    fontSize: 30,
  },
}))(Tooltip);
class Affiliate extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: false,
      copyTooltips: false,
      copyTooltipsQR: false,
      copyTooltipsReferralID: false,
      rebates: [],
      rebateType: 1,
    };
  }

  componentDidMount() {
    if (this.state.rebates.length === 0) {
      this.props.getBrandAllAgent().then((res) => {
        if (res.IsSuccess) {
          this.setState({
            ...this.state,
            rebates: res.data,
          });
        }
      });
    }
  }

  handleBackClick = () => {
    this.props.appHistory.goBack();
  };
  handleCopyLink = (link) => {
    this.setState({ ...this.state, copyTooltips: true });
    utility.copy(link);
    setTimeout(() => {
      this.setState({ ...this.state, copyTooltips: false });
    }, 3000);
  };
  handleCopyReferralID = () => {
    this.setState({ ...this.state, copyTooltipsReferralID: true });
    utility.copy(this.props.account.info.playercode);
    setTimeout(() => {
      this.setState({ ...this.state, copyTooltipsReferralID: false });
    }, 3000);
  };
  handleQrAction = (option) => {
    var svgElement =
      document.querySelector("#qrcode-container").firstElementChild;
    let { width, height } = svgElement.getBBox();
    let clonedSvgElement = svgElement.cloneNode(true);
    let outerHTML = clonedSvgElement.outerHTML,
      blob = new Blob([outerHTML], { type: "image/svg+xml;charset=utf-8" });
    let URL = window.URL || window.webkitURL || window;
    let blobURL = URL.createObjectURL(blob);
    let image = new Image();
    image.onload = () => {
      let canvas = document.createElement("canvas");
      canvas.width = 300;
      canvas.height = 300;
      let context = canvas.getContext("2d");
      let offsetPositionX = (canvas.width - width) / 2;
      let offsetPositionY = (canvas.height - height) / 2;
      context.fillStyle = "white";
      context.fillRect(0, 0, canvas.width, canvas.height);
      context.drawImage(image, offsetPositionX, offsetPositionY, width, height);
      let png = canvas.toDataURL();
      if (option === "copy") {
        this.setState({ ...this.state, copyTooltipsQR: true });
        utility.copyImage(png);
        setTimeout(() => {
          this.setState({ ...this.state, copyTooltipsQR: false });
        }, 3000);
      } else if (option === "download") {
        utility.downloadImage(png, "download.png");
      }
    };
    image.src = blobURL;
  };
  handleClickAway = () => {};

  render() {
    var affiliateLink = `https://${window.location.hostname}/p/${this.props.account.info.playercode}?do=register`;
    const types = [
      { value: 1, title: "sport" },
      { value: 2, title: "virtualsports" },
      { value: 5, title: "livedealer" },
      { value: 7, title: "chess" },
      { value: 13, title: "lottery" },
      { value: 15, title: "egame" },
    ];
    return (
      <Container>
        <Header
          token={null}
          balance={0}
          background={true}
          onBackClick={this.handleBackClick}
          title={i18n.t("affiliate.title")}
        ></Header>

        <Content>
          <PageTitle>{i18n.t("affiliate.qrCode")}</PageTitle>
          <QRCodeContainer id="qrcode-container">
            <QRCode value={affiliateLink}></QRCode>
          </QRCodeContainer>
          <QRCodeActionContainer>
            <LightTooltip
              open={this.state.copyTooltipsQR}
              title={i18n.t("affiliate.copied")}
              placement="top"
            >
              <Button
                onClick={() => {
                  this.handleQrAction("copy");
                }}
              >
                {i18n.t("common.copy")}
              </Button>
            </LightTooltip>
            <DownloadButton
              onClick={() => {
                this.handleQrAction("download");
              }}
            >
              {i18n.t("common.download")}
            </DownloadButton>
          </QRCodeActionContainer>
          <CustomText>
            <CustomLabel>{i18n.t("affiliate.promoId")}</CustomLabel>
            <FlexCenterContainer>
              <CustomInput
                type={"text"}
                value={this.props.account.info.playercode}
                readOnly={true}
              ></CustomInput>
              <LightTooltip
                open={this.state.copyTooltipsReferralID}
                title={i18n.t("affiliate.copied")}
                placement="top"
              >
                <Button
                  onClick={() => {
                    this.handleCopyReferralID();
                  }}
                >
                  {i18n.t("common.copy")}
                </Button>
              </LightTooltip>
            </FlexCenterContainer>
          </CustomText>
          <CustomText>
            <CustomLabel>{i18n.t("affiliate.promoLink")}</CustomLabel>

            <FlexCenterContainer>
              <CustomInput
                type={"text"}
                value={affiliateLink}
                readOnly={true}
              ></CustomInput>
              <LightTooltip
                open={this.state.copyTooltips}
                title={i18n.t("affiliate.copied")}
                placement="top"
              >
                <Button
                  onClick={() => {
                    this.handleCopyLink(affiliateLink);
                  }}
                >
                  {i18n.t("common.copy")}
                </Button>
              </LightTooltip>
            </FlexCenterContainer>
          </CustomText>
          <Select
            title={i18n.t("rebateRate.title")}
            value={this.state.rebateType}
            onChange={(e) => {
              this.setState({ ...this.state, rebateType: e.target.value });
            }}
          >
            {types.map((item, index) => {
              return (
                <option key={index} value={item.value}>
                  {i18n.t(`common.${item.title}`)}
                </option>
              );
            })}
          </Select>{" "}
          <Table>
            <thead>
              <tr>
                <th>{i18n.t("rebateRate.players")}</th>
                <th>{i18n.t("rebateRate.turnover")}</th>{" "}
                <th>{i18n.t("rebateRate.rebates")} (%)</th>
              </tr>
            </thead>
            <tbody>
              {this.state.rebates
                .filter((item) => {
                  if (this.state.rebateType === 0) {
                    return true;
                  } else {
                    return (
                      item.allagentgametype.toString() ===
                      this.state.rebateType.toString()
                    );
                  }
                })
                .map((item, index) => {
                  return (
                    <tr key={index}>
                      <td>{item.activenumber}</td>
                      <td>{item.turnover}</td>
                      <td>{item.rebatepercentage}</td>
                    </tr>
                  );
                })}
            </tbody>
          </Table>
        </Content>
        <Loading show={this.state.loading}></Loading>
      </Container>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    account: state.account,
    general: state.general,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    dispatch: dispatch,
    getBrandAllAgent: () => dispatch(generalAction.getBrandAllAgent()),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Affiliate);
