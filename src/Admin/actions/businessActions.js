import { Observable } from "rxjs/Observable";
import { toast } from "react-toastify";
import {
  onCompanyTypePost,
  onPaymentMethodPost
} from "../config/adminServerCall";

import {
  onBusinessPost,
  onCompanyTypeGet,
  onPaymentMethodsGet,
  onBusinessAllGetAjax,
  onBusinessEachGet,
  onBusinessEachDeleteAjax
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
  FETCH_BUSINESS_EACH_FULFILLED,
  FETCH_BUSINESS_EACH_REJECTED,
  FETCH_BUSINESS_EACH_PENDING,
  CREATE_BUSINESS_FULFILLED,
  CREATE_BUSINESS_REJECTED,
  CREATE_BUSINESS_PENDING,
  FETCH_PAYMENT_METHODS_FULFILLED,
  FETCH_PAYMENT_METHODS_REJECTED,
  FETCH_PAYMENT_METHODS_PENDING,
  FETCH_COMPANY_TYPE_FULFILLED,
  FETCH_COMPANY_TYPE_REJECTED,
  FETCH_COMPANY_TYPE_PENDING,
  DELETE_BUSINESS_FULFILLED,
  DELETE_BUSINESS_PENDING,
  DELETE_BUSINESS_REJECTED
} from "./types";

const epics = [];

export const onBusinessAllGet = payload => ({
  type: FETCH_BUSINESS_PENDING,
  payload
});

epics.push((action$, { getState }) =>
  action$.ofType(FETCH_BUSINESS_PENDING).mergeMap(({ payload }) => {
    const toastId = toast("Fetching Businesses...", { autoClose: false });
    const filterValue = getState().AdminContainer.filterBusiness;
    const params = {};
    params.rows = filterValue.rows;
    params.page = filterValue.page;
    params.q = filterValue.q;
    params.industry = filterValue.industry
      ? filterValue.industry.map(industry => industry.id)
      : [];

    if (payload) {
      if (payload.rows) params.rows = payload.rows;
      if (payload.page) params.page = payload.page;
    }

    return onBusinessAllGetAjax({
      access_token: getState().auth.cookies.token_data.access_token,
      params
    })
      .map(({ response }) => {
        if (
          response !== null &&
          typeof response === "object" &&
          Array.isArray(response) === false
        ) {
          toast.update(toastId, {
            render: "Businesses fetched successfully!",
            type: toast.TYPE.SUCCESS,
            autoClose: 5000
          });
          return {
            type: FETCH_BUSINESS_FULFILLED,
            payload: response
          };
        } else {
          throw new Error("Error");
        }
      })
      .catch(ajaxError => {
        toast.update(toastId, {
          render: "Error Fetching Businesses",
          type: toast.TYPE.ERROR,
          autoClose: 5000
        });
        return Observable.of({ type: FETCH_BUSINESS_REJECTED });
      });
  })
);

export const onBusinessEachDelete = payload => ({
  type: DELETE_BUSINESS_PENDING,
  payload
});

epics.push((action$, { getState }) =>
  action$.ofType(DELETE_BUSINESS_PENDING).mergeMap(action => {
    const { id } = action.payload;
    const { access_token } = getState().auth.cookies.token_data;
    return onBusinessEachDeleteAjax({ id, access_token })
      .mergeMap(({ response }) => console.log(response))
      .catch(ajaxError => console.log(ajaxError));
  })
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

export const onBusinessEachList = ({ username, access_token }) => dispatch => {
  onBusinessEachGet({ username, access_token })
    .then(response =>
      dispatch({ type: FETCH_BUSINESS_EACH_FULFILLED, payload: response.data })
    )
    .catch(error =>
      dispatch({ type: FETCH_BUSINESS_EACH_REJECTED, payload: error })
    );
  dispatch({ type: FETCH_BUSINESS_EACH_PENDING });
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
