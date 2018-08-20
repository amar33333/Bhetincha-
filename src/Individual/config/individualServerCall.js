import {
  PERSONAL_DETAILS_URL,
  SKILLS_URL,
  EXPERIENCE_URL,
  EDUCATION_URL
} from "./INDIVIDUAL_API";
import { ajax } from "rxjs/observable/dom/ajax";
import querystring from "querystring";

export const onEducationDetailGet = ({ id, itemId, access_token }) =>
  ajax({
    method: "GET",
    url: `${EDUCATION_URL}${id}/${itemId}/`,
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + access_token
    }
  });

export const onEducationDetailDelete = ({ id, itemId, access_token }) =>
  ajax({
    method: "DELETE",
    url: `${EDUCATION_URL}${id}/${itemId}/`,
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + access_token
    }
  });

export const onEducationDetailPut = ({ id, itemId, body, access_token }) =>
  ajax({
    method: "PUT",
    url: `${EDUCATION_URL}${id}/${itemId}/`,
    body,
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + access_token
    }
  });

export const onExperienceDetailPut = ({ id, itemId, body, access_token }) =>
  ajax({
    method: "PUT",
    url: `${EXPERIENCE_URL}${id}/${itemId}/`,
    body,
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + access_token
    }
  });

export const onSkillPut = ({ id, itemId, body, access_token }) =>
  ajax({
    method: "PUT",
    url: `${SKILLS_URL}${id}/${itemId}/`,
    body,
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + access_token
    }
  });

export const onEducationDetailsGet = ({ id, access_token }) =>
  ajax({
    method: "GET",
    url: `${EDUCATION_URL}${id}/`,
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + access_token
    }
  });

export const onExperienceDetailsGet = ({ id, access_token }) =>
  ajax({
    method: "GET",
    url: `${EXPERIENCE_URL}${id}/`,
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + access_token
    }
  });

export const onSkillsGet = ({ id, access_token }) =>
  ajax({
    method: "GET",
    url: `${SKILLS_URL}${id}/`,
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + access_token
    }
  });

export const onEducationDetailsPost = ({ id, body, access_token }) =>
  ajax({
    method: "POST",
    url: `${EDUCATION_URL}${id}/`,
    body,
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + access_token
    }
  });

export const onExperienceDetailsPost = ({ id, body, access_token }) =>
  ajax({
    method: "POST",
    url: `${EXPERIENCE_URL}${id}/`,
    body,
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + access_token
    }
  });

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

export const onSkillsPost = ({ id, body, access_token }) =>
  ajax({
    method: "PUT",
    url: `${SKILLS_URL}${id}/`,
    body,
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + access_token
    }
  });
