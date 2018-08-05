import {
  FETCH_PERSONAL_DETAILS_PENDING,
  FETCH_PERSONAL_DETAILS_REJECTED,
  FETCH_PERSONAL_DETAILS_FULFILLED,
  EDIT_PERSONAL_DETAILS_FULFILLED,
  EDIT_PERSONAL_DETAILS_PENDING,
  EDIT_PERSONAL_DETAILS_REJECTED,

  // Address
  FETCH_COUNTRY_FULFILLED,
  FETCH_COUNTRY_PENDING,
  FETCH_COUNTRY_REJECTED,

  // Each Address
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
  TOGGLE_EDIT
} from "../actions/types";

const INITIAL_STATE = {
  EDIT: false,
  personal_details_get: false,

  personalDetailsLoading: false,
  countriesFetchLoading: false,
  statesFetchLoading: false,
  districtsFetchLoading: false,
  citiesFetchLoading: false,

  statusClass: "",
  countries: [],
  states: [],
  districts: [],
  cities: [],
  areas: [],
  personal_details: null,
  personal_details_error: null
};

export default function(state = INITIAL_STATE, action) {
  switch (action.type) {
    case TOGGLE_EDIT:
      return { ...state, EDIT: action.payload };

    case FETCH_PERSONAL_DETAILS_PENDING:
      return {
        ...state,
        personalDetailsFetchLoading: true,
        personal_details_get: true
      };

    case FETCH_PERSONAL_DETAILS_FULFILLED:
      return {
        ...state,
        personalDetailsFetchLoading: false,
        personal_details_get: false,
        personal_details: action.payload
      };

    case FETCH_PERSONAL_DETAILS_REJECTED:
      return {
        ...state,
        personalDetailsFetchLoading: false,
        personal_details_get: false
      };

    case EDIT_PERSONAL_DETAILS_PENDING:
      return {
        ...state,
        personalDetailsFetchLoading: true,
        personal_details_get: true
      };

    case EDIT_PERSONAL_DETAILS_FULFILLED:
      return {
        ...state,
        personalDetailsFetchLoading: false,
        personal_details_get: true,
        personal_details: action.payload,
        personal_details_error: null
      };

    case EDIT_PERSONAL_DETAILS_REJECTED:
      return {
        ...state,
        personalDetailsFetchLoading: false,
        personal_details_get: true,
        personal_details_error: action.payload
      };

    case FETCH_COUNTRY_PENDING:
      return { ...state, countriesFetchLoading: true };
    case FETCH_COUNTRY_FULFILLED:
      return {
        ...state,
        countries: action.payload,
        countriesFetchLoading: false
      };
    case FETCH_COUNTRY_REJECTED:
      return { ...state, countriesFetchLoading: false };

    case FETCH_COUNTRY_EACH_FULFILLED:
      return {
        ...state,
        states: action.payload.states
      };

    case FETCH_STATE_EACH_FULFILLED:
      return {
        ...state,
        districts: action.payload.districts,
        statesFetchLoading: false
      };

    case FETCH_DISTRICT_EACH_FULFILLED:
      return {
        ...state,
        cities: action.payload.cities,
        districtsFetchLoading: false
      };

    case FETCH_CITY_EACH_FULFILLED:
      return {
        ...state,
        areas: action.payload.areas,
        citiesFetchLoading: false
      };

    default:
      return state;
  }
}
