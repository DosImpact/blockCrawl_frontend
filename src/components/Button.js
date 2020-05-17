import React from "react";
import styled from "styled-components";

const Container = styled.button`
  border: 0;
  color: white;
  background-color: ${(props) => props.theme.lightPupleColor};
  border-radius: 4px;
`;

export default ({ onClick, text }) => {
  return <Container onClick={onClick}>{text}</Container>;
};
