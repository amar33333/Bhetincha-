import {
  O_TOKEN_URL,
  CLIENT_ID,
  CLIENT_SECRET,
  INDUSTRY_URL,
  CATEGORY_URL,
  REGISTER_URL,
  GET_USER_INFO_URL,
  EXTRA_SECTION_GET_URL,
  SUB_CATEGORY_URL,
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

export const onIndustryPost = ({ industry }) =>
  axios({
    method: "post",
    url: INDUSTRY_URL,
    data: {
      name: industry
    },
    headers: {
      "Content-Type": "application/json"
    }
  });

export const onIndustryGet = () =>
  axios({
    method: "get",
    url: INDUSTRY_URL,
    headers: {
      "Content-Type": "application/json"
    }
  });

export const onCategoryPost = ({ category, industry }) =>
  axios({
    method: "post",
    url: CATEGORY_URL,
    data: {
      name: category,
      industry
    },
    headers: {
      "Content-Type": "application/json"
    }
  });

export const onCategoryGet = () =>
  axios({
    method: "get",
    url: CATEGORY_URL,
    headers: {
      "Content-Type": "application/json"
    }
  });

export const onSubCategoryPost = ({ category, extraSection, subCategory }) =>
  axios({
    method: "post",
    url: SUB_CATEGORY_URL,
    data: {
      category: category,
      extra_section: extraSection,
      name: subCategory
    },
    headers: {
      "Content-Type": "application/json"
    }
  });

export const onExtraSectionGet = () =>
  axios({
    method: "get",
    url: EXTRA_SECTION_GET_URL,
    headers: {
      "Content-Type": "application/json"
    }
  });
