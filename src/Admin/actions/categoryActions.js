import { Observable } from "rxjs/Observable";
import { toast } from "react-toastify";

import {
  onCategoryPost,
  onCategoryGet,
  onCategoryEachDeleteAjax,
  onCategoryGetAjax,
  onCategoryEachGet
} from "../config/adminServerCall";

import {
  CREATE_CATEGORY_FULFILLED,
  CREATE_CATEGORY_REJECTED,
  CREATE_CATEGORY_PENDING,
  FETCH_CATEGORY_FULFILLED,
  FETCH_CATEGORY_REJECTED,
  FETCH_CATEGORY_PENDING,
  FETCH_CATEGORY_EACH_FULFILLED,
  FETCH_CATEGORY_EACH_REJECTED,
  FETCH_CATEGORY_EACH_PENDING,
  REMOVE_CATEGORY_DATA_PENDING,
  REMOVE_CATEGORY_DATA_FULFILLED,
  REMOVE_CATEGORY_DATA_REJECTED,
  DELETE_CATEGORY_PENDING,
  DELETE_CATEGORY_FULFILLED,
  DELETE_CATEGORY_REJECTED,
  UNMOUNT_CATEGORY_DATA,
  UNMOUNT_SUB_CATEGORY,
  UNMOUNT_CATEGORY
} from "./types";

const epics = [];

export const onCategorySubmit = ({
  category,
  industry,
  access_token
}) => dispatch => {
  onCategoryPost({
    category,
    industry,
    access_token
  })
    .then(response => {
      if (response.data.msg === "success") {
        toast.success("New Category Created Successfully!");
      } else {
        response.data.msg.name.map(msg => {
          toast.error(msg);
        });
      }
      dispatch({ type: CREATE_CATEGORY_FULFILLED, payload: response.data });
      dispatch({ type: FETCH_CATEGORY_PENDING });
    })
    .catch(error => {
      toast.error("Category Not created!");
      dispatch({ type: CREATE_CATEGORY_REJECTED, payload: error });
    });
  dispatch({ type: CREATE_CATEGORY_PENDING });
};

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

// export const onCategoryList = ({ access_token }) => dispatch => {
//   onCategoryGet({
//     access_token
//   })
//     .then(response =>
//       dispatch({ type: FETCH_CATEGORY_FULFILLED, payload: response.data })
//     )
//     .catch(error =>
//       dispatch({ type: FETCH_CATEGORY_REJECTED, payload: error })
//     );
//   dispatch({ type: FETCH_CATEGORY_PENDING });
// };

export const onCategoryDelete = payload => ({
  type: DELETE_CATEGORY_PENDING,
  payload
});

epics.push((action$, { getState }) =>
  action$.ofType(DELETE_CATEGORY_PENDING).mergeMap(({ payload }) =>
    onCategoryEachDeleteAjax({
      id: payload.id,
      access_token: getState().auth.cookies.token_data.access_token
    })
      .concatMap(() => {
        toast.success("Category Deleted Successfully!");
        return [
          { type: FETCH_CATEGORY_PENDING },
          { type: DELETE_CATEGORY_FULFILLED }
        ];
      })
      .catch(ajaxError => {
        toast.error("Error Deleting Category");
        console.log(ajaxError);
        return Observable.of({ type: DELETE_CATEGORY_REJECTED });
      })
  )
);

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

export default epics;
