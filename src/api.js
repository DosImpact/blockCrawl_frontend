import axios from "axios";

const config = {
  method: "POST",
  url: "http://localhost:4000/",
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
      data: urlTagAPIData({ url }),
    }),
  urlPDFAPI: ({ url }) =>
    axios({
      ...config,
      data: urlTagAPIData({ url }),
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
