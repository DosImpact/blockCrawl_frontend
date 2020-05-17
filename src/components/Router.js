import React from "react";
import { Switch, Route, BrowserRouter, Redirect } from "react-router-dom";
import Header from "../components/Header";
import Home from "../routes/Home";
import Info from "../routes/Info";
import TopAuth from "./TopAuth";

export default () => {
  return (
    <BrowserRouter>
      <>
        <TopAuth />
        <Header />
        <Switch>
          <Route path="/" exact component={Home}></Route>
          <Route path="/info" exact component={Info}></Route>
          <Redirect from="*" to="/"></Redirect>
        </Switch>
      </>
    </BrowserRouter>
  );
};
