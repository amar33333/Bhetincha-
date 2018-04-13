import {
  FETCH_AREA_FULFILLED,
  FETCH_AREA_PENDING,
  FETCH_AREA_REJECTED,
  FETCH_CITY_FULFILLED,
  FETCH_CITY_PENDING,
  FETCH_CITY_REJECTED,
  FETCH_DISTRICT_FULFILLED,
  FETCH_DISTRICT_PENDING,
  FETCH_DISTRICT_REJECTED,
  FETCH_STATE_FULFILLED,
  FETCH_STATE_PENDING,
  FETCH_STATE_REJECTED,
  FETCH_COUNTRY_FULFILLED,
  FETCH_COUNTRY_PENDING,
  FETCH_COUNTRY_REJECTED
} from "../actions/types";

const INITIAL_STATE = {
  loading: false,
  statusClass: ""
};

export default function(state = INITIAL_STATE, action) {
  switch (action.type) {
    case FETCH_COUNTRY_PENDING:
      return { ...state, loading: true };

    case FETCH_COUNTRY_FULFILLED:
      return {
        ...state,
        countries: action.payload,
        loading: false,
        statusClass: "fulfilled"
      };

    case FETCH_COUNTRY_REJECTED:
      return { ...state, loading: false };

    case FETCH_STATE_PENDING:
      return { ...state, loading: true };

    case FETCH_STATE_FULFILLED:
      return {
        ...state,
        states: action.payload,
        loading: false,
        statusClass: "fulfilled"
      };

    case FETCH_STATE_REJECTED:
      return { ...state, loading: false };

    case FETCH_DISTRICT_PENDING:
      return { ...state, loading: true };

    case FETCH_DISTRICT_FULFILLED:
      return {
        ...state,
        districts: action.payload,
        loading: false,
        statusClass: "fulfilled"
      };

    case FETCH_DISTRICT_REJECTED:
      return { ...state, loading: false };

    case FETCH_CITY_PENDING:
      return { ...state, loading: true };

    case FETCH_CITY_FULFILLED:
      return {
        ...state,
        cities: action.payload,
        loading: false,
        statusClass: "fulfilled"
      };

    case FETCH_CITY_REJECTED:
      return { ...state, loading: false };

    case FETCH_AREA_PENDING:
      return { ...state, loading: true };

    case FETCH_AREA_FULFILLED:
      return {
        ...state,
        areas: action.payload,
        loading: false,
        statusClass: "fulfilled"
      };

    case FETCH_AREA_REJECTED:
      return { ...state, loading: false };

    default:
      return state;
  }
}
