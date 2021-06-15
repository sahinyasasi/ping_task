import React, { useEffect } from "react";
import { Router } from "react-router";
import { Route, Switch, Redirect } from "react-router-dom";
import { render } from "react-dom";
import Home from "./components/Home";
import Test from "./components/Test";
import Test1 from "./components/Test1";
import { history } from "./helpers/history";
import { Provider, useDispatch, useSelector } from "react-redux";
const rootElement = document.getElementById("root");
import "../css/app.css";

const App = () => {
  return (
    <Router history={history}>
      <Route exact path="/">
        <Home />
      </Route>
      <Route exact path="/tests">
        <Test />
      </Route>
      <Route exact path="/test1">
        <Test1 />
      </Route>
    </Router>
  );
};
render(<App />, rootElement);
