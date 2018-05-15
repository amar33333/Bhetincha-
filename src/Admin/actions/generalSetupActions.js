import { toast } from "react-toastify";
import { Observable } from "rxjs/Observable";
import {
  onAreaPost,
  onDistrictPost,
  onCityPost,
  onCountryPost,
  onCountryPostAjax,
  onStatePost,
  onStatePostAjax,
  onCountryGetAjax,
  onStateGet,
  onStateGetAjax,
  onStateEachDeleteAjax,
  onAreaGet,
  onDistrictGet,
  onDistrictGetAjax,
  onDistrictEachDeleteAjax,
  onCityGet,
  onCountryEachGet,
  onStateEachGet,
  onDistrictEachGet,
  onCityEachGet,
  onCountryEachDeleteAjax,
  onCountryEachGetAjax,
  onStateEachGetAjax,
  onDistrictEachGetAjax,
  onCityEachGetAjax
} from "../config/adminServerCall";

import {
  FETCH_ADDRESS_TREE_FULFILLED,
  FETCH_ADDRESS_TREE_REJECTED,
  FETCH_ADDRESS_TREE_PENDING,

  // AREA
  CREATE_AREA_FULFILLED,
  CREATE_AREA_REJECTED,
  CREATE_AREA_PENDING,

  // COUNTRY
  CREATE_COUNTRY_FULFILLED,
  CREATE_COUNTRY_REJECTED,
  CREATE_COUNTRY_PENDING,

  // STATE
  CREATE_STATE_FULFILLED,
  CREATE_STATE_REJECTED,
  CREATE_STATE_PENDING,

  // DISTRICT
  CREATE_DISTRICT_FULFILLED,
  CREATE_DISTRICT_REJECTED,
  CREATE_DISTRICT_PENDING,

  // CITY
  CREATE_CITY_FULFILLED,
  CREATE_CITY_REJECTED,
  CREATE_CITY_PENDING,
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
  FETCH_COUNTRY_EACH_FULFILLED,
  FETCH_COUNTRY_EACH_REJECTED,
  FETCH_COUNTRY_EACH_PENDING,
  FETCH_DISTRICT_EACH_FULFILLED,
  FETCH_DISTRICT_EACH_REJECTED,
  FETCH_DISTRICT_EACH_PENDING,
  FETCH_STATE_EACH_FULFILLED,
  FETCH_STATE_EACH_REJECTED,
  FETCH_STATE_EACH_PENDING,
  FETCH_CITY_EACH_FULFILLED,
  FETCH_CITY_EACH_REJECTED,
  FETCH_CITY_EACH_PENDING,
  DELETE_COUNTRY_PENDING,
  DELETE_COUNTRY_FULFILLED,
  DELETE_COUNTRY_REJECTED,
  DELETE_STATE_PENDING,
  DELETE_STATE_FULFILLED,
  DELETE_STATE_REJECTED,
  DELETE_DISTRICT_PENDING,
  DELETE_DISTRICT_FULFILLED,
  DELETE_DISTRICT_REJECTED,
  FETCH_ADDRESS_TREE_LIST_PENDING,

  // UNMOUNT
  UNMOUNT_AREA,
  // UNMOUNT_COUNTRY,
  // UNMOUNT_STATES,
  UNMOUNT_DISTRICT,
  UNMOUNT_CITY
} from "./types";

const epics = [];

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

export const onDistrictSubmit = ({
  state,
  district,
  districtCode,
  access_token
}) => dispatch => {
  onDistrictPost({ state, district, districtCode, access_token })
    .then(response => {
      if (response.data.msg === "success") {
        toast.success("New District Added Successfully!");
      } else {
        response.data.msg.name.map(msg => {
          toast.error(msg);
        });
      }
      dispatch({ type: CREATE_DISTRICT_FULFILLED, payload: response.data });
      dispatch({ type: FETCH_DISTRICT_PENDING });
    })
    .catch(error => {
      toast.error("New District not added!");
      dispatch({ type: CREATE_DISTRICT_REJECTED, payload: error });
    });

  dispatch({ type: CREATE_DISTRICT_PENDING });
};

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

// export const onDistrictList = ({ access_token }) => dispatch => {
//   onDistrictGet({ access_token })
//     .then(response =>
//       dispatch({ type: FETCH_DISTRICT_FULFILLED, payload: response.data })
//     )
//     .catch(error =>
//       dispatch({ type: FETCH_DISTRICT_REJECTED, payload: error })
//     );

//   dispatch({ type: FETCH_DISTRICT_PENDING });
// };

export const onCitySubmit = ({ district, city, access_token }) => dispatch => {
  onCityPost({ district, city, access_token })
    .then(response => {
      if (response.data.msg === "success") {
        toast.success("New City Added Successfully!");
      } else {
        response.data.msg.name.map(msg => {
          toast.error(msg);
        });
      }
      dispatch({ type: CREATE_CITY_FULFILLED, payload: response.data });
    })
    .catch(error => {
      toast.error("New City not added !");
      dispatch({ type: CREATE_CITY_REJECTED, payload: error });
    });

  dispatch({ type: CREATE_CITY_PENDING });
};

