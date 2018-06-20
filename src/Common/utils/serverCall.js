import {
  O_TOKEN_URL,
  CLIENT_ID,
  CLIENT_SECRET,
  BUSINESS_REGISTER_URL,
  INDIVIDUAL_REGISTER_URL,
  GET_USER_INFO_URL,
  PHONE_VERIFICATION_REQUEST_URL,
  PHONE_VERIFICATION_TOKEN_SNED
} from "./API";
import querystring from "querystring";
import { ajax } from "rxjs/observable/dom/ajax";

export const onPhoneVerificationRequestPost = ({ id, phone }) =>
  ajax({
    method: "post",
    url: `${PHONE_VERIFICATION_REQUEST_URL}${id}/`,
    body: {
      phone
    },
    headers: {
      "Content-Type": "application/json"
    }
  });

export const onPhoneVerificationTokenPost = ({ id, verificationToken }) => {
  console.log("verifiL: ", verificationToken);
  return ajax({
    method: "post",
    url: `${PHONE_VERIFICATION_TOKEN_SNED}${id}/`,
    body: {
      token: verificationToken
    },
    headers: {
      "Content-Type": "application/json"
    }
  });
};

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

export const onBusinessRegister = ({ body }) =>
  ajax({
    method: "post",
    url: BUSINESS_REGISTER_URL,
    body,
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
