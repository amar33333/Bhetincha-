const HOST = "https://bhetincha.app";
const MONGO_PORT = "8025";
// const MONGO_PORT = "8000";
const ELASTIC_PORT = "9200";
export const MAIN_URL = `${HOST}:${MONGO_PORT}`;
export const ELASTIC_URL = `${HOST}:${MONGO_PORT}`;

const MAPS_API_KEY = "AIzaSyDuyvcH5Rr55zHXmJFjuQ30jd_edLi1HbQ";
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
const CHECK_REGISTRATION = "business/checkurl/";
const SOCIAL = "/api/accounts/social";

const O_TOKEN = "o/token/";
export const CLIENT_ID = "z5LMYuXtl4eFF7iyMIKA0LzZSu4awMBGg8hUsXH4";
export const CLIENT_SECRET =
  "RHIlaZJMAFOeFFCnSTT7v5oLNJxH04dti5VUEe5i7CUAbnJk3EAWILaIE7kjYWnx18DoONY5xq3J1fKNx0zBKjWxVDzgQYcuxAO8U6eiHmOJ35Z21tadgW1oIUAtE8Jj";

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
// export const REGISTER_URL = `${MAIN_URL}/${API}/${ACCOUNTS}/${USER}`;

export const O_TOKEN_URL = `${MAIN_URL}/${O_TOKEN}`;
