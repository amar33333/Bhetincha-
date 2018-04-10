import { onCategoryPost } from "../Common/utils/serverCall";
import { FETCH_USER } from "./types";

export const onCategorySubmit = ({ category, industry }) => dispatch => {
  onCategoryPost({ category, industry }).then(response =>
    dispatch({ type: FETCH_USER, payload: response.data })
  );
};

// ({
//   type: FETCH_USER,
//   payload: onCategoryPost({ category, industry })
// });
