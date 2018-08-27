//const HOST = "https://bhetincha.app";
const HOST = "http://52.78.51.237:8025";
//const MONGO_PORT = "8025";

// export const CLIENT_ID = "e6dysH1DbOAvh4BHfHIen647yB5Z0XRbYYoCMYfR";

export const CLIENT_ID = "abcd";
//export const CLIENT_SECRET =
// "RHIlaZJMAFOeFFCnSTT7v5oLNJxH04dti5VUEe5i7CUAbnJk3EAWILaIE7kjYWnx18DoONY5xq3J1fKNx0zBKjWxVDzgQYcuxAO8U6eiHmOJ35Z21tadgW1oIUAtE8Jj";
export const CLIENT_SECRET = "abcd";

// export const MAIN_URL = `${HOST}:${MONGO_PORT}`;
// export const ELASTIC_URL = `${HOST}:${MONGO_PORT}`;

export const MAIN_URL = `${HOST}`;

export const ELASTIC_URL = `${HOST}`;
// const MAPS_API_KEY = "AIzaSyC5jpMbvHuSQVcVdUN_hYD-XWRxJT6az_g";
// const MAPS_API_KEY = "AIzaSyDhwdTQSE86U4GFQDhZZZvtgxKxtj78TOI";
const MAPS_API_KEY = "AIzaSyCrFkQNEVe8APwyvTLa-0bSMvr3B-mzBFg";
export const GOOGLE_MAPS_URL = `https://maps.googleapis.com/maps/api/js?key=${MAPS_API_KEY}`;

const GET_USER_INFO = "api/accounts/getuserinfo/";

const BUSINESS_INFO = "business/business/";
const INDIVIDUAL_REGISTER = "individual/register/";
const BUSINESS_LIST = "business/business/";
const API = "api";
const ACCOUNTS = "accounts";
const USER = "user/";
const PHONE_VERIFICATION_REQUEST = "business/claim/";
const PHONE_VERIFICATION_TOKEN_SEND = "business/claim-at-register/";
const USER_REGISTER = "business/user-at-register/";
const RESEND_TOKEN = "business/resend-code/";
const INDIVIDUAL_RESEND_TOKEN = "individual/resend-code/";
const CHECK_REGISTRATION = "business/checkurl/";
const SOCIAL = "api/accounts/social";
const INDIVIDUAL_TOKEN_VERIFY = "individual/token-verify/";
const INDIVIDUAL_LOGIN_CHECK = "individual/login/";
const FORGOT_PASSWORD = "api/accounts/send-reset-token/";
const FORGOT_PASSWORD_TOKEN = "api/accounts/change-password/";

const O_TOKEN = "o/token/";

export const GET_USER_INFO_URL = `${MAIN_URL}/${GET_USER_INFO}`;
export const BUSINESS_INFO_URL = `${MAIN_URL}/${BUSINESS_INFO}`;
export const BUSINESS_LIST_URL = `${MAIN_URL}/${BUSINESS_LIST}`;
export const BUSINESS_REGISTER_URL = `${MAIN_URL}/${BUSINESS_INFO}`;
export const INDIVIDUAL_REGISTER_URL = `${MAIN_URL}/${INDIVIDUAL_REGISTER}`;
export const PHONE_VERIFICATION_REQUEST_URL = `${MAIN_URL}/${PHONE_VERIFICATION_REQUEST}`;
export const PHONE_VERIFICATION_TOKEN_SEND_URL = `${MAIN_URL}/${PHONE_VERIFICATION_TOKEN_SEND}`;
export const USER_REGISTER_URL = `${MAIN_URL}/${USER_REGISTER}`;
export const RESEND_TOKEN_URL = `${MAIN_URL}/${RESEND_TOKEN}`;
export const CHECK_REGISTRATION_URL = `${MAIN_URL}/${CHECK_REGISTRATION}`;
export const FACEBOOK_LOGIN_URL = `${MAIN_URL}/${SOCIAL}/facebook/`;
export const GOOGLE_LOGIN_URL = `${MAIN_URL}/${SOCIAL}/google/`;
export const INDIVIDUAL_TOKEN_VERIFY_URL = `${MAIN_URL}/${INDIVIDUAL_TOKEN_VERIFY}`;
export const INDIVIDUAL_RESEND_TOKEN_URL = `${MAIN_URL}/${INDIVIDUAL_RESEND_TOKEN}`;
export const INDIVIDUAL_LOGIN_CHECK_URL = `${MAIN_URL}/${INDIVIDUAL_LOGIN_CHECK}`;
export const FORGOT_PASSWORD_URL = `${MAIN_URL}/${FORGOT_PASSWORD}`;
export const FORGOT_PASSWORD_TOKEN_URL = `${MAIN_URL}/${FORGOT_PASSWORD_TOKEN}`;
// export const REGISTER_URL = `${MAIN_URL}/${API}/${ACCOUNTS}/${USER}`;
export const SINGLE_PLACEHOLDER_URL = `${MAIN_URL}/business/random-placeholder/`;

export const O_TOKEN_URL = `${MAIN_URL}/${O_TOKEN}`;
