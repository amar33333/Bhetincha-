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

export const onIndustrySubmit = ({ industry, access_token }) => dispatch => {
  onIndustryPost({
    industry,
    access_token
  })
    .then(response =>
      dispatch({ type: CREATE_INDUSTRY_FULFILLED, payload: response.data })
    )
    .catch(error =>
      dispatch({ type: CREATE_INDUSTRY_REJECTED, payload: error })
    );

  dispatch({ type: CREATE_INDUSTRY_PENDING });
};

export const onIndustryList = ({ access_token }) => dispatch => {
  onIndustryGet({
    access_token
  })
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
