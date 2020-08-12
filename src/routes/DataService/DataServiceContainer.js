import React, { useState } from "react";
import DataServicePresenter from "./DataServicePresenter";
import { TextField, Button, Checkbox, Radio } from "@material-ui/core";
import { Map, List } from "immutable";
import InputForm from "./InputForm";

const initData = Map({
  commonTags: List([]),
  urls: List([]),
});

function DataServiceContainer() {
  const [state, setState] = useState(initData);
  // toast.dark("DataServiceContainer is not available");
  return (
    <>
      <h1> N ULR > N Tag </h1>
      <InputForm state={state.toJS()} setState={setState} />
      <h1> N ULR > N Tag RESULT </h1>
      <DataServicePresenter />
    </>
  );
}

export default DataServiceContainer;
