import {
  onCompanyTypePost,
  onPaymentMethodPost
} from "../config/adminServerCall";

import {
  CREATE_COMPANY_TYPE_FULFILLED,
  CREATE_COMPANY_TYPE_PENDING,
  CREATE_COMPANY_TYPE_REJECTED,
  CREATE_PAYMENT_METHODS_FULFILLED,
  CREATE_PAYMENT_METHODS_PENDING,
  CREATE_PAYMENT_METHODS_REJECTED
} from "./types";

export const onCompanyTypeSubmit = ({
  company_type,
  access_token
}) => dispatch => {
  onCompanyTypePost({
    company_type,
    access_token
  })
    .then(response =>
      dispatch({ type: CREATE_COMPANY_TYPE_FULFILLED, payload: response.data })
    )
    .catch(error =>
      dispatch({ type: CREATE_COMPANY_TYPE_REJECTED, payload: error })
    );
  dispatch({ type: CREATE_COMPANY_TYPE_PENDING });
};

export const onPaymentMethodSubmit = ({
  payment_method,
  access_token
}) => dispatch => {
  onPaymentMethodPost({
    payment_method,
    access_token
  })
    .then(response =>
      dispatch({
        type: CREATE_PAYMENT_METHODS_FULFILLED,
        payload: response.data
      })
    )
    .catch(error =>
      dispatch({ type: CREATE_PAYMENT_METHODS_REJECTED, payload: error })
    );
  dispatch({ type: CREATE_PAYMENT_METHODS_PENDING });
};
