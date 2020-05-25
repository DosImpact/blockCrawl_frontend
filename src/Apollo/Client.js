import ApolloClient from "apollo-boost";
import { defaults, resolvers } from "./LocalState";

import { SERVER_URI } from "../config/key";

export default new ApolloClient({
  uri: SERVER_URI,
  clientState: {
    defaults,
    resolvers,
  },
  headers: {
    Authorization: `Bearer ${localStorage.getItem("LOGIN_TOKEN")}`,
  },
});
