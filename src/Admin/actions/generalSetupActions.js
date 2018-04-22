<<<<<<< HEAD
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
  onCityGet,
  onCountryEachGet,
  onStateEachGet,
  onDistrictEachGet,
  onCityEachGet
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
  FETCH_COUNTRY_EACH_FULFILLED,
  FETCH_COUNTRY_EACH_REJECTED,
  FETCH_COUNTRY_EACH_PENDING,

  // STATE
  CREATE_STATE_FULFILLED,
  CREATE_STATE_REJECTED,
  CREATE_STATE_PENDING,
  FETCH_STATE_EACH_FULFILLED,
  FETCH_STATE_EACH_REJECTED,
  FETCH_STATE_EACH_PENDING,

  // DISTRICT
  CREATE_DISTRICT_FULFILLED,
  CREATE_DISTRICT_REJECTED,
  CREATE_DISTRICT_PENDING,
  FETCH_DISTRICT_EACH_FULFILLED,
  FETCH_DISTRICT_EACH_REJECTED,
  FETCH_DISTRICT_EACH_PENDING,

  // CITY
  CREATE_CITY_FULFILLED,
  CREATE_CITY_REJECTED,
  CREATE_CITY_PENDING,
  FETCH_CITY_EACH_FULFILLED,
  FETCH_CITY_EACH_REJECTED,
  FETCH_CITY_EACH_PENDING,
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
  // UNMOUNT_COUNTRY,
  // UNMOUNT_STATES,
  UNMOUNT_DISTRICT,
  UNMOUNT_CITY
} from "./types";

export const onCountrySubmit = ({ country, access_token }) => dispatch => {
  onCountryPost({ country, access_token })
    .then(response =>
      dispatch({ type: CREATE_COUNTRY_FULFILLED, payload: response.data })
    )
    .catch(error =>
      dispatch({ type: CREATE_COUNTRY_REJECTED, payload: error })
    );

  dispatch({ type: CREATE_COUNTRY_PENDING });
};

export const onCountryList = ({ access_token }) => dispatch => {
  onCountryGet({ access_token })
    .then(response =>
      dispatch({ type: FETCH_COUNTRY_FULFILLED, payload: response.data })
    )
    .catch(error => dispatch({ type: FETCH_COUNTRY_REJECTED, payload: error }));

  dispatch({ type: FETCH_COUNTRY_PENDING });
};

export const onStateSubmit = ({ state, country, access_token }) => dispatch => {
  onStatePost({ state, country, access_token })
    .then(response =>
      dispatch({ type: CREATE_STATE_FULFILLED, payload: response.data })
    )
    .catch(error => dispatch({ type: CREATE_STATE_REJECTED, payload: error }));

  dispatch({ type: CREATE_STATE_PENDING });
};

export const onStateList = ({ access_token }) => dispatch => {
  onStateGet({ access_token })
    .then(response =>
      dispatch({ type: FETCH_STATE_FULFILLED, payload: response.data })
    )
    .catch(error => dispatch({ type: FETCH_STATE_REJECTED, payload: error }));

  dispatch({ type: FETCH_STATE_PENDING });
};

export const onDistrictSubmit = ({
  state,
  district,
  districtCode,
  access_token
}) => dispatch => {
  onDistrictPost({ state, district, districtCode, access_token })
    .then(response =>
      dispatch({ type: CREATE_DISTRICT_FULFILLED, payload: response.data })
    )
    .catch(error =>
      dispatch({ type: CREATE_DISTRICT_REJECTED, payload: error })
    );

  dispatch({ type: CREATE_DISTRICT_PENDING });
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

export const onCitySubmit = ({ district, city, access_token }) => dispatch => {
  onCityPost({ district, city, access_token })
    .then(response =>
      dispatch({ type: CREATE_CITY_FULFILLED, payload: response.data })
    )
    .catch(error => dispatch({ type: CREATE_CITY_REJECTED, payload: error }));

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
    .then(response =>
      dispatch({ type: CREATE_AREA_FULFILLED, payload: response.data })
    )
    .catch(error => dispatch({ type: CREATE_AREA_REJECTED, payload: error }));

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
=======
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

export const onCountrySubmit = ({ country, access_token }) => dispatch => {
  onCountryPost({ country, access_token })
    .then(response =>
      dispatch({ type: CREATE_COUNTRY_FULFILLED, payload: response.data })
    )
    .catch(error =>
      dispatch({ type: CREATE_COUNTRY_REJECTED, payload: error })
    );

  dispatch({ type: CREATE_COUNTRY_PENDING });
};

export const onCountryList = ({ access_token }) => dispatch => {
  onCountryGet({ access_token })
    .then(response =>
      dispatch({ type: FETCH_COUNTRY_FULFILLED, payload: response.data })
    )
    .catch(error => dispatch({ type: FETCH_COUNTRY_REJECTED, payload: error }));

  dispatch({ type: FETCH_COUNTRY_PENDING });
};

export const onStateSubmit = ({ state, country, access_token }) => dispatch => {
  onStatePost({ state, country, access_token })
    .then(response =>
      dispatch({ type: CREATE_STATE_FULFILLED, payload: response.data })
    )
    .catch(error => dispatch({ type: CREATE_STATE_REJECTED, payload: error }));

  dispatch({ type: CREATE_STATE_PENDING });
};

export const onStateList = ({ access_token }) => dispatch => {
  onStateGet({ access_token })
    .then(response =>
      dispatch({ type: FETCH_STATE_FULFILLED, payload: response.data })
    )
    .catch(error => dispatch({ type: FETCH_STATE_REJECTED, payload: error }));

  dispatch({ type: FETCH_STATE_PENDING });
};

export const onDistrictSubmit = ({
  state,
  district,
  districtCode,
  access_token
}) => dispatch => {
  onDistrictPost({ state, district, districtCode, access_token })
    .then(response =>
      dispatch({ type: CREATE_DISTRICT_FULFILLED, payload: response.data })
    )
    .catch(error =>
      dispatch({ type: CREATE_DISTRICT_REJECTED, payload: error })
    );

  dispatch({ type: CREATE_DISTRICT_PENDING });
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

export const onCitySubmit = ({ district, city, access_token }) => dispatch => {
  onCityPost({ district, city, access_token })
    .then(response =>
      dispatch({ type: CREATE_CITY_FULFILLED, payload: response.data })
    )
    .catch(error => dispatch({ type: CREATE_CITY_REJECTED, payload: error }));

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
    .then(response =>
      dispatch({ type: CREATE_AREA_FULFILLED, payload: response.data })
    )
    .catch(error => dispatch({ type: CREATE_AREA_REJECTED, payload: error }));

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

// export const onUnmountArea = () => ({
//   type: UNMOUNT_AREA,
//   payload: null
// });
>>>>>>> a2ccc3a6494104d97415908204377f4b3bde5b02
