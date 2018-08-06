import {
  BUSINESS_URL,
  APP_BUSINESS_APPROVAL_URL,
  PAYMENT_METHOD_URL,
  COMPANY_TYPE_URL,
  ALBUM_URL,
  BUSINESS_PUT_URL,
  PHOTO_URL,
  SALES_USERS_LIST_URL,
  BRANCH_ADDRESS_URL,
  BUSINESS_BRANCH_GET_URL,
  PRIMARY_ADDRESS_URL_GET_URL,
  WORKING_HOUR_GET_URL,
  BUSINESS_DETAILS_GET_URL,
  ABOUT_GET_URL,
  CORE_MEMBER_URL
} from "./BUSINESS_API";
import axios from "axios";
import { ajax } from "rxjs/observable/dom/ajax";
import querystring from "querystring";

export const onBusinessDetailsGet = ({ access_token, id }) =>
  ajax({
    method: "GET",
    url: `${BUSINESS_DETAILS_GET_URL}${id}/`,
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + access_token
    }
  });

export const onBusinessDetailsPut = ({ access_token, id, body }) =>
  ajax({
    method: "PUT",
    url: `${BUSINESS_URL}${id}/`,
    body,
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + access_token
    }
  });

export const onWorkingHourGet = ({ access_token, id }) =>
  ajax({
    method: "GET",
    url: `${WORKING_HOUR_GET_URL}${id}/`,
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + access_token
    }
  });

export const onWorkingHourPut = ({ access_token, body, id }) =>
  ajax({
    method: "PUT",
    url: `${BUSINESS_PUT_URL}/${id}/`,
    body,
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + access_token
    }
  });

export const onAboutGet = ({ access_token, id }) =>
  ajax({
    method: "get",
    url: `${ABOUT_GET_URL}${id}/`,
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + access_token
    }
  });

export const onAboutPut = ({ access_token, body, id }) =>
  ajax({
    method: "PUT",
    url: `${BUSINESS_URL}${id}/`,
    body,
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + access_token
    }
  });

export const onPrimaryAddressGet = ({ access_token, id }) =>
  axios({
    method: "get",
    url: `${PRIMARY_ADDRESS_URL_GET_URL}${id}/`,
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + access_token
    }
  });

export const onPrimaryAddressPut = ({ access_token, id, data }) =>
  axios({
    method: "PUT",
    url: `${BUSINESS_URL}${id}/`,
    data,
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + access_token
    }
  });
export const onBranchPut = ({ access_token, business_slug, branch_id, body }) =>
  ajax({
    method: "PUT",
    url: `${BRANCH_ADDRESS_URL}${business_slug}/${branch_id}/`,
    body,
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + access_token
    }
  });

export const onBusinessBranchGet = ({ access_token, business_slug }) =>
  ajax({
    method: "get",
    url: `${BUSINESS_BRANCH_GET_URL}${business_slug}/`,
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + access_token
    }
  });

export const onBranchGet = ({ access_token, business_slug, branch_id }) =>
  axios({
    method: "get",
    url: `${BRANCH_ADDRESS_URL}${business_slug}/${branch_id}/`,
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + access_token
    }
  });

export const onBranchGetAjax = ({ access_token, business_slug, branch_id }) =>
  ajax({
    method: "get",
    url: `${BRANCH_ADDRESS_URL}${business_slug}/${branch_id}/`,
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + access_token
    }
  });

export const onBranchPost = ({ access_token, business_slug, body }) =>
  ajax({
    method: "PUT",
    url: `${BUSINESS_URL}${business_slug}/`,
    body,
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + access_token
    }
  });

