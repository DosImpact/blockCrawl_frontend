import React, { useState } from "react";
import Axios from "axios";

const HomeContainer = () => {
  const handleClick = async () => {
    console.log("Clicked");
    const res = await Axios.get("http://localhost:4000/api/start");
    console.log(res);
  };

  return (
    <>
      <button onClick={handleClick}>Click Trigger</button>
    </>
  );
};

export default HomeContainer;
