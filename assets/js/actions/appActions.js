import { appConstants } from "../constants/appConstants";
import axios from "axios";
export const addApp = (appData) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  try {
    console.log("postaction..........", appData);
    const res = await axios.post("/api/app", appData, config);

    dispatch({
      type: appConstants.POST_APP_SUCCESS,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: appConstants.POST_APP_FAILURE,
      payload: { msg: err.response.statustext, status: err.response.status },
    });
  }
};
export const listApps=()=>async(dispatch)=>{
  try {
    const res = await axios.get("/api/app");
    dispatch({
      type: appConstants.LIST_APPS_SUCCESS,
      payload: res.data.data,
    });
  } catch (err) {
    dispatch({
      type: appConstants.LIST_APPS_FAILURE,
      payload: { msg: err.response.statustext, status: err.response.status },
    });
  }

}
export const deleteApp = (id) => async (dispatch) => {
  try {
    await axios.delete(`/api/app/${id}`);
    dispatch({
      type: appConstants.DELETE_APP_SUCCESS,
      payload: id,
    });
    
  } catch (err) {
    dispatch({
      type: appConstants.DELETE_APP_FAILURE,
      payload: { msg: err.response.statustext, status: err.response.status },
    });
  }
};
