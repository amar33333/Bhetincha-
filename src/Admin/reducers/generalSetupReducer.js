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
  FETCH_COUNTRY_REJECTED,
  FETCH_DISTRICT_EACH_FULFILLED,
  FETCH_DISTRICT_EACH_REJECTED,
  FETCH_DISTRICT_EACH_PENDING,
  FETCH_STATE_EACH_FULFILLED,
  FETCH_STATE_EACH_REJECTED,
  FETCH_STATE_EACH_PENDING,
  FETCH_COUNTRY_EACH_FULFILLED,
  FETCH_COUNTRY_EACH_REJECTED,
  FETCH_COUNTRY_EACH_PENDING,
  FETCH_CITY_EACH_FULFILLED,
  FETCH_CITY_EACH_REJECTED,
  FETCH_CITY_EACH_PENDING,
  UNMOUNT_DISTRICT,
  UNMOUNT_CITY,
  UNMOUNT_AREA
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

    case FETCH_COUNTRY_EACH_PENDING:
      return { ...state, loading: true };

    case FETCH_COUNTRY_EACH_FULFILLED:
      const countries = state.countries;
      const country_data = action.payload;

      return {
        ...state,
        countries: countries.map(country => {
          if (country.id === country_data.id) {
            return { ...country, states: country_data.states };
          }
          return country;
        }),
        loading: false,
        statusClass: "fulfilled"
      };

    case FETCH_COUNTRY_EACH_REJECTED:
      return { ...state, loading: false };

    case FETCH_STATE_EACH_PENDING:
      return { ...state, loading: true };

    case FETCH_STATE_EACH_FULFILLED:
      // const countries = state.countries;
      // const country_data = action.payload;

      // return {
      //   ...state,
      //   countries: countries.map(country => {
      //     if (country.id === country_data.id) {
      //       return { ...country, states: country_data.states };
      //     }
      //     return country;
      //   }),
      //   loading: false,
      //   statusClass: "fulfilled"
      // };

      return {
        ...state,
        stateData: action.payload,
        loading: false,
        statusClass: "fulfilled"
      };

    case FETCH_STATE_EACH_REJECTED:
      return { ...state, loading: false };

    case FETCH_DISTRICT_EACH_PENDING:
      return { ...state, loading: true };
    case FETCH_DISTRICT_EACH_FULFILLED:
      return {
        ...state,
        districtData: action.payload,
        loading: false,
        statusClass: "fulfilled"
      };

    case FETCH_DISTRICT_EACH_REJECTED:
      return { ...state, loading: false };

    case FETCH_CITY_EACH_PENDING:
      return { ...state, loading: true };

    case FETCH_CITY_EACH_FULFILLED:
      return {
        ...state,
        cityData: action.payload,
        loading: false,
        statusClass: "fulfilled"
      };

    case FETCH_CITY_EACH_REJECTED:
      return { ...state, loading: false };

    case UNMOUNT_DISTRICT:
      return {
        ...state,
        loading: false,
        stateData: action.payload
      };

    case UNMOUNT_CITY:
      return {
        ...state,
        loading: false,
        districtData: action.payload
      };

    case UNMOUNT_AREA:
      return {
        ...state,
        loading: false,
        cityData: action.payload
      };

    default:
      return state;
  }
}
