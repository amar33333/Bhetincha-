import {
  BUSINESS_URL,
  PAYMENT_METHOD_URL,
  COMPANY_TYPE_URL
} from "./BUSINESS_API";
import axios from "axios";

export const onBusinessPost = ({ data, access_token }) => {
  const sub_category_list = data.sub_category.map(
    sub_category => sub_category.value
  );

  const payment_methods_list = data.payment_method.map(
    payment_method => payment_method.value
  );

  console.log("sub_category_list: ", sub_category_list);
  console.log("payment_methods_list: ", payment_methods_list);

  const server_format_data = {
    business_name: data.business_name,
    username: data.username,
    email: data.business_email,
    password: data.password,
    address: {
      otherLandlineNumber: [data.other_landline_number],
      house_no: data.house_no,
      landmark: data.landmark,
      addressLine1: data.address_line_1,
      addressLine2: data.address_line_2,
      po_box: data.post_box,
      tollFreeNumber: data.toll_free,
      landlineNumber: data.landline,
      email: data.business_email,
      area: data.primary_area.value,
      contactPerson: {
        name: data.contact_person_name,
        designation: data.contact_person_designation,
        email: data.contact_person_email,
        mobileNumber: data.contact_person_mobile_number
        // visibleToPublic: "false"
      }
    },
    // branchAddress: [
    //   {
    //     otherLandlineNumber: ["9849477523", "9843047233"],
    //     house_no: "1235",
    //     landmark: "opposite to ",
    //     addressLine1: "address_line_1",
    //     addressLine2: "address_line_2",
    //     po_box: "1234",
    //     tollFreeNumber: "123465453",
    //     landlineNumber: "4123362",
    //     email: "xyz@gmail.com",
    //     area: "435321321453f2sf65",
    //     contactPerson: {
    //       name: "sagarkumar",
    //       designation: "founder",
    //       email: "abcsdfs@gmail.com",
    //       mobileNumber: "4354213213",
    //       visibleToPublic: "True"
    //     }
    //   }
    // ],
    about: {
      tagline: data.about_us_tagline,
      aboutUs: data.about_us,
      // establishedYear: "2010-01-02T00:00:00Z",
      companyType: data.company_type.value
    },
    logo: data.business_logo.base64,
    cover_photo: data.business_cover_image.base64,
    sub_categories: sub_category_list,
    paymentMethod: payment_methods_list
  };

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

export const onBusinessEachGet = ({ username }) =>
  axios({
    method: "get",
    url: `${BUSINESS_URL}${username}`,
    headers: {
      "Content-Type": "application/json"
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