import { url } from "../data/url";
import Axios from "axios";
import history from "../history";
import { AUTH_ERROR } from "../cons/index";

const headers = () => ({
  "access-token": localStorage.getItem("access-token"),
  uid: localStorage.getItem("uid"),
  client: localStorage.getItem("client"),
  id: localStorage.getItem("id")
});

const storeCredentials = (headers, data) => {
  localStorage.setItem("access-token", headers["access-token"]);
  localStorage.setItem("uid", headers.uid);
  localStorage.setItem("client", headers.client);
  localStorage.setItem("id", data.id);
  localStorage.setItem("name", data.attributes.nickname);
};

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
      console.log(response, "response");
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
