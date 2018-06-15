import { MAIN_URL } from "../../Common/utils/API";
import { onAppBusinessPost } from "../../Business/config/businessServerCall";

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
const PERMISSIONS_ALL_LIST = "listpermissions";
const GROUP = "group/";
const EXTRA_SECTION_GET = "category/getsectionlist/";
const EDIT_PERMISSION = "editpermission";
const ASSIGNED_PATH = "businessCollection/sales-table/";
const ASSIGNED_PATH_POST = "businessCollection/path-create/";
const ASSIGNED_LIST = "business/assign-list/";
const VERIFY_BUSINESS = "business/business/";

export { MAIN_URL };

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
export const PERMISSIONS_ALL_LIST_URL = `${MAIN_URL}/${PERMISSION}/${PERMISSIONS_ALL_LIST}/`;
export const TOGGLE_PERMISSION_URL = `${MAIN_URL}/${PERMISSION}/${EDIT_PERMISSION}/`;

export const ASSIGNED_LIST_URL = `${MAIN_URL}/${ASSIGNED_LIST}`;
export const ASSIGNED_PATH_URL = `${MAIN_URL}/${ASSIGNED_PATH}`;
export const ASSIGNED_PATH_POST_URL = `${MAIN_URL}/${ASSIGNED_PATH_POST}`;
export const VERIFY_BUSINESS_URL = `${MAIN_URL}/${VERIFY_BUSINESS}`;
