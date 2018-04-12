import {
  O_TOKEN_URL,
  CLIENT_ID,
  CLIENT_SECRET,
  REGISTER_URL,
  GET_USER_INFO_URL,
  SEARCH_URL
} from "./API";
import axios from "axios";
import querystring from "querystring";

export const onSearch = ({ query }) => {
  const elastic_query = {
    query: {
      match: {
        name: query
      }
    }
  };
  return axios.get(SEARCH_URL, {
    params: {
      source: JSON.stringify(elastic_query),
      source_content_type: "application/json"
    }
  });
};

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

export const onUserGet = ({ access_token }) =>
  axios({
    method: "get",
    url: GET_USER_INFO_URL,
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + access_token
    }
  });

// export const onRegister = ({ username, password, email, business_name }) =>
//   // console.log("asdasd: ", username, password, email, business_name);
//   axios({
//     method: "post",
//     url: REGISTER_URL,
//     data: querystring.stringify({
//       client_id: CLIENT_ID,
//       client_secret: CLIENT_SECRET,
//       grant_type: "password",
//       username,
//       password,
//       email,
//       business_name
//     }),
//     headers: {
//       "Content-Type": "application/x-www-form-urlencoded"
//     }
//   });

export const onRegister = ({ username, password, email, business_name }) =>
  // console.log("asdasd: ", username, password, email, business_name);
  axios({
    method: "post",
    url: REGISTER_URL,
    data: {
      username,
      password,
      email,
      business_name
    },
    headers: {
      "Content-Type": "application/json"
    }
  });