export const onSalesUserGet = ({ access_token }) =>
  ajax({
    method: "GET",
    url: `${SALES_USERS_LIST_URL}`,
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + access_token
    }
  });

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

  // const server_format_data = {
  //   about: data.about,
  //   business_name: data.business_name,
  //   business_email: data.business_email,
  //   business_phone: data.business_phone,
  //   address: data.address,
  //   branchAddress: data.branchAddress,
  //   logo: data.logo.base64,
  //   cover_photo: data.cover_photo.base64,
  //   industry: data.industry ? data.industry.id : undefined,
  //   categories: category_list,
  //   sub_categories: sub_category_list,
  //   paymentMethod: payment_methods_list,
  //   workingHour: data.workingHour,
  //   alwaysOpen: data.alwaysOpen
  // };

  // console.log("server_droasd: ", server_format_data);

  return ajax({
    method: "post",
    url: BUSINESS_URL,
    body: data,
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

  // const server_format_data = {
  //   about: data.about,
  //   business_name: data.business_name,
  //   business_email: data.business_email,
  //   business_phone: data.business_phone,
  //   address: data.address,
  //   branchAddress: data.branchAddress,
  //   logo: data.logo.base64,
  //   cover_photo: data.cover_photo.base64,
  //   industry: data.industry ? data.industry.id : undefined,
  //   categories: category_list,
  //   sub_categories: sub_category_list,
  //   paymentMethod: payment_methods_list,
  //   workingHour: data.workingHour,
  //   alwaysOpen: data.alwaysOpen
  // };

  // console.log("server_edit: ", server_format_data);

  return axios({
    method: "PUT",
    url: `${BUSINESS_PUT_URL}/${id}/`,
    data: data,
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
    url: `${BUSINESS_URL}${slug}/`,
    headers: {
      "Content-Type": "application/json"
    }
  });

export const onBusinessEachDeleteAjax = ({ id, access_token }) =>
  ajax({
    method: "DELETE",
    url: `${BUSINESS_URL}${id}/`,
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + access_token
    }
  });

export const onAppBusinessEachDelete = ({ id, access_token }) =>
  ajax({
    method: "DELETE",
    url: `${APP_BUSINESS_APPROVAL_URL}${id}/`,
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

export const onBusinessEachAlbumDeleteAjax = ({
  business_id,
  album_id,
  access_token
}) =>
  ajax({
    method: "DELETE",
    url: `${ALBUM_URL}${business_id}/${album_id}/`,
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

//Core Member
export const onCoreMemberAddNewPost = ({ business_id, access_token, body }) =>
  ajax({
    method: "POST",
    url: `${CORE_MEMBER_URL}${business_id}/section/core-member/`,
    body,
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + access_token
    }
  });

//Menu Name Create
export const onExsectionMenuNamePost = ({ business_id, access_token, body }) =>
  ajax({
    method: "POST",
    url: `${CORE_MEMBER_URL}${business_id}/section/menu/`,
    body,
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + access_token
    }
  });

//Menu Detail
export const onExsectionMenuNameGet = ({ business_id, access_token }) =>
  ajax({
    method: "GET",
    url: `${CORE_MEMBER_URL}${business_id}/section/menu/menu-rud/`,
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + access_token
    }
  });

//Menu Name Update
export const onExsectionMenuNamePut = ({ business_id, access_token, body }) =>
  ajax({
    method: "PUT",
    url: `${CORE_MEMBER_URL}${business_id}/section/menu/menu-rud/`,
    body,
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + access_token
    }
  });

//Food Group : Add New
export const onFoodGroupAddNewPost = ({ business_id, access_token, body }) =>
  ajax({
    method: "POST",
    url: `${CORE_MEMBER_URL}${business_id}/section/menu/menu-food-category/`,
    body,
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + access_token
    }
  });

//Food Group Update
export const onFoodGroupEditPut = ({ business_id, access_token, body, fgid }) =>
  ajax({
    method: "PUT",
    url: `${CORE_MEMBER_URL}${business_id}/section/menu/menu-food-category/${fgid}/`,
    body,
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + access_token
    }
  });

//Food Group List
export const onFoodGroupListGet = ({ business_id, access_token }) =>
  ajax({
    method: "GET",
    url: `${CORE_MEMBER_URL}${business_id}/section/menu/menu-rud/`,
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + access_token
    }
  });

//Food Group Delete
export const onFoodGroupDeleteSelf = ({ business_id, access_token, uid }) =>
  ajax({
    method: "DELETE",
    url: `${CORE_MEMBER_URL}${business_id}/section/menu/menu-food-category/${uid}/`,
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + access_token
    }
  });

//Selected Food Group Items List
export const onFoodGroupItemListGet = ({ business_id, access_token, uid }) =>
  ajax({
    method: "GET",
    url: `${CORE_MEMBER_URL}${business_id}/section/menu/menu-food-category/${uid}/`,
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + access_token
    }
  });

//Food Group Item Add New
export const onFoodGroupItemAddNewPost = ({
  business_id,
  access_token,
  body,
  uid
}) =>
  ajax({
    method: "POST",
    url: `${CORE_MEMBER_URL}${business_id}/section/menu/${uid}/menu-food-items/`,
    body,
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + access_token
    }
  });

//Food Group Item Delete
export const onFoodGroupItemRemoveEcommerce = ({
  business_id,
  access_token,
  uid,
  fgitemid
}) =>
  ajax({
    method: "DELETE",
    url: `${CORE_MEMBER_URL}${business_id}/section/menu/${uid}/menu-food-items/${fgitemid}/`,
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + access_token
    }
  });

//Food Group Item Update
export const onFoodGroupItemEditPut = ({
  business_id,
  body,
  access_token,
  uid,
  fgitemid
}) =>
  ajax({
    method: "PUT",
    url: `${CORE_MEMBER_URL}${business_id}/section/menu/${uid}/menu-food-items/${fgitemid}/`,
    body,
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + access_token
    }
  });
