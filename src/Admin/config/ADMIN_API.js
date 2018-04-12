import { MAIN_URL } from "../../Common/utils/API";

const SECTION_LIST = "category/getsectionlist/";

const INDUSTRY = "category/industry/";
const CATEGORY = "category/category/";
const SUB_CATEGORY = "category/subcategory/";
const API = "api";
const ACCOUNTS = "accounts";
const EXTRA_SECTION_GET = "category/getsectionlist/";

export const SECTION_LIST_URL = `${MAIN_URL}/${SECTION_LIST}`;
export const INDUSTRY_URL = `${MAIN_URL}/${INDUSTRY}`;
export const CATEGORY_URL = `${MAIN_URL}/${CATEGORY}`;
export const EXTRA_SECTION_GET_URL = `${MAIN_URL}/${EXTRA_SECTION_GET}`;
export const SUB_CATEGORY_URL = `${MAIN_URL}/${SUB_CATEGORY}`;
export const SEARCH_URL = "http://159.65.150.212:9200/category-index/_search/";
