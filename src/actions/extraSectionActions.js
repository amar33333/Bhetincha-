import { onExtraSectionGet } from "../Common/utils/serverCall";
import {
  FETCH_EXTRA_SECTION_FULFILLED,
  FETCH_EXTRA_SECTION_REJECTED,
  FETCH_EXTRA_SECTION_PENDING
} from "./types";

export const onExtraSectionList = () => dispatch => {
  onExtraSectionGet()
    .then(response =>
      dispatch({ type: FETCH_EXTRA_SECTION_FULFILLED, payload: response.data })
    )
    .catch(error =>
      dispatch({ type: FETCH_EXTRA_SECTION_REJECTED, payload: error })
    );

  dispatch({ type: FETCH_EXTRA_SECTION_PENDING });
};

// ({
//   type: FETCH_USER,
//   payload: onCategoryPost({ category, industry })
// });
