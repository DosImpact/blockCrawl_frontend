import React from "react";
import { NurlTag } from "../components/Crwal";

import gql from "graphql-tag";
import { useQuery } from "@apollo/react-hooks";

const HELLO_2 = gql`
  query {
    hello2
  }
`;

const HELLO_3 = gql`
  query hello($id: Int!) {
    hello3(id: $id)
  }
`;

const QueryPractice = () => {
  const { loading, error, data } = useQuery(HELLO_3, {
    variables: { id: 777 },
  });
  return (
    <>
      <h2>Query Practice</h2>
      {loading && "Loading..."}
      {data && JSON.stringify(data)}
    </>
  );
};

const Home = () => {
  return (
    <>
      <h2>Home</h2>
      <QueryPractice />
    </>
  );
};

export default Home;
