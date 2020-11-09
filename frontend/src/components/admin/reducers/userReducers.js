import {
    SET_USER_LIST,
    SET_USER_ADD,
    SET_USER_LOADING
  } from "../actions/types";
  
  const initialState = {
      users: [],
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
        case SET_USER_ADD:
            return {
              ...state,
              users: state.user.concat([action.payload])
            };
        case SET_USER_LOADING:
              return {
                ...state,
                loading: true
              };
        default: return state;
    }
  }