import { Observable } from "rxjs/Observable";

import {
  onCategoryEachGet,
  onCategoryGetAjax
} from "../../Admin/config/adminServerCall";

import {
  FETCH_CATEGORY_EACH_FULFILLED,
  FETCH_CATEGORY_EACH_REJECTED,
  FETCH_CATEGORY_EACH_PENDING,
  FETCH_CATEGORY_FULFILLED,
  FETCH_CATEGORY_REJECTED,
  FETCH_CATEGORY_PENDING,
  REMOVE_CATEGORY_DATA_FULFILLED,
  UNMOUNT_SUB_CATEGORY,
  UNMOUNT_CATEGORY_DATA,
  UNMOUNT_CATEGORY
} from "./types";

const epics = [];

export const onCategoryEachList = ({ id, access_token }) => dispatch => {
  onCategoryEachGet({ id, access_token })
    .then(response => {
      dispatch({ type: FETCH_CATEGORY_EACH_FULFILLED, payload: response.data });
    })
    .catch(error =>
      dispatch({ type: FETCH_CATEGORY_EACH_REJECTED, payload: error })
    );

  dispatch({ type: FETCH_CATEGORY_EACH_PENDING });
};

// export const onUnmountSubCategories = () => {
//   return {
//     type: UNMOUNT_SUB_CATEGORY,
//     payload: null
//   };
// };

export const onCategoryList = () => ({ type: FETCH_CATEGORY_PENDING });

epics.push((action$, { getState }) =>
  action$.ofType(FETCH_CATEGORY_PENDING).mergeMap(action =>
    onCategoryGetAjax({
      access_token: getState().auth.cookies.token_data.access_token
    })
      .map(({ response }) => ({
        type: FETCH_CATEGORY_FULFILLED,
        payload: response
      }))
      .catch(ajaxError => Observable.of({ type: FETCH_CATEGORY_REJECTED }))
  )
);

export const onRemoveCategoryData = ({ obj }) => {
  return {
    type: REMOVE_CATEGORY_DATA_FULFILLED,
    payload: obj
  };
};

export const onUnmountCategory = () => ({
  type: UNMOUNT_CATEGORY,
  payload: []
});

export const onUnmountCategoryData = () => ({
  type: UNMOUNT_CATEGORY_DATA,
  payload: null
});

export const onUnmountSubCategories = () => {
  return {
    type: UNMOUNT_SUB_CATEGORY,
    payload: []
  };
};
