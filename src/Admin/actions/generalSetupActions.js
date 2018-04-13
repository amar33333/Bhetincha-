import {
  onAreaPost,
  onDistrictPost,
  onCityPost,
  onCountryPost,
  onStatePost,
  onCountryGet,
  onStateGet,
  onAreaGet,
  onDistrictGet,
  onCityGet
} from "../config/adminServerCall";
import {
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

  // UNMOUNT
  UNMOUNT_AREA,
  UNMOUNT_COUNTRY,
  UNMOUNT_STATES,
  UNMOUNT_DISTRICT,
  UNMOUNT_CITY
} from "./types";

export const onCountrySubmit = ({ country }) => dispatch => {
  console.log("coutnet: ", country);
  onCountryPost({ country })
    .then(response =>
      dispatch({ type: CREATE_COUNTRY_FULFILLED, payload: response.data })
    )
    .catch(error =>
      dispatch({ type: CREATE_COUNTRY_REJECTED, payload: error })
    );

  dispatch({ type: CREATE_COUNTRY_PENDING });
};

export const onCountryList = () => dispatch => {
  onCountryGet()
    .then(response =>
      dispatch({ type: FETCH_COUNTRY_FULFILLED, payload: response.data })
    )
    .catch(error => dispatch({ type: FETCH_COUNTRY_REJECTED, payload: error }));

  dispatch({ type: FETCH_COUNTRY_PENDING });
};

export const onStateSubmit = ({ state, country }) => dispatch => {
  onStatePost({ state, country })
    .then(response =>
      dispatch({ type: CREATE_STATE_FULFILLED, payload: response.data })
    )
    .catch(error => dispatch({ type: CREATE_STATE_REJECTED, payload: error }));

  dispatch({ type: CREATE_STATE_PENDING });
};

export const onStateList = () => dispatch => {
  onStateGet()
    .then(response =>
      dispatch({ type: FETCH_STATE_FULFILLED, payload: response.data })
    )
    .catch(error => dispatch({ type: FETCH_STATE_REJECTED, payload: error }));

  dispatch({ type: FETCH_STATE_PENDING });
};

export const onDistrictSubmit = ({
  state,
  district,
  districtCode
}) => dispatch => {
  onDistrictPost({ state, district, districtCode })
    .then(response =>
      dispatch({ type: CREATE_DISTRICT_FULFILLED, payload: response.data })
    )
    .catch(error =>
      dispatch({ type: CREATE_DISTRICT_REJECTED, payload: error })
    );

  dispatch({ type: CREATE_DISTRICT_PENDING });
};

export const onDistrictList = () => dispatch => {
  onDistrictGet()
    .then(response =>
      dispatch({ type: FETCH_DISTRICT_FULFILLED, payload: response.data })
    )
    .catch(error =>
      dispatch({ type: FETCH_DISTRICT_REJECTED, payload: error })
    );

  dispatch({ type: FETCH_DISTRICT_PENDING });
};

export const onCitySubmit = ({ district, city }) => dispatch => {
  onCityPost({ district, city })
    .then(response =>
      dispatch({ type: CREATE_CITY_FULFILLED, payload: response.data })
    )
    .catch(error => dispatch({ type: CREATE_CITY_REJECTED, payload: error }));

  dispatch({ type: CREATE_CITY_PENDING });
};

export const onCityList = () => dispatch => {
  onCityGet()
    .then(response =>
      dispatch({ type: FETCH_CITY_FULFILLED, payload: response.data })
    )
    .catch(error => dispatch({ type: FETCH_CITY_REJECTED, payload: error }));

  dispatch({ type: FETCH_CITY_PENDING });
};

export const onAreaSubmit = ({ city, area }) => dispatch => {
  onAreaPost({ city, area })
    .then(response =>
      dispatch({ type: CREATE_AREA_FULFILLED, payload: response.data })
    )
    .catch(error => dispatch({ type: CREATE_AREA_REJECTED, payload: error }));

  dispatch({ type: CREATE_AREA_PENDING });
};

export const onAreaList = () => dispatch => {
  onAreaGet()
    .then(response =>
      dispatch({ type: FETCH_AREA_FULFILLED, payload: response.data })
    )
    .catch(error => dispatch({ type: FETCH_AREA_REJECTED, payload: error }));

  dispatch({ type: FETCH_AREA_PENDING });
};

// export const onUnmountArea = () => ({
//   type: UNMOUNT_AREA,
//   payload: null
// });
