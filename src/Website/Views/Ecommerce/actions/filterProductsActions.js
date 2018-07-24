import {
  FILTER_PARAMETERS_CHANGE_PRODUCTS_LIST,
  FETCH_ECOMMERCE_PRODUCTS_PENDING,
  CLEAR_FILTER_PARAMETERS_PRODUCTS_LIST
} from "./types";

const epics = [];

export const onFilterParametersChangeProductsList = payload => ({
  type: FILTER_PARAMETERS_CHANGE_PRODUCTS_LIST,
  payload
});

epics.push(action$ =>
  action$
    .ofType(FILTER_PARAMETERS_CHANGE_PRODUCTS_LIST)
    .mapTo({ type: FETCH_ECOMMERCE_PRODUCTS_PENDING })
);

export const onFilterParametersClearProductsList = () => ({
  type: CLEAR_FILTER_PARAMETERS_PRODUCTS_LIST
});

export default epics;
