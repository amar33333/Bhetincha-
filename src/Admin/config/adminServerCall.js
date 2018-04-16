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

export const onIndustryPost = ({ industry, access_token }) =>
  axios({
    method: "post",
    url: INDUSTRY_URL,
    data: {
      name: industry
    },
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + access_token
    }
  });

export const onIndustryGet = ({ access_token }) =>
  axios({
    method: "get",
    url: INDUSTRY_URL,
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + access_token
    }
  });

export const onIndustryEachGet = ({ id, access_token }) =>
  axios({
    method: "get",
    url: `${INDUSTRY_URL}${id}/`,
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + access_token
    }
  });

export const onCategoryEachGet = ({ id, access_token }) =>
  axios({
    method: "get",
    url: `${CATEGORY_URL}${id}/`,
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + access_token
    }
  });

export const onSubCategoryEachGet = ({ id, access_token }) =>
  axios({
    method: "get",
    url: `${SUB_CATEGORY_URL}${id}/`,
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + access_token
    }
  });

export const onCategoryPost = ({ category, industry, access_token }) =>
  axios({
    method: "post",
    url: CATEGORY_URL,
    data: {
      name: category,
      industry
    },
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + access_token
    }
  });

export const onCategoryGet = ({ access_token }) =>
  axios({
    method: "get",
    url: CATEGORY_URL,
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + access_token
    }
  });

export const onSubCategoryPost = ({
  category,
  extraSection,
  subCategory,
  access_token
}) =>
  axios({
    method: "post",
    url: SUB_CATEGORY_URL,
    data: {
      category: category,
      extra_section: extraSection,
      name: subCategory
    },
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + access_token
    }
  });

export const onExtraSectionGet = ({ access_token }) =>
  axios({
    method: "get",
    url: EXTRA_SECTION_GET_URL,
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + access_token
    }
  });

export const onCountryPost = ({ country, access_token }) =>
  axios({
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

export const onCountryGet = ({ access_token }) =>
  axios({
    method: "get",
    url: COUNTRY_URL,
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + access_token
    }
  });

export const onStatePost = ({ state, country, access_token }) =>
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

export const onStateGet = ({ access_token }) =>
  axios({
    method: "get",
    url: STATE_URL,
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + access_token
    }
  });

export const onDistrictPost = ({
  state,
  district,
  districtCode,
  access_token
}) =>
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

export const onDistrictGet = ({ access_token }) =>
  axios({
    method: "get",
    url: DISTRICT_URL,
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + access_token
    }
  });

export const onCityPost = ({ district, city, access_token }) =>
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

export const onCityGet = ({ access_token }) =>
  axios({
    method: "get",
    url: CITY_URL,
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + access_token
    }
  });

export const onAreaPost = ({ city, area, access_token }) =>
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

export const onAreaGet = ({ access_token }) =>
  axios({
    method: "get",
    url: AREA_URL,
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + access_token
    }
  });

export const onGroupPost = ({ group, access_token }) =>
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

export const onGroupGet = ({ access_token }) =>
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
  group,
  access_token
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

export const onUserGet = ({ access_token }) =>
  axios({
    method: "get",
    url: USERS_URL,
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + access_token
    }
  });
