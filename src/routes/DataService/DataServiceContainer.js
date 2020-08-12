import React, { useState } from "react";
import DataServicePresenter from "./DataServicePresenter";
import InputForm from "./InputForm";
import initData from "./InitData";

function DataServiceContainer() {
  const [state, setState] = useState(initData);
  // toast.dark("DataServiceContainer is not available");
  return (
    <>
      <InputForm state={state.toJS()} setState={setState} />
      <DataServicePresenter />
    </>
  );
}

export default DataServiceContainer;
