import {
    SET_JOB_LIST,
    SET_JOB_ADD,
    JOB_LOADING
  } from "../actions/types";
  
  const initialState = {
      jobs: [],
      loading: false
  };

  export default function(state = initialState, action) {
    switch (action.type) {
        case SET_JOB_LIST:
            return {
              ...state, 
              jobs: action.payload,
              loading: false
            };
        case SET_JOB_ADD:
            return {
              ...state,
              jobs: state.jobs.concat([action.payload])
            };
        case JOB_LOADING:
              return {
                ...state,
                loading: true
              };
        default: return state;
    }
  }