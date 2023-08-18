import styled from "styled-components";
import config from "../../../../../../config/config";
import { AppHistory } from "../../../../../../history/History";
import i18n from "../../../../../../utils/i18n";
const CustomButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding-right: 20px;
`;

const CustomColoredButton = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background: ${({ primary, theme }) => {
    return primary ? theme.buttonBackground : "transparent";
  }};
  border: ${({ primary, theme }) => {
    return primary
      ? `solid 1px ${theme.buttonBackground}`
      : `solid 1px ${theme.primaryText}`;
  }};
  color: ${({ primary, theme }) => {
    return primary
      ? theme.wapPrimary
        ? theme.wapPrimary
        : theme.buttonText2
      : theme.primaryText;
  }};
  padding: 10px 40px;
  font-size: 28px;
  margin: 0px 10px;
  border-radius: 15px;
`;
const TransparentColoredButton = styled(CustomColoredButton)`
  border: solid 1px #fff;
  color: #fff;
`;

export const CustomThemedButton = ({ props }) => {
  return (
    <CustomButtonContainer>
      {config.features.HaveVIPFeature &&
        config.features.HomePage_DisplayVIP && (
          <TransparentColoredButton
            onClick={() => {
              window.scrollTo(0, 0);
              AppHistory.push("/vip");
            }}
            style={{ padding: "10px 20px" }}
          >
            <img
              src={process.env.PUBLIC_URL + "/assets/images/wapp/home-vip.png"}
              alt=""
              style={{ height: 20, marginRight: 10 }}
            />
            VIP
          </TransparentColoredButton>
        )}
      <TransparentColoredButton
        onClick={() => {
          AppHistory.push("/login");
        }}
      >
        {i18n.exists(`${config.brand}.login`)
          ? i18n.t(`${config.brand}.login`)
          : i18n.t("common.login")}
      </TransparentColoredButton>
      <CustomColoredButton
        primary={config.brand === "TIGER"}
        onClick={() => {
          AppHistory.push("/login?do=register");
        }}
      >
        {i18n.t("common.register")}
      </CustomColoredButton>
    </CustomButtonContainer>
  );
};
