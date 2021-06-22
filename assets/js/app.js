import React, { useEffect } from "react";
import { Router } from "react-router";
import { Route, Switch, Redirect } from "react-router-dom";
import { render } from "react-dom";
import Status from "./components/Status";

import { history } from "./helpers/history";
import { store } from "./helpers/store";
import { Provider, useDispatch, useSelector } from "react-redux";
const rootElement = document.getElementById("root");
import "../css/app.css";
import PostApp from "./components/postApp";

const App = () => {
  return (
    <Router history={history}>
      <Route exact path="/status">
        <Status />
      </Route>
      <Route exact path="/">
        <PostApp />
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
