import {
  INDUSTRY_URL,
  CATEGORY_URL,
  EXTRA_SECTION_GET_URL,
  SUB_CATEGORY_URL,
  COUNTRY_URL,
  STATE_URL,
  DISTRICT_URL,
  CITY_URL,
  AREA_URL,
  USER_GROUPS_URL,
  USERS_URL,
  PERMISSIONS_ALL_LIST_URL,
  TOGGLE_PERMISSION_URL,
  ASSIGNED_PATH_URL,
  ASSIGNED_PATH_POST_URL,
  ASSIGNED_LIST_URL,
  VERIFY_BUSINESS_URL,
  BUSINESS_TELE_CALLING_URL,
  LOCATION_URL,
  ECOMMERCE_CATEGORY_URL,
  ECOMMERCE_ATTRIBUTE_URL,
  ECOMMERCE_PRODUCT_ATTRIBUTE_URL,
  ECOMMERCE_PRODUCT_URL,
  SOCIAL_LINK_URL,
  CREATE_TELE_USER_URL,
  TELE_USER_SEARCH_MOBILE_URL,
  TELE_USER_EDIT_URL,
  TELE_USER_SEND_SMS_URL,
  TELE_USER_SEARCH_NAME_URL,
  ECOMMERCE_CATEGORY_CONFIG_URL,
  ECOMMERCE_PRODUCT_SEARCH_URL,
  IMPROVE_LISTING_URL,
  SEARCH_PLACEHOLDER_URL,
  SUBSCRIPTION_PACKAGE_PERMISSIONS_URL,
  SUBSCRIPTION_PACKAGE_URL,
  SUBSCRIPTION_PACKAGE_ASSIGN_URL,
  ECOMMERCE_ROOT_CATEGORY_URL,
  THEME_URL,
  EXSECTION_SECTION_URL,
  EXSECTION_ATTRIBUTE_URL,
  EXSECTION_PROPERTY_URL,
  EXSECTION_SUBSECTION_ATTRIBUTE_URL
} from "./ADMIN_API";

import {
  PAYMENT_METHOD_URL,
  COMPANY_TYPE_URL,
  BUSINESS_PUT_URL,
  BUSINESS_URL,
  SOCIAL_URL_LINK_GET_URL,
  SOCIAL_URL_LINK_EDIT_URL
} from "../../Business/config/BUSINESS_API";

import axios from "axios";

import { ajax } from "rxjs/observable/dom/ajax";
import querystring from "querystring";

export const onBusinessThemeGet = ({ id, access_token }) =>
  ajax({
    method: "GET",
    url: `${THEME_URL}${id}/`,
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + access_token
    }
  });

export const onBusinessThemePut = ({ id, body, access_token }) =>
  ajax({
    method: "PUT",
    url: `${THEME_URL}${id}/`,
    body,
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + access_token
    }
  });

export const onBusinessThemeDelete = ({ id, access_token }) =>
  ajax({
    method: "DELETE",
    url: `${THEME_URL}${id}/`,
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + access_token
    }
  });

export const onBusinessThemePost = ({ body, access_token }) =>
  ajax({
    method: "POST",
    url: THEME_URL,
    body,
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + access_token
    }
  });

export const onBusinessThemesGet = ({ access_token }) =>
  ajax({
    method: "GET",
    url: THEME_URL,
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + access_token
    }
  });

export const onSubscriptionPackageAssignPost = ({ id, body, access_token }) =>
  ajax({
    method: "POST",
    url: `${SUBSCRIPTION_PACKAGE_ASSIGN_URL}${id}/`,
    body,
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + access_token
    }
  });

export const onSubscriptionPackageAssignGet = ({ id, access_token }) =>
  ajax({
    method: "GET",
    url: `${SUBSCRIPTION_PACKAGE_ASSIGN_URL}${id}/`,
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + access_token
    }
  });

export const onSubscriptionPackageAssignDelete = ({ id, access_token }) =>
  ajax({
    method: "DELETE",
    url: `${SUBSCRIPTION_PACKAGE_ASSIGN_URL}${id}/`,
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + access_token
    }
  });

export const onSubscriptionPackagePermissionsGet = ({ access_token }) =>
  ajax({
    method: "GET",
    url: SUBSCRIPTION_PACKAGE_PERMISSIONS_URL,
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + access_token
    }
  });

export const onSubscriptionPackagePost = ({ body, access_token }) =>
  ajax({
    method: "POST",
    url: SUBSCRIPTION_PACKAGE_URL,
    body,
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + access_token
    }
  });

export const onSubscriptionPackageDelete = ({ id, access_token }) =>
  ajax({
    method: "DELETE",
    url: `${SUBSCRIPTION_PACKAGE_URL}${id}/`,
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + access_token
    }
  });

