import axios from "axios";

import {
  GET_ERRORS,
  SET_APPLY_LIST,
  SET_APPLY_ADD,
  APPLY_LOADING,
  UPDATE_APPLY,
} 
from "./types";

// Post Add Job 
export const addApply = (applyData, history) => dispatch => {
    axios
      .post("http://localhost:4000/apply/add", applyData)
      .then(res => {
        dispatch({
          type: SET_APPLY_ADD,
          payload: res.data,
        })
      })

      .catch(err =>
        dispatch({
          type: GET_ERRORS,
          payload: err.response.data
        })
      );
};

export const updateApply = (applyData, history) => dispatch => {
  axios
    .put(`http://localhost:4000/apply/update/${applyData._id}`, applyData, console.log(applyData))
    .then(res => {
      console.log(res)
      dispatch({
        type: UPDATE_APPLY,
        payload: res.data,
      })
    })

    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

export const deleteApply = (applyData, history) => dispatch => {
  axios
    .delete(`http://localhost:4000/apply/delete/${applyData._id}`, applyData, console.log(applyData))

    .catch(res =>
      dispatch({
        type: GET_ERRORS,
        payload: res.response.data
      })
    );
};

// Get Job 
export const applyList = () => dispatch => {
  dispatch(setAppliesLoading());
    axios
      .get("http://localhost:4000/apply")
      .then(res => {
        dispatch({
          type: SET_APPLY_LIST,
          payload: res.data,
        })
      })

      // .catch(err =>
      //   dispatch({
      //     type: GET_ERRORS,
      //     payload: err.response.data
      //   })
      // );
};

// User loading
export const setAppliesLoading = () => {
  return {
    type: APPLY_LOADING
  };
};

// // Set JOB ADD 
// export const setJobAdd = decoded => {
//     return {
//       type: SET_JOB_ADD,
//       payload: decoded
//     };
// };

// get Apply LIST 
export const setApplyList = decoded => {
    return {
      type: SET_APPLY_LIST,
      payload: decoded
    };
};