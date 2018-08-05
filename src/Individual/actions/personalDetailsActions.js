import { toast } from "react-toastify";
import { Observable } from "rxjs/Observable";

import {
  onIndividualPersonalDetailsGet,
  onIndividualPersonalDetailsPut
} from "../config/individualServerCall";

import {
  onCountryGetAjax,
  onCountryEachGetAjax,
  onStateEachGetAjax,
  onDistrictEachGetAjax,
  onCityEachGetAjax
} from "../../Admin/config/adminServerCall";

import {
  FETCH_COUNTRY_FULFILLED,
  FETCH_COUNTRY_REJECTED,
  FETCH_COUNTRY_PENDING,
  FETCH_COUNTRY_EACH_FULFILLED,
  FETCH_COUNTRY_EACH_REJECTED,
  FETCH_COUNTRY_EACH_PENDING,
  FETCH_STATE_EACH_FULFILLED,
  FETCH_STATE_EACH_REJECTED,
  FETCH_STATE_EACH_PENDING,
  FETCH_DISTRICT_EACH_FULFILLED,
  FETCH_DISTRICT_EACH_REJECTED,
  FETCH_DISTRICT_EACH_PENDING,
  FETCH_CITY_EACH_FULFILLED,
  FETCH_CITY_EACH_REJECTED,
  FETCH_CITY_EACH_PENDING,

  // INDIVIDUAL
  FETCH_PERSONAL_DETAILS_FULFILLED,
  FETCH_PERSONAL_DETAILS_PENDING,
  FETCH_PERSONAL_DETAILS_REJECTED,
  EDIT_PERSONAL_DETAILS_FULFILLED,
  EDIT_PERSONAL_DETAILS_PENDING,
  EDIT_PERSONAL_DETAILS_REJECTED,
  TOGGLE_EDIT
} from "./types";

const epics = [];

export const onCountryList = () => ({ type: FETCH_COUNTRY_PENDING });

epics.push((action$, { getState }) =>
  action$.ofType(FETCH_COUNTRY_PENDING).mergeMap(action =>
    onCountryGetAjax({
      access_token: getState().auth.cookies.token_data.access_token
    })
      .map(({ response }) => ({
        type: FETCH_COUNTRY_FULFILLED,
        payload: response
      }))
      .catch(ajaxError => Observable.of({ type: FETCH_COUNTRY_REJECTED }))
  )
);

export const onCountryEachList = payload => ({
  type: FETCH_COUNTRY_EACH_PENDING,
  payload
});

epics.push((action$, { getState }) =>
  action$.ofType(FETCH_COUNTRY_EACH_PENDING).mergeMap(({ payload }) =>
    onCountryEachGetAjax({
      id: payload.id,
      access_token: getState().auth.cookies.token_data.access_token
    })
      .map(({ response }) => ({
        type: FETCH_COUNTRY_EACH_FULFILLED,
        payload: response
      }))
      .catch(ajaxError => Observable.of({ type: FETCH_COUNTRY_EACH_REJECTED }))
  )
);

export const onStateEachList = payload => ({
  type: FETCH_STATE_EACH_PENDING,
  payload
});

epics.push((action$, { getState }) =>
  action$.ofType(FETCH_STATE_EACH_PENDING).mergeMap(({ payload }) =>
    onStateEachGetAjax({
      id: payload.id,
      access_token: getState().auth.cookies.token_data.access_token
    })
      .map(({ response }) => ({
        type: FETCH_STATE_EACH_FULFILLED,
        payload: response
      }))
      .catch(ajaxError => Observable.of({ type: FETCH_STATE_EACH_REJECTED }))
  )
);

export const onDistrictEachList = payload => ({
  type: FETCH_DISTRICT_EACH_PENDING,
  payload
});

epics.push((action$, { getState }) =>
  action$.ofType(FETCH_DISTRICT_EACH_PENDING).mergeMap(({ payload }) =>
    onDistrictEachGetAjax({
      id: payload.id,
      access_token: getState().auth.cookies.token_data.access_token
    })
      .map(({ response }) => ({
        type: FETCH_DISTRICT_EACH_FULFILLED,
        payload: response
      }))
      .catch(ajaxError => Observable.of({ type: FETCH_DISTRICT_EACH_REJECTED }))
  )
);

export const onCityEachList = payload => ({
  type: FETCH_CITY_EACH_PENDING,
  payload
});

epics.push((action$, { getState }) =>
  action$.ofType(FETCH_CITY_EACH_PENDING).mergeMap(({ payload }) =>
    onCityEachGetAjax({
      id: payload.id,
      access_token: getState().auth.cookies.token_data.access_token
    })
      .map(({ response }) => ({
        type: FETCH_CITY_EACH_FULFILLED,
        payload: response
      }))
      .catch(ajaxError => Observable.of({ type: FETCH_CITY_EACH_REJECTED }))
  )
);

export const onIndividualPersonalDetailsEdit = payload => ({
  type: EDIT_PERSONAL_DETAILS_PENDING,
  payload
});

epics.push((action$, { getState }) =>
  action$.ofType(EDIT_PERSONAL_DETAILS_PENDING).mergeMap(action =>
    onIndividualPersonalDetailsPut({
      id: action.payload.id,
      access_token: getState().auth.cookies.token_data.access_token,
      body: action.payload.body
    })
      .concatMap(({ response }) => {
        if (response.msg === "success")
          return [
            {
              type: EDIT_PERSONAL_DETAILS_FULFILLED,
              payload: response
            },
            {
              type: FETCH_PERSONAL_DETAILS_PENDING,
              payload: { id: action.payload.id }
            }
          ];
        else throw new Error(JSON.stringify(response.msg));
      })
      .catch(ajaxError =>
        Observable.of({
          type: EDIT_PERSONAL_DETAILS_REJECTED,
          payload: ajaxError.status
            ? ajaxError.message
            : JSON.parse(ajaxError.message)
        })
      )
  )
);

export const onIndividualPersonalDetailsList = payload => ({
  type: FETCH_PERSONAL_DETAILS_PENDING,
  payload
});

epics.push((action$, { getState }) =>
  action$.ofType(FETCH_PERSONAL_DETAILS_PENDING).mergeMap(action =>
    onIndividualPersonalDetailsGet({
      id: action.payload.id,
      access_token: getState().auth.cookies.token_data.access_token
    })
      .concatMap(({ response }) => {
        const returnEpicsArray = [];
        if (response.address) {
          const { country, state, district, city } = response.address;
          if (country.id) {
            returnEpicsArray.push({
              type: FETCH_COUNTRY_EACH_PENDING,
              payload: { id: country.id }
            });
            if (state.id) {
              returnEpicsArray.push({
                type: FETCH_STATE_EACH_PENDING,
                payload: { id: state.id }
              });
              if (district.id) {
                returnEpicsArray.push({
                  type: FETCH_DISTRICT_EACH_PENDING,
                  payload: { id: district.id }
                });
                if (city.id)
                  returnEpicsArray.push({
                    type: FETCH_CITY_EACH_PENDING,
                    payload: { id: city.id }
                  });
              }
            }
          }
        }
        return [
          {
            type: FETCH_PERSONAL_DETAILS_FULFILLED,
            payload: response
          },
          ...returnEpicsArray
        ];
      })
      .catch(ajaxError =>
        Observable.of({ type: FETCH_PERSONAL_DETAILS_REJECTED })
      )
  )
);

export const ToogleEDIT = value => ({
  type: TOGGLE_EDIT,
  payload: value
});

export default epics;
