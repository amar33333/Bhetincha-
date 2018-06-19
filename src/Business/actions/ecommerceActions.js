import { Observable } from "rxjs/Observable";
import { toast } from "react-toastify";

import {
  FETCH_ECOMMERCE_CATEGORIES_FULFILLED,
  FETCH_ECOMMERCE_CATEGORIES_PENDING,
  FETCH_ECOMMERCE_CATEGORIES_REJECTED,
  CHANGE_ACTIVE_ECOMMERCE_CATEGORY,
  OPEN_ALL_ON_SEARCH,
  FETCH_ECOMMERCE_CATEGORY_ATTRIBUTES_FULFILLED,
  FETCH_ECOMMERCE_CATEGORY_ATTRIBUTES_PENDING,
  FETCH_ECOMMERCE_CATEGORY_ATTRIBUTES_REJECTED,
  FETCH_ECOMMERCE_CATEGORY_PRODUCTS_FULFILLED,
  FETCH_ECOMMERCE_CATEGORY_PRODUCTS_PENDING,
  FETCH_ECOMMERCE_CATEGORY_PRODUCTS_REJECTED
} from "./types";
import {
  onEcommerceCategoriesGet,
  onEcommerceCategoryAttributesGet,
  onEcommerceCategoryProductsGet
} from "../../Admin/config/adminServerCall";

const epics = [];

// categories
export const onCategoriesListEcommerce = () => ({
  type: FETCH_ECOMMERCE_CATEGORIES_PENDING,
  first: true
});

epics.push((action$, { getState }) =>
  action$.ofType(FETCH_ECOMMERCE_CATEGORIES_PENDING).mergeMap(action => {
    const { first } = action;
    return onEcommerceCategoriesGet()
      .concatMap(({ response }) => {
        const extra = [];
        if (first) {
          extra.push({
            type: CHANGE_ACTIVE_ECOMMERCE_CATEGORY,
            payload: response.uid
          });
        }
        return [
          {
            type: FETCH_ECOMMERCE_CATEGORIES_FULFILLED,
            payload: response
          },
          ...extra
        ];
      })
      .catch(ajaxError => {
        toast.error("Error Fetching Categories");
        return Observable.of({ type: FETCH_ECOMMERCE_CATEGORIES_REJECTED });
      });
  })
);

export const onChangeActiveCategoryEcommerce = (
  newCategory,
  oldCategory,
  leafDetected = false
) => ({
  type: CHANGE_ACTIVE_ECOMMERCE_CATEGORY,
  payload: newCategory,
  oldCategory,
  leafDetected
});

epics.push((action$, { getState }) =>
  action$.ofType(CHANGE_ACTIVE_ECOMMERCE_CATEGORY).concatMap(action => {
    const { payload: newCategory, oldCategory, leafDetected } = action;
    const businessId = getState().auth.cookies.user_data.mongo_id;
    const stuffs = [];
    if (leafDetected && (!oldCategory || newCategory !== oldCategory)) {
      stuffs.push({
        type: FETCH_ECOMMERCE_CATEGORY_ATTRIBUTES_PENDING,
        payload: {
          body: { categoryId: newCategory }
        }
      });
    }
    if (!oldCategory || newCategory !== oldCategory) {
      stuffs.push({
        type: FETCH_ECOMMERCE_CATEGORY_PRODUCTS_PENDING,
        payload: {
          params: { categoryId: newCategory, businessId }
        }
      });
    }
    return stuffs;
  })
);

epics.push(action$ =>
  action$
    .ofType(FETCH_ECOMMERCE_CATEGORY_ATTRIBUTES_PENDING)
    .mergeMap(({ payload: { body } }) => {
      return onEcommerceCategoryAttributesGet({ body })
        .map(({ response }) => {
          return {
            type: FETCH_ECOMMERCE_CATEGORY_ATTRIBUTES_FULFILLED,
            payload: response
          };
        })
        .catch(ajaxError => {
          toast.error("Error Fetching Attributes for category");
          return Observable.of({
            type: FETCH_ECOMMERCE_CATEGORY_ATTRIBUTES_REJECTED
          });
        });
    })
);

epics.push(action$ =>
  action$
    .ofType(FETCH_ECOMMERCE_CATEGORY_PRODUCTS_PENDING)
    .mergeMap(({ payload: { params } }) => {
      return onEcommerceCategoryProductsGet({ params })
        .map(({ response }) => {
          return {
            type: FETCH_ECOMMERCE_CATEGORY_PRODUCTS_FULFILLED,
            payload: response
          };
        })
        .catch(ajaxError => {
          toast.error("Error Fetching Products for category");
          return Observable.of({
            type: FETCH_ECOMMERCE_CATEGORY_PRODUCTS_REJECTED
          });
        });
    })
);

export const openAllOnSearchEcommerce = payload => ({
  type: OPEN_ALL_ON_SEARCH,
  payload
});

export default epics;
