import { Observable } from "rxjs/Observable";

import {
  onSubCategoryPost,
  onSubCategoryGetAjax
} from "../config/adminServerCall";

import {
  CREATE_SUB_CATEGORY_FULFILLED,
  CREATE_SUB_CATEGORY_REJECTED,
  CREATE_SUB_CATEGORY_PENDING,
  FETCH_SUB_CATEGORY_PENDING,
  FETCH_SUB_CATEGORY_FULFILLED,
  FETCH_SUB_CATEGORY_REJECTED,
  UNMOUNT_SUB_CATEGORY
} from "./types";

const epics = [];

export const onSubCategorySubmit = ({
  category,
  subCategory,
  extraSection,
  access_token
}) => dispatch => {
  onSubCategoryPost({
    category,
    subCategory,
    extraSection,
    access_token
  })
    .then(response =>
      dispatch({ type: CREATE_SUB_CATEGORY_FULFILLED, payload: response.data })
    )
    .catch(error =>
      dispatch({ type: CREATE_SUB_CATEGORY_REJECTED, payload: error })
    );
  dispatch({ type: CREATE_SUB_CATEGORY_PENDING });
};

export const onSubCategoryList = () => ({ type: FETCH_SUB_CATEGORY_PENDING });

epics.push((action$, { getState }) =>
  action$.ofType(FETCH_SUB_CATEGORY_PENDING).mergeMap(action =>
    onSubCategoryGetAjax({
      access_token: getState().auth.cookies.token_data.access_token
    })
      .map(({ response }) => ({
        type: FETCH_SUB_CATEGORY_FULFILLED,
        payload: response
      }))
      .catch(ajaxError => Observable.of({ type: FETCH_SUB_CATEGORY_FULFILLED }))
  )
);

export const onUnmountSubCategory = () => ({ type: UNMOUNT_SUB_CATEGORY });

export default epics;
