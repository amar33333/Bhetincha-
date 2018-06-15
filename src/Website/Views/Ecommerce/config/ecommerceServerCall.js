import { CATEGORY_URL, ATTRIBUTE_URL } from "./ECOMMERCE_API";
import { ajax } from "rxjs/observable/dom/ajax";

// attribute
export const onAttributesGet = () =>
  ajax({
    method: "GET",
    url: ATTRIBUTE_URL,
    headers: {
      "Content-Type": "application/json"
    }
  });

export const onPropertiesPost = ({ body }) =>
  ajax({
    method: "POST",
    url: ATTRIBUTE_URL,
    body,
    headers: {
      "Content-Type": "application/json"
    }
  });

// categories
export const onCategoriesGet = () =>
  ajax({
    method: "GET",
    url: CATEGORY_URL,
    headers: {
      "Content-Type": "application/json"
    }
  });

export const onCategoryPost = ({ name, parent }) =>
  ajax({
    method: "POST",
    url: CATEGORY_URL,
    body: { name, parent },
    headers: {
      "Content-Type": "application/json"
    }
  });

export const onCategoryDetailGet = ({ uid }) =>
  ajax({
    method: "GET",
    url: `${CATEGORY_URL}${uid}/`,
    headers: {
      "Content-Type": "application/json"
    }
  });

export const onCategoryDetailPost = ({ uid, body }) =>
  ajax({
    method: "POST",
    url: `${CATEGORY_URL}${uid}/`,
    body,
    headers: {
      "Content-Type": "application/json"
    }
  });

export const onCategoryDetailDelete = ({ uid }) =>
  ajax({
    method: "DELETE",
    url: `${CATEGORY_URL}${uid}/`,
    headers: {
      "Content-Type": "application/json"
    }
  });
