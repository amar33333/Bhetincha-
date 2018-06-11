import {
  FETCH_CATEGORIES_FULFILLED,
  FETCH_CATEGORIES_PENDING,
  FETCH_CATEGORIES_REJECTED
} from "./types";

const epics = [];

export const onCategoriesList = payload => ({
  type: FETCH_CATEGORIES_PENDING,
  payload
});

epics.push((action$, { getState }) =>
  action$.ofType(FETCH_CATEGORIES_PENDING).map(({ payload }) => ({
    type: FETCH_CATEGORIES_FULFILLED,
    payload
  }))
);

export default epics;
