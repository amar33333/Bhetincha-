import { onBusinessAllGet, onBusinessPost } from "../config/businessServerCall";
import {
  FETCH_BUSINESS_FULFILLED,
  FETCH_BUSINESS_REJECTED,
  FETCH_BUSINESS_PENDING
} from "./types";

export const onBusinessList = () => dispatch => {
  onBusinessAllGet()
    .then(response =>
      dispatch({ type: FETCH_BUSINESS_FULFILLED, payload: response.data })
    )
    .catch(error =>
      dispatch({ type: FETCH_BUSINESS_REJECTED, payload: error })
    );
  dispatch({ type: FETCH_BUSINESS_PENDING });
};

export const onBusinessSubmit = () => dispatch => {
  onBusinessPost()
    .then(response =>
      dispatch({ type: FETCH_BUSINESS_FULFILLED, payload: response.data })
    )
    .catch(error =>
      dispatch({ type: FETCH_BUSINESS_REJECTED, payload: error })
    );
  dispatch({ type: FETCH_BUSINESS_PENDING });
};

// export const onUnmountBusiness = () => ({
//   type: UNMOUNT_BUSINESS,
//   payload: null
// });
