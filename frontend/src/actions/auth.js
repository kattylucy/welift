import { url } from "../data/url";
import Axios from "axios";
import history from "../history";
import { AUTH_ERROR } from "../cons/index";
import { toast } from "react-toastify";

const headers = () => ({
  authToken: localStorage.getItem("access-token"),
  user: localStorage.getItem("id"),
  username: localStorage.getItem("username")
});

export const signup = data => dispatch => {
  console.log(data);
  Axios({
    method: "post",
    url: `${url}auth/signup`,
    data
  })
    .then(response => {
      if (response.data.message !== "user was sucessfully created") {
        dispatch({
          type: AUTH_ERROR,
          payload: response.data.message
        });
      } else {
        history.push("/signin");
      }
    })
    .catch(err => {
      console.log(err);
    });
};

export const login = data => dispatch => {
  Axios({
    method: "post",
    url: `${url}auth/login`,
    data
  })
    .then(response => {
      if (response.data.message) {
        dispatch({
          type: AUTH_ERROR,
          payload: response.data.message
        });
      } else {
        localStorage.setItem("access-token", response.data.token);
        localStorage.setItem("username", response.data.username);
        localStorage.setItem("id", response.data.id);
        localStorage.setItem("email", response.data.email);
        history.push("/");
      }
    })
    .catch(err => {
      console.log(err);
    });
};

export const resetEmail = email => dispatch => {
  Axios({
    method: "post",
    url: `${url}auth/reset/email`,
    headers: headers(),
    data: {
      email,
      id: localStorage.id
    }
  })
    .then(response => {
      localStorage.setItem("email", response.data.message);
      toast.info("Your email was updated");
    })
    .catch(error => {
      console.log(error);
    });
};
