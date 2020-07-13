import {
    GET_WORKOUTS,
    GET_WORKOUT,
    MY_WORKOUT
  } from '../cons/index';
  
  const INITIAL_STATE = {
  };
  
  const workouts = (state = INITIAL_STATE, { type, payload }) => {
    switch (type) {
      case GET_WORKOUTS: {
        return {
          ...state,
          workouts: payload
        };
      }
      case GET_WORKOUT:{
        return{
          ...state,
          workout: payload
        }
      }
      case MY_WORKOUT:{
        return{
          ...state,
          my_workouts:payload
        }
      }
      default:
        return state;
    }
  };
  
  export default workouts;
  