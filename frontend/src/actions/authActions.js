import axios from "axios";
import setAuthToken from "../utils/setAuthToken";
import jwt_decode from "jwt-decode";

import {
  GET_ERRORS,
  SET_CURRENT_USER,
  USER_LOADING,
  UPDATE_USER
} 
from "./types";

export const registerUser = (userData, history) => dispatch => {
  axios
    .post("http://localhost:4000/api/users/register", userData)
    .then(res => {
      history.push("/login")
      dispatch({
        type: SET_CURRENT_USER,
        payload: res.user,
      })
    })

    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

export const updateUser = userData => dispatch => {
  axios
    .put(`http://localhost:4000/users/update/${userData._id}`, userData)
    .then(res => {
      console.log(res)
      dispatch({
        type: UPDATE_USER,
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


export const loginUser = userData => dispatch => {
  axios
    .post("http://localhost:4000/api/users/login", userData)
    .then(res => {
      const { token } = res.data;
      localStorage.setItem("jwtToken", token);
      setAuthToken(token);
      const decoded = jwt_decode(token)
      dispatch(setCurrentUser(decoded))
      dispatch(setUpdateUser(decoded))
      console.log(decoded)
    })
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

export const setCurrentUser = decoded => {
  return {
    type: SET_CURRENT_USER,
    payload: decoded
  };
};

export const setUpdateUser = decoded => {
  return {
    type: UPDATE_USER,
    payload: decoded
  };
}

export const setUserLoading = () => {
  return {
    type: USER_LOADING
  };
};

export const logoutUser = () => dispatch => {
  localStorage.removeItem("jwtToken");
  setAuthToken(false);
  dispatch(setCurrentUser({}));
  dispatch(setUpdateUser({}));
};