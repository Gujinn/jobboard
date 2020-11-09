import axios from "axios";

import {
  SET_USER_LIST,
  SET_USER_LOADING
} 
from "./types";

// Get Job 
export const userList = () => dispatch => {
  dispatch(setUsersLoading());
    axios
      .get("http://localhost:4000/users")
      .then(res => {
        dispatch({
          type: SET_USER_LIST,
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

export const deleteUser = (userData, history) => dispatch => {
  axios
    .delete(`http://localhost:4000/users/delete/${userData._id}`, userData)
};

// User loading
export const setUsersLoading = () => {
  return {
    type: SET_USER_LOADING
  };
};