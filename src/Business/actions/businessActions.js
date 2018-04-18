import {
  onBusinessAllGet,
  onBusinessPost,
  onPaymentMethodsGet,
  onCompanyTypeGet
} from "../config/businessServerCall";
import {
  FETCH_BUSINESS_FULFILLED,
  FETCH_BUSINESS_REJECTED,
  FETCH_BUSINESS_PENDING,
  FETCH_PAYMENT_METHODS_FULFILLED,
  FETCH_PAYMENT_METHODS_REJECTED,
  FETCH_PAYMENT_METHODS_PENDING,
  FETCH_COMPANY_TYPE_FULFILLED,
  FETCH_COMPANY_TYPE_REJECTED,
  FETCH_COMPANY_TYPE_PENDING
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

export const onBusinessCreate = ({ data, access_token }) => dispatch => {
  onBusinessPost({ data, access_token })
    .then(response =>
      dispatch({ type: FETCH_BUSINESS_FULFILLED, payload: response.data })
    )
    .catch(error =>
      dispatch({ type: FETCH_BUSINESS_REJECTED, payload: error })
    );
  dispatch({ type: FETCH_BUSINESS_PENDING });
};

export const onCompanyTypeList = ({ access_token }) => dispatch => {
  onCompanyTypeGet({ access_token })
    .then(response =>
      dispatch({
        type: FETCH_COMPANY_TYPE_FULFILLED,
        payload: response.data
      })
    )
    .catch(error =>
      dispatch({ type: FETCH_COMPANY_TYPE_REJECTED, payload: error })
    );
  dispatch({ type: FETCH_COMPANY_TYPE_PENDING });
};

export const onPaymentMethodsList = ({ access_token }) => dispatch => {
  onPaymentMethodsGet({ access_token })
    .then(response =>
      dispatch({
        type: FETCH_PAYMENT_METHODS_FULFILLED,
        payload: response.data
      })
    )
    .catch(error =>
      dispatch({ type: FETCH_PAYMENT_METHODS_REJECTED, payload: error })
    );
  dispatch({ type: FETCH_PAYMENT_METHODS_PENDING });
};

// export const onUnmountBusiness = () => ({
//   type: UNMOUNT_BUSINESS,
//   payload: null
// });
