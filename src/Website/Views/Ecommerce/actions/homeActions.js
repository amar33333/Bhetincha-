import { Observable } from "rxjs/Observable";
import { toast } from "react-toastify";

import {
  FETCH_ECOMMERCE_CATEGORIES_FULFILLED,
  FETCH_ECOMMERCE_CATEGORIES_PENDING,
  FETCH_ECOMMERCE_CATEGORIES_REJECTED
} from "./types";

import { onEcommerceCategoriesGet } from "../../../../Admin/config/adminServerCall";

const epics = [];

// categories
export const onCategoriesList = () => ({
  type: FETCH_ECOMMERCE_CATEGORIES_PENDING
  // first: true
});

epics.push((action$, { getState }) =>
  action$.ofType(FETCH_ECOMMERCE_CATEGORIES_PENDING).mergeMap(action => {
    // const { first } = action;
    return onEcommerceCategoriesGet()
      .concatMap(({ response }) => {
        const extra = [];
        // if (first) {
        //   extra.push({
        //     type: CHANGE_ACTIVE_ECOMMERCE_CATEGORY,
        //     payload: response.uid
        //   });
        // }
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

export default epics;
