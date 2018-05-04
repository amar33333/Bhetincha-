import { toast } from "react-toastify";
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

  // UNMOUNT
  UNMOUNT_AREA,
  // UNMOUNT_COUNTRY,
  // UNMOUNT_STATES,
  UNMOUNT_DISTRICT,
  UNMOUNT_CITY
} from "./types";

export const onCountrySubmit = ({ country, access_token }) => dispatch => {
  onCountryPost({ country, access_token })
    .then(response => {
      if (response.data.msg === "success") {
        toast.success("New Country Added Successfully!");
      } else {
        response.data.msg.name.map(msg => {
          toast.error(msg);
        });
      }
      dispatch({ type: CREATE_COUNTRY_FULFILLED, payload: response.data });
    })
    .catch(error => {
      toast.error("New Country not added!");

      dispatch({ type: CREATE_COUNTRY_REJECTED, payload: error });
    });

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
    .then(response => {
      if (response.data.msg === "success") {
        toast.success("New State Added Successfully!");
      } else {
        response.data.msg.name.map(msg => {
          toast.error(msg);
        });
      }
      dispatch({ type: CREATE_STATE_FULFILLED, payload: response.data });
    })
    .catch(error => {
      toast.error("New State not created !");
      dispatch({ type: CREATE_STATE_REJECTED, payload: error });
    });

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
    .then(response => {
      if (response.data.msg === "success") {
        toast.success("New District Added Successfully!");
      } else {
        response.data.msg.name.map(msg => {
          toast.error(msg);
        });
      }
      dispatch({ type: CREATE_DISTRICT_FULFILLED, payload: response.data });
    })
    .catch(error => {
      toast.error("New District not added!");
      dispatch({ type: CREATE_DISTRICT_REJECTED, payload: error });
    });

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
export const onAddressTreeListAllImmediate = ({
  id,
  access_token
}) => dispatch => {
  const { countryId, stateId, districtId, cityId } = id;

  onCountryEachGet({ countryId, access_token })
    .then(response =>
      onStateEachGet({ stateId, access_token })
        .then(response =>
          onDistrictEachGet({ districtId, access_token })
            .then(response =>
              onCityEachGet({ cityId, access_token })
                .then(response =>
                  dispatch({
                    type: FETCH_ADDRESS_TREE_FULFILLED,
                    payload: response.data
                  })
                )
                .catch(error =>
                  dispatch({
                    type: FETCH_ADDRESS_TREE_REJECTED,
                    payload: error
                  })
                )
            )
            .catch(error =>
              dispatch({ type: FETCH_ADDRESS_TREE_REJECTED, payload: error })
            )
        )
        .catch(error =>
          dispatch({ type: FETCH_ADDRESS_TREE_REJECTED, payload: error })
        )
    )
    .catch(error =>
      dispatch({ type: FETCH_ADDRESS_TREE_REJECTED, payload: error })
    );
  dispatch({ type: FETCH_ADDRESS_TREE_PENDING });
};

export const onAddressTreeList = ({
  id,
  access_token,
  ADDRESS_KEY
}) => dispatch => {
  console.log("address key: ", ADDRESS_KEY);
  if (ADDRESS_KEY === "country") {
    console.log("addreskey: ", ADDRESS_KEY);
    onCountryEachGet({ id, access_token })
      .then(response =>
        dispatch({
          type: FETCH_ADDRESS_TREE_FULFILLED,
          payload: response.data
        })
      )
      .catch(error =>
        dispatch({ type: FETCH_ADDRESS_TREE_REJECTED, payload: error })
      );
  } else if (ADDRESS_KEY === "state")
    onStateEachGet({ id, access_token })
      .then(response =>
        dispatch({
          type: FETCH_ADDRESS_TREE_FULFILLED,
          payload: response.data
        })
      )
      .catch(error =>
        dispatch({ type: FETCH_ADDRESS_TREE_REJECTED, payload: error })
      );
  else if (ADDRESS_KEY === "district")
    onDistrictEachGet({ id, access_token })
      .then(response =>
        dispatch({
          type: FETCH_ADDRESS_TREE_FULFILLED,
          payload: response.data
        })
      )
      .catch(error =>
        dispatch({ type: FETCH_ADDRESS_TREE_REJECTED, payload: error })
      );
  else if (ADDRESS_KEY === "city")
    onCityEachGet({ id, access_token })
      .then(response =>
        dispatch({
          type: FETCH_ADDRESS_TREE_FULFILLED,
          payload: response.data
        })
      )
      .catch(error =>
        dispatch({ type: FETCH_ADDRESS_TREE_REJECTED, payload: error })
      );

  dispatch({ type: FETCH_ADDRESS_TREE_PENDING });
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
