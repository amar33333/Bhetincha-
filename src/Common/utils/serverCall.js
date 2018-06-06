import {
  O_TOKEN_URL,
  CLIENT_ID,
  CLIENT_SECRET,
  BUSINESS_REGISTER_URL,
  INDIVIDUAL_REGISTER_URL,
  GET_USER_INFO_URL
} from "./API";
import querystring from "querystring";
import { ajax } from "rxjs/observable/dom/ajax";

export const onLogin = ({ username, password }) =>
  ajax({
    method: "POST",
    url: O_TOKEN_URL,
    body: querystring.stringify({
      client_id: CLIENT_ID,
      client_secret: CLIENT_SECRET,
      grant_type: "password",
      username,
      password
    }),
    headers: {
      "Content-Type": "application/x-www-form-urlencoded"
    }
  });

export const onUserGet = ({ access_token }) =>
  ajax({
    method: "GET",
    url: GET_USER_INFO_URL,
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + access_token
    }
  });

export const onBusinessRegister = ({
  username,
  password,
  email,
  business_name
}) =>
  ajax({
    method: "post",
    url: BUSINESS_REGISTER_URL,
    body: {
      username,
      password,
      email,
      business_name
    },
    headers: {
      "Content-Type": "application/json"
    }
  });

export const onIndividualRegister = ({
  username,
  password,
  email,
  first_name,
  last_name,
  phone_number
}) =>
  ajax({
    method: "post",
    url: INDIVIDUAL_REGISTER_URL,
    body: {
      username,
      password,
      email,
      first_name,
      last_name,
      phone_number
    },
    headers: {
      "Content-Type": "application/json"
    }
  });
