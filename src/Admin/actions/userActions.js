import {
  onGroupPost,
  onUserPost,
  onUserGet,
  onGroupGet
} from "../config/adminServerCall";
import {
  CREATE_GROUP_FULFILLED,
  CREATE_GROUP_REJECTED,
  CREATE_GROUP_PENDING,
  CREATE_USER_FULFILLED,
  CREATE_USER_REJECTED,
  CREATE_USER_PENDING,
  FETCH_GROUP_FULFILLED,
  FETCH_GROUP_REJECTED,
  FETCH_GROUP_PENDING,
  FETCH_USER_FULFILLED,
  FETCH_USER_REJECTED,
  FETCH_USER_PENDING
} from "./types";

export const onGroupSubmit = ({ group, access_token }) => dispatch => {
  onGroupPost({ group, access_token })
    .then(response =>
      dispatch({ type: CREATE_GROUP_FULFILLED, payload: response.data })
    )
    .catch(error => dispatch({ type: CREATE_GROUP_REJECTED, payload: error }));
  dispatch({ type: CREATE_GROUP_PENDING });
};

export const onGroupList = ({ access_token }) => dispatch => {
  onGroupGet({ access_token })
    .then(response => {
      dispatch({ type: FETCH_GROUP_FULFILLED, payload: response.data });
    })
    .catch(error => {
      dispatch({ type: FETCH_GROUP_REJECTED, payload: error.data });
    });
  dispatch({ type: FETCH_GROUP_PENDING });
};

export const onUserSubmit = ({
  first_name,
  last_name,
  username,
  email,
  password,
  group,
  access_token
}) => dispatch => {
  onUserPost({
    first_name,
    last_name,
    username,
    email,
    password,
    group,
    access_token
  })
    .then(response =>
      dispatch({ type: CREATE_USER_FULFILLED, payload: response.data })
    )
    .catch(error => dispatch({ type: CREATE_USER_REJECTED, payload: error }));
  dispatch({ type: CREATE_USER_PENDING });
};

export const onUserList = ({ access_token }) => dispatch => {
  onUserGet({ access_token })
    .then(response => {
      dispatch({ type: FETCH_USER_FULFILLED, payload: response.data });
    })
    .catch(error => {
      dispatch({ type: FETCH_USER_REJECTED, payload: error.data });
    });
  dispatch({ type: FETCH_USER_PENDING });
};