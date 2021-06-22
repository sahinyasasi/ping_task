import { appConstants } from "../constants";

const initialState = {
  apps: [],
  app: null,
  error: {},
};

export default function (state = initialState, action) {
  const { payload, type } = action;
  switch (type) {
    case appConstants.POST_APP_SUCCESS:
      return {
        ...state,
        apps: [payload, ...state.apps],
      };
    case appConstants.POST_APP_FAILURE:
      return {
        ...state,
        error: payload,
      };
      case appConstants.LIST_APPS_SUCCESS:
      return {
        ...state,
        apps: payload,
        
      };
      case appConstants.LIST_APPS_FAILURE:
      return {
        ...state,
        error: payload,
      };
      case appConstants.DELETE_APP_SUCCESS:
      return {
        ...state,
        apps: state.apps.filter((app) => app.id !== payload),
       
      };
      case appConstants.DELETE_APP_FAILURE:
      return {
        ...state,
        error:payload
       
      };

    default:
      return state;
  }
}
