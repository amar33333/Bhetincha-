import { PERSONAL_DETAILS_URL } from "./INDIVIDUAL_API";
import { ajax } from "rxjs/observable/dom/ajax";
import querystring from "querystring";

export const onIndividualPersonalDetailsGet = ({ id, access_token }) =>
  ajax({
    method: "GET",
    url: `${PERSONAL_DETAILS_URL}${id}/`,
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + access_token
    }
  });

export const onIndividualPersonalDetailsPut = ({ id, body, access_token }) =>
  ajax({
    method: "PUT",
    url: `${PERSONAL_DETAILS_URL}${id}/`,
    body,
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + access_token
    }
  });
