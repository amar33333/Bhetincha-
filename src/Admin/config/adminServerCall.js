import {
  INDUSTRY_URL,
  CATEGORY_URL,
  EXTRA_SECTION_GET_URL,
  SUB_CATEGORY_URL
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
