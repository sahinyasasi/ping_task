import { combineReducers } from "redux";

import url from "./urlReducer";
import app from "./appReducer";
import alert from "./alertReducer";

const rootReducer = combineReducers({
  url,
  app,
  alert,
});

export default rootReducer;
