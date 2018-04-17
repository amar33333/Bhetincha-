import {
  onIndustryGet,
  onIndustryEachGet
} from "../../Admin/config/adminServerCall";

import {
  FETCH_INDUSTRY_FULFILLED,
  FETCH_INDUSTRY_REJECTED,
  FETCH_INDUSTRY_PENDING,
  FETCH_INDUSTRY_EACH_FULFILLED,
  FETCH_INDUSTRY_EACH_REJECTED,
  FETCH_INDUSTRY_EACH_PENDING
} from "./types";

export const onIndustryList = ({ access_token }) => dispatch => {
  onIndustryGet({ access_token })
    .then(response =>
      dispatch({ type: FETCH_INDUSTRY_FULFILLED, payload: response.data })
    )
    .catch(error =>
      dispatch({ type: FETCH_INDUSTRY_REJECTED, payload: error })
    );

  dispatch({ type: FETCH_INDUSTRY_PENDING });
};

export const onIndustryEachList = ({ id, access_token }) => dispatch => {
  onIndustryEachGet({ id, access_token })
    .then(response =>
      dispatch({ type: FETCH_INDUSTRY_EACH_FULFILLED, payload: response.data })
    )
    .catch(error =>
      dispatch({ type: FETCH_INDUSTRY_EACH_REJECTED, payload: error })
    );

  dispatch({ type: FETCH_INDUSTRY_EACH_PENDING });
};