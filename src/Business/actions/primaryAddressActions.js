import { toast } from "react-toastify";
import { Observable } from "rxjs/Observable";

import {
  // onAreaPost,
  // onDistrictPost,
  // onCityPost,
  // onCountryPost,
  // onStatePost,
  onCountryGet,
  onCountryGetAjax,
  onStateGet,
  onAreaGet,
  onDistrictGet,
  onCityGet,
  onCountryEachGet,
  onStateEachGet,
  onDistrictEachGet,
  onCityEachGet,
  onCountryEachGetAjax,
  onStateEachGetAjax,
  onDistrictEachGetAjax,
  onCityEachGetAjax
} from "../../Admin/config/adminServerCall";
import {
  FETCH_ADDRESS_TREE_FULFILLED,
  FETCH_ADDRESS_TREE_REJECTED,
  FETCH_ADDRESS_TREE_LIST_PENDING,

  // AREA
  FETCH_AREA_FULFILLED,
  FETCH_AREA_REJECTED,
  FETCH_AREA_PENDING,

  // COUNTRY
  FETCH_COUNTRY_EACH_FULFILLED,
  FETCH_COUNTRY_EACH_REJECTED,
  FETCH_COUNTRY_EACH_PENDING,
  FETCH_COUNTRY_FULFILLED,
  FETCH_COUNTRY_REJECTED,
  FETCH_COUNTRY_PENDING,

  // STATE
  FETCH_STATE_EACH_FULFILLED,
  FETCH_STATE_EACH_REJECTED,
  FETCH_STATE_EACH_PENDING,
  FETCH_STATE_FULFILLED,
  FETCH_STATE_REJECTED,
  FETCH_STATE_PENDING,

  // DISTRICT
  FETCH_DISTRICT_EACH_FULFILLED,
  FETCH_DISTRICT_EACH_REJECTED,
  FETCH_DISTRICT_EACH_PENDING,
  FETCH_DISTRICT_FULFILLED,
  FETCH_DISTRICT_REJECTED,
  FETCH_DISTRICT_PENDING,

  // CITY
  FETCH_CITY_EACH_FULFILLED,
  FETCH_CITY_EACH_REJECTED,
  FETCH_CITY_EACH_PENDING,
  FETCH_CITY_FULFILLED,
  FETCH_CITY_REJECTED,
  FETCH_CITY_PENDING,

  // UNMOUNT
  // UNMOUNT_COUNTRY,
  // UNMOUNT_STATES
  UNMOUNT_DISTRICT,
  UNMOUNT_CITY,
  UNMOUNT_AREA
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

// export const onCountryList = ({ access_token }) => dispatch => {
//   onCountryGet({ access_token })
//     .then(response =>
//       dispatch({ type: FETCH_COUNTRY_FULFILLED, payload: response.data })
//     )
//     .catch(error => dispatch({ type: FETCH_COUNTRY_REJECTED, payload: error }));

//   dispatch({ type: FETCH_COUNTRY_PENDING });
// };

export const onCountryEachList = ({ id, access_token }) => dispatch => {
  onCountryEachGet({ id, access_token })
    .then(response =>
      dispatch({ type: FETCH_COUNTRY_EACH_FULFILLED, payload: response.data })
    )
    .catch(error =>
      dispatch({ type: FETCH_COUNTRY_EACH_REJECTED, payload: error })
    );

  dispatch({ type: FETCH_COUNTRY_EACH_PENDING });
};

export const onStateList = ({ access_token }) => dispatch => {
  onStateGet({ access_token })
    .then(response =>
      dispatch({ type: FETCH_STATE_FULFILLED, payload: response.data })
    )
    .catch(error => dispatch({ type: FETCH_STATE_REJECTED, payload: error }));

  dispatch({ type: FETCH_STATE_PENDING });
};

export const onStateEachList = ({ id, access_token }) => dispatch => {
  onStateEachGet({ id, access_token })
    .then(response =>
      dispatch({ type: FETCH_STATE_EACH_FULFILLED, payload: response.data })
    )
    .catch(error =>
      dispatch({ type: FETCH_STATE_EACH_REJECTED, payload: error })
    );

  dispatch({ type: FETCH_STATE_EACH_PENDING });
};

export const onDistrictList = ({ access_token }) => dispatch => {
  onDistrictGet({ access_token })
    .then(response =>
      dispatch({ type: FETCH_DISTRICT_FULFILLED, payload: response.data })
    )
    .catch(error =>
      dispatch({ type: FETCH_DISTRICT_REJECTED, payload: error })
    );

  dispatch({ type: FETCH_DISTRICT_PENDING });
};

export const onDistrictEachList = ({ id, access_token }) => dispatch => {
  onDistrictEachGet({ id, access_token })
    .then(response =>
      dispatch({ type: FETCH_DISTRICT_EACH_FULFILLED, payload: response.data })
    )
    .catch(error =>
      dispatch({ type: FETCH_DISTRICT_EACH_REJECTED, payload: error })
    );

  dispatch({ type: FETCH_DISTRICT_EACH_PENDING });
};

export const onCityList = ({ access_token }) => dispatch => {
  onCityGet({ access_token })
    .then(response =>
      dispatch({ type: FETCH_CITY_FULFILLED, payload: response.data })
    )
    .catch(error => dispatch({ type: FETCH_CITY_REJECTED, payload: error }));

  dispatch({ type: FETCH_CITY_PENDING });
};

export const onCityEachList = ({ id, access_token }) => dispatch => {
  onCityEachGet({ id, access_token })
    .then(response =>
      dispatch({ type: FETCH_CITY_EACH_FULFILLED, payload: response.data })
    )
    .catch(error =>
      dispatch({ type: FETCH_CITY_EACH_REJECTED, payload: error })
    );

  dispatch({ type: FETCH_CITY_EACH_PENDING });
};

export const onAreaList = ({ access_token }) => dispatch => {
  onAreaGet({ access_token })
    .then(response =>
      dispatch({ type: FETCH_AREA_FULFILLED, payload: response.data })
    )
    .catch(error => dispatch({ type: FETCH_AREA_REJECTED, payload: error }));

  dispatch({ type: FETCH_AREA_PENDING });
};

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

// export const onCountrySubmit = ({ country, access_token }) => dispatch => {
//   onCountryPost({ country, access_token })
//     .then(response =>
//       dispatch({ type: CREATE_COUNTRY_FULFILLED, payload: response.data })
//     )
//     .catch(error =>
//       dispatch({ type: CREATE_COUNTRY_REJECTED, payload: error })
//     );

//   dispatch({ type: CREATE_COUNTRY_PENDING });
// };

// export const onStateSubmit = ({ state, country, access_token }) => dispatch => {
//   onStatePost({ state, country, access_token })
//     .then(response =>
//       dispatch({ type: CREATE_STATE_FULFILLED, payload: response.data })
//     )
//     .catch(error => dispatch({ type: CREATE_STATE_REJECTED, payload: error }));

//   dispatch({ type: CREATE_STATE_PENDING });
// };

// export const onDistrictSubmit = ({
//   state,
//   district,
//   districtCode,
//   access_token
// }) => dispatch => {
//   onDistrictPost({ state, district, districtCode, access_token })
//     .then(response =>
//       dispatch({ type: CREATE_DISTRICT_FULFILLED, payload: response.data })
//     )
//     .catch(error =>
//       dispatch({ type: CREATE_DISTRICT_REJECTED, payload: error })
//     );

//   dispatch({ type: CREATE_DISTRICT_PENDING });
// };

// export const onCitySubmit = ({ district, city, access_token }) => dispatch => {
//   onCityPost({ district, city, access_token })
//     .then(response =>
//       dispatch({ type: CREATE_CITY_FULFILLED, payload: response.data })
//     )
//     .catch(error => dispatch({ type: CREATE_CITY_REJECTED, payload: error }));

//   dispatch({ type: CREATE_CITY_PENDING });
// };

// export const onAreaSubmit = ({ city, area, access_token }) => dispatch => {
//   onAreaPost({ city, area, access_token })
//     .then(response =>
//       dispatch({ type: CREATE_AREA_FULFILLED, payload: response.data })
//     )
//     .catch(error => dispatch({ type: CREATE_AREA_REJECTED, payload: error }));

//   dispatch({ type: CREATE_AREA_PENDING });
// };

// export const onUnmountArea = () => ({
//   type: UNMOUNT_AREA,
//   payload: null
// });

export default epics;
