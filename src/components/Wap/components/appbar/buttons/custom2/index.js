import styled from "styled-components";
import config from "../../../../../../config/config";
import { AppHistory } from "../../../../../../history/History";
import i18n from "../../../../../../utils/i18n";
import OnlineUserDisplayer from "../../../../../Share/online-user-displayer";
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
const VerticalLayoutContainer = styled.div`
  display: flex;
  flex-direction: column;
`;
const AnotherColoredButton = styled(CustomColoredButton)`
  border: solid 1px
    ${({ theme }) => (theme.wapPrimary ? theme.wapPrimary : theme.primary)};
  background: #fff;
  color: ${({ theme }) =>
    theme.wapPrimary ? theme.wapPrimary : theme.primary};
`;
export const CustomThemedButton2 = ({ props }) => {
  return (
    <VerticalLayoutContainer>
      <CustomButtonContainer>
        {config.features.HaveVIPFeature &&
          config.features.HomePage_DisplayVIP && (
            <AnotherColoredButton
              onClick={() => {
                window.scrollTo(0, 0);
                AppHistory.push("/vip");
              }}
              style={{
                padding: "10px",
                background: "#000",
                borderColor: "#fff",
                borderRadius: "50px",
                margin: "auto 5px",
                width: "62px",
                height: "62px",
              }}
            >
              <img
                src={
                  process.env.PUBLIC_URL + "/assets/images/wapp/home-vip.png"
                }
                alt=""
                style={{ height: 28 }}
              />
            </AnotherColoredButton>
          )}
        <TransparentColoredButton
          onClick={() => {
            AppHistory.push("/login");
          }}
        >
          {i18n.t("common.login")}
        </TransparentColoredButton>
        <AnotherColoredButton
          onClick={() => {
            AppHistory.push("/login?do=register");
          }}
        >
          {i18n.t("common.register")}
        </AnotherColoredButton>
      </CustomButtonContainer>
      {config.features.OnlineUser && (
        <OnlineUserDisplayer
          textAlign="right"
          size="20px"
          color="#fff"
          padding="10px 30px 0 0"
        />
      )}
    </VerticalLayoutContainer>
  );
};
