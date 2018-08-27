import { ajax } from "rxjs/observable/dom/ajax";
import {
  MINISITE_PERMISSIONS_URL,
  REVIEW_RATING_URL
} from "../config/MINISITE_API";

export const onMinisitePermissionsGet = ({ id }) => {
  return ajax({
    method: "GET",
    url: `${MINISITE_PERMISSIONS_URL}${id}/`,
    headers: {
      "Content-Type": "application/json"
    }
  });
};

export const onReviewRatingPost = ({ id, body, access_token }) => {
  return ajax({
    method: "POST",
    url: `${REVIEW_RATING_URL}${id}/`,
    body,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${access_token}`
    }
  });
};
