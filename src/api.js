import axios from "axios";

// const params = {};

const api = axios.create({
  baseURL: "http://localhost:4000/api/",
});

export const CrwalingRestAPI = {
  naverDust: () => api.get("start"),
};

//const res = await Axios.get("http://localhost:4000/api/start");
