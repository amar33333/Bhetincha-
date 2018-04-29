import {
  SAVE_BUSINESS_LIST_PARAMS,
  BUSINESS_FILTER_ON_CHANGE,
  CLEAR_BUSINESS_FILTER
} from "./types";

export const handleOnBusinessFilterChange = payload => ({
  type: BUSINESS_FILTER_ON_CHANGE,
  payload
});

export const saveParamsOnUnmount = payload => ({
  type: SAVE_BUSINESS_LIST_PARAMS,
  payload
});

export const clearFilter = () => ({ type: CLEAR_BUSINESS_FILTER });
