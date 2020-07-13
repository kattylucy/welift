import { url } from '../data/url';
import Axios from "axios";
import history from '../history';
import { toast } from "react-toastify";
import { GET_WORKOUTS, GET_WORKOUT } from '../cons';


var setToast = (status, message) =>
  toast[status](message, {
    position: toast.POSITION.TOP_CENTER,
    hideProgressBar: true,
    pauseOnHover: true
  });


const headers = () => ({
  'authToken': localStorage.getItem('access-token'),
  user: localStorage.getItem('id')
});


export const getworkouts = () => dispatch => {
    Axios({
      method: "get",
      url: `${url}workouts/all?page=1&pagination=12`,
    })
      .then(response => {
        console.log(response)
         dispatch({
             type: GET_WORKOUTS,
             payload: response.data.data
         })
      })
      .catch(err => {
       console.log(err)
      });
  };

  export const getworkout = (workoutid) => dispatch => {
    Axios({
      method: "get",
      url: `${url}workouts/workout/${workoutid}`,
    })
      .then(response => {
        console.log(response)
         dispatch({
             type: GET_WORKOUT,
             payload: response.data
         })
      })
      .catch(err => {
       console.log(err)
      });
  };



export const likeWorkout = (workoutid, location) => dispatch => {
  Axios({
    method: "post",
    url: `${url}workouts/like`,
    headers:headers(),
    data:{
      workoutid
    }
  })
    .then(response => {
      if(response.status === 200 && location === "all"){
        dispatch( getworkouts() )
      }
      if(response.status === 200 && location === "single"){
        dispatch( getworkout(workoutid) )
      }
    })
    .catch(err => {
      console.log(err)
    });
};



export const dislikeWorkout = (workoutid, location) => dispatch => {
  Axios({
    method: "post",
    url: `${url}workouts/${workoutid}/dislike`,
    headers:headers(),
    data:{
      workoutid
    }
  })
    .then(response => {
        if(response.status === 200 && location === "all"){
          dispatch( getworkouts() )
        }
        if(response.status === 200 && location === "single"){
          dispatch( getworkout(workoutid) )
        }
    })
    .catch(err => {
      console.log(err)
    });
};


export const commentWorkout = (workoutid, comment) => dispatch => {
  Axios({
    method: "post",
    url: `${url}workouts/comment`,
    headers:headers(),
    data:{
      workout_id: workoutid,
      comment
    }
  })
    .then(response => {
      console.log(response, "comment")
       dispatch(
          getworkout(workoutid)
       )
    })
    .catch(err => {
     console.log(err)
    });
}


export const createWorkout = (workout) => dispatch => {
  Axios({
    method: "post",
    url: `${url}workouts/new`,
    headers:headers(),
    data:{
      workout,
    }
  })
    .then(response => {
       history.push(`/workout/${response.data._id}`)
    })
    .catch(err => {
     console.log(err)
    });
}