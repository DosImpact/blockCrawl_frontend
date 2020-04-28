import React, { useEffect, useState } from "react";
import { CrwalingApi } from "../api";
import Loader from "./Loader";

export default () => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState(null);
  useEffect(() => {
    const fetchDataAPI = async () => {
      try {
        const { data } = await CrwalingApi.naverDust();
        console.log(data);
        setData(data);
      } catch (error) {
        console.error("error:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchDataAPI();

    return () => {};
  }, []);

  if (loading) {
    return <Loader />;
  } else {
    return (
      <>
        <h1>NAVER CRWALING</h1>
        <div>{JSON.stringify(data)}</div>
      </>
    );
  }
};
