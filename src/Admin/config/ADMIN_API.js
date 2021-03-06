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
const CATEGORY_SECTION = "interface/mongo-section/";
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
const TELE_USER_CREATE = "business/teleusercreate/";
const TELE_USER_SEARCH_MOBILE = "business/searchperson/";
const TELE_USER_EDIT = "business/editperson/";
const TELE_USER_SEND_SMS = "business/createlog/";
const TELE_USER_SEARCH_NAME = "business/searchpersonbyname/";
const ASSIGNED_LIST = "business/assign-list/";
const VERIFY_BUSINESS = "business/business/";
const BUSINESS_TELE_CALLING = "search/business-tc/";
const LOCATION = "address/list-places/";
const SOCIAL_LINK = "business/social-link/";
const IMPROVE_LISTING = "business/improve-listing/";
const SEARCH_PLACEHOLDER = "business/placeholder/";
const SUBSCRIPTION_PACKAGE_PERMISSIONS = "business/package-permission/";
const SUBSCRIPTION_PACKAGE = "business/subscription-package/";
const SUBSCRIPTION_PACKAGE_ASSIGN = "business/business-subscription-package/";

const ECOMMERCE = "ecommerce";

const EXSECTION = "sections";

export { MAIN_URL };

export const THEME_URL = `${MAIN_URL}/business/theme/`;

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

// tele calling
export const BUSINESS_TELE_CALLING_URL = `${MAIN_URL}/${BUSINESS_TELE_CALLING}`;
export const CREATE_TELE_USER_URL = `${MAIN_URL}/${TELE_USER_CREATE}`;
export const TELE_USER_SEARCH_MOBILE_URL = `${MAIN_URL}/${TELE_USER_SEARCH_MOBILE}`;
export const TELE_USER_SEARCH_NAME_URL = `${MAIN_URL}/${TELE_USER_SEARCH_NAME}`;
export const TELE_USER_EDIT_URL = `${MAIN_URL}/${TELE_USER_EDIT}`;
export const TELE_USER_SEND_SMS_URL = `${MAIN_URL}/${TELE_USER_SEND_SMS}`;

export const LOCATION_URL = `${MAIN_URL}/${LOCATION}`;
export const SOCIAL_LINK_URL = `${MAIN_URL}/${SOCIAL_LINK}`;
export const IMPROVE_LISTING_URL = `${MAIN_URL}/${IMPROVE_LISTING}`;
export const SEARCH_PLACEHOLDER_URL = `${MAIN_URL}/${SEARCH_PLACEHOLDER}`;

// ecommerce
export const ECOMMERCE_CATEGORY_URL = `${MAIN_URL}/${ECOMMERCE}/category/`;
export const ECOMMERCE_ROOT_CATEGORY_URL = `${MAIN_URL}/${ECOMMERCE}/category-root/`;
export const ECOMMERCE_ATTRIBUTE_URL = `${MAIN_URL}/${ECOMMERCE}/attribute/`;
export const ECOMMERCE_PRODUCT_URL = `${MAIN_URL}/${ECOMMERCE}/product/`;
export const ECOMMERCE_PRODUCT_ATTRIBUTE_URL = `${ECOMMERCE_PRODUCT_URL}attributes/`;
export const ECOMMERCE_CATEGORY_CONFIG_URL = `${MAIN_URL}/${ECOMMERCE}/user/category/`;
export const ECOMMERCE_PRODUCT_SEARCH_URL = `${MAIN_URL}/search/product/`;

// Subscription Permissions
export const SUBSCRIPTION_PACKAGE_PERMISSIONS_URL = `${MAIN_URL}/${SUBSCRIPTION_PACKAGE_PERMISSIONS}`;
export const SUBSCRIPTION_PACKAGE_URL = `${MAIN_URL}/${SUBSCRIPTION_PACKAGE}`;
export const SUBSCRIPTION_PACKAGE_ASSIGN_URL = `${MAIN_URL}/${SUBSCRIPTION_PACKAGE_ASSIGN}`;

// section
export const EXSECTION_PROPERTY_URL = `${MAIN_URL}/${EXSECTION}/prop/`;
export const EXSECTION_SECTION_URL = `${MAIN_URL}/${EXSECTION}/sections/`;
export const EXSECTION_ATTRIBUTE_URL = `${MAIN_URL}/${EXSECTION}/attribute/`;

export const EXSECTION_SUBSECTION_ATTRIBUTE_URL = `${MAIN_URL}/${EXSECTION}/prop/attrone/`;

export const CATEGORY_SECTION_URL = `${MAIN_URL}/${CATEGORY_SECTION}`;
