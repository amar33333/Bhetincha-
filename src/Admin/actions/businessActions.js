import { Observable } from "rxjs/Observable";
import {
  onCompanyTypePost,
  onPaymentMethodPost
} from "../config/adminServerCall";

import {
  onBusinessPost,
  onCompanyTypeGet,
  onPaymentMethodsGet,
  onBusinessAllGetAjax
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

const epics = [];

export const onBusinessAllGet = payload => ({
  type: FETCH_BUSINESS_PENDING,
  payload
});

epics.push((action$, { getState }) =>
  action$
    .ofType(FETCH_BUSINESS_PENDING)
    .mergeMap(({ payload }) => {
      console.log(getState().auth.cookies.token_data.access_token);
      return onBusinessAllGetAjax({
        access_token: getState().auth.cookies.token_data.access_token,
        params: payload
      });
    })
    .map(({ response }) => ({
      type: FETCH_BUSINESS_FULFILLED,
      payload: response
    }))
    .catch(ajaxError => Observable.of({ type: FETCH_BUSINESS_REJECTED }))
);

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

export default epics;
