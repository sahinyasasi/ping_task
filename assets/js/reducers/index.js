import { combineReducers } from "redux";

import getUrl from "./urlReducer";
import app from "./appReducer";

const rootReducer = combineReducers({
  getUrl,
  app,
});

export default rootReducer;
