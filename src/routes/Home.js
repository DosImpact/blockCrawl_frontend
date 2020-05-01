import React from "react";
import { NurlTag } from "../components/Crwal";

import gql from "graphql-tag";
import { useQuery, useLazyQuery } from "@apollo/react-hooks";

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

const HELLO_4 = gql`
  query hello($id: Int!, $name: String!, $info: [String!]!) {
    hello4(id: $id, name: $name, info: $info)
  }
`;

const QueryPractice = () => {
  const [getHello, { loading, data }] = useLazyQuery(HELLO_4);
  const handleClick = () => {
    console.log("handleClick Event");
    getHello({
      variables: {
        id: 777,
        name: "DOSimpact",
        info: ["im handsome", "eat kimchi"],
      },
    });
  };
  return (
    <>
      <h2>Query Practice</h2>
      {loading && "Loading..."}
      {data && JSON.stringify(data)}
      <button onClick={handleClick}>Fetching</button>
    </>
  );
};

const Home = () => {
  return (
    <>
      <h2>Home</h2>
      <QueryPractice />
      <NurlTag />
    </>
  );
};

export default Home;
