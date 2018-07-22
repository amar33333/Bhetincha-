import { Observable } from "rxjs/Observable";
import { toast } from "react-toastify";

import {
  FILTER_PARAMETERS_CHANGE_PRODUCTS_LIST,
  FETCH_ECOMMERCE_PRODUCTS_PENDING
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

export default epics;
