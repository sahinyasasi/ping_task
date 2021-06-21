import React, { useEffect } from "react";
import { Router } from "react-router";
import { Route, Switch, Redirect } from "react-router-dom";
import { render } from "react-dom";
import Home from "./components/Home";
import Apps from "./components/Apps";
import { history } from "./helpers/history";
import { store } from "./helpers/store";
import { Provider, useDispatch, useSelector } from "react-redux";
const rootElement = document.getElementById("root");
import "../css/app.css";

const App = () => {
  return (
    <Router history={history}>
      <Route exact path="/">
        <Home />
      </Route>
      <Route exact path="/apps">
        <Apps />
      </Route>
    </Router>
  );
};
render(
  <Provider store={store}>
    <App />
  </Provider>,
  rootElement
);
