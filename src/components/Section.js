import React from "react";
import styled from "styled-components";

const SectionContainer = styled.div`
  width: 700px;
  height: 1000px;
  background-color: ${(props) => props.theme.grayColor};
  display: flex;
  flex-direction: column;
  align-items: center;
  border: 3px solid ${(props) => props.theme.pupleColor};
  font-size: 15px;
  .Section__Name {
    font-size: 30px;
    margin: 30px;
  }
`;

export default ({ name, children }) => {
  return (
    <SectionContainer>
      <h1 className="Section__Name">{name}</h1>
      {children}
    </SectionContainer>
  );
};
