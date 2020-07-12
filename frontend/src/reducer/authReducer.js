import {
    AUTH_ERROR
  } from '../cons/index';
  
  const INITIAL_STATE = {
    error: '',
  };
  
  const auth = (state = INITIAL_STATE, { type, payload }) => {
    switch (type) {
      case AUTH_ERROR: {
        return {
          ...state,
          error: payload
        };
      }
      default:
        return state;
    }
  };
  
  export default auth;
  