import { onIndustryPost, onIndustryGet } from "../config/adminServerCall";
import {
  CREATE_INDUSTRY_FULFILLED,
  CREATE_INDUSTRY_REJECTED,
  CREATE_INDUSTRY_PENDING,
  FETCH_INDUSTRY_FULFILLED,
  FETCH_INDUSTRY_REJECTED,
  FETCH_INDUSTRY_PENDING,
  UNMOUNT_INDUSTRY
} from "./types";

export const onIndustrySubmit = ({ industry }) => dispatch => {
  onIndustryPost({ industry })
    .then(response =>
      dispatch({ type: CREATE_INDUSTRY_FULFILLED, payload: response.data })
    )
    .catch(error =>
      dispatch({ type: CREATE_INDUSTRY_REJECTED, payload: error })
    );

  dispatch({ type: CREATE_INDUSTRY_PENDING });
};

export const onIndustryList = () => dispatch => {
  onIndustryGet()
    .then(response =>
      dispatch({ type: FETCH_INDUSTRY_FULFILLED, payload: response.data })
    )
    .catch(error =>
      dispatch({ type: FETCH_INDUSTRY_REJECTED, payload: error })
    );

  dispatch({ type: FETCH_INDUSTRY_PENDING });
};

export const onUnmountIndustry = () => ({
  type: UNMOUNT_INDUSTRY,
  payload: null
});
