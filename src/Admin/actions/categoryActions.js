import { onCategoryPost, onCategoryGet } from "../config/adminServerCall";
import {
  CREATE_CATEGORY_FULFILLED,
  CREATE_CATEGORY_REJECTED,
  CREATE_CATEGORY_PENDING,
  FETCH_CATEGORY_FULFILLED,
  FETCH_CATEGORY_REJECTED,
  FETCH_CATEGORY_PENDING,
  UNMOUNT_CATEGORY
} from "./types";

export const onCategorySubmit = ({ category, industry }) => dispatch => {
  onCategoryPost({ category, industry })
    .then(response =>
      dispatch({ type: CREATE_CATEGORY_FULFILLED, payload: response.data })
    )
    .catch(error =>
      dispatch({ type: CREATE_CATEGORY_REJECTED, payload: error })
    );
  dispatch({ type: CREATE_CATEGORY_PENDING });
};

export const onCategoryList = () => dispatch => {
  onCategoryGet()
    .then(response =>
      dispatch({ type: FETCH_CATEGORY_FULFILLED, payload: response.data })
    )
    .catch(error =>
      dispatch({ type: FETCH_CATEGORY_REJECTED, payload: error })
    );
  dispatch({ type: FETCH_CATEGORY_PENDING });
};

export const onUnmountCategory = () => ({
  type: UNMOUNT_CATEGORY,
  payload: null
});
