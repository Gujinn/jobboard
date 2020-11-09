import axios from "axios";

import {
  GET_ERRORS,
  SET_JOB_LIST,
  SET_JOB_ADD,
  JOB_LOADING,
  UPDATE_JOB
} 
from "./types";

// Post Add Job 
export const addJob = (jobData, history) => dispatch => {
    axios
      .post("http://localhost:4000/jobs/add", jobData)
      .then(res => {
        dispatch({
          type: SET_JOB_ADD,
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

export const updateJob = (jobData, history) => dispatch => {
  axios
    .put(`http://localhost:4000/jobs/update/${jobData._id}`, jobData, console.log(jobData))
    .then(res => {
      console.log(res)
      dispatch({
        type: UPDATE_JOB,
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

export const deleteJob = (jobData, history) => dispatch => {
  axios
    .delete(`http://localhost:4000/jobs/delete/${jobData._id}`, jobData)
};

// Get Job 
export const jobList = () => dispatch => {
  dispatch(setJobsLoading());
    axios
      .get("http://localhost:4000/jobs")
      .then(res => {
        dispatch({
          type: SET_JOB_LIST,
          payload: res.data,
        })
      })
};

// User loading
export const setJobsLoading = () => {
  return {
    type: JOB_LOADING
  };
};

// // Set JOB ADD 
// export const setJobAdd = decoded => {
//     return {
//       type: SET_JOB_ADD,
//       payload: decoded
//     };
// };

// // get JOB LIST 
// export const setJobList = decoded => {
//     return {
//       type: SET_JOB_LIST,
//       payload: decoded
//     };
// };