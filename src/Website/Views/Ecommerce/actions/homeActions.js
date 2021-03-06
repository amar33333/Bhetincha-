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
  FETCH_ECOMMERCE_PRODUCTS_REJECTED,
  CHANGE_ACTIVE_ECOMMERCE_CATEGORY,
  ROUTE_BACK_TO_ECOMMERCE_HOME,
  FILTER_PARAMETERS_CHANGE_BUSINESS_SLUG_PRODUCTS_LIST
} from "./types";

import {
  onEcommerceCategoriesGet,
  onEcommerceCategoryConfigGet,
  onEcommerceProductsGet
} from "../../../../Admin/config/adminServerCall";

const epics = [];

// categories
export const onCategoriesList = payload => ({
  type: FETCH_ECOMMERCE_CATEGORIES_PENDING,
  payload
});

epics.push((action$, { getState }) =>
  action$.ofType(FETCH_ECOMMERCE_CATEGORIES_PENDING).mergeMap(action => {
    return onEcommerceCategoriesGet()
      .concatMap(({ response }) => {
        const extras = [];

        if (action.payload.changeActive) {
          extras.push({
            type: FETCH_ECOMMERCE_CATEGORY_CONFIG_PENDING,
            payload: response.uid,
            history: action.payload.history,
            businessSlug: action.payload.businessSlug
          });
        }

        return [
          {
            type: FETCH_ECOMMERCE_CATEGORIES_FULFILLED,
            payload: response,
            changeActive: action.payload.changeActive
          },
          ...extras
        ];
      })
      .catch(ajaxError => {
        toast.error("Error Fetching Categories");
        return Observable.of({ type: FETCH_ECOMMERCE_CATEGORIES_REJECTED });
      });
  })
);

export const onActiveCategoryChange = payload => ({
  type: CHANGE_ACTIVE_ECOMMERCE_CATEGORY,
  payload
});

epics.push(action$ =>
  action$.ofType(CHANGE_ACTIVE_ECOMMERCE_CATEGORY).map(action => ({
    type: FETCH_ECOMMERCE_CATEGORY_CONFIG_PENDING,
    payload: action.payload.categoryId,
    history: action.payload.history,
    businessSlug: action.payload.businessSlug
  }))
);

// export const onCategoryConfigList = payload => ({
//   type: FETCH_ECOMMERCE_CATEGORY_CONFIG_PENDING,
//   payload
// });

epics.push((action$, { getState }) =>
  action$.ofType(FETCH_ECOMMERCE_CATEGORY_CONFIG_PENDING).mergeMap(action => {
    return onEcommerceCategoryConfigGet({ categoryId: action.payload })
      .concatMap(({ response }) => {
        if (response.msg === "UNSUCCESFUL") {
          return [
            {
              type: ROUTE_BACK_TO_ECOMMERCE_HOME,
              history: action.history
            }
          ];
        } else {
          return [
            {
              type: FETCH_ECOMMERCE_CATEGORY_CONFIG_FULFILLED,
              payload: response
            },
            {
              type: FETCH_ECOMMERCE_PRODUCTS_PENDING,
              payload: {
                body: {
                  categoryId: action.payload,
                  businessSlug: action.businessSlug
                }
              }
            }
          ];
        }
      })
      .catch(ajaxError => {
        toast.error("Error Loading Configuration");
        return Observable.of({
          type: FETCH_ECOMMERCE_CATEGORY_CONFIG_REJECTED
        });
      });
  })
);

epics.push(action$ =>
  action$
    .ofType(ROUTE_BACK_TO_ECOMMERCE_HOME)
    .do(({ history }) => history.push("/ecommerce"))
    .ignoreElements()
);

export const onEcommerceProductsList = payload => ({
  type: FETCH_ECOMMERCE_PRODUCTS_PENDING,
  payload
});

epics.push((action$, { getState }) =>
  action$.ofType(FETCH_ECOMMERCE_PRODUCTS_PENDING).switchMap(action => {
    const {
      home: { activeCategory },
      filterProducts: { frm, size, query, filters, sortby, desc, businessSlug }
    } = getState().EcommerceContainer;

    let body = {};
    const extras = [];
    // action.payload && action.payload.body ? { ...action.payload.body } : {};
    if (
      action.payload &&
      action.payload.body &&
      action.payload.body.categoryId
    ) {
      body.categoryId = action.payload.body.categoryId;
    } else {
      body.categoryId = activeCategory;
    }

    if (
      action.payload &&
      action.payload.body &&
      action.payload.body.businessSlug
    ) {
      body.businessSlug = action.payload.body.businessSlug;
      extras.push({
        type: FILTER_PARAMETERS_CHANGE_BUSINESS_SLUG_PRODUCTS_LIST,
        payload: action.payload.body.businessSlug
      });
    }

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
    if (businessSlug) {
      body.businessSlug = businessSlug;
    }

    return onEcommerceProductsGet({ body })
      .concatMap(({ response }) => {
        return [
          {
            type: FETCH_ECOMMERCE_PRODUCTS_FULFILLED,
            payload: response
          },
          ...extras
        ];
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
