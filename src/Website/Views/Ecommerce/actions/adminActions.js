import { Observable } from "rxjs/Observable";
import { toast } from "react-toastify";

import {
  FETCH_ECOMMERCE_CATEGORIES_FULFILLED,
  FETCH_ECOMMERCE_CATEGORIES_PENDING,
  FETCH_ECOMMERCE_CATEGORIES_REJECTED,
  CREATE_ECOMMERCE_CATEGORIES_FULFILLED,
  CREATE_ECOMMERCE_CATEGORIES_PENDING,
  CREATE_ECOMMERCE_CATEGORIES_REJECTED,
  CHANGE_ACTIVE_ECOMMERCE_CATEGORY,
  FETCH_ECOMMERCE_CATEGORY_FULFILLED,
  FETCH_ECOMMERCE_CATEGORY_PENDING,
  FETCH_ECOMMERCE_CATEGORY_REJECTED
} from "./types";

import {
  onCategoriesGet,
  onCategoryPost,
  onCategoryDetailGet
} from "../config/ecommerceServerCall";

const epics = [];

export const onCategoriesList = () => ({
  type: FETCH_ECOMMERCE_CATEGORIES_PENDING,
  first: true
});

epics.push((action$, { getState }) =>
  action$.ofType(FETCH_ECOMMERCE_CATEGORIES_PENDING).mergeMap(action => {
    const { first } = action;
    return onCategoriesGet()
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

export const onCategorySubmit = payload => ({
  type: CREATE_ECOMMERCE_CATEGORIES_PENDING,
  payload
});

epics.push((action$, { getState }) =>
  action$.ofType(CREATE_ECOMMERCE_CATEGORIES_PENDING).mergeMap(action => {
    const parent = getState().EcommerceContainer.admin.activeCategory;
    const { name } = action.payload;

    return onCategoryPost({ name, parent })
      .concatMap(({ response }) => {
        toast.success("Category created successfully");
        return [
          { type: CREATE_ECOMMERCE_CATEGORIES_FULFILLED },
          { type: FETCH_ECOMMERCE_CATEGORIES_PENDING }
        ];
      })
      .catch(ajaxError => {
        toast.error("Error Creating Categories");
        return Observable.of({ type: CREATE_ECOMMERCE_CATEGORIES_REJECTED });
      });
  })
);

export const onChangeActiveCategory = (newCategory, oldCategory) => ({
  type: CHANGE_ACTIVE_ECOMMERCE_CATEGORY,
  payload: newCategory,
  oldCategory
});

epics.push((action$, { getState }) =>
  action$
    .ofType(CHANGE_ACTIVE_ECOMMERCE_CATEGORY)
    .mergeMap(action => {
      const { payload: newCategory, oldCategory } = action;
      if (newCategory !== oldCategory) {
        return onCategoryDetailGet({ uid: newCategory })
          .map(({ response }) => {
            return {
              type: FETCH_ECOMMERCE_CATEGORY_FULFILLED,
              payload: response
            };
          })
          .catch(ajaxError => {
            toast.error("Error Creating Categories");
            return Observable.of({ type: FETCH_ECOMMERCE_CATEGORY_REJECTED });
          });
      } else {
        return Observable.empty();
      }
    })
    .startWith({ type: FETCH_ECOMMERCE_CATEGORY_PENDING })
);

export default epics;
