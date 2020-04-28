import React, { useEffect, useState } from "react";
import { CrwalingApi } from "../api";
export default () => {
  const [data, setData] = useState(null);
  useEffect(() => {
    const fetchDataAPI = async () => {
      try {
        const res = await CrwalingApi.naverDust();
        console.log(res);
        setData(res);
      } catch (error) {}
    };
    fetchDataAPI();

    return () => {};
  }, []);

  return (
    <>
      <h1>NAVER CRWALING</h1>
      <div>{JSON.stringify(data)}</div>
    </>
  );
};
