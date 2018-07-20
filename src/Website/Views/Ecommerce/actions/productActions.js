import { Observable } from "rxjs/Observable";
import { toast } from "react-toastify";

import {
  FETCH_ECOMMERCE_PRODUCT_FULFILLED,
  FETCH_ECOMMERCE_PRODUCT_PENDING,
  FETCH_ECOMMERCE_PRODUCT_REJECTED,
  ROUTE_BACK_TO_ECOMMERCE_HOME,
  FETCH_ECOMMERCE_CATEGORY_ATTRIBUTES_FULFILLED,
  FETCH_ECOMMERCE_CATEGORY_ATTRIBUTES_PENDING,
  FETCH_ECOMMERCE_CATEGORY_ATTRIBUTES_REJECTED
} from "./types";

import {
  onEcommerceProductEachGet,
  onEcommerceCategoryAttributesGet
} from "../../../../Admin/config/adminServerCall";

const epics = [];

export const onEcommerceProductEachList = payload => ({
  type: FETCH_ECOMMERCE_PRODUCT_PENDING,
  payload
});

epics.push((action$, { getState }) =>
  action$.ofType(FETCH_ECOMMERCE_PRODUCT_PENDING).mergeMap(action => {
    const { uid, history } = action.payload;

    return onEcommerceProductEachGet({ uid })
      .concatMap(({ response }) => {
        if (response.msg && response.msg === "error") {
          return [{ type: ROUTE_BACK_TO_ECOMMERCE_HOME, history }];
        } else {
          return [
            { type: FETCH_ECOMMERCE_PRODUCT_FULFILLED, payload: response },
            {
              type: FETCH_ECOMMERCE_CATEGORY_ATTRIBUTES_PENDING,
              payload: {
                body: {
                  categoryId: response.categoryId
                }
              }
            }
          ];
        }
      })
      .catch(ajaxError => {
        toast.error(ajaxError.toString());
        return Observable.of({ type: FETCH_ECOMMERCE_PRODUCT_REJECTED });
      });
  })
);

epics.push(action$ =>
  action$
    .ofType(FETCH_ECOMMERCE_CATEGORY_ATTRIBUTES_PENDING)
    .mergeMap(({ payload: { body } }) => {
      return onEcommerceCategoryAttributesGet({ body })
        .map(({ response }) => {
          if (response.msg === "success") {
            return {
              type: FETCH_ECOMMERCE_CATEGORY_ATTRIBUTES_FULFILLED,
              payload: response
            };
          } else {
            throw new Error(response.msg);
          }
        })
        .catch(ajaxError => {
          toast.error(ajaxError.toString());
          return Observable.of({
            type: FETCH_ECOMMERCE_CATEGORY_ATTRIBUTES_REJECTED
          });
        });
    })
);

export default epics;
