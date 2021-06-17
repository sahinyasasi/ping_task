import { urlConstants } from "../constants/urlConstants";
const initialState = {
  urls: [],
};

export default function (state = initialState, action) {
  const { payload, type } = action;
  switch (type) {
    case urlConstants.GET_URL_SUCCESS:
      return {
        urls: payload,
      };
    case urlConstants.GET_URL_FAILURE:
      return {
        urls: state,
      };

    default:
      return state;
  }
}
