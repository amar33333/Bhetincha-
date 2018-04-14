import {
  INDUSTRY_URL,
  CATEGORY_URL,
  EXTRA_SECTION_GET_URL,
  SUB_CATEGORY_URL,
  COUNTRY_URL,
  STATE_URL,
  DISTRICT_URL,
  CITY_URL,
  AREA_URL,
  USER_GROUPS_URL,
  USERS_URL
} from "./ADMIN_API";
import axios from "axios";

const access_token = "gOR9NbXeZoDVgVdx6Cwae9fXRYhFR9";

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

export const onCountryPost = ({ country }) => {
  console.log("country: ", country);
  console.log("url: ", COUNTRY_URL);
  return axios({
    method: "post",
    url: COUNTRY_URL,
    data: {
      name: country
    },
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + access_token
    }
  });
};

export const onCountryGet = () =>
  axios({
    method: "get",
    url: COUNTRY_URL,
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + access_token
    }
  });

export const onStatePost = ({ state, country }) =>
  axios({
    method: "post",
    url: STATE_URL,
    data: {
      name: state,
      country
    },
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + access_token
    }
  });

export const onStateGet = () =>
  axios({
    method: "get",
    url: STATE_URL,
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + access_token
    }
  });

export const onDistrictPost = ({ state, district, districtCode }) =>
  axios({
    method: "post",
    url: DISTRICT_URL,
    data: {
      name: district,
      state,
      districtCode
    },
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + access_token
    }
  });

export const onDistrictGet = () =>
  axios({
    method: "get",
    url: DISTRICT_URL,
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + access_token
    }
  });

export const onCityPost = ({ district, city }) =>
  axios({
    method: "post",
    url: CITY_URL,
    data: {
      name: city,
      district
    },
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + access_token
    }
  });

export const onCityGet = () =>
  axios({
    method: "get",
    url: CITY_URL,
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + access_token
    }
  });

export const onAreaPost = ({ city, area }) =>
  axios({
    method: "post",
    url: AREA_URL,
    data: {
      name: area,
      city
    },
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + access_token
    }
  });

export const onAreaGet = () =>
  axios({
    method: "get",
    url: AREA_URL,
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + access_token
    }
  });

export const onGroupPost = ({ group }) =>
  axios({
    method: "post",
    url: USER_GROUPS_URL,
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + access_token
    },
    data: {
      name: group
    }
  });

export const onGroupGet = () =>
  axios({
    method: "get",
    url: USER_GROUPS_URL,
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + access_token
    }
  });

export const onUserPost = ({
  first_name,
  last_name,
  username,
  password,
  email,
  group
}) =>
  axios({
    method: "post",
    url: USERS_URL,
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + access_token
    },
    data: {
      first_name,
      last_name,
      username,
      password,
      email,
      group
    }
  });

export const onUserGet = () =>
  axios({
    method: "get",
    url: USERS_URL,
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + access_token
    }
  });
