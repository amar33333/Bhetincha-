import { Observable } from "rxjs/Observable";
import { toast } from "react-toastify";

import {
  FETCH_ECOMMERCE_CATEGORIES_FULFILLED,
  FETCH_ECOMMERCE_CATEGORIES_PENDING,
  FETCH_ECOMMERCE_CATEGORIES_REJECTED,
  FETCH_ECOMMERCE_CATEGORY_CONFIG_FULFILLED,
  FETCH_ECOMMERCE_CATEGORY_CONFIG_PENDING,
  FETCH_ECOMMERCE_CATEGORY_CONFIG_REJECTED,
  FETCH_ECOMMERCE_PRODUCTS_FULFILLED,
  FETCH_ECOMMERCE_PRODUCTS_PENDING,
  FETCH_ECOMMERCE_PRODUCTS_REJECTED
} from "./types";

import {
  onEcommerceCategoriesGet,
  onEcommerceCategoryConfigGet,
  onEcommerceProductsGet
} from "../../../../Admin/config/adminServerCall";

const epics = [];

// categories
export const onCategoriesList = () => ({
  type: FETCH_ECOMMERCE_CATEGORIES_PENDING
});

epics.push((action$, { getState }) =>
  action$.ofType(FETCH_ECOMMERCE_CATEGORIES_PENDING).mergeMap(action => {
    return onEcommerceCategoriesGet()
      .concatMap(({ response }) => {
        return [
          {
            type: FETCH_ECOMMERCE_CATEGORIES_FULFILLED,
            payload: response
          },
          {
            type: FETCH_ECOMMERCE_CATEGORY_CONFIG_PENDING,
            payload: response.uid
          },
          {
            type: FETCH_ECOMMERCE_PRODUCTS_PENDING,
            payload: {
              body: {
                categoryId: response.uid
              }
            }
          }
        ];
      })
      .catch(ajaxError => {
        toast.error("Error Fetching Categories");
        return Observable.of({ type: FETCH_ECOMMERCE_CATEGORIES_REJECTED });
      });
  })
);

export const onCategoryConfigList = payload => ({
  type: FETCH_ECOMMERCE_CATEGORY_CONFIG_PENDING,
  payload
});

epics.push((action$, { getState }) =>
  action$.ofType(FETCH_ECOMMERCE_CATEGORY_CONFIG_PENDING).mergeMap(action => {
    return onEcommerceCategoryConfigGet({ categoryId: action.payload })
      .map(({ response }) => {
        return {
          type: FETCH_ECOMMERCE_CATEGORY_CONFIG_FULFILLED,
          payload: response
        };
      })
      .catch(ajaxError => {
        toast.error("Error Loading Configuration");
        return Observable.of({
          type: FETCH_ECOMMERCE_CATEGORY_CONFIG_REJECTED
        });
      });
  })
);

export const onEcommerceProductsList = payload => ({
  type: FETCH_ECOMMERCE_PRODUCTS_PENDING,
  payload
});

epics.push((action$, { getState }) =>
  action$.ofType(FETCH_ECOMMERCE_PRODUCTS_PENDING).switchMap(action => {
    const {
      filterProducts: { frm, size, query, filters, sortby, desc }
    } = getState().EcommerceContainer;

    let body = { ...action.payload.body };

    body.frm = frm;
    body.size = size;
    if (query) {
      body.query = query;
    }
    if (filters && filters.length) {
      body.filters = filters;
    }
    if (sortby) {
      body.sortby = sortby;
      body.desc = desc;
    }

    return onEcommerceProductsGet({ body })
      .map(({ response }) => {
        return {
          type: FETCH_ECOMMERCE_PRODUCTS_FULFILLED,
          payload: response
        };
      })
      .catch(ajaxError => {
        toast.error("Error Loading Products");
        return Observable.of({
          type: FETCH_ECOMMERCE_PRODUCTS_REJECTED
        });
      });
  })
);

export default epics;
