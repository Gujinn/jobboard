import {
    SET_APPLY_LIST,
    SET_APPLY_ADD,
    APPLY_LOADING
  } from "../actions/types";
  
  const initialState = {
      applies: [],
      loading: false
  };

  export default function(state = initialState, action) {
    switch (action.type) {
        case SET_APPLY_LIST:
            return {
              ...state, 
              applies: action.payload,
              loading: false
            };
        case SET_APPLY_ADD:
            return {
              ...state,
              applies: state.apply.concat([action.payload])
            };
        case APPLY_LOADING:
              return {
                ...state,
                loading: true
              };
        default: return state;
    }
  }