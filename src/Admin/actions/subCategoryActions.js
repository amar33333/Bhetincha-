import { Observable } from "rxjs/Observable";
import { toast } from "react-toastify";

import {
  onSubCategoryPost,
  onSubCategoryGetAjax,
  onSubCategoryEachDeleteAjax
} from "../config/adminServerCall";

import {
  CREATE_SUB_CATEGORY_FULFILLED,
  CREATE_SUB_CATEGORY_REJECTED,
  CREATE_SUB_CATEGORY_PENDING,
  FETCH_SUB_CATEGORY_PENDING,
  FETCH_SUB_CATEGORY_FULFILLED,
  FETCH_SUB_CATEGORY_REJECTED,
  DELETE_SUB_CATEGORY_FULFILLED,
  DELETE_SUB_CATEGORY_PENDING,
  DELETE_SUB_CATEGORY_REJECTED,
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
    .then(response => {
      if (response.data.msg === "success") {
        toast.success("New Sub Category Created Successfully!");
      } else {
        response.data.msg.name.map(msg => {
          toast.error(msg);
        });
      }
      dispatch({ type: CREATE_SUB_CATEGORY_FULFILLED, payload: response.data });
    })
    .catch(error => {
      toast.error("Sub-Category Not created!");
      dispatch({ type: CREATE_SUB_CATEGORY_REJECTED, payload: error });
    });
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
export const onSubCategoryDelete = payload => ({
  type: DELETE_SUB_CATEGORY_PENDING,
  payload
});

epics.push((action$, { getState }) =>
  action$.ofType(DELETE_SUB_CATEGORY_PENDING).mergeMap(({ payload }) =>
    onSubCategoryEachDeleteAjax({
      id: payload.id,
      access_token: getState().auth.cookies.token_data.access_token
    })
      .concatMap(() => {
        // toast.success("Deleted Successfully!");
        return [
          { type: FETCH_SUB_CATEGORY_PENDING },
          { type: DELETE_SUB_CATEGORY_FULFILLED }
        ];
      })
      .catch(ajaxError => {
        // toast.error("Error Deleting Industry");
        console.log(ajaxError);
        return Observable.of({ type: DELETE_SUB_CATEGORY_REJECTED });
      })
  )
);

export const onUnmountSubCategory = () => ({ type: UNMOUNT_SUB_CATEGORY });

export default epics;
