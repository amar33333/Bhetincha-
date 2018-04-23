import { MAIN_URL } from "../../Common/utils/API";

const SECTION_LIST = "category/getsectionlist/";

const INDUSTRY = "category/industry/";

const ADDRESS = "address";
const COUNTRY = "country/";
const STATE = "state/";
const DISTRICT = "district/";
const CITY = "city/";
const AREA = "area/";

const CATEGORY = "category/category/";
const SUB_CATEGORY = "category/subcategory/";
const API = "api";
const ACCOUNTS = "accounts";
const USER = "user/";
const PERMISSION = "permission";
const GROUP = "group/";
const EXTRA_SECTION_GET = "category/getsectionlist/";

export const COUNTRY_URL = `${MAIN_URL}/${ADDRESS}/${COUNTRY}`;
export const DISTRICT_URL = `${MAIN_URL}/${ADDRESS}/${DISTRICT}`;
export const STATE_URL = `${MAIN_URL}/${ADDRESS}/${STATE}`;
export const CITY_URL = `${MAIN_URL}/${ADDRESS}/${CITY}`;
export const AREA_URL = `${MAIN_URL}/${ADDRESS}/${AREA}`;

export const SECTION_LIST_URL = `${MAIN_URL}/${SECTION_LIST}`;
export const INDUSTRY_URL = `${MAIN_URL}/${INDUSTRY}`;
export const CATEGORY_URL = `${MAIN_URL}/${CATEGORY}`;
export const EXTRA_SECTION_GET_URL = `${MAIN_URL}/${EXTRA_SECTION_GET}`;
export const SUB_CATEGORY_URL = `${MAIN_URL}/${SUB_CATEGORY}`;

export const USERS_URL = `${MAIN_URL}/${API}/${ACCOUNTS}/${USER}`;
export const USER_GROUPS_URL = `${MAIN_URL}/${PERMISSION}/${GROUP}`;
