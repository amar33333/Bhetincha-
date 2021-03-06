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
  GALLERY_URL,
  BUSINESS_DETAILS_GET_URL,
  LOGO_COVER_IMAGE_GET_URL,
  ABOUT_GET_URL,
  CHANGE_SLUG_URL,
  CHECK_SLUG_URL,
  EXSECTION_SECTION_BUSINESS_URL,
  EXSECTION_SECTION_BUSINESS_LIST_URL,
  EXSECTION_SUB_SECTION_DATA_URL
} from "./BUSINESS_API";
import axios from "axios";
import { ajax } from "rxjs/observable/dom/ajax";
import querystring from "querystring";

export const onBusinessLogoCoverImageGet = ({ access_token, id }) =>
  ajax({
    method: "GET",
    url: `${LOGO_COVER_IMAGE_GET_URL}${id}/`,
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + access_token
    }
  });

export const onSlugCheckPost = ({ access_token, slug }) =>
  ajax({
    method: "POST",
    url: `${CHECK_SLUG_URL}`,
    body: {
      slug
    },
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + access_token
    }
  });

export const onSlugPut = ({ access_token, id, slug }) =>
  ajax({
    method: "PUT",
    url: `${CHANGE_SLUG_URL}${id}/`,
    body: {
      slug
    },
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + access_token
    }
  });

export const onBusinessLogoCoverImagePut = ({ access_token, body, id }) =>
  ajax({
    method: "PUT",
    url: `${BUSINESS_URL}${id}/`,
    body,
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + access_token
    }
  });

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
    url: `${BUSINESS_PUT_URL}${id}/`,
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
    url: `${BUSINESS_PUT_URL}${id}/`,
    body,
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + access_token
    }
  });

export const onGalleryGet = ({ access_token, id }) =>
  ajax({
    method: "GET",
    url: `${GALLERY_URL}${id}/`,
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + access_token
    }
  });

export const onGalleryPut = ({ access_token, body, id }) =>
  ajax({
    method: "PUT",
    url: `${BUSINESS_URL}${id}/`,
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
    url: `${BUSINESS_PUT_URL}${id}/`,
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
    url: `${BUSINESS_PUT_URL}${id}/`,
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

export const onBranchDelete = ({ access_token, business_slug, branch_id }) =>
  ajax({
    method: "DELETE",
    url: `${BRANCH_ADDRESS_URL}${business_slug}/${branch_id}/`,

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
    url: `${BUSINESS_PUT_URL}${id}/`,
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

// Exsection Goes Here
// onSectionBusinessPost //post data about each section from business dash
export const onSectionBusinessPost = ({ body }) =>
  ajax({
    method: "POST",
    url: EXSECTION_SECTION_BUSINESS_URL,
    body,
    headers: {
      "Content-Type": "application/json"
    }
  });

//onParentSectionBusinessGet // get me the parent section info for a particular child section
export const onParentSectionBusinessGet = ({ body }) =>
  ajax({
    method: "GET",
    url: `${EXSECTION_SECTION_BUSINESS_LIST_URL}/?businessIdd=${
      body.businessIdd
    }&admin_sectionId=${body.asid}`,
    headers: {
      "Content-Type": "application/json"
    }
  });

//onSectionsListExsectionBusinessData
export const onSectionsListExsectionBusinessData = ({ body, businessIdd }) =>
  ajax({
    method: "GET",
    url: `${EXSECTION_SECTION_BUSINESS_URL}?businessIdd=${businessIdd}&admin_sectionId=${
      body.sectionId
    }`,
    headers: {
      "Content-Type": "application/json"
    }
  });

// calls for implementing updating Section Entity for bhetincha
export const onExsectionSubSectionDataEachGet = ({ uid }) =>
  ajax({
    method: "GET",
    url: `${EXSECTION_SUB_SECTION_DATA_URL}${uid}/`,
    headers: {
      "Content-Type": "application/json"
    }
  });

export const onBusinessCatDetailsGet = ({ access_token, id }) =>
  ajax({
    method: "GET",
    url: `${BUSINESS_DETAILS_GET_URL}${id}/`,
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + access_token
    }
  });

export const onUpdateExsectionSubSectionDataPut = ({
  uid,
  access_token,
  body
}) =>
  ajax({
    method: "PUT",
    url: `${EXSECTION_SUB_SECTION_DATA_URL}${uid}/`,
    body,
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + access_token
    }
  });

export const onRemoveExsectionSubSectionDataDelete = ({ uid, access_token }) =>
  ajax({
    method: "DELETE",
    url: `${EXSECTION_SUB_SECTION_DATA_URL}${uid}/`,
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + access_token
    }
  });
