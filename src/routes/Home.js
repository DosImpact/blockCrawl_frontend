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
      <iframe src="http://localhost:4000/" height="1000px" width="80%"></iframe>
    </HomeContainer>
  );
};

export default Home;
