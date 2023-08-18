import React from "react";
import { connect } from "react-redux";
import styled from "styled-components";
import OnlineUserDisplayer from "../../../Share/online-user-displayer";
import i18n from "../../../../utils/i18n";

const AnnounceContainer = styled.div`
  margin: 0 auto;
`;

const MarqueeContainer = styled.div`
  width: 890px;
  white-space: nowrap;

  font-size: 18px;
  color: ${({ theme }) =>
    theme.wapSecondary ? theme.wapSecondary : theme.secondary};

  line-height: 26px;
  display: grid;
  align-items: center;
  gap: 10px;
  grid-template-columns: auto 35%;
`;

const AnotherMarqueeContainer = styled(MarqueeContainer)`
  display: flex;
  align-items: center;
  gap: 20px;
  padding: 0px 40px;
`;

function Marquee(props) {
  const Variant1 = () => {
    return (
      <MarqueeContainer>
        <div>
          {props.ui.marquees && props.ui.marquees.length > 0 && (
            <marquee style={{ marginTop: "10px" }}>
              {props.ui.marquees.map((row, index) => {
                return (
                  <div
                    key={index}
                    style={{
                      display: "inline",
                      whiteSpace: "nowrap",
                      wordBreak: "keep-all",
                      overflow: "visible",
                    }}
                  >
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{"* "}
                    {row.localization !== null && row.localization.content
                      ? row.localization.content
                      : row.content}
                  </div>
                );
              })}
            </marquee>
          )}
        </div>
        <div>
          <OnlineUserDisplayer color={"#fff"} iconOnly={true} />
        </div>
      </MarqueeContainer>
    );
  };

  const Variant2 = () => {
    return (
      <AnotherMarqueeContainer>
        <div style={{ display: "flex", minWidth: "fit-content" }}>
          {i18n.t("news")}:
        </div>
        <div>
          {props.ui.marquees && props.ui.marquees.length > 0 && (
            <marquee style={{ marginTop: "10px" }}>
              {props.ui.marquees.map((row, index) => {
                return (
                  <div
                    key={index}
                    style={{
                      display: "inline",
                      whiteSpace: "nowrap",
                      wordBreak: "keep-all",
                      overflow: "visible",
                    }}
                  >
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{"* "}
                    {row.localization !== null && row.localization.content
                      ? row.localization.content
                      : row.content}
                  </div>
                );
              })}
            </marquee>
          )}
        </div>
      </AnotherMarqueeContainer>
    );
  };

  const variantSwitcher = (variant) => {
    switch (parseInt(variant)) {
      case 1:
        return <Variant1 />;
      case 2:
        return <Variant2 />;
      default:
        return <Variant1 />;
    }
  };

  return (
    <AnnounceContainer>{variantSwitcher(props.variant)}</AnnounceContainer>
  );
}
const mapDispatchToProps = (dispatch) => {
  return {};
};
const mapStateToProps = (state) => {
  return {
    ui: state.ui,
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Marquee);
