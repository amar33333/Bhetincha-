import { onExtraSectionGet } from "../config/adminServerCall";
import {
  FETCH_EXTRA_SECTION_FULFILLED,
  FETCH_EXTRA_SECTION_REJECTED,
  FETCH_EXTRA_SECTION_PENDING,
  UNMOUNT_EXTRA_SECTION
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

export const onUnmountExtraSection = () => ({
  type: UNMOUNT_EXTRA_SECTION,
  payload: null
});
