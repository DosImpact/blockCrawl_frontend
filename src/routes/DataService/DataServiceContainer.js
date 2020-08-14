import React, { useState } from "react";
import DataServicePresenter from "./DataServicePresenter";
import InputForm from "./InputForm";
import initData from "./InitData";
import { Helmet } from "react-helmet";
import { CrwalingAPI } from "../../api";

function DataServiceContainer() {
  const [state, setState] = useState(initData);
  // toast.dark("DataServiceContainer is not available");
  const handleResetData = () => {
    setState(initData);
  };

  const startCompile = async () => {
    console.log("startCompile");

    const result = await CrwalingAPI.urlNTagAPI({
      url: "https://movie.naver.com/movie/bi/mi/basic.nhn?code=134824",
      tags: [
        "#content > div.article > div.mv_info_area > div.mv_info > h3 > a:nth-child(1)",
        "#content > div.article > div.section_group.section_group_frst > div:nth-child(1) > div > div > h5",
        "#content > div.article > div.section_group.section_group_frst > div:nth-child(1) > div > div > p",
      ],
    });
    console.log(result);
    //  const {
    //   data: {
    //     data: { urlTag: data },
    //   },
    //   status,
    // } = await CrwalingAPI.urlTagAPI({
    //   url: currentURL,
    //   tag: value,
    // });
  };

  return (
    <>
      <Helmet>
        <title>BlockCrawl | 데이터 서비스</title>
      </Helmet>
      <InputForm
        state={state.toJS()}
        handleResetData={handleResetData}
        setState={setState}
        startCompile={startCompile}
      />
      <DataServicePresenter />
    </>
  );
}

export default DataServiceContainer;
