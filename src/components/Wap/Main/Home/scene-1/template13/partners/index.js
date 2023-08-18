import React from "react";
import styled from "styled-components";

const Section = styled.div`
  color: #ffffff;
`;

const ChipContainer = styled.div`
  display: flex;
  flex-flow: wrap;
  gap: 20px;
  align-content: flex-start;
  margin: 10px 0;
`;

const Chip = styled.div`
  width: max-content;

  font-size: 24px;

  border: 1px solid #ffffff;
  border-radius: 25px;
  text-align: center;
  padding: 12px 20px;
`;

const Partners = ({ providers }) => {
  return (
    <Section>
      <ChipContainer>
        {providers.map((item, index) => (
          <Chip key={index}>{item.name}</Chip>
        ))}
      </ChipContainer>{" "}
    </Section>
  );
};

export default Partners;
