import React, { useState } from "react";
import DataServicePresenter from "./DataServicePresenter";
import InputForm from "./InputForm";
import initData, {
  stateHead as stateHeadData,
  stateRows as stateRowsData,
  stateRow as stateRowData,
} from "./InitData";
import { Helmet } from "react-helmet";
import { CrwalingAPI } from "../../api";

function DataServiceContainer() {
  const [state, setState] = useState(initData);
  const [stateHead, setStateHead] = useState(stateHeadData);
  const [stateRows, setStateRows] = useState(stateRowsData);

  // toast.dark("DataServiceContainer is not available");
  const handleResetData = () => {
    setState(initData);
  };

  // input url:string , tags:string[] || out results:string[]
  const fetchData = async (url, tags) => {
    const {
      data: { result },
    } = await CrwalingAPI.urlNTagAPI({ url, tags });
    console.log(result);
    return result;
  };

  const startCompile = async () => {
    console.log("startCompile");
    const tags = state.toJS().commonTags;
    // const result = await CrwalingAPI.urlNTagAPI({
    //   url: "https://movie.naver.com/movie/bi/mi/basic.nhn?code=134824",
    //   tags: [
    //     "#content > div.article > div.mv_info_area > div.mv_info > h3 > a:nth-child(1)",
    //     "#content > div.article > div.section_group.section_group_frst > div:nth-child(1) > div > div > h5",
    //     "#content > div.article > div.section_group.section_group_frst > div:nth-child(1) > div > div > p",
    //   ],
    // });
    // console.log(result);
    setStateHead((prev) => {
      const res = prev.set("tags", state.toJS().commonTags);
      return res;
    });
    let q = Array.from(state.toJS().urls);
    console.log(q);
    while (q.length !== 0) {
      console.log(q[0]);
      const result = await fetchData(q[0], tags);
      setStateRows((prev) => {
        return prev.push(
          stateRowData({
            url: q[0],
            tagResult: result,
          })
        );
      });
      q.shift();
    }
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

      <DataServicePresenter
        stateHead={stateHead.toJS()}
        stateRows={stateRows.toJS()}
      />

      {/* <div>
        <strong>stateHead</strong>
        <pre>{JSON.stringify(stateHead, null, 2)}</pre>
      </div>

      <div>
        <strong>stateRows</strong>
        <pre>{JSON.stringify(stateRows, null, 2)}</pre>
      </div> */}
    </>
  );
}

export default DataServiceContainer;
