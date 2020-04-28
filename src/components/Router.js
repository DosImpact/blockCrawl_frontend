import React from "react";
import { Switch, Route, BrowserRouter, Redirect } from "react-router-dom";
import Header from "../components/Header";
import Home from "../routes/Home";

export default () => {
  return (
    <BrowserRouter>
      <>
        <Header />
        <Switch>
          <Route path="/" component={Home}></Route>
          <Redirect from="*" to="/"></Redirect>
        </Switch>
      </>
    </BrowserRouter>
  );
};
