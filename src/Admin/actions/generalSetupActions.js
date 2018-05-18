import { toast } from "react-toastify";
import { Observable } from "rxjs/Observable";
import {
  onCountryPostAjax,
  onCountryGetAjax,
  onCountryEachDeleteAjax,
  onCountryEachGetAjax,
  onStatePostAjax,
  onStateGetAjax,
  onStateEachDeleteAjax,
  onStateEachGetAjax,
  onDistrictPostAjax,
  onDistrictGetAjax,
  onDistrictEachDeleteAjax,
  onDistrictEachGetAjax,
  onCityPostAjax,
  onCityGetAjax,
  onCityEachDeleteAjax,
  onCityEachGetAjax,
  onAreaPostAjax,
  onAreaGetAjax,
  onAreaEachDeleteAjax
} from "../config/adminServerCall";

import {
  // COUNTRY
  CREATE_COUNTRY_FULFILLED,
  CREATE_COUNTRY_REJECTED,
  CREATE_COUNTRY_PENDING,
  FETCH_COUNTRY_FULFILLED,
  FETCH_COUNTRY_PENDING,
  FETCH_COUNTRY_REJECTED,
  DELETE_COUNTRY_PENDING,
  DELETE_COUNTRY_FULFILLED,
  DELETE_COUNTRY_REJECTED,
  FETCH_COUNTRY_EACH_FULFILLED,
  FETCH_COUNTRY_EACH_REJECTED,
  FETCH_COUNTRY_EACH_PENDING,
  UNMOUNT_COUNTRY,
  // STATE
  CREATE_STATE_FULFILLED,
  CREATE_STATE_REJECTED,
  CREATE_STATE_PENDING,
  FETCH_STATE_FULFILLED,
  FETCH_STATE_PENDING,
  FETCH_STATE_REJECTED,
  FETCH_STATE_EACH_FULFILLED,
  FETCH_STATE_EACH_REJECTED,
  FETCH_STATE_EACH_PENDING,
  DELETE_STATE_PENDING,
  DELETE_STATE_FULFILLED,
  DELETE_STATE_REJECTED,
  UNMOUNT_STATE,
  // DISTRICT
  CREATE_DISTRICT_FULFILLED,
  CREATE_DISTRICT_REJECTED,
  CREATE_DISTRICT_PENDING,
  FETCH_DISTRICT_FULFILLED,
  FETCH_DISTRICT_PENDING,
  FETCH_DISTRICT_REJECTED,
  FETCH_DISTRICT_EACH_FULFILLED,
  FETCH_DISTRICT_EACH_REJECTED,
  FETCH_DISTRICT_EACH_PENDING,
  DELETE_DISTRICT_PENDING,
  DELETE_DISTRICT_FULFILLED,
  DELETE_DISTRICT_REJECTED,
  UNMOUNT_DISTRICT,
  // CITY
  CREATE_CITY_FULFILLED,
  CREATE_CITY_REJECTED,
  CREATE_CITY_PENDING,
  FETCH_CITY_FULFILLED,
  FETCH_CITY_PENDING,
  FETCH_CITY_REJECTED,
  FETCH_CITY_AUTOCOMPLETE_FULFILLED,
  FETCH_CITY_AUTOCOMPLETE_PENDING,
  FETCH_CITY_AUTOCOMPLETE_REJECTED,
  FETCH_CITY_EACH_FULFILLED,
  FETCH_CITY_EACH_REJECTED,
  FETCH_CITY_EACH_PENDING,
  DELETE_CITY_FULFILLED,
  DELETE_CITY_PENDING,
  DELETE_CITY_REJECTED,
  UNMOUNT_CITY,
  CLEAR_CITY_ALL,
  // AREA
  CREATE_AREA_FULFILLED,
  CREATE_AREA_REJECTED,
  CREATE_AREA_PENDING,
  FETCH_AREA_FULFILLED,
  FETCH_AREA_PENDING,
  FETCH_AREA_REJECTED,
  DELETE_AREA_FULFILLED,
  DELETE_AREA_PENDING,
  DELETE_AREA_REJECTED,
  UNMOUNT_AREA,
  // OTHERS
  FETCH_ADDRESS_TREE_LIST_PENDING,
  FETCH_ADDRESS_TREE_FULFILLED,
  FETCH_ADDRESS_TREE_REJECTED,
  FETCH_ADDRESS_TREE_PENDING
} from "./types";

const epics = [];

// COUNTRY
export const onCountrySubmit = payload => ({
  type: CREATE_COUNTRY_PENDING,
  payload
});

