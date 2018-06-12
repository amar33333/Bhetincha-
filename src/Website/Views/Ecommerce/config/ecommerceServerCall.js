import { CATEGORY_URL } from "./ECOMMERCE_API";
import { ajax } from "rxjs/observable/dom/ajax";

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
