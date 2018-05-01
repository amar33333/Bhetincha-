import {
  BUSINESS_URL,
  PAYMENT_METHOD_URL,
  COMPANY_TYPE_URL,
  ALBUM_URL
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
    business_name: data.business_name,
    business_email: data.business_email,
    address: data.address,
    branchs: data.branchs,
    logo: data.logo.base64,
    cover_photo: data.cover_photo.base64,
    industry: data.industry ? data.industry.id : undefined,
    categories: category_list,
    sub_categories: sub_category_list,
    paymentMethod: payment_methods_list,
    workingHour: data.workingHour,
    alwaysOpen: data.alwaysOpen
  };

  // const server_format_data = {
  //   business_name: data.business_name,
  //   // username: data.username,
  //   // password: data.password,
  //   business_email: data.business_email,
  //   address: {
  //     otherLandlineNumber: [data.other_landline_number],
  //     house_no: data.house_no,
  //     landmark: data.landmark,
  //     addressLine1: data.address_line_1,
  //     addressLine2: data.address_line_2,
  //     po_box: data.post_box,
  //     tollFreeNumber: data.toll_free,
  //     landlineNumber: data.landline,
  //     email: data.email,
  //     country: data.primary_country.id,
  //     state: data.primary_state.id,
  //     district: data.primary_district.id,
  //     city: data.primary_city.id,
  //     area: data.primary_area.id,
  //     contactPerson: data.contactPerson
  //     // contactPerson: {
  //     //   name: data.contact_person_name,
  //     //   designation: data.contact_person_designation,
  //     //   email: data.contact_person_email,
  //     //   mobileNumber: data.contact_person_mobile_number
  //     //   // visibleToPublic: "false"
  //     // }
  //   },
  //   branchAddress: data.branchs,
  //   // branchAddress: [
  //   //   {
  //   //     otherLandlineNumber: ["9849477523", "9843047233"],
  //   //     house_no: "1235",
  //   //     landmark: "opposite to ",
  //   //     addressLine1: "address_line_1",
  //   //     addressLine2: "address_line_2",
  //   //     po_box: "1234",
  //   //     tollFreeNumber: "123465453",
  //   //     landlineNumber: "4123362",
  //   //     email: "xyz@gmail.com",
  //   //     area: "435321321453f2sf65",
  //   //     contactPerson: {
  //   //       name: "sagarkumar",
  //   //       designation: "founder",
  //   //       email: "abcsdfs@gmail.com",
  //   //       mobileNumber: "4354213213",
  //   //       visibleToPublic: "True"
  //   //     }
  //   //   }
  //   // ],
  //   about: {
  //     tagline: data.about_us_tagline,
  //     aboutUs: data.about_us,
  //     // establishedYear: "2010-01-02T00:00:00Z",
  //     companyType: data.company_type.id
  //   },
  //   logo: data.business_logo.base64,
  //   cover_photo: data.business_cover_image.base64,
  //   industry: data.industry.id,
  //   categories: category_list,
  //   sub_categories: sub_category_list,
  //   paymentMethod: payment_methods_list
  // };

  console.log("server_droasd: ", server_format_data);

  return axios({
    method: "post",
    url: BUSINESS_URL,
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
    url: `${ALBUM_URL}${business_id}/${album_id}/`,
    body,
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + access_token
    }
  });

export const onPaymentMethodsGet = ({ access_token }) =>
  axios({
    method: "get",
    url: `${PAYMENT_METHOD_URL}`,
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + access_token
    }
  });

export const onCompanyTypeGet = ({ access_token }) =>
  axios({
    method: "get",
    url: `${COMPANY_TYPE_URL}`,
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + access_token
    }
  });