epics.push((action$, { getState }) =>
  action$.ofType(CREATE_COUNTRY_PENDING).mergeMap(({ payload }) => {
    const { country } = payload;
    const access_token = getState().auth.cookies.token_data.access_token;

    return onCountryPostAjax({ country, access_token })
      .concatMap(({ response }) => {
        if (response.msg === "success") {
          toast.success("Country added successfully!");
          return [
            { type: CREATE_COUNTRY_FULFILLED },
            { type: FETCH_COUNTRY_PENDING }
          ];
        } else {
          throw new Error(response.msg[Object.keys(response.msg)[0]][0]);
        }
      })
      .catch(ajaxError => {
        toast.error(ajaxError.toString());
        return Observable.of({
          type: CREATE_COUNTRY_REJECTED,
          payload: ajaxError
        });
      });
  })
);

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

export const onCountryDelete = payload => ({
  type: DELETE_COUNTRY_PENDING,
  payload
});

epics.push((action$, { getState }) =>
  action$.ofType(DELETE_COUNTRY_PENDING).mergeMap(({ payload }) =>
    onCountryEachDeleteAjax({
      id: payload.id,
      access_token: getState().auth.cookies.token_data.access_token
    })
      .concatMap(() => {
        toast.success("Deleted Successfully!");
        return [
          { type: FETCH_COUNTRY_PENDING },
          { type: DELETE_COUNTRY_FULFILLED }
        ];
      })
      .catch(ajaxError => {
        toast.error("Error Deleting Country");
        console.log(ajaxError);
        return Observable.of({ type: DELETE_COUNTRY_REJECTED });
      })
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

export const onUnmountCountry = () => ({ type: UNMOUNT_COUNTRY });

// STATE
export const onStateSubmit = payload => ({
  type: CREATE_STATE_PENDING,
  payload
});

epics.push((action$, { getState }) =>
  action$.ofType(CREATE_STATE_PENDING).mergeMap(({ payload }) => {
    const { state, country } = payload;
    const access_token = getState().auth.cookies.token_data.access_token;

    return onStatePostAjax({ country, state, access_token })
      .concatMap(({ response }) => {
        if (response.msg === "success") {
          toast.success("State added successfully!");
          return [
            { type: CREATE_STATE_FULFILLED },
            { type: FETCH_STATE_PENDING }
          ];
        } else {
          throw new Error(response.msg[Object.keys(response.msg)[0]][0]);
        }
      })
      .catch(ajaxError => {
        toast.error(ajaxError.toString());
        return Observable.of({
          type: CREATE_STATE_REJECTED,
          payload: ajaxError
        });
      });
  })
);

export const onStateList = () => ({ type: FETCH_STATE_PENDING });

epics.push((action$, { getState }) =>
  action$.ofType(FETCH_STATE_PENDING).mergeMap(action =>
    onStateGetAjax({
      access_token: getState().auth.cookies.token_data.access_token
    })
      .map(({ response }) => ({
        type: FETCH_STATE_FULFILLED,
        payload: response
      }))
      .catch(ajaxError => Observable.of({ type: FETCH_STATE_REJECTED }))
  )
);

export const onStateDelete = payload => ({
  type: DELETE_STATE_PENDING,
  payload
});

epics.push((action$, { getState }) =>
  action$.ofType(DELETE_STATE_PENDING).mergeMap(({ payload }) =>
    onStateEachDeleteAjax({
      id: payload.id,
      access_token: getState().auth.cookies.token_data.access_token
    })
      .concatMap(() => {
        toast.success("Deleted Successfully!");
        return [
          { type: FETCH_STATE_PENDING },
          { type: DELETE_STATE_FULFILLED }
        ];
      })
      .catch(ajaxError => {
        toast.error("Error Deleting State");
        console.log(ajaxError);
        return Observable.of({ type: DELETE_STATE_REJECTED });
      })
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

export const onUnmountState = () => ({ type: UNMOUNT_STATE });

// DISTRICT
export const onDistrictSubmit = payload => ({
  type: CREATE_DISTRICT_PENDING,
  payload
});

epics.push((action$, { getState }) =>
  action$.ofType(CREATE_DISTRICT_PENDING).mergeMap(({ payload }) => {
    const { state, district, districtCode } = payload;
    const access_token = getState().auth.cookies.token_data.access_token;

    return onDistrictPostAjax({ state, district, districtCode, access_token })
      .concatMap(({ response }) => {
        if (response.msg === "success") {
          toast.success("District added successfully!");
          return [
            { type: CREATE_DISTRICT_FULFILLED },
            { type: FETCH_DISTRICT_PENDING }
          ];
        } else {
          throw new Error(response.msg[Object.keys(response.msg)[0]][0]);
        }
      })
      .catch(ajaxError => {
        toast.error(ajaxError.toString());
        return Observable.of({
          type: CREATE_DISTRICT_REJECTED,
          payload: ajaxError
        });
      });
  })
);

export const onDistrictList = () => ({ type: FETCH_DISTRICT_PENDING });

epics.push((action$, { getState }) =>
  action$.ofType(FETCH_DISTRICT_PENDING).mergeMap(action =>
    onDistrictGetAjax({
      access_token: getState().auth.cookies.token_data.access_token
    })
      .map(({ response }) => ({
        type: FETCH_DISTRICT_FULFILLED,
        payload: response
      }))
      .catch(ajaxError => Observable.of({ type: FETCH_DISTRICT_REJECTED }))
  )
);

export const onDistrictDelete = payload => ({
  type: DELETE_DISTRICT_PENDING,
  payload
});

epics.push((action$, { getState }) =>
  action$.ofType(DELETE_DISTRICT_PENDING).mergeMap(({ payload }) =>
    onDistrictEachDeleteAjax({
      id: payload.id,
      access_token: getState().auth.cookies.token_data.access_token
    })
      .concatMap(() => {
        toast.success("Deleted Successfully!");
        return [
          { type: FETCH_DISTRICT_PENDING },
          { type: DELETE_DISTRICT_FULFILLED }
        ];
      })
      .catch(ajaxError => {
        toast.error("Error Deleting State");
        console.log(ajaxError);
        return Observable.of({ type: DELETE_DISTRICT_REJECTED });
      })
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

export const onUnmountDistrict = () => ({ type: UNMOUNT_DISTRICT });

// CITY
export const onCitySubmit = payload => ({
  type: CREATE_CITY_PENDING,
  payload
});

epics.push((action$, { getState }) =>
  action$.ofType(CREATE_CITY_PENDING).mergeMap(({ payload }) => {
    const { district, city } = payload;
    const access_token = getState().auth.cookies.token_data.access_token;

    return onCityPostAjax({ district, city, access_token })
      .concatMap(({ response }) => {
        if (response.msg === "success") {
          toast.success("City added successfully!");
          return [
            { type: CREATE_CITY_FULFILLED },
            { type: FETCH_CITY_PENDING }
          ];
        } else {
          throw new Error(response.msg[Object.keys(response.msg)[0]][0]);
        }
      })
      .catch(ajaxError => {
        toast.error(ajaxError.toString());
        return Observable.of({
          type: CREATE_CITY_REJECTED,
          payload: ajaxError
        });
      });
  })
);

export const onCityList = payload => ({ type: FETCH_CITY_PENDING, payload });

epics.push((action$, { getState }) =>
  action$.ofType(FETCH_CITY_PENDING).switchMap(({ payload }) => {
    const {
      rows,
      page,
      name,
      filterDistrict,
      filterState,
      filterCountry,
      sortby
    } = getState().AdminContainer.filterCity;
    const params = {};
    params.rows = rows;
    params.page = page;
    if (name) params.name = name;
    params.sortby = sortby.map(data => `${data.id}${data.desc ? "-desc" : ""}`);

    if (payload) {
      if (payload.rows) params.rows = payload.rows;
      if (payload.page) params.page = payload.page;
    }

    if (filterDistrict.length)
      params.district = filterDistrict.map(district => district.id);
    if (filterState.length) params.state = filterState.map(state => state.id);
    if (filterCountry.length)
      params.country = filterCountry.map(country => country.id);

    return onCityGetAjax({
      access_token: getState().auth.cookies.token_data.access_token,
      params
    })
      .map(({ response }) => ({
        type: FETCH_CITY_FULFILLED,
        payload: response
      }))
      .catch(ajaxError => Observable.of({ type: FETCH_CITY_REJECTED }));
  })
);

export const onCityDelete = payload => ({
  type: DELETE_CITY_PENDING,
  payload
});

epics.push((action$, { getState }) =>
  action$.ofType(DELETE_CITY_PENDING).mergeMap(({ payload }) =>
    onCityEachDeleteAjax({
      id: payload.id,
      access_token: getState().auth.cookies.token_data.access_token
    })
      .concatMap(() => {
        toast.success("Deleted Successfully!");
        return [{ type: FETCH_CITY_PENDING }, { type: DELETE_CITY_FULFILLED }];
      })
      .catch(ajaxError => {
        toast.error("Error Deleting State");
        console.log(ajaxError);
        return Observable.of({ type: DELETE_CITY_REJECTED });
      })
  )
);

export const onClearCityFilters = () => ({ type: CLEAR_CITY_ALL });

export const onCityAutocomplete = payload => ({
  type: FETCH_CITY_AUTOCOMPLETE_PENDING,
  payload
});

epics.push((action$, { getState }) =>
  action$.ofType(FETCH_CITY_AUTOCOMPLETE_PENDING).switchMap(({ payload }) => {
    const {
      filterDistrict,
      filterState,
      filterCountry
    } = getState().AdminContainer.filterArea;
    const params = {};
    params.keyword = (payload && payload.keyword) || "";

    if (filterDistrict.length)
      params.district = filterDistrict.map(district => district.id);
    if (filterState.length) params.state = filterState.map(state => state.id);
    if (filterCountry.length)
      params.country = filterCountry.map(country => country.id);

    return onCityGetAjax({
      access_token: getState().auth.cookies.token_data.access_token,
      params
    })
      .map(({ response }) => ({
        type: FETCH_CITY_AUTOCOMPLETE_FULFILLED,
        payload: response
      }))
      .catch(ajaxError =>
        Observable.of({ type: FETCH_CITY_AUTOCOMPLETE_REJECTED })
      );
  })
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

export const onUnmountCity = () => ({ type: UNMOUNT_CITY });

// AREA
export const onAreaSubmit = payload => ({
  type: CREATE_AREA_PENDING,
  payload
});

epics.push((action$, { getState }) =>
  action$.ofType(CREATE_AREA_PENDING).mergeMap(({ payload }) => {
    const { city, area } = payload;
    const access_token = getState().auth.cookies.token_data.access_token;

    return onAreaPostAjax({ city, area, access_token })
      .concatMap(({ response }) => {
        if (response.msg === "success") {
          toast.success("Area added successfully!");
          return [
            { type: CREATE_AREA_FULFILLED },
            { type: FETCH_AREA_PENDING }
          ];
        } else {
          throw new Error(response.msg[Object.keys(response.msg)[0]][0]);
        }
      })
      .catch(ajaxError => {
        toast.error(ajaxError.toString());
        return Observable.of({
          type: CREATE_AREA_REJECTED,
          payload: ajaxError
        });
      });
  })
);

export const onAreaList = payload => ({ type: FETCH_AREA_PENDING, payload });

epics.push((action$, { getState }) =>
  action$.ofType(FETCH_AREA_PENDING).switchMap(({ payload }) => {
    const {
      rows,
      page,
      name,
      filterCity,
      filterDistrict,
      filterState,
      filterCountry,
      sortby
    } = getState().AdminContainer.filterArea;
    const params = {};
    params.rows = rows;
    params.page = page;
    if (name) params.name = name;
    params.sortby = sortby.map(data => `${data.id}${data.desc ? "-desc" : ""}`);

    if (payload) {
      if (payload.rows) params.rows = payload.rows;
      if (payload.page) params.page = payload.page;
    }

    if (filterCity.length) params.city = filterCity.map(city => city.id);
    if (filterDistrict.length)
      params.district = filterDistrict.map(district => district.id);
    if (filterState.length) params.state = filterState.map(state => state.id);
    if (filterCountry.length)
      params.country = filterCountry.map(country => country.id);

    return onAreaGetAjax({
      access_token: getState().auth.cookies.token_data.access_token,
      params
    })
      .map(({ response }) => ({
        type: FETCH_AREA_FULFILLED,
        payload: response
      }))
      .catch(ajaxError => Observable.of({ type: FETCH_AREA_REJECTED }));
  })
);

export const onAreaDelete = payload => ({
  type: DELETE_AREA_PENDING,
  payload
});

epics.push((action$, { getState }) =>
  action$.ofType(DELETE_AREA_PENDING).mergeMap(({ payload }) =>
    onAreaEachDeleteAjax({
      id: payload.id,
      access_token: getState().auth.cookies.token_data.access_token
    })
      .concatMap(() => {
        toast.success("Deleted Successfully!");
        return [{ type: FETCH_AREA_PENDING }, { type: DELETE_AREA_FULFILLED }];
      })
      .catch(ajaxError => {
        toast.error("Error Deleting State");
        console.log(ajaxError);
        return Observable.of({ type: DELETE_AREA_REJECTED });
      })
  )
);

export const onUnmountArea = () => ({ type: UNMOUNT_AREA });

// Not Used till now...
// export const onAddressTreeListAllImmediate = ({
//   id,
//   access_token
// }) => dispatch => {
//   const { countryId, stateId, districtId, cityId } = id;

//   onCountryEachGet({ countryId, access_token })
//     .then(response =>
//       onStateEachGet({ stateId, access_token })
//         .then(response =>
//           onDistrictEachGet({ districtId, access_token })
//             .then(response =>
//               onCityEachGet({ cityId, access_token })
//                 .then(response =>
//                   dispatch({
//                     type: FETCH_ADDRESS_TREE_FULFILLED,
//                     payload: response.data
//                   })
//                 )
//                 .catch(error =>
//                   dispatch({
//                     type: FETCH_ADDRESS_TREE_REJECTED,
//                     payload: error
//                   })
//                 )
//             )
//             .catch(error =>
//               dispatch({ type: FETCH_ADDRESS_TREE_REJECTED, payload: error })
//             )
//         )
//         .catch(error =>
//           dispatch({ type: FETCH_ADDRESS_TREE_REJECTED, payload: error })
//         )
//     )
//     .catch(error =>
//       dispatch({ type: FETCH_ADDRESS_TREE_REJECTED, payload: error })
//     );
//   dispatch({ type: FETCH_ADDRESS_TREE_PENDING });
// };

export const onAddressTreeList = payload => ({
  type: FETCH_ADDRESS_TREE_LIST_PENDING,
  payload
});

epics.push((action$, { getState }) =>
  action$
    .ofType(FETCH_ADDRESS_TREE_LIST_PENDING)
    .mergeMap(({ payload }) => {
      const { id, ADDRESS_KEY } = payload;
      const access_token = getState().auth.cookies.token_data.access_token;

      if (ADDRESS_KEY === "country") {
        return onCountryEachGetAjax({ id, access_token }).map(
          ({ response }) => {
            console.log("address tree response: ", response);
            return {
              type: FETCH_ADDRESS_TREE_FULFILLED,
              payload: response
            };
          }
        );
      } else if (ADDRESS_KEY === "state") {
        return onStateEachGetAjax({ id, access_token }).map(({ response }) => {
          return {
            type: FETCH_ADDRESS_TREE_FULFILLED,
            payload: response
          };
        });
      } else if (ADDRESS_KEY === "district") {
        return onDistrictEachGetAjax({ id, access_token }).map(
          ({ response }) => {
            return {
              type: FETCH_ADDRESS_TREE_FULFILLED,
              payload: response
            };
          }
        );
      } else if (ADDRESS_KEY === "city") {
        return onCityEachGetAjax({ id, access_token }).map(({ response }) => {
          return {
            type: FETCH_ADDRESS_TREE_FULFILLED,
            payload: response
          };
        });
      }
    })
    .catch(ajaxError => {
      console.log("address tree error: ", ajaxError);
      return Observable.of({ type: FETCH_ADDRESS_TREE_REJECTED });
    })
);

// export const onAddressTreeList = ({
//   id,
//   access_token,
//   ADDRESS_KEY
// }) => dispatch => {
//   console.log("address key: ", ADDRESS_KEY);
//   if (ADDRESS_KEY === "country") {
//     console.log("addreskey: ", ADDRESS_KEY);
//     onCountryEachGet({ id, access_token })
//       .then(response =>
//         dispatch({
//           type: FETCH_ADDRESS_TREE_FULFILLED,
//           payload: response.data
//         })
//       )
//       .catch(error =>
//         dispatch({ type: FETCH_ADDRESS_TREE_REJECTED, payload: error })
//       );
//   } else if (ADDRESS_KEY === "state")
//     onStateEachGet({ id, access_token })
//       .then(response =>
//         dispatch({
//           type: FETCH_ADDRESS_TREE_FULFILLED,
//           payload: response.data
//         })
//       )
//       .catch(error =>
//         dispatch({ type: FETCH_ADDRESS_TREE_REJECTED, payload: error })
//       );
//   else if (ADDRESS_KEY === "district")
//     onDistrictEachGet({ id, access_token })
//       .then(response =>
//         dispatch({
//           type: FETCH_ADDRESS_TREE_FULFILLED,
//           payload: response.data
//         })
//       )
//       .catch(error =>
//         dispatch({ type: FETCH_ADDRESS_TREE_REJECTED, payload: error })
//       );
//   else if (ADDRESS_KEY === "city")
//     onCityEachGet({ id, access_token })
//       .then(response =>
//         dispatch({
//           type: FETCH_ADDRESS_TREE_FULFILLED,
//           payload: response.data
//         })
//       )
//       .catch(error =>
//         dispatch({ type: FETCH_ADDRESS_TREE_REJECTED, payload: error })
//       );

//   dispatch({ type: FETCH_ADDRESS_TREE_PENDING });
// };

export default epics;
