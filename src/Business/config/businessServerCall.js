import {
  BUSINESS_URL,
  APP_BUSINESS_APPROVAL_URL,
  PAYMENT_METHOD_URL,
  COMPANY_TYPE_URL,
  ALBUM_URL,
  BUSINESS_PUT_URL,
  PHOTO_URL
} from "./BUSINESS_API";
import axios from "axios";
import { ajax } from "rxjs/observable/dom/ajax";
import querystring from "querystring";

export const onBusinessPost = ({ data, access_token }) => {
  const category_list = data.categories
    ? data.categories.map(category => category.id)
    : [];

  const sub_category_list = data.sub_categories
    ? data.sub_categories.map(sub_category => sub_category.id)
    : [];

  const payment_methods_list = data.paymentMethod
    ? data.paymentMethod.map(payment_method => payment_method.id)
    : [];

  console.log("sub_category_list: ", sub_category_list);
  console.log("payment_methods_list: ", payment_methods_list);

  console.log("final: data: ", data);

  const server_format_data = {
    about: data.about,
    business_name: data.business_name,
    business_email: data.business_email,
    address: data.address,
    branchAddress: data.branchAddress,
    logo: data.logo.base64,
    cover_photo: data.cover_photo.base64,
    industry: data.industry ? data.industry.id : undefined,
    categories: category_list,
    sub_categories: sub_category_list,
    paymentMethod: payment_methods_list,
    workingHour: data.workingHour,
    alwaysOpen: data.alwaysOpen
  };

  console.log("server_droasd: ", server_format_data);

  return ajax({
    method: "post",
    url: BUSINESS_URL,
    body: server_format_data,
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + access_token
    }
  });
};

export const onBusinessPut = ({ id, access_token, data }) => {
  const category_list = data.categories
    ? data.categories.map(category => category.id)
    : [];

  const sub_category_list = data.sub_categories
    ? data.sub_categories.map(sub_category => sub_category.id)
    : [];

  const payment_methods_list = data.paymentMethod
    ? data.paymentMethod.map(payment_method => payment_method.id)
    : [];

  console.log("final: data edit: ", data);

  const server_format_data = {
    about: data.about,
    business_name: data.business_name,
    business_email: data.business_email,
    address: data.address,
    branchAddress: data.branchAddress,
    logo: data.logo.base64,
    cover_photo: data.cover_photo.base64,
    industry: data.industry ? data.industry.id : undefined,
    categories: category_list,
    sub_categories: sub_category_list,
    paymentMethod: payment_methods_list,
    workingHour: data.workingHour,
    alwaysOpen: data.alwaysOpen
  };

  console.log("server_edit: ", server_format_data);

  return axios({
    method: "PUT",
    url: `${BUSINESS_PUT_URL}/${id}/`,
    data: server_format_data,
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + access_token
    }
  });
};

export const onBusinessAllGet = ({ access_token }) =>
  axios({
    method: "get",
    url: BUSINESS_URL,
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + access_token
    }
  });

export const onBusinessAllGetAjax = ({ access_token, params }) =>
  ajax({
    method: "GET",
    url: `${BUSINESS_URL}?${querystring.stringify(params)}`,
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + access_token
    }
  });

export const onAppBusinessGet = ({ access_token, params }) =>
  ajax({
    method: "GET",
    url: `${APP_BUSINESS_APPROVAL_URL}?${querystring.stringify(params)}`,
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + access_token
    }
  });

export const onAppBusinessEachGet = ({ username, access_token }) =>
  axios({
    method: "get",
    url: `${APP_BUSINESS_APPROVAL_URL}${username}/`,
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + access_token
    }
  });

export const onBusinessEachGet = ({ username, access_token }) =>
  axios({
    method: "get",
    url: `${BUSINESS_URL}${username}/`,
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + access_token
    }
  });

export const onBusinessEachGetAjax = ({ slug }) =>
  ajax({
    method: "GET",
    url: `${BUSINESS_URL}${slug}`,
    headers: {
      "Content-Type": "application/json"
    }
  });

export const onBusinessEachDeleteAjax = ({ id, access_token }) =>
  ajax({
    method: "DELETE",
    url: `${BUSINESS_URL}${id}`,
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + access_token
    }
  });

export const onAppBusinessEachDelete = ({ id, access_token }) =>
  ajax({
    method: "DELETE",
    url: `${APP_BUSINESS_APPROVAL_URL}${id}`,
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + access_token
    }
  });

export const onBusinessEachPut = ({ id, access_token, data }) =>
  axios({
    method: "PUT",
    url: `${BUSINESS_URL}${id}/`,
    data,
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + access_token
    }
  });

export const onBusinessEachPutAjax = ({ id, access_token, body }) =>
  ajax({
    method: "PUT",
    url: `${BUSINESS_URL}${id}/`,
    body,
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + access_token
    }
  });

export const onBusinessEachAlbumEachPhotos = ({
  business_id,
  album_id,
  access_token,
  data
}) =>
  axios({
    method: "POST",
    url: `${ALBUM_URL}${business_id}/${album_id}/`,
    data,
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + access_token
    }
  });

export const onBusinessEachAlbumEachPhotosAjax = ({
  business_id,
  album_id,
  access_token,
  body
}) =>
  ajax({
    method: "POST",
    url: `${ALBUM_URL}${business_id}/${album_id}/`,
    body,
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + access_token
    }
  });

export const onBusinessEachAlbumEachPhotosDelete = ({
  business_id,
  album_id,
  access_token,
  body
}) =>
  ajax({
    method: "DELETE",
    url: `${PHOTO_URL}${business_id}/${album_id}/`,
    body,
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + access_token
    }
  });

export const onPaymentMethodsGet = ({ access_token }) =>
  ajax({
    method: "get",
    url: `${PAYMENT_METHOD_URL}`,
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + access_token
    }
  });

export const onCompanyTypeGet = ({ access_token }) =>
  ajax({
    method: "get",
    url: `${COMPANY_TYPE_URL}`,
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + access_token
    }
  });
