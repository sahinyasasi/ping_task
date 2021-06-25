import { alertConstants } from "../constants/alertConstants";
const initialState = [];
export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case alertConstants.SET_ALERT:
      return [...state, payload];
    case alertConstants.REMOVE_ALERT:
      return state.filter((alert) => alert.id !== payload);
    default:
      return state;
  }
}
