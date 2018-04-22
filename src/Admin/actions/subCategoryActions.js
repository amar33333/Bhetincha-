import { onSubCategoryPost } from "../config/adminServerCall";
import {
  CREATE_SUB_CATEGORY_FULFILLED,
  CREATE_SUB_CATEGORY_REJECTED,
  CREATE_SUB_CATEGORY_PENDING,
  UNMOUNT_SUB_CATEGORY
} from "./types";

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

export const onUnmountSubCategory = () => ({
  type: UNMOUNT_SUB_CATEGORY,
  payload: null
});
