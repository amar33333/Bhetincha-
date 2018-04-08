import { O_TOKEN_URL, CLIENT_ID, CLIENT_SECRET } from "./API";
import axios from "axios";
import querystring from "querystring";

export const onLogin = ({ username, password }) =>
  axios({
    method: "post",
    url: O_TOKEN_URL,
    data: querystring.stringify({
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