export const onSubscriptionPackagePut = ({ id, body, access_token }) =>
  ajax({
    method: "PUT",
    url: `${SUBSCRIPTION_PACKAGE_URL}${id}/`,
    body,
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + access_token
    }
  });

export const onSubscriptionPackageGet = ({ access_token }) =>
  ajax({
    method: "GET",
    url: SUBSCRIPTION_PACKAGE_URL,
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + access_token
    }
  });

export const onSearchPlaceholderPut = ({ id, body, access_token }) =>
  ajax({
    method: "PUT",
    url: `${SEARCH_PLACEHOLDER_URL}${id}/`,
    body,
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + access_token
    }
  });

export const onSearchPlaceholderPost = ({ body, access_token }) =>
  ajax({
    method: "post",
    url: SEARCH_PLACEHOLDER_URL,
    body,
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + access_token
    }
  });

export const onSearchPlaceholderGet = ({ access_token }) =>
  ajax({
    method: "get",
    url: SEARCH_PLACEHOLDER_URL,
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + access_token
    }
  });

export const onSearchPlaceholderEachDelete = ({ id, access_token }) =>
  ajax({
    method: "delete",
    url: `${SEARCH_PLACEHOLDER_URL}${id}/`,
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + access_token
    }
  });

export const onSocialLinkUrlPost = ({ body, id, access_token }) => {
  return ajax({
    method: "PUT",
    url: `${BUSINESS_URL}${id}/`,
    body,
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + access_token
    }
  });
};

export const onSocialLinkUrlPut = ({
  body,
  id,
  social_link_id,
  access_token
}) => {
  return ajax({
    method: "PUT",
    url: `${SOCIAL_URL_LINK_EDIT_URL}${id}/${social_link_id}/`,
    body,
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + access_token
    }
  });
};

export const onSocialLinkUrlDelete = ({ id, social_link_id, access_token }) => {
  return ajax({
    method: "DELETE",
    url: `${SOCIAL_URL_LINK_EDIT_URL}${id}/${social_link_id}/`,
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + access_token
    }
  });
};

export const onSocialLinkUrlGet = ({ id, access_token }) => {
  return ajax({
    method: "GET",
    url: `${SOCIAL_URL_LINK_GET_URL}${id}/`,
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + access_token
    }
  });
};

export const onSocialLinkPost = ({ body, access_token }) =>
  ajax({
    method: "POST",
    url: SOCIAL_LINK_URL,
    body,
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + access_token
    }
  });

export const onSocialLinksGet = ({ access_token }) =>
  ajax({
    method: "GET",
    url: SOCIAL_LINK_URL,
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + access_token
    }
  });

export const onImproveListingGet = ({ access_token, params }) =>
  ajax({
    method: "GET",
    url: `${IMPROVE_LISTING_URL}?${querystring.stringify(params)}`,
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + access_token
    }
  });

export const onSocialLinkPut = ({ id, body, access_token }) =>
  ajax({
    method: "PUT",
    url: `${SOCIAL_LINK_URL}${id}/`,
    body,
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + access_token
    }
  });

export const onSocialLinkEachDelete = ({ id, access_token }) =>
  ajax({
    method: "delete",
    url: `${SOCIAL_LINK_URL}${id}/`,
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + access_token
    }
  });

export const onBusinessTeleCallingGetAjax = ({ access_token, body }) =>
  ajax({
    method: "POST",
    url: BUSINESS_TELE_CALLING_URL,
    body,
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + access_token
    }
  });

export const onTeleUserPostAjax = ({ access_token, body }) =>
  ajax({
    method: "POST",
    url: CREATE_TELE_USER_URL,
    body,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${access_token}`
    }
  });

export const onTeleUserSearchMobile = ({ access_token, params }) =>
  ajax({
    method: "GET",
    url: `${TELE_USER_SEARCH_MOBILE_URL}?${querystring.stringify(params)}`,
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + access_token
    }
  });

export const onTeleUserSearchName = ({ access_token, params }) =>
  ajax({
    method: "GET",
    url: `${TELE_USER_SEARCH_NAME_URL}?${querystring.stringify(params)}`,
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + access_token
    }
  });

export const onTeleUserEditAjax = ({ access_token, body }) =>
  ajax({
    method: "POST",
    url: TELE_USER_EDIT_URL,
    body,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${access_token}`
    }
  });

