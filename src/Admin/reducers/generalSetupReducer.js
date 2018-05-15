import {
  FETCH_COUNTRY_FULFILLED,
  FETCH_COUNTRY_PENDING,
  FETCH_COUNTRY_REJECTED,
  CREATE_COUNTRY_FULFILLED,
  CREATE_COUNTRY_PENDING,
  CREATE_COUNTRY_REJECTED,
  FETCH_STATE_FULFILLED,
  FETCH_STATE_PENDING,
  FETCH_STATE_REJECTED,
  CREATE_STATE_FULFILLED,
  CREATE_STATE_PENDING,
  CREATE_STATE_REJECTED,
  FETCH_AREA_FULFILLED,
  FETCH_AREA_PENDING,
  FETCH_AREA_REJECTED,
  FETCH_CITY_FULFILLED,
  FETCH_CITY_PENDING,
  FETCH_CITY_REJECTED,
  FETCH_DISTRICT_FULFILLED,
  FETCH_DISTRICT_PENDING,
  FETCH_DISTRICT_REJECTED,
  FETCH_COUNTRY_EACH_FULFILLED,
  FETCH_COUNTRY_EACH_REJECTED,
  FETCH_COUNTRY_EACH_PENDING,
  FETCH_DISTRICT_EACH_FULFILLED,
  FETCH_DISTRICT_EACH_REJECTED,
  FETCH_DISTRICT_EACH_PENDING,
  FETCH_STATE_EACH_FULFILLED,
  FETCH_STATE_EACH_REJECTED,
  FETCH_STATE_EACH_PENDING,
  FETCH_ADDRESS_TREE_FULFILLED,
  FETCH_ADDRESS_TREE_REJECTED,
  FETCH_ADDRESS_TREE_PENDING,
  FETCH_CITY_EACH_FULFILLED,
  FETCH_CITY_EACH_REJECTED,
  FETCH_CITY_EACH_PENDING,
  UNMOUNT_DISTRICT,
  UNMOUNT_CITY,
  UNMOUNT_AREA
} from "../actions/types";

const INITIAL_STATE = {
  loading: false,
  countryLoading: false,
  countryError: false,
  countriesFetchLoading: false,
  stateLoading: false,
  stateError: false,
  statesFetchLoading: false,
  statusClass: "",
  countries: [],
  states: [],
  districts: [],
  countryEach: []
};

export default function(state = INITIAL_STATE, action) {
  switch (action.type) {
    /*
      Countries
    */
    case CREATE_COUNTRY_PENDING:
      return { ...state, countryLoading: true, countryError: false };
    case CREATE_COUNTRY_FULFILLED:
      return { ...state, countryLoading: false, countryError: false };
    case CREATE_COUNTRY_REJECTED:
      return { ...state, countryLoading: false, countryError: true };

    case FETCH_COUNTRY_PENDING:
      return { ...state, countriesFetchLoading: true };
    case FETCH_COUNTRY_FULFILLED:
      return {
        ...state,
        countries: action.payload.map((country, i) => ({
          ...country,
          s_no: i + 1
        })),
        countriesFetchLoading: false
      };
    case FETCH_COUNTRY_REJECTED:
      return { ...state, countriesFetchLoading: false };

    /*
      States
    */
    case CREATE_STATE_PENDING:
      return { ...state, stateLoading: true, stateError: false };
    case CREATE_STATE_FULFILLED:
      return { ...state, stateLoading: false, stateError: false };
    case CREATE_STATE_REJECTED:
      return { ...state, stateLoading: false, stateError: true };

    case FETCH_STATE_PENDING:
      return { ...state, statesFetchLoading: true };

    case FETCH_STATE_FULFILLED:
      return {
        ...state,
        states: action.payload.map((state, i) => ({
          ...state,
          s_no: i + 1
        })),
        statesFetchLoading: false
      };

    case FETCH_STATE_REJECTED:
      return { ...state, statesFetchLoading: false };

    /*
      District
    */
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
      return {
        ...state,
        countryData: action.payload,
        countryEach: action.payload.states,
        loading: false,
        statusClass: "fulfilled"
      };

    case FETCH_COUNTRY_EACH_REJECTED:
      return { ...state, loading: false };

    case FETCH_ADDRESS_TREE_PENDING:
      return { ...state, loading: true };

    case FETCH_ADDRESS_TREE_FULFILLED:
      const countries = state.countries;
      const payload = action.payload;

      // console.log("payload: ", payload);
      return {
        ...state,
        countries: countries.map(country => {
          // country.states method added ... remove that if error
          if (payload.id === country.id) {
            // console.log("country satisfied: ", {
            //   ...country,
            //   states: payload.states
            // });

            return country.states
              ? { ...country }
              : { ...country, states: payload.states };
          } else {
            if (country.states) {
              return {
                ...country,
                states: country.states.map(state => {
                  if (payload.id === state.id && !state.districts) {
                    return state.districts
                      ? { ...state }
                      : { ...state, districts: payload.districts };
                  } else {
                    if (state.districts) {
                      return {
                        ...state,
                        districts: state.districts.map(district => {
                          if (payload.id === district.id && !district.cities) {
                            return district.cities
                              ? { ...district }
                              : { ...district, cities: payload.cities };
                          } else {
                            if (district.cities) {
                              return {
                                ...district,
                                cities: district.cities.map(city => {
                                  if (payload.id === city.id && !city.areas) {
                                    return city.areas
                                      ? { ...city }
                                      : { ...city, areas: payload.areas };
                                  } else {
                                    return city;
                                  }
                                })
                              };
                            }
                            return district;
                          }
                        })
                      };
                    }
                    // console.log("staes not satisfied: ", state);
                    return state;
                  }
                })
              };
            }
            return country;
          }
        }),
        loading: false,
        statusClass: "fulfilled"
      };

    case FETCH_ADDRESS_TREE_REJECTED:
      return { ...state, loading: false };

    case FETCH_STATE_EACH_PENDING:
      return { ...state, loading: true };

    case FETCH_STATE_EACH_FULFILLED:
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
      console.log(action.payload);
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
