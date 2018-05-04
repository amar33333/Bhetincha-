const HOST = "http://159.65.150.212";
const MONGO_PORT = "8025";
const ELASTIC_PORT = "9200";
export const MAIN_URL = `${HOST}:${MONGO_PORT}`;
export const ELASTIC_URL = `${HOST}:${MONGO_PORT}`;

const MAPS_API_KEY = "AIzaSyDuyvcH5Rr55zHXmJFjuQ30jd_edLi1HbQ";
export const GOOGLE_MAPS_URL = `https://maps.googleapis.com/maps/api/js?key=${MAPS_API_KEY}`;

const GET_USER_INFO = "api/accounts/getuserinfo/";

const BUSINESS_INFO = "business/business/";
const BUSINESS_LIST = "business/business/";
const API = "api";
const ACCOUNTS = "accounts";
const USER = "user/";

const O_TOKEN = "o/token/";
export const CLIENT_ID = "K1F1m2XfcVmC42Zja4oBRVOMWhGb6LoQu1bFOmNZ";
export const CLIENT_SECRET =
  "TzNiRMbsLBkb2g3S90s4whAGRuJysu1g5eZuCtLNvda5b54Tu1pYp0FjyrYlnAD9GwmWS3rQvbYL4nnLjYSqVoxzA46pbXlpyzJSpQYZ1B2acQOYwksjBfMXXubRFsis";
export const GET_USER_INFO_URL = `${MAIN_URL}/${GET_USER_INFO}`;
export const BUSINESS_INFO_URL = `${MAIN_URL}/${BUSINESS_INFO}`;
export const BUSINESS_LIST_URL = `${MAIN_URL}/${BUSINESS_LIST}`;
export const REGISTER_URL = `${MAIN_URL}/${BUSINESS_INFO}`;
// export const REGISTER_URL = `${MAIN_URL}/${API}/${ACCOUNTS}/${USER}`;

export const O_TOKEN_URL = `${MAIN_URL}/${O_TOKEN}`;
