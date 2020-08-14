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
    const tags = state.toJS().commonTags;
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
  };

  const handleCSVOutput = () => {};

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
    </>
  );
}

export default DataServiceContainer;
