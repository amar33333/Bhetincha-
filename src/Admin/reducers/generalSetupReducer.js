import {
  FETCH_AREA_FULFILLED,
  FETCH_AREA_PENDING,
  FETCH_AREA_REJECTED,
  FETCH_CITY_FULFILLED,
  FETCH_CITY_PENDING,
  FETCH_CITY_REJECTED,
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
      return { ...state, loading: true, statusClass: "pending" };

    case FETCH_COUNTRY_FULFILLED:
      return {
        ...state,
        countries: action.payload,
        loading: false,
        statusClass: "fulfilled"
      };

    case FETCH_COUNTRY_REJECTED:
      return { ...state, loading: false, statusClass: "rejected" };

    default:
      return state;
  }
}
