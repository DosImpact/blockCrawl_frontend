import React from "react";
import styled from "styled-components";

const Container = styled.button`
  border: 0;
  color: white;
  background-color: ${(props) => props.theme.lightPupleColor};
  border-radius: 4px;
  width: 50px;
  height: 20px;
  cursor: pointer;
  :hover {
    background-color: ${(props) => props.theme.pupleColor};
  }
`;

export default ({ onClick, text, className }) => {
  return (
    <Container className={className} onClick={onClick}>
      {text}
    </Container>
  );
};
