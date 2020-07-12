import { combineReducers } from 'redux';
import auth from '../reducer/authReducer';
import workouts from '../reducer/workoutsReducer';
import {reducer as notificationsReducer} from 'reapop';


///import all reducers
const allReducers = combineReducers({
    auth,
    workouts,
    notifications: notificationsReducer()
});

export default allReducers;