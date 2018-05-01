import {
  onCategoryPost,
  onCategoryGet,
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
  UNMOUNT_CATEGORY
} from "./types";

import { UNMOUNT_SUB_CATEGORY } from "../../Business/actions/types";

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
    .then(response =>
      dispatch({ type: CREATE_CATEGORY_FULFILLED, payload: response.data })
    )
    .catch(error =>
      dispatch({ type: CREATE_CATEGORY_REJECTED, payload: error })
    );
  dispatch({ type: CREATE_CATEGORY_PENDING });
};

export const onCategoryList = ({ access_token }) => dispatch => {
  onCategoryGet({
    access_token
  })
    .then(response =>
      dispatch({ type: FETCH_CATEGORY_FULFILLED, payload: response.data })
    )
    .catch(error =>
      dispatch({ type: FETCH_CATEGORY_REJECTED, payload: error })
    );
  dispatch({ type: FETCH_CATEGORY_PENDING });
};

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
  payload: null
});

export const onUnmountSubCategories = () => {
  return {
    type: UNMOUNT_SUB_CATEGORY,
    payload: null
  };
};
