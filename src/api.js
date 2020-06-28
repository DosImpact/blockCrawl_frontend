import axios from "axios";

const config = {
  method: "POST",
  url: "http://localhost:4000/",
  headers: {
    "Content-Type": "application/json",
  },
};

const urlTagAPIData = ({ url, tag }) => {
  return JSON.stringify({
    query: `query {
      urlTag(
        tag: "${tag}"
        url: "${url}"
      )
    }`,
  });
};

export const CrwalingAPI = {
  urlTagAPI: ({ url, tag }) =>
    axios({
      ...config,
      data: urlTagAPIData({ url, tag }),
    }),
};
