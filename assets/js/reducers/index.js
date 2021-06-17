import { combineReducers } from "redux";

import getUrl from "./urlReducer";

const rootReducer = combineReducers({
  getUrl,
});

export default rootReducer;
