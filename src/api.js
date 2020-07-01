import axios from "axios";
import key from "./config/key";

const config = {
  method: "POST",
  url: key.SERVER_URI,
  headers: {
    "Content-Type": "application/json",
  },
};

export const CrwalingAPI = {
  urlTagAPI: ({ url, tag }) =>
    axios({
      ...config,
      data: urlTagAPIData({ url, tag }),
    }),

  urlCaptureAPI: ({ url }) =>
    axios({
      ...config,
      data: urlCaptureAPIData({ url }),
    }),
  urlPDFAPI: ({ url }) =>
    axios({
      ...config,
      data: urlPDFAPIData({ url }),
    }),
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

const urlCaptureAPIData = ({ url }) => {
  return JSON.stringify({
    query: `query{
      urlCapture(url:"${url}")
    }`,
  });
};

const urlPDFAPIData = ({ url }) => {
  return JSON.stringify({
    query: `query{
      urlPDF(url:"${url}")
    }
    `,
  });
};
