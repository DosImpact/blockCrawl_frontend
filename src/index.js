import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { ApolloProvider } from "@apollo/react-hooks";
import Client from "./Apollo/Client";

import InitData from "./components/BlockDnd/InitData";

console.log(InitData.toJS());

ReactDOM.render(
  <React.StrictMode>
    <ApolloProvider client={Client}>
      <App />
    </ApolloProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
