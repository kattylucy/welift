import { url } from '../data/url';
import Axios from "axios";
import history from '../history';



export const getUser = id => dispatch => {
    Axios({
      method: "post",
      url: `${url}user/`,
      data:{
          id
      }
    })
      .then(response => {
            console.log(response)
      })
      .catch(err => {
       console.log(err)
      });
  };