export const onTeleUserSendSMS = ({ access_token, body }) =>
  ajax({
    method: "POST",
    url: TELE_USER_SEND_SMS_URL,
    body,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${access_token}`
    }
  });

export const onBusinessVerifyPost = ({ id, body, access_token }) =>
  ajax({
    method: "PUT",
    url: `${VERIFY_BUSINESS_URL}${id}/`,
    body,
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + access_token
    }
  });

export const onAssignedBusinessAllGetAjax = ({ access_token, params }) =>
  ajax({
    method: "GET",
    url: `${ASSIGNED_LIST_URL}?${querystring.stringify(params)}`,
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + access_token
    }
  });

export const onAssignedPathEachGet = ({ access_token, id }) =>
  ajax({
    method: "GET",
    url: `${ASSIGNED_PATH_URL}${id}/`,
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + access_token
    }
  });

export const onAssignedPathPost = ({ access_token, body, mongoId }) =>
  ajax({
    method: "POST",
    url: `${ASSIGNED_PATH_POST_URL}${mongoId}/`,
    body,
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + access_token
    }
  });

export const onPermissionsGet = ({ access_token }) =>
  ajax({
    method: "GET",
    url: PERMISSIONS_ALL_LIST_URL,
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + access_token
    }
  });

export const onTogglePermissionPost = ({
  group_id,
  global_permission,
  checked,
  access_token
}) =>
  ajax({
    method: "POST",
    url: TOGGLE_PERMISSION_URL,
    headers: {
      Authorization: "Bearer " + access_token,
      "Content-Type": "application/json"
    },
    body: {
      group_id,
      global_permission,
      checked
    }
  });

export const onGroupsGet = ({ access_token }) =>
  ajax({
    method: "GET",
    url: USER_GROUPS_URL,
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + access_token
    }
  });

export const onCompanyTypePost = ({ company_type, access_token }) => {
  return axios({
    method: "post",
    url: COMPANY_TYPE_URL,
    data: {
      name: company_type
    },
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + access_token
    }
  });
};

export const onCompanyTypePut = ({ company_type, access_token }) =>
  ajax({
    method: "PUT",
    url: `${COMPANY_TYPE_URL}${company_type.id}/`,
    body: {
      name: company_type.name
    },
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + access_token
    }
  });

export const onCompanyTypePostAjax = ({ company_type, access_token }) =>
  ajax({
    method: "post",
    url: COMPANY_TYPE_URL,
    body: { name: company_type },
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + access_token
    }
  });

export const onCompanyTypeEachDeleteAjax = ({ id, access_token }) =>
  ajax({
    method: "delete",
    url: `${COMPANY_TYPE_URL}${id}/`,
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + access_token
    }
  });

export const onPaymentMethodPost = ({ payment_method, access_token }) =>
  axios({
    method: "post",
    url: PAYMENT_METHOD_URL,
    data: {
      name: payment_method
    },
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + access_token
    }
  });

export const onPaymentMethodPut = ({ payment_method, access_token }) =>
  ajax({
    method: "PUT",
    url: `${PAYMENT_METHOD_URL}${payment_method.id}/`,
    body: {
      name: payment_method.name
    },
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + access_token
    }
  });

export const onPaymentMethodPostAjax = ({ payment_method, access_token }) =>
  ajax({
    method: "post",
    url: PAYMENT_METHOD_URL,
    body: { name: payment_method },
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + access_token
    }
  });

export const onPaymentMethodEachDeleteAjax = ({ id, access_token }) =>
  ajax({
    method: "delete",
    url: `${PAYMENT_METHOD_URL}${id}/`,
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + access_token
    }
  });

export const onLocationGetAjax = ({ access_token, params }) =>
  ajax({
    method: "GET",
    url: `${LOCATION_URL}?${querystring.stringify(params)}`,
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + access_token
    }
  });

export const onIndustryPost = ({ industry, access_token }) =>
  axios({
    method: "post",
    url: INDUSTRY_URL,
    data: {
      name: industry
    },
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + access_token
    }
  });

export const onIndustryPut = ({ industry, access_token }) =>
  ajax({
    method: "PUT",
    url: `${INDUSTRY_URL}${industry.id}/`,
    body: {
      name: industry.name
    },
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + access_token
    }
  });

export const onIndustryGet = ({ access_token }) => {
  return axios({
    method: "get",
    url: INDUSTRY_URL,
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + access_token
    }
  });
};

export const onIndustryEachGet = ({ id, access_token }) => {
  return axios({
    method: "get",
    url: `${INDUSTRY_URL}${id}/`,
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + access_token
    }
  });
};

export const onIndustryPostAjax = ({ industry, access_token }) =>
  ajax({
    method: "POST",
    url: INDUSTRY_URL,
    body: {
      name: industry
    },
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + access_token
    }
  });

export const onIndustryGetAjax = ({ access_token }) =>
  ajax({
    method: "GET",
    url: INDUSTRY_URL,
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + access_token
    }
  });

export const onIndustryEachGetAjax = ({ id, access_token }) =>
  ajax({
    method: "GET",
    url: `${INDUSTRY_URL}${id}/`,
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + access_token
    }
  });

export const onIndustryEachDeleteAjax = ({ id, access_token }) =>
  ajax({
    method: "DELETE",
    url: `${INDUSTRY_URL}${id}/`,
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + access_token
    }
  });

export const onCategoryEachGet = ({ id, access_token }) =>
  axios({
    method: "get",
    url: `${CATEGORY_URL}${id}/`,
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + access_token
    }
  });

export const onCategoryEachGetAjax = ({ id, access_token }) =>
  ajax({
    method: "get",
    url: `${CATEGORY_URL}${id}/`,
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + access_token
    }
  });

export const onCategoryPost = ({ category, industry, access_token }) =>
  axios({
    method: "post",
    url: CATEGORY_URL,
    data: {
      name: category,
      industry
    },
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + access_token
    }
  });

export const onCategoryPut = ({ body, id, access_token }) =>
  ajax({
    method: "PUT",
    url: `${CATEGORY_URL}${id}/`,
    body,
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + access_token
    }
  });

export const onCategoryPostAjax = ({ category, industry, access_token }) =>
  ajax({
    method: "post",
    url: CATEGORY_URL,
    body: {
      name: category,
      industry
    },
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + access_token
    }
  });

export const onCategoryGet = ({ access_token }) =>
  axios({
    method: "get",
    url: CATEGORY_URL,
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + access_token
    }
  });

export const onCategoryArrayGet = ({ access_token, params }) =>
  ajax({
    method: "get",
    url: `${CATEGORY_URL}?${querystring.stringify(params)}`,
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + access_token
    }
  });

export const onCategoryGetAjax = ({ access_token, params }) =>
  ajax({
    method: "get",
    url: `${CATEGORY_URL}?${querystring.stringify(params)}`,
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + access_token
    }
  });

export const onCategoryEachDeleteAjax = ({ id, access_token }) =>
  ajax({
    method: "DELETE",
    url: `${CATEGORY_URL}${id}/`,
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + access_token
    }
  });

export const onSubCategoryPost = ({
  category,
  extraSection,
  tags,
  subCategory,
  access_token
}) => {
  return axios({
    method: "post",
    url: SUB_CATEGORY_URL,
    data: {
      category,
      extra_sections: extraSection,
      tags: tags,
      name: subCategory
    },
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + access_token
    }
  });
};

export const onSubCategoryPut = ({ id, body, access_token }) =>
  ajax({
    method: "PUT",
    url: `${SUB_CATEGORY_URL}${id}/`,
    body,
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + access_token
    }
  });

export const onSubCategoryPostAjax = ({
  category,
  extraSection,
  tags,
  subCategory,
  access_token
}) =>
  ajax({
    method: "post",
    url: SUB_CATEGORY_URL,
    body: {
      category,
      extra_sections: extraSection,
      tags: tags,
      name: subCategory
    },
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + access_token
    }
  });

export const onSubCategoryEachGet = ({ id, access_token }) =>
  axios({
    method: "get",
    url: `${SUB_CATEGORY_URL}${id}/`,
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + access_token
    }
  });

export const onSubCategoryGet = ({ access_token, params }) => {
  return axios({
    method: "get",
    url: `${SUB_CATEGORY_URL}?${querystring.stringify(params)}`,
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + access_token
    }
  });
};

export const onSubCategoryGetAjax = ({ access_token, params }) => {
  return ajax({
    method: "get",
    url: `${SUB_CATEGORY_URL}?${querystring.stringify(params)}`,
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + access_token
    }
  });
};

export const onSubCategoryEachDeleteAjax = ({ id, access_token }) =>
  ajax({
    method: "DELETE",
    url: `${SUB_CATEGORY_URL}${id}/`,
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + access_token
    }
  });

export const onExtraSectionGet = ({ access_token }) =>
  axios({
    method: "get",
    url: EXTRA_SECTION_GET_URL,
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + access_token
    }
  });

export const onExtraSectionGetAjax = ({ access_token }) =>
  ajax({
    method: "get",
    url: EXTRA_SECTION_GET_URL,
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + access_token
    }
  });

export const onCountryPost = ({ country, access_token }) =>
  axios({
    method: "post",
    url: COUNTRY_URL,
    data: {
      name: country
    },
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + access_token
    }
  });

export const onCountryPut = ({ country, access_token }) =>
  ajax({
    method: "PUT",
    url: `${COUNTRY_URL}${country.id}/`,
    body: {
      name: country.name,
      countryCode: country.countryCode
    },
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + access_token
    }
  });

export const onCountryPostAjax = ({ body, access_token }) =>
  ajax({
    method: "post",
    url: COUNTRY_URL,
    body,
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + access_token
    }
  });

export const onCountryGet = ({ access_token }) =>
  axios({
    method: "get",
    url: COUNTRY_URL,
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + access_token
    }
  });

export const onCountryGetAjax = ({ access_token }) =>
  ajax({
    method: "get",
    url: COUNTRY_URL,
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + access_token
    }
  });

export const onCountryEachGet = ({ id, access_token }) => {
  return axios({
    method: "get",
    url: `${COUNTRY_URL}${id}/`,
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + access_token
    }
  });
};

export const onCountryEachGetAjax = ({ id, access_token }) =>
  ajax({
    method: "get",
    url: `${COUNTRY_URL}${id}/`,
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + access_token
    }
  });

export const onCountryEachDeleteAjax = ({ id, access_token }) =>
  ajax({
    method: "delete",
    url: `${COUNTRY_URL}${id}/`,
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + access_token
    }
  });

export const onStatePost = ({ state, country, access_token }) =>
  axios({
    method: "post",
    url: STATE_URL,
    data: {
      name: state,
      country
    },
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + access_token
    }
  });

export const onStatePostAjax = ({ state, country, access_token }) =>
  ajax({
    method: "POST",
    url: STATE_URL,
    body: {
      name: state,
      country
    },
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + access_token
    }
  });

export const onStateGet = ({ access_token }) =>
  axios({
    method: "get",
    url: STATE_URL,
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + access_token
    }
  });

export const onStateGetAjax = ({ access_token, params }) =>
  ajax({
    method: "get",
    url: `${STATE_URL}?${querystring.stringify(params)}`,
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + access_token
    }
  });

export const onStatePut = ({ state, country, access_token }) =>
  ajax({
    method: "PUT",
    url: `${STATE_URL}${state.id}/`,
    body: {
      name: state.name,
      country
    },
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + access_token
    }
  });

export const onStateEachGet = ({ id, access_token }) =>
  axios({
    method: "get",
    url: `${STATE_URL}${id}/`,
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + access_token
    }
  });

export const onStateEachGetAjax = ({ id, access_token }) =>
  ajax({
    method: "get",
    url: `${STATE_URL}${id}/`,
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + access_token
    }
  });

export const onStateEachDeleteAjax = ({ id, access_token }) =>
  ajax({
    method: "delete",
    url: `${STATE_URL}${id}/`,
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + access_token
    }
  });

export const onDistrictPost = ({
  state,
  district,
  districtCode,
  access_token
}) =>
  axios({
    method: "post",
    url: DISTRICT_URL,
    data: {
      name: district,
      state,
      districtCode
    },
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + access_token
    }
  });

export const onDistrictPostAjax = ({
  state,
  district,
  districtCode,
  access_token
}) =>
  ajax({
    method: "post",
    url: DISTRICT_URL,
    body: {
      name: district,
      state,
      districtCode
    },
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + access_token
    }
  });

export const onDistrictGet = ({ access_token }) =>
  axios({
    method: "get",
    url: DISTRICT_URL,
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + access_token
    }
  });

export const onDistrictGetAjax = ({ access_token, params }) =>
  ajax({
    method: "get",
    url: `${DISTRICT_URL}?${querystring.stringify(params)}`,
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + access_token
    }
  });

export const onDistrictPut = ({ district, state, access_token }) =>
  ajax({
    method: "PUT",
    url: `${DISTRICT_URL}${district.id}/`,
    body: {
      name: district.name,
      districtCode: district.districtCode,
      state
    },
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + access_token
    }
  });

export const onDistrictEachGet = ({ id, access_token }) =>
  axios({
    method: "get",
    url: `${DISTRICT_URL}${id}/`,
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + access_token
    }
  });

export const onDistrictEachGetAjax = ({ id, access_token }) =>
  ajax({
    method: "get",
    url: `${DISTRICT_URL}${id}/`,
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + access_token
    }
  });

export const onDistrictEachDeleteAjax = ({ id, access_token }) =>
  ajax({
    method: "delete",
    url: `${DISTRICT_URL}${id}/`,
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + access_token
    }
  });

export const onCityPost = ({ district, city, access_token }) =>
  axios({
    method: "post",
    url: CITY_URL,
    data: {
      name: city,
      district
    },
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + access_token
    }
  });

export const onCityPostAjax = ({ district, city, access_token }) =>
  ajax({
    method: "post",
    url: CITY_URL,
    body: {
      name: city,
      district
    },
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + access_token
    }
  });

export const onCityPut = ({ district, city, access_token }) =>
  ajax({
    method: "PUT",
    url: `${CITY_URL}${city.id}/`,
    body: {
      name: city.name,
      district
    },
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + access_token
    }
  });

export const onCityGet = ({ access_token }) =>
  axios({
    method: "get",
    url: CITY_URL,
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + access_token
    }
  });

export const onCityGetAjax = ({ access_token, params }) =>
  ajax({
    method: "get",
    url: `${CITY_URL}?${querystring.stringify(params)}`,
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + access_token
    }
  });

export const onCityEachGet = ({ id, access_token }) =>
  axios({
    method: "get",
    url: `${CITY_URL}${id}/`,
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + access_token
    }
  });

export const onCityEachGetAjax = ({ id, access_token }) =>
  ajax({
    method: "get",
    url: `${CITY_URL}${id}/`,
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + access_token
    }
  });

export const onCityEachDeleteAjax = ({ id, access_token }) =>
  ajax({
    method: "delete",
    url: `${CITY_URL}${id}/`,
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + access_token
    }
  });

export const onAreaPost = ({ city, area, access_token }) =>
  axios({
    method: "post",
    url: AREA_URL,
    data: {
      name: area,
      city
    },
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + access_token
    }
  });

export const onAreaPostAjax = ({ city, area, access_token }) =>
  ajax({
    method: "post",
    url: AREA_URL,
    body: {
      name: area,
      city
    },
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + access_token
    }
  });

export const onAreaPut = ({ area, city, access_token }) =>
  ajax({
    method: "PUT",
    url: `${AREA_URL}${area.id}/`,
    body: {
      name: area.name,
      city
    },
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + access_token
    }
  });
export const onAreaGet = ({ access_token }) =>
  axios({
    method: "get",
    url: AREA_URL,
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + access_token
    }
  });

export const onAreaGetAjax = ({ access_token, params }) =>
  ajax({
    method: "get",
    url: `${AREA_URL}?${querystring.stringify(params)}`,
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + access_token
    }
  });

export const onAreaEachDeleteAjax = ({ id, access_token }) =>
  ajax({
    method: "delete",
    url: `${AREA_URL}${id}/`,
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + access_token
    }
  });

export const onGroupPost = ({ group, access_token }) =>
  ajax({
    method: "post",
    url: USER_GROUPS_URL,
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + access_token
    },
    body: {
      name: group
    }
  });

export const onGroupPut = ({ group, access_token }) =>
  ajax({
    method: "PUT",
    url: `${USER_GROUPS_URL}${group.id}/`,
    body: {
      name: group.name
    },
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + access_token
    }
  });

export const onGroupsEachDelete = ({ id, access_token }) =>
  ajax({
    method: "delete",
    url: `${USER_GROUPS_URL}${id}/`,
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + access_token
    }
  });

export const onGroupGet = ({ access_token }) =>
  axios({
    method: "get",
    url: USER_GROUPS_URL,
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + access_token
    }
  });

export const onUserPost = ({
  first_name,
  last_name,
  username,
  password,
  email,
  groups,
  access_token
}) =>
  ajax({
    method: "post",
    url: USERS_URL,
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + access_token
    },
    body: {
      first_name,
      last_name,
      username,
      password,
      email,
      groups
    }
  });
``;
export const onUserDelete = ({ id, access_token }) =>
  ajax({
    method: "delete",
    url: `${USERS_URL}${id}/`,
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + access_token
    }
  });

export const onUserPut = ({ body, id, access_token }) =>
  ajax({
    method: "PUT",
    url: `${USERS_URL}${id}/`,
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + access_token
    },
    body
  });

export const onUsersGet = ({ access_token, params }) =>
  ajax({
    method: "get",
    url: `${USERS_URL}?${querystring.stringify(params)}`,
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + access_token
    }
  });

export const onUsersNotPaginatedGet = ({ access_token }) =>
  ajax({
    method: "get",
    url: USERS_URL,
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + access_token
    }
  });

// ecommerce
// attribute
export const onEcommerceAttributesGet = () =>
  ajax({
    method: "GET",
    url: ECOMMERCE_ATTRIBUTE_URL,
    headers: {
      "Content-Type": "application/json"
    }
  });

export const onEcommercePropertiesPost = ({ body }) =>
  ajax({
    method: "POST",
    url: ECOMMERCE_ATTRIBUTE_URL,
    body,
    headers: {
      "Content-Type": "application/json"
    }
  });

export const onEcommercePropertiesPut = ({ body }) =>
  ajax({
    method: "PUT",
    url: ECOMMERCE_ATTRIBUTE_URL,
    body,
    headers: {
      "Content-Type": "application/json"
    }
  });

export const onEcommercePropertiesDelete = ({ body }) =>
  ajax({
    method: "DELETE",
    url: ECOMMERCE_ATTRIBUTE_URL,
    body,
    headers: {
      "Content-Type": "application/json"
    }
  });

// categories
export const onEcommerceCategoriesGet = () =>
  ajax({
    method: "GET",
    url: ECOMMERCE_CATEGORY_URL,
    headers: {
      "Content-Type": "application/json"
    }
  });

export const onEcommerceRootCategoriesGet = () =>
  ajax({
    method: "GET",
    url: ECOMMERCE_ROOT_CATEGORY_URL,
    headers: {
      "Content-Type": "application/json"
    }
  });

export const onEcommerceCategoryPost = ({ body }) =>
  ajax({
    method: "POST",
    url: ECOMMERCE_CATEGORY_URL,
    body,
    headers: {
      "Content-Type": "application/json"
    }
  });

export const onEcommerceCategoryDetailGet = ({ uid }) =>
  ajax({
    method: "GET",
    url: `${ECOMMERCE_CATEGORY_URL}${uid}/`,
    headers: {
      "Content-Type": "application/json"
    }
  });

export const onEcommerceCategoryDetailPost = ({ uid, body }) =>
  ajax({
    method: "POST",
    url: `${ECOMMERCE_CATEGORY_URL}${uid}/`,
    body,
    headers: {
      "Content-Type": "application/json"
    }
  });

export const onEcommerceCategoryDetailDelete = ({ uid }) =>
  ajax({
    method: "DELETE",
    url: `${ECOMMERCE_CATEGORY_URL}${uid}/`,
    headers: {
      "Content-Type": "application/json"
    }
  });

export const onEcommerceCategoryAttributesGet = ({ body }) =>
  ajax({
    method: "POST",
    url: ECOMMERCE_PRODUCT_ATTRIBUTE_URL,
    body,
    headers: {
      "Content-Type": "application/json"
    }
  });

export const onEcommerceCategoryProductsGet = ({ access_token, params }) =>
  ajax({
    method: "GET",
    url: `${ECOMMERCE_PRODUCT_URL}?${querystring.stringify(params)}`,
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + access_token
    }
  });

export const onEcommerceProductPost = ({
  // access_token,
  body
}) =>
  ajax({
    method: "POST",
    url: ECOMMERCE_PRODUCT_URL,
    body,
    headers: {
      "Content-Type": "application/json"
      // Authorization: "Bearer " + access_token
    }
  });

export const onEcommerceProductEachGet = ({ uid }) =>
  ajax({
    method: "GET",
    url: `${ECOMMERCE_PRODUCT_URL}${uid}/`,
    headers: {
      "Content-Type": "application/json"
    }
  });

export const onEcommerceProductEachPut = ({ uid, body }) =>
  ajax({
    method: "PUT",
    url: `${ECOMMERCE_PRODUCT_URL}${uid}/`,
    body,
    headers: {
      "Content-Type": "application/json"
    }
  });

export const onEcommerceProductEachDelete = ({ uid }) =>
  ajax({
    method: "DELETE",
    url: `${ECOMMERCE_PRODUCT_URL}${uid}/`,
    headers: {
      "Content-Type": "application/json"
    }
  });

export const onEcommerceCategoryConfigGet = ({ categoryId }) =>
  ajax({
    method: "GET",
    url: `${ECOMMERCE_CATEGORY_CONFIG_URL}${categoryId}/`,
    headers: {
      "Content-Type": "application/json"
    }
  });

export const onEcommerceProductsGet = ({ body }) =>
  ajax({
    method: "POST",
    url: ECOMMERCE_PRODUCT_SEARCH_URL,
    body,
    headers: {
      "Content-Type": "application/json"
    }
  });

//////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////
//Admin Area
// section
// attribute
//EXSECTION_ATTRIBUTE_URL:`${MAIN_URL}/${EXSECTION}/attribute/`;
//json response: [
//     {
//       "uid": "99a631a6389246268f13570e6b484528",
//       "name": "String",
//       "fieldType": "String"
//   },
//   {
//       "uid": "2678c0dde63c4401ad8c436ff28c4d81",
//       "name": "Integer",
//       "fieldType": "Integer"
//   }
// ]
export const onExsectionAttributesGetAdmin = () =>
  ajax({
    method: "GET",
    url: EXSECTION_ATTRIBUTE_URL,
    headers: {
      "Content-Type": "application/json"
    }
  });

////EXSECTION_ATTRIBUTE_URL:`${MAIN_URL}/${EXSECTION}/attribute/`;
// payload :
//attributeTypeId
// :
// "99a631a6389246268f13570e6b484528"
// filterAble
// :
// false
// name
// :
// "Menu Name"
// required
// :
// false
// sectionId
// :
// "fdcde3ca3f3e4b249a9db0d7982d57b5"
export const onExsectionAttributesPostAdmin = ({ body }) =>
  ajax({
    method: "POST",
    url: EXSECTION_ATTRIBUTE_URL,
    body,
    headers: {
      "Content-Type": "application/json"
    }
  });

//EXSECTION_SECTION_URL = `${MAIN_URL}/${EXSECTION}/sections/`
//example json response
//{
//   "uid": "9b4623c4d6c24531a8f64e9673397cf1",
//   "name": "section",
//   "children": [
//       {
//           "uid": "c7084516d6f24afba0e16e5102a3e59f",
//           "name": "Menu",
//           "children": [
//               {
//                   "uid": "5bdfd169cade444e8d59abfbaab4b0f5",
//                   "name": "Food Category",
//                   "children": [
//                       {
//                           "uid": "5f96da7e41164df49b1fa50c8c9db1db",
//                           "name": "Food Item",
//                           "children": [],
//                           "hasAttr": true,
//                           "hasSec": true
//                       }
//                   ],
//                   "hasAttr": true,
//                   "hasSec": true
//               }
//           ],
//           "hasAttr": true,
//           "hasSec": true
//       }
//   ],
//   "hasAttr": false,
//   "hasSec": true
// }
export const onExsectionSectionsGetAdmin = () =>
  ajax({
    method: "GET",
    url: EXSECTION_SECTION_URL,
    headers: {
      "Content-Type": "application/json"
    }
  });

//sections/sections/c7084516d6f24afba0e16e5102a3e59f/
//will get each section for eg menu section in admin
//example json resp
// {
//   "uid": "c7084516d6f24afba0e16e5102a3e59f",
//   "breadCrumbs": [
//       {
//           "uid": "c7084516d6f24afba0e16e5102a3e59f",
//           "name": "Menu",
//           "properties": []
//       },
//       {
//           "uid": "9b4623c4d6c24531a8f64e9673397cf1",
//           "name": "section",
//           "properties": []
//       }
//   ],
//   "name": "Menu",
//   "hasAttr": true,
//   "hasSec": true
// }
export const onExsectionSectionDetailGetAdmin = ({ uid }) =>
  ajax({
    method: "GET",
    url: `${EXSECTION_SECTION_URL}${uid}/`,
    headers: {
      "Content-Type": "application/json"
    }
  });

//EXSECTION_SECTION_URL :`${MAIN_URL}/${EXSECTION}/sections/`
//will create new section for eg menu section in admin
//while creating FoodCategory
//req payload {name: "Food Category", hasAttr: true, parent: "fdcde3ca3f3e4b249a9db0d7982d57b5"}
export const onExsectionSectionPostAdmin = ({ name, label, hasAttr, parent }) =>
  ajax({
    method: "POST",
    url: EXSECTION_SECTION_URL,
    body: { name, label, hasAttr, parent },
    headers: {
      "Content-Type": "application/json"
    }
  });
//////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////
//Business Area
//businessId for AMT business is:5b596acd8ffa850603eea61a

export const onExsectionSectionsGet = () =>
  ajax({
    method: "GET",
    url: EXSECTION_SECTION_URL,
    headers: {
      "Content-Type": "application/json"
    }
  });

export const onExsectionAttributesPost = ({ body }) =>
  ajax({
    method: "POST",
    url: EXSECTION_PROPERTY_URL,
    body,
    headers: {
      "Content-Type": "application/json"
    }
  });
//EXSECTION_SUBSECTION_ATTRIBUTE_URL, //`${MAIN_URL}/${EXSECTION}/prop/attrutd/`
/// recently changed to sections/prop/attr/
//recently changed to sections/attrone/ -- currrently active
//req payload {sectionId: "9b4623c4d6c24531a8f64e9673397cf1"}
//sample response
// {
//   "msg": "success",
//   "sections": "Food Category",
//   "attributes": [
//       {
//           "required": false,
//           "fieldType": "String",
//           "uid": "275fa1f40ac845baba56c564522734a5",
//           "name": "Food Category Name",
//           "filterAble": false,
//           "order": 0
//       }
//   ],
//   "breadCrumbs": [
//       {
//           "uid": "5bdfd169cade444e8d59abfbaab4b0f5",
//           "name": "Food Category"
//       },
//       {
//           "uid": "c7084516d6f24afba0e16e5102a3e59f",
//           "name": "Menu"
//       },
//       {
//           "uid": "9b4623c4d6c24531a8f64e9673397cf1",
//           "name": "section"
//       }
//   ]
// }
export const onExsectionSectionAttributesGet = ({ body }) =>
  ajax({
    method: "POST",
    url: EXSECTION_SUBSECTION_ATTRIBUTE_URL,
    body,
    headers: {
      "Content-Type": "application/json"
    }
  });

//  onExsectionPropertiesPut
//EXSECTION_ATTRIBUTE_URL = `${MAIN_URL}/${EXSECTION}/attribute/`
export const onExsectionPropertiesPut = ({ body }) =>
  ajax({
    method: "PUT",
    url: EXSECTION_ATTRIBUTE_URL,
    body,
    headers: {
      "Content-Type": "application/json"
    }
  });

//onExsectionPropertiesDelete
export const onExsectionPropertiesDelete = ({ body }) =>
  ajax({
    method: "DELETE",
    url: EXSECTION_ATTRIBUTE_URL,
    body,
    headers: {
      "Content-Type": "application/json"
    }
  });

//onExsectionSectionDetailPost
export const onExsectionSectionDetailPost = ({ uid, body }) =>
  ajax({
    method: "POST",
    url: `${EXSECTION_SECTION_URL}${uid}/`,
    body,
    headers: {
      "Content-Type": "application/json"
    }
  });

//OnExsectionSubSectionDetailDelete

export const OnExsectionSubSectionDetailDelete = ({ uid }) =>
  ajax({
    method: "DELETE",
    url: `${EXSECTION_SECTION_URL}${uid}/`,
    headers: {
      "Content-Type": "application/json"
    }
  });
