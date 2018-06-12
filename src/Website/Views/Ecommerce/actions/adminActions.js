import { Observable } from "rxjs/Observable";
import { toast } from "react-toastify";

import {
  FETCH_CATEGORIES_FULFILLED,
  FETCH_CATEGORIES_PENDING,
  FETCH_CATEGORIES_REJECTED,
  CREATE_CATEGORIES_FULFILLED,
  CREATE_CATEGORIES_PENDING,
  CREATE_CATEGORIES_REJECTED,
  CHANGE_ACTIVE_CATEGORY
} from "./types";

import { onCategoriesGet, onCategoryPost } from "../config/ecommerceServerCall";

const epics = [];

export const onCategoriesList = () => ({
  type: FETCH_CATEGORIES_PENDING,
  first: true
});

epics.push((action$, { getState }) =>
  action$.ofType(FETCH_CATEGORIES_PENDING).mergeMap(action => {
    const { first } = action;
    return onCategoriesGet()
      .concatMap(({ response }) => {
        const extra = [];
        if (first) {
          extra.push({ type: CHANGE_ACTIVE_CATEGORY, payload: response.uid });
        }
        return [
          {
            type: FETCH_CATEGORIES_FULFILLED,
            payload: response
          },
          ...extra
        ];
      })
      .catch(ajaxError => {
        toast.error("Error Fetching Categories");
        return Observable.of({ type: FETCH_CATEGORIES_REJECTED });
      });
  })
);

export const onCategorySubmit = payload => ({
  type: CREATE_CATEGORIES_PENDING,
  payload
});

epics.push((action$, { getState }) =>
  action$.ofType(CREATE_CATEGORIES_PENDING).mergeMap(action => {
    const parent = getState().EcommerceContainer.admin.activeCategory;
    const { name } = action.payload;

    return onCategoryPost({ name, parent })
      .concatMap(({ response }) => {
        toast.success("Category created successfully");
        return [
          { type: CREATE_CATEGORIES_FULFILLED },
          { type: FETCH_CATEGORIES_PENDING }
        ];
      })
      .catch(ajaxError => {
        toast.error("Error Creating Categories");
        return Observable.of({ type: CREATE_CATEGORIES_REJECTED });
      });
  })
);

export const onChangeActiveCategory = payload => ({
  type: CHANGE_ACTIVE_CATEGORY,
  payload
});

export default epics;
