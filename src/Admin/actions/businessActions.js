import {
  onCompanyTypePost,
  onPaymentMethodPost
} from "../config/adminServerCall";

import {
  onBusinessPost,
  onCompanyTypeGet,
  onPaymentMethodsGet
} from "../../Business/config/businessServerCall";

import {
  CREATE_COMPANY_TYPE_FULFILLED,
  CREATE_COMPANY_TYPE_PENDING,
  CREATE_COMPANY_TYPE_REJECTED,
  CREATE_PAYMENT_METHODS_FULFILLED,
  CREATE_PAYMENT_METHODS_PENDING,
  CREATE_PAYMENT_METHODS_REJECTED,
  FETCH_BUSINESS_FULFILLED,
  FETCH_BUSINESS_REJECTED,
  FETCH_BUSINESS_PENDING,
  CREATE_BUSINESS_FULFILLED,
  CREATE_BUSINESS_REJECTED,
  CREATE_BUSINESS_PENDING,
  FETCH_PAYMENT_METHODS_FULFILLED,
  FETCH_PAYMENT_METHODS_REJECTED,
  FETCH_PAYMENT_METHODS_PENDING,
  FETCH_COMPANY_TYPE_FULFILLED,
  FETCH_COMPANY_TYPE_REJECTED,
  FETCH_COMPANY_TYPE_PENDING
} from "./types";

export const onBusinessCreate = ({ data, access_token }) => dispatch => {
  onBusinessPost({ data, access_token })
    .then(response =>
      dispatch({ type: CREATE_BUSINESS_FULFILLED, payload: response.data })
    )
    .catch(error =>
      dispatch({ type: CREATE_BUSINESS_REJECTED, payload: error })
    );
  dispatch({ type: CREATE_BUSINESS_PENDING });
};

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
