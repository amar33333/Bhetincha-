import {
  CREATE_COUNTRY_FULFILLED,
  CREATE_COUNTRY_PENDING,
  CREATE_COUNTRY_REJECTED,
  FETCH_COUNTRY_FULFILLED,
  FETCH_COUNTRY_PENDING,
  FETCH_COUNTRY_REJECTED,
  CREATE_DISTRICT_FULFILLED,
  CREATE_DISTRICT_PENDING,
  CREATE_DISTRICT_REJECTED,
  FETCH_DISTRICT_FULFILLED,
  FETCH_DISTRICT_PENDING,
  FETCH_DISTRICT_REJECTED,
  CREATE_STATE_FULFILLED,
  CREATE_STATE_PENDING,
  CREATE_STATE_REJECTED,
  FETCH_STATE_FULFILLED,
  FETCH_STATE_PENDING,
  FETCH_STATE_REJECTED,
  CREATE_AREA_PENDING,
  CREATE_AREA_FULFILLED,
  CREATE_AREA_REJECTED,
  FETCH_AREA_FULFILLED,
  FETCH_AREA_PENDING,
  FETCH_AREA_REJECTED,
  FETCH_CITY_FULFILLED,
  FETCH_CITY_PENDING,
  FETCH_CITY_REJECTED,
  FETCH_CITY_AUTOCOMPLETE_FULFILLED,
  FETCH_CITY_AUTOCOMPLETE_PENDING,
  FETCH_CITY_AUTOCOMPLETE_REJECTED,
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
  UNMOUNT_AREA,
  CREATE_CITY_PENDING,
  CREATE_CITY_FULFILLED,
  CREATE_CITY_REJECTED
} from "../actions/types";

const INITIAL_STATE = {
  countries: [],
  countriesFetchLoading: false,
  countryLoading: false,
  countryError: false,
  countryData: [],
  states: [],
  statesFetchLoading: false,
  stateLoading: false,
  stateError: false,
  stateData: [],
  districts: [],
  districtsFetchLoading: false,
  districtLoading: false,
  districtError: false,
  districtData: [],
  cities: [],
  citiesPages: 1,
  citiesRowCount: 0,
  citiesFetchLoading: false,
  cityLoading: false,
  cityError: false,
  cityData: [],
  citiesAutocomplete: [],
  citiesAutocompleteLoading: false,
  areas: [],
  areasPages: 1,
  areasRowCount: 0,
  areasFetchLoading: false,
  areaLoading: false,
  areaError: false,
  areaData: [],
  statusClass: "",
  loading: false
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
    case CREATE_DISTRICT_PENDING:
      return { ...state, districtLoading: true, districtError: false };
    case CREATE_DISTRICT_FULFILLED:
      return { ...state, districtLoading: false, districtError: false };
    case CREATE_DISTRICT_REJECTED:
      return { ...state, districtLoading: false, districtError: true };
    case FETCH_DISTRICT_PENDING:
      return { ...state, districtsFetchLoading: true };

    case FETCH_DISTRICT_FULFILLED:
      return {
        ...state,
        districts: action.payload.map((district, i) => ({
          ...district,
          s_no: i + 1
        })),
        districtsFetchLoading: false
      };

    case FETCH_DISTRICT_REJECTED:
      return { ...state, districtsFetchLoading: false };

    /*
      City
    */
    case CREATE_CITY_PENDING:
      return { ...state, cityLoading: true, cityError: false };
    case CREATE_CITY_FULFILLED:
      return { ...state, cityLoading: false, cityError: false };
    case CREATE_CITY_REJECTED:
      return { ...state, cityLoading: false, cityError: true };

    case FETCH_CITY_PENDING:
      return { ...state, citiesFetchLoading: true };

    case FETCH_CITY_FULFILLED:
      return {
        ...state,
        cities: action.payload.data.map((city, i) => ({
          ...city,
          s_no: action.payload.rows * (action.payload.page - 1) + i + 1
        })),
        citiesPages: action.payload.pages,
        citiesRowCount: action.payload.rowCount,
        citiesFetchLoading: false
      };

    case FETCH_CITY_REJECTED:
      return { ...state, citiesFetchLoading: false };

    case FETCH_CITY_AUTOCOMPLETE_FULFILLED:
      return {
        ...state,
        citiesAutocomplete: action.payload,
        citiesAutocompleteLoading: false
      };

    case FETCH_CITY_AUTOCOMPLETE_PENDING:
      return {
        ...state,
        citiesAutocomplete: [],
        citiesAutocompleteLoading: true
      };

    case FETCH_CITY_AUTOCOMPLETE_REJECTED:
      return { ...state, citiesAutocompleteLoading: false };

    /*
      Area
    */
    case CREATE_AREA_PENDING:
      return { ...state, areaLoading: true, areaError: false };
    case CREATE_AREA_FULFILLED:
      return { ...state, areaLoading: false, areaError: false };
    case CREATE_AREA_REJECTED:
      return { ...state, areaLoading: false, areaError: true };

    case FETCH_AREA_PENDING:
      return { ...state, areasFetchLoading: true };

    case FETCH_AREA_FULFILLED:
      return {
        ...state,
        areas: action.payload.data.map((area, i) => ({
          ...area,
          s_no: action.payload.rows * (action.payload.page - 1) + i + 1
        })),
        areasPages: action.payload.pages,
        areasRowCount: action.payload.rowCount,
        areasFetchLoading: false
      };

    case FETCH_AREA_REJECTED:
      return { ...state, areasFetchLoading: false };

    /*
      Others
    */
    case FETCH_ADDRESS_TREE_PENDING:
      return { ...state, loading: true };

    case FETCH_ADDRESS_TREE_FULFILLED:
      const countries = state.countries;
      const payload = action.payload;

      console.log("address payload: ", payload);
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

    case FETCH_COUNTRY_EACH_PENDING:
      return { ...state, loading: true };

    case FETCH_COUNTRY_EACH_FULFILLED:
      return {
        ...state,
        countryData: action.payload.states,
        loading: false,
        statusClass: "fulfilled"
      };

    case FETCH_COUNTRY_EACH_REJECTED:
      return { ...state, loading: false };

    case FETCH_STATE_EACH_PENDING:
      return { ...state, loading: true };

    case FETCH_STATE_EACH_FULFILLED:
      return {
        ...state,
        stateData: action.payload.districts,
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
        districtData: action.payload.cities,
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
        cityData: action.payload.areas,
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
