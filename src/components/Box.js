import React from "react";
import styled from "styled-components";

const Container = styled.div`
  border: 0;
  color: ${(props) => props.theme.darkColor};
  min-width: 50px;
`;

export default ({ content }) => {
  return <Container>{content}</Container>;
};
