import { useState, useEffect } from "react";
import styled from "styled-components";

const Overlay = styled.div`
  position: fixed;
  z-index: 9999;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.7);
  display: ${({ show }) => (show ? "flex" : "none")};
  align-items: center;
  justify-content: center;
  flex-direction: column;
  font-size: 40px;
  overflow: hidden; /* disable background scrolling */
`;

const Title = styled.div`
  color: #fff;
  font-weight: 700;
  text-transform: uppercase;
  text-align: center;
  margin-bottom: 20px;
  background: #242958;
  padding: 20px;
  border-radius: 20px;
  width: 90%;
  position: relative;
`;

const Content = styled.div`
  height: 80%;
  width: 90%;
`;

const CloseButton = styled.div`
  position: absolute;
  background: #fff;
  border-radius: 50px;
  right: 20px;
  top: 25%;
  height: 50px;
  width: 50px;
  font-size: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  color: #000;
`;
const Variant1 = ({ open, title, children, handleClose }) => {
  const [show, setShow] = useState(open);

  useEffect(() => {
    setShow(open);
  }, [open]);

  useEffect(() => {
    if (show) {
      document.body.style.overflow = "hidden"; // disable background scrolling
    } else {
      document.body.style.overflow = "auto"; // enable background scrolling
    }
  }, [show]);

  const performClose = (e) => {
    e.stopPropagation();
    handleClose(false);
  };

  return (
    <Overlay show={show} onClick={performClose}>
      <Title onClick={(e) => e.stopPropagation()}>
        {title}
        <CloseButton onClick={performClose}>✖</CloseButton>
      </Title>
      <Content onClick={(e) => e.stopPropagation()}>{children}</Content>
    </Overlay>
  );
};

export default Variant1;