export const onCityList = ({ access_token }) => dispatch => {
  onCityGet({ access_token })
    .then(response =>
      dispatch({ type: FETCH_CITY_FULFILLED, payload: response.data })
    )
    .catch(error => dispatch({ type: FETCH_CITY_REJECTED, payload: error }));

  dispatch({ type: FETCH_CITY_PENDING });
};

export const onAreaSubmit = ({ city, area, access_token }) => dispatch => {
  onAreaPost({ city, area, access_token })
    .then(response => {
      if (response.data.msg === "success") {
        toast.success("New Area Added Successfully!");
      } else {
        response.data.msg.name.map(msg => {
          toast.error(msg);
        });
      }
      dispatch({ type: CREATE_AREA_FULFILLED, payload: response.data });
    })
    .catch(error => {
      toast.error("New Area not added !");
      dispatch({ type: CREATE_AREA_REJECTED, payload: error });
    });

  dispatch({ type: CREATE_AREA_PENDING });
};

export const onAreaList = ({ access_token }) => dispatch => {
  onAreaGet({ access_token })
    .then(response =>
      dispatch({ type: FETCH_AREA_FULFILLED, payload: response.data })
    )
    .catch(error => dispatch({ type: FETCH_AREA_REJECTED, payload: error }));

  dispatch({ type: FETCH_AREA_PENDING });
};

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

export const onCountryEachList = payload => ({
  type: FETCH_COUNTRY_EACH_PENDING,
  payload
});

epics.push((action$, { getState }) =>
  action$.ofType(FETCH_COUNTRY_EACH_PENDING).mergeMap(({ payload }) =>
    onCountryEachGet({
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
    onStateEachGet({
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

// export const onCountryEachList = ({ id, access_token }) => dispatch => {
//   onCountryEachGet({ id, access_token })
//     .then(response =>
//       dispatch({ type: FETCH_COUNTRY_EACH_FULFILLED, payload: response.data })
//     )
//     .catch(error =>
//       dispatch({ type: FETCH_COUNTRY_EACH_REJECTED, payload: error })
//     );

//   dispatch({ type: FETCH_COUNTRY_EACH_PENDING });
// };

// export const onStateEachList = ({ id, access_token }) => dispatch => {
//   onStateEachGet({ id, access_token })
//     .then(response =>
//       dispatch({ type: FETCH_STATE_EACH_FULFILLED, payload: response.data })
//     )
//     .catch(error =>
//       dispatch({ type: FETCH_STATE_EACH_REJECTED, payload: error })
//     );

//   dispatch({ type: FETCH_STATE_EACH_PENDING });
// };

export const onDistrictEachList = payload => ({
  type: FETCH_DISTRICT_EACH_PENDING,
  payload
});

epics.push((action$, { getState }) =>
  action$.ofType(FETCH_DISTRICT_EACH_PENDING).mergeMap(({ payload }) =>
    onDistrictEachGet({
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

// export const onDistrictEachList = ({ id, access_token }) => dispatch => {
//   onDistrictEachGet({ id, access_token })
//     .then(response =>
//       dispatch({ type: FETCH_DISTRICT_EACH_FULFILLED, payload: response.data })
//     )
//     .catch(error =>
//       dispatch({ type: FETCH_DISTRICT_EACH_REJECTED, payload: error })
//     );

//   dispatch({ type: FETCH_DISTRICT_EACH_PENDING });
// };

export const onCityEachList = payload => ({
  type: FETCH_CITY_EACH_PENDING,
  payload
});

epics.push((action$, { getState }) =>
  action$.ofType(FETCH_CITY_EACH_PENDING).mergeMap(({ payload }) =>
    onCityEachGet({
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

// export const onCityEachList = ({ id, access_token }) => dispatch => {
//   onCityEachGet({ id, access_token })
//     .then(response =>
//       dispatch({ type: FETCH_CITY_EACH_FULFILLED, payload: response.data })
//     )
//     .catch(error =>
//       dispatch({ type: FETCH_CITY_EACH_REJECTED, payload: error })
//     );

//   dispatch({ type: FETCH_CITY_EACH_PENDING });
// };

export const onUnmountDistrict = () => {
  return {
    type: UNMOUNT_DISTRICT,
    payload: null
  };
};

export const onUnmountCity = () => {
  return {
    type: UNMOUNT_CITY,
    payload: null
  };
};

export const onUnmountArea = () => {
  return {
    type: UNMOUNT_AREA,
    payload: null
  };
};

// export const onUnmountArea = () => ({
//   type: UNMOUNT_AREA,
//   payload: null
// });

export default epics;
