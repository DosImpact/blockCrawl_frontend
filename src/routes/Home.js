import React from "react";
import styled from "styled-components";
import { NurlTag } from "../components/Crwal";

const HomeContainer = styled.div`
  margin: 20px;
`;

const Home = () => {
  return (
    <HomeContainer>
      <NurlTag />
    </HomeContainer>
  );
};

export default Home;
