import { onSubCategoryPost } from "../Common/utils/serverCall";
import {
  CREATE_SUB_CATEGORY_FULFILLED,
  CREATE_SUB_CATEGORY_REJECTED,
  CREATE_SUB_CATEGORY_PENDING
} from "./types";

export const onSubCategorySubmit = ({
  category,
  subCategory,
  extraSection
}) => dispatch => {
  onSubCategoryPost({ category, subCategory, extraSection })
    .then(response =>
      dispatch({ type: CREATE_SUB_CATEGORY_FULFILLED, payload: response.data })
    )
    .catch(error =>
      dispatch({ type: CREATE_SUB_CATEGORY_REJECTED, payload: error })
    );
  dispatch({ type: CREATE_SUB_CATEGORY_PENDING });
};
