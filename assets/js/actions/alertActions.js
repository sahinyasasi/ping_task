import { v4 as uuidv4 } from "uuid";
import { alertConstants } from "../constants/alertConstants";
export const setAlert =
  (msg, alertType, timeout = 5000) =>
  (dispatch) => {
    const id = uuidv4();

    dispatch({
      type: alertConstants.SET_ALERT,
      payload: { msg, alertType, id },
    });
    setTimeout(
      () => dispatch({ type: alertConstants.REMOVE_ALERT, payload: id }),
      timeout
    );
  };
