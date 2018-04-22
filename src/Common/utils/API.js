const HOST = "http://159.65.150.212";
const MONGO_PORT = "8025";
const ELASTIC_PORT = "9200";
export const MAIN_URL = `${HOST}:${MONGO_PORT}`;
export const ELASTIC_URL = `${HOST}:${ELASTIC_PORT}`;

const GET_USER_INFO = "api/accounts/getuserinfo/";

const BUSINESS_INFO = "business/business/";
const BUSINESS_LIST = "business/business/";
const API = "api";
const ACCOUNTS = "accounts";
const USER = "user/";

const O_TOKEN = "o/token/";
export const CLIENT_ID = "RP2p0jcJvSydf2oOOK7Yz6GBo3171boXLkOCfIxg";
export const CLIENT_SECRET =
  "pEQxArvjLN2eBjMhox6j9wVIykJQKWB6v4CS1Nyh8P2t5AFE8fwJ7u43rO0JMTL006TxKetgyKLmb02xyS5iva6xFFAQ3WuwERRkXfXLQ5TqxYogkLpNibiPc7Xd0OND";

export const GET_USER_INFO_URL = `${MAIN_URL}/${GET_USER_INFO}`;
export const BUSINESS_INFO_URL = `${MAIN_URL}/${BUSINESS_INFO}`;
export const BUSINESS_LIST_URL = `${MAIN_URL}/${BUSINESS_LIST}`;
export const REGISTER_URL = `${MAIN_URL}/${BUSINESS_INFO}`;
// export const REGISTER_URL = `${MAIN_URL}/${API}/${ACCOUNTS}/${USER}`;

export const O_TOKEN_URL = `${MAIN_URL}/${O_TOKEN}`;
