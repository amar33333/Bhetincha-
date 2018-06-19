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
  FETCH_ECOMMERCE_CATEGORY_ATTRIBUTES_REJECTED
} from "./types";
import {
  onEcommerceCategoriesGet,
  onEcommerceCategoryAttributesGet
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
  leafDetected
) => ({
  type: CHANGE_ACTIVE_ECOMMERCE_CATEGORY,
  payload: newCategory,
  oldCategory,
  leafDetected
});

epics.push(
  (action$, { getState }) =>
    action$.ofType(CHANGE_ACTIVE_ECOMMERCE_CATEGORY).mergeMap(action => {
      const { payload: newCategory, oldCategory, leafDetected } = action;
      if (leafDetected && (!oldCategory || newCategory !== oldCategory)) {
        return onEcommerceCategoryAttributesGet({
          body: { categoryId: newCategory }
        })
          .map(({ response }) => {
            return {
              type: FETCH_ECOMMERCE_CATEGORY_ATTRIBUTES_FULFILLED,
              payload: response
            };
          })
          .catch(ajaxError => {
            toast.error("Error Fetching Attirbutes for category");
            return Observable.of({
              type: FETCH_ECOMMERCE_CATEGORY_ATTRIBUTES_REJECTED
            });
          })
          .startWith({ type: FETCH_ECOMMERCE_CATEGORY_ATTRIBUTES_PENDING });
      } else {
        return Observable.empty();
      }
    })
  // .startWith({ type: FETCH_ECOMMERCE_CATEGORY_PENDING })
);

export const openAllOnSearchEcommerce = payload => ({
  type: OPEN_ALL_ON_SEARCH,
  payload
});

export default epics;
