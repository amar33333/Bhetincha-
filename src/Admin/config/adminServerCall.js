import {
  INDUSTRY_URL,
  CATEGORY_URL,
  EXTRA_SECTION_GET_URL,
  SUB_CATEGORY_URL,
  COUNTRY_URL,
  STATE_URL,
  DISTRICT_URL,
  CITY_URL,
  AREA_URL
} from "./ADMIN_API";
import axios from "axios";

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

export const onAreaPost = ({ area }) =>
  axios({
    method: "post",
    url: AREA_URL,
    data: {
      name: area
    },
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
      Authorization: "Bearer " + "tKTS6MQ2oarrEahS0IQFnOCrrhZ87e"
    }
  });
};

export const onCityPost = ({ city }) =>
  axios({
    method: "post",
    url: CITY_URL,
    data: {
      name: city
    },
    headers: {
      "Content-Type": "application/json"
    }
  });

export const onStatePost = ({ state }) =>
  axios({
    method: "post",
    url: STATE_URL,
    data: {
      name: state
    },
    headers: {
      "Content-Type": "application/json"
    }
  });

export const onDistrictPost = ({ district }) =>
  axios({
    method: "post",
    url: DISTRICT_URL,
    data: {
      name: district
    },
    headers: {
      "Content-Type": "application/json"
    }
  });
