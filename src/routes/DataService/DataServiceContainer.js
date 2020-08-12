import React, { useState } from "react";
import DataServicePresenter from "./DataServicePresenter";
import { TextField, Button, Checkbox, Radio } from "@material-ui/core";
import { Map, List } from "immutable";
import InputForm from "./InputForm";

const initData = Map({
  commonTags: List([]),
  tagCounter: 2,
  urls: List([]),
  urlCounter: 1,
});

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
