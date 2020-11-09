import {
    SET_CURRENT_USER,
    USER_LOADING,
    UPDATE_USER,
    SET_USER_LIST
  } from "../actions/types";
  
  const isEmpty = require('is-empty');
  
  const initialState = {
    isAuthenticated: false,
    user: {},
    users: {},
    loading: false
  };

  export default function(state = initialState, action) {
    switch (action.type) {
      case SET_USER_LIST:
            return {
              ...state, 
              users: action.payload,
              loading: false
            };
      case SET_CURRENT_USER:
        return {
          ...state,
          isAuthenticated: !isEmpty(action.payload),
          user: action.payload
        };
      case USER_LOADING:
        return {
          ...state,
          loading: true
        };
      case UPDATE_USER:
      return {
        ...state,
        user: action.payload,
      };
      default:
        return state;
    }
  }