import { combineReducers } from "redux";

import getUrl from "./urlReducer";
import app from "./appReducer";
import alert from "./alertReducer";

const rootReducer = combineReducers({
  getUrl,
  app,
  alert,
});

export default rootReducer;
