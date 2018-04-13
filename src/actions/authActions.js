import moment from "moment";

import { onLogin, onRegister, onUserGet } from "../Common/utils/serverCall";
import {
  FETCH_USER,
  FETCH_USER_FULFILLED,
  FETCH_USER_REJECTED,
  FETCH_USER_PENDING,
  CREATE_USER_FULFILLED,
  CREATE_USER_REJECTED,
  CREATE_USER_PENDING,
  COOKIES_LOAD_FULFILLED,
  LOGOUT_USER
} from "./types";
import CookiesProvider from "../Common/utils/CookiesProvider";

export const loadCookies = () => ({
  type: COOKIES_LOAD_FULFILLED,
  payload: {
    cookies: CookiesProvider.getAllCookies()
  }
});

export const onSubmit = ({ username, password, history }) => dispatch => {
  onLogin({ username, password })
    .then(response => {
      onUserGet({ access_token: response.data.access_token })
        .then(userData => {
          const initialDate = new Date();

          let expiryDate = moment(initialDate)
            .add(10, "s")
            .toDate();

          console.log("expire date: ", expiryDate);

          CookiesProvider.setCookies(
            "token_data",
            response.data,
            "/",
            expiryDate
          );

          console.log("authactions: ", CookiesProvider.getTokenData());

          CookiesProvider.setCookies(
            "user_data",
            userData.data,
            "/",
            expiryDate
          );

          dispatch({
            type: FETCH_USER_FULFILLED,
            payload: {
              cookies: CookiesProvider.getAllCookies()
            }
          });
          // if (userData.data.username === "admin") history.push("/admin");

          // else
          history.push(`/${userData.data.username}`);
        })
        .catch(error => {
          dispatch({ type: FETCH_USER_REJECTED, payload: error });
        });
    })
    .catch(error => dispatch({ type: FETCH_USER_REJECTED, payload: error }));

  dispatch({ type: FETCH_USER_PENDING });
};

export const onRequestLoginData = ({ username, password }) => ({
  type: FETCH_USER,
  payload: onLogin({ username, password })
});

export const onRegisterSubmit = ({
  username,
  password,
  business_name,
  email
}) => dispatch => {
  onRegister({ username, password, business_name, email })
    .then(response =>
      dispatch({ type: CREATE_USER_FULFILLED, payload: response.data })
    )
    .catch(error => dispatch({ type: CREATE_USER_REJECTED, payload: error }));

  dispatch({ type: CREATE_USER_PENDING });
};

export const onLogout = () => ({
  type: LOGOUT_USER,
  payload: null
});
