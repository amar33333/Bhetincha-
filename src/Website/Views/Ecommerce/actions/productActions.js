import { Observable } from "rxjs/Observable";
import { toast } from "react-toastify";

import {
  FETCH_ECOMMERCE_PRODUCT_FULFILLED,
  FETCH_ECOMMERCE_PRODUCT_PENDING,
  FETCH_ECOMMERCE_PRODUCT_REJECTED,
  ROUTE_BACK_TO_ECOMMERCE_HOME
} from "./types";

import { onEcommerceProductEachGet } from "../../../../Admin/config/adminServerCall";

const epics = [];

export const onEcommerceProductEachList = payload => ({
  type: FETCH_ECOMMERCE_PRODUCT_PENDING,
  payload
});

epics.push((action$, { getState }) =>
  action$.ofType(FETCH_ECOMMERCE_PRODUCT_PENDING).mergeMap(action => {
    const { uid, history } = action.payload;

    return onEcommerceProductEachGet({ uid })
      .map(({ response }) => {
        if (response.msg && response.msg === "error") {
          return { type: ROUTE_BACK_TO_ECOMMERCE_HOME, history };
        } else {
          return { type: FETCH_ECOMMERCE_PRODUCT_FULFILLED, payload: response };
        }
      })
      .catch(ajaxError => {
        toast.error(ajaxError.toString());
        return Observable.of({ type: FETCH_ECOMMERCE_PRODUCT_REJECTED });
      });
  })
);

export default epics;
