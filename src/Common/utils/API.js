const HOST = "http://202.51.75.111";
const MONGO_PORT = "8025";
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
const PHONE_VERIFICATION_TOKEN_SEND = "business/verify/";

const O_TOKEN = "o/token/";
export const CLIENT_ID = "XCk93ofBdiAXePna8YC0Rso7VrUWOBhrDKmfmEDR";
export const CLIENT_SECRET =
  "7XzvzqxLBgIypsJymI9EcSYMYM0jXgbRXUUt3ibi8I9uT0Gh2s7JqKTz6k0mVdNLmWe8NLO2TnJtQLQR2xIteZKlkAUDvmDtBqnnIrd5WRXFCe7eObtyQRxK2GhIGGVh";
export const GET_USER_INFO_URL = `${MAIN_URL}/${GET_USER_INFO}`;
export const BUSINESS_INFO_URL = `${MAIN_URL}/${BUSINESS_INFO}`;
export const BUSINESS_LIST_URL = `${MAIN_URL}/${BUSINESS_LIST}`;
export const BUSINESS_REGISTER_URL = `${MAIN_URL}/${BUSINESS_INFO}`;
export const INDIVIDUAL_REGISTER_URL = `${MAIN_URL}/${INDIVIDUAL_REGISTER}`;
export const PHONE_VERIFICATION_REQUEST_URL = `${MAIN_URL}/${PHONE_VERIFICATION_REQUEST}`;
export const PHONE_VERIFICATION_TOKEN_SNED = `${MAIN_URL}/${PHONE_VERIFICATION_TOKEN_SEND}`;
// export const REGISTER_URL = `${MAIN_URL}/${API}/${ACCOUNTS}/${USER}`;

export const O_TOKEN_URL = `${MAIN_URL}/${O_TOKEN}`;
