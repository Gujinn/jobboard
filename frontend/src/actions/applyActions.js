import axios from "axios";

import {
  GET_ERRORS,
  SET_APPLY_LIST,
  SET_APPLY_ADD,
  APPLY_LOADING
} 
from "./types";

// Post Add Job 
export const addApply = (applyData, history) => dispatch => {
    axios
      .post("http://localhost:4000/jobs/add", applyData)
      .then(res => {
        history.push("/")
        dispatch({
          type: SET_APPLY_ADD,
          payload: res.data,
        })
      })
      
      // re-direct to joblist on add job
      .catch(err =>
        dispatch({
          type: GET_ERRORS,
          payload: err.response.data
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