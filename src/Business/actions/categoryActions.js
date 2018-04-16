import { onCategoryEachGet } from "../../Admin/config/adminServerCall";
import {
  FETCH_CATEGORY_EACH_FULFILLED,
  FETCH_CATEGORY_EACH_REJECTED,
  FETCH_CATEGORY_EACH_PENDING,
  UNMOUNT_SUB_CATEGORY
} from "./types";

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

export const onUnmountSubCategories = () => {
  return {
    type: UNMOUNT_SUB_CATEGORY,
    payload: null
  };
};
