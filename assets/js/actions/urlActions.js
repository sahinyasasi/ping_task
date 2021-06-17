import { urlConstants } from "../constants/urlConstants";
import axios from "axios";
export const listAll = () => async (dispatch) => {
  try {
    const res = await axios.get("http://localhost:4000/api/servers");
    dispatch({
      type: urlConstants.GET_URL_SUCCESS,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: urlConstants.GET_URL_FAILURE,
      payload: { msg: err.response.statustext, status: err.response.status },
    });
  }
};
