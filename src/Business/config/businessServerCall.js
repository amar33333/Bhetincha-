import { BUSINESS_URL } from "./BUSINESS_API";
import axios from "axios";

export const onBusinessPost = ({ access_token }) =>
  axios({
    method: "post",
    url: BUSINESS_URL,
    data: {},
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + access_token
    }
  });

export const onBusinessAllGet = ({ access_token }) =>
  axios({
    method: "get",
    url: BUSINESS_URL,
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + access_token
    }
  });

export const onBusinessEachGet = ({ username }) =>
  axios({
    method: "get",
    url: `${BUSINESS_URL}${username}`,
    headers: {
      "Content-Type": "application/json"
    }
  });

export const onBusinessEachPut = ({ id, access_token, data }) =>
  axios({
    method: "PUT",
    url: `${BUSINESS_URL}${id}/`,
    data,
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + access_token
    }
  });
