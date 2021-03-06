import { appConstants } from "../constants/appConstants";
import axios from "axios";
import { setAlert } from "./alertActions";
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
      payload: res.data.data,
    });
    dispatch(setAlert("App Created Successfully", "success"));
  } catch (err) {
    dispatch({
      type: appConstants.POST_APP_FAILURE,
      payload: { msg: err.response.statustext, status: err.response.status },
    });
  }
};
export const listApps = () => async (dispatch) => {
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
};
export const deleteApp = (id) => async (dispatch) => {
  try {
    await axios.delete(`/api/app/${id}`);
    dispatch({
      type: appConstants.DELETE_APP_SUCCESS,
      payload: id,
    });
    dispatch(setAlert("App Removed Succesfully", "success"));
  } catch (err) {
    dispatch({
      type: appConstants.DELETE_APP_FAILURE,
      payload: { msg: err.response.statustext, status: err.response.status },
    });
  }
};
export const updateApp = (formData, id) => async (dispatch) => {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const res = await axios.put(`/api/app/${id}`, formData, config);
    dispatch({
      type: appConstants.UPDATE_APP_SUCCESS,
      payload: res.data.data,
    });
    dispatch(setAlert("App Updated Successfully", "success"));
  } catch (err) {
    const errors = err.response.data.errors;
    if (errors) {
      dispatch({
        type: appConstants.UPDATE_APP_FAILURE,
        payload: { msg: err.response.statustext, status: err.response.status },
      });
    }
  }
};
export const getApp = (id) => async (dispatch) => {
  try {
    const res = await axios.get(`/api/app/${id}`);
    dispatch({
      type: appConstants.GET_APP_SUCCESS,
      payload: res.data.data,
    });
  } catch (err) {
    dispatch({
      type: appConstants.GET_APP_FAILURE,
      payload: { msg: err.response.statustext, status: err.response.status },
    });
  }
};
