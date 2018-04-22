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
export const CLIENT_ID = "yMa3A0afyWb3y3wAjszbLj4vd32ZNrDMGk3bjQKo";
export const CLIENT_SECRET =
  "pP8obLTgrx0daKYSUFr1o7XwPilalHPYOVnbZumTkv2agQJTMsZLwzB3pz57RvUtIcrcPNKG05bTZdeKgsi0JbfGPBNOMfC3O2y44QCvXqG5CnrS85EU1kcDzF8VsbGP";

export const GET_USER_INFO_URL = `${MAIN_URL}/${GET_USER_INFO}`;
export const BUSINESS_INFO_URL = `${MAIN_URL}/${BUSINESS_INFO}`;
export const BUSINESS_LIST_URL = `${MAIN_URL}/${BUSINESS_LIST}`;
export const REGISTER_URL = `${MAIN_URL}/${BUSINESS_INFO}`;
// export const REGISTER_URL = `${MAIN_URL}/${API}/${ACCOUNTS}/${USER}`;

export const O_TOKEN_URL = `${MAIN_URL}/${O_TOKEN}`;
