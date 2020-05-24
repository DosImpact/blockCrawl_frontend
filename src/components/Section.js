import React from "react";
import styled from "styled-components";

const SectionContainer = styled.div`
  background-color: ${(props) => props.theme.grayColor};
  display: flex;
  flex-direction: column;
  align-items: center;
  border: 3px solid ${(props) => props.theme.lightPupleColor};
  font-size: 15px;
  .Section__Name {
    font-size: 30px;
    font-weight: 600;
    margin: 30px;
    border-bottom: 3px solid ${(props) => props.theme.lightPupleColor};
  }
`;

export default ({ name, children, className }) => {
  return (
    <SectionContainer className={className}>
      <h1 className="Section__Name">{name}</h1>
      {children}
    </SectionContainer>
  );
};
