import { combineReducers } from "redux";
import auth from "../reducer/authReducer";
import workouts from "../reducer/workoutsReducer";

///import all reducers
const allReducers = combineReducers({
  auth,
  workouts
});

export default allReducers;
