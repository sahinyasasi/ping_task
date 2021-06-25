import React, { useEffect } from "react";
import { Router } from "react-router";
import { Route, Switch, Redirect } from "react-router-dom";
import { render } from "react-dom";
import { history } from "./helpers/history";
import { store } from "./helpers/store";
import { Provider, useDispatch, useSelector } from "react-redux";
const rootElement = document.getElementById("root");
import "../css/app.css";
import PostApp from "./components/postApp";
import Status from "./components/Status";
import AllApps from "./components/AllApps";
import EditApp from "./components/EditApp";
import Alerts from "./components/Alert";

const App = () => {
  return (
    <Router history={history}>
      <div className="container">
        <Alerts />
        <Route exact path="/status">
          <Status />
        </Route>
        <Route exact path="/addApp">
          <PostApp />
        </Route>
        <Route exact path="/">
          <AllApps />
        </Route>
        <Route exact path="/app/:id/edit">
          <EditApp />
        </Route>
      </div>
    </Router>
  );
};
render(
  <Provider store={store}>
    <App />
  </Provider>,
  rootElement
);
