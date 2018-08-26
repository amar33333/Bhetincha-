import { Observable } from "rxjs/Observable";
import { toast } from "react-toastify";

import {
  onCategoryPostAjax,
  onCategoryEachDeleteAjax,
  onCategoryGetAjax,
  onCategoryEachGet,
  onCategoryPut,
  onCategoryArrayGet,
  onCategoryEachGetAjax
} from "../config/adminServerCall";

import {
  CREATE_CATEGORY_FULFILLED,
  CREATE_CATEGORY_REJECTED,
  CREATE_CATEGORY_PENDING,
  FETCH_CATEGORY_FULFILLED,
  FETCH_CATEGORY_REJECTED,
  FETCH_CATEGORY_PENDING,
  FETCH_CATEGORY_EACH_FULFILLED,
  FETCH_CATEGORY_EACH_REJECTED,
  FETCH_CATEGORY_EACH_PENDING,
  REMOVE_CATEGORY_DATA_PENDING,
  REMOVE_CATEGORY_DATA_FULFILLED,
  REMOVE_CATEGORY_DATA_REJECTED,
  FETCH_CATEGORY_ARRAY_PENDING,
  FETCH_CATEGORY_ARRAY_FULFILLED,
  FETCH_CATEGORY_ARRAY_REJECTED,
  DELETE_CATEGORY_PENDING,
  DELETE_CATEGORY_FULFILLED,
  DELETE_CATEGORY_REJECTED,
  EDIT_CATEGORY_FULFILLED,
  EDIT_CATEGORY_PENDING,
  EDIT_CATEGORY_REJECTED,
  TOGGLE_CATEGORY_EDIT_MODAL,
  UNMOUNT_CATEGORY_DATA,
  UNMOUNT_SUB_CATEGORY,
  UNMOUNT_CATEGORY,
  RESET_CATEGORY_ERRORS,
  FETCH_CATEGORY_DETAIL_FULFILLED,
  FETCH_CATEGORY_DETAIL_PENDING,
  FETCH_CATEGORY_DETAIL_REJECTED
} from "./types";

const epics = [];

export const resetCategoryErrors = () => ({
  type: RESET_CATEGORY_ERRORS
});

export const onCategoryArrayList = payload => ({
  type: FETCH_CATEGORY_ARRAY_PENDING,
  payload
});

epics.push((action$, { getState }) =>
  action$.ofType(FETCH_CATEGORY_ARRAY_PENDING).mergeMap(({ payload }) => {
    const { ids } = payload;
    const access_token = getState().auth.cookies.token_data.access_token;

    return onCategoryArrayGet({
      params: { ids },
      access_token
    })
      .map(({ response }) => {
        return { type: FETCH_CATEGORY_ARRAY_FULFILLED, payload: response };
      })
      .catch(ajaxError => {
        toast.error(ajaxError.toString());
        return Observable.of({
          type: FETCH_CATEGORY_ARRAY_REJECTED,
          payload: ajaxError
        });
      });
  })
);

export const onCategorySubmit = payload => ({
  type: CREATE_CATEGORY_PENDING,
  payload
});

epics.push((action$, { getState }) =>
  action$.ofType(CREATE_CATEGORY_PENDING).mergeMap(({ payload }) => {
    const { category, industry } = payload;
    const access_token = getState().auth.cookies.token_data.access_token;

    return onCategoryPostAjax({ category, industry, access_token })
      .concatMap(({ response }) => {
        if (response.msg === "success") {
          toast.success("Category added successfully!");
          return [
            { type: CREATE_CATEGORY_FULFILLED },
            { type: FETCH_CATEGORY_PENDING }
          ];
        } else {
          throw new Error(JSON.stringify(response.msg));
        }
      })
      .catch(ajaxError => {
        toast.error("Error: Adding Category");
        return Observable.of({
          type: CREATE_CATEGORY_REJECTED,
          payload: ajaxError.status
            ? ajaxError.message
            : JSON.parse(ajaxError.message)
        });
      });
  })
);

export const onCategoryEdit = payload => ({
  type: EDIT_CATEGORY_PENDING,
  payload
});

epics.push((action$, { getState }) =>
  action$.ofType(EDIT_CATEGORY_PENDING).mergeMap(({ payload }) => {
    const { category, industry } = payload;
    const access_token = getState().auth.cookies.token_data.access_token;

    return onCategoryPut({
      body: {
        name: category.name,
        industry
      },
      id: category.id,
      access_token
    })
      .concatMap(({ response }) => {
        if (response.msg === "success") {
          toast.success("Category Updated successfully!");
          return [
            { type: EDIT_CATEGORY_FULFILLED },
            { type: FETCH_CATEGORY_PENDING },
            { type: TOGGLE_CATEGORY_EDIT_MODAL }
          ];
        } else {
          throw new Error(JSON.stringify(response.msg));
        }
      })
      .catch(ajaxError => {
        toast.error("Error: Updating Category");
        return Observable.of({
          type: EDIT_CATEGORY_REJECTED,
          payload: ajaxError.status
            ? ajaxError.message
            : JSON.parse(ajaxError.message)
        });
      });
  })
);

export const onCategoryList = payload => ({
  type: FETCH_CATEGORY_PENDING,
  payload
});

epics.push((action$, { getState }) =>
  action$.ofType(FETCH_CATEGORY_PENDING).switchMap(({ payload }) => {
    const {
      rows,
      page,
      name,
      filterIndustry,
      sortby
    } = getState().AdminContainer.filterCategory;

    const params = {};
    params.rows = rows;
    params.page = page;
    if (name) {
      params.name = name.trim();
    }
    params.sortby = sortby.map(data => `${data.id}${data.desc ? "-desc" : ""}`);
    if (filterIndustry.length) {
      params.industry = filterIndustry.map(industry => industry.id);
    }
    if (payload) {
      if (payload.rows) {
        params.rows = payload.rows;
      }
      if (payload.page) {
        params.page = payload.page;
      }
      if (payload.filterIndustry) {
        params.industry = payload.filterIndustry.map(industry => industry.id);
      }
    }

    return onCategoryGetAjax({
      access_token: getState().auth.cookies.token_data.access_token,
      params
    })
      .map(({ response }) => ({
        type: FETCH_CATEGORY_FULFILLED,
        payload: response
      }))
      .catch(ajaxError => Observable.of({ type: FETCH_CATEGORY_REJECTED }));
  })
);

export const onCategoryDelete = payload => ({
  type: DELETE_CATEGORY_PENDING,
  payload
});

epics.push((action$, { getState }) =>
  action$.ofType(DELETE_CATEGORY_PENDING).mergeMap(({ payload }) =>
    onCategoryEachDeleteAjax({
      id: payload.id,
      access_token: getState().auth.cookies.token_data.access_token
    })
      .concatMap(() => {
        toast.success("Category Deleted Successfully!");
        return [
          { type: FETCH_CATEGORY_PENDING },
          { type: DELETE_CATEGORY_FULFILLED }
        ];
      })
      .catch(ajaxError => {
        toast.error("Error Deleting Category");
        return Observable.of({ type: DELETE_CATEGORY_REJECTED });
      })
  )
);

export const onCategoryDetail = payload => ({
  type: FETCH_CATEGORY_DETAIL_PENDING,
  payload
});

epics.push((action$, { getState }) =>
  action$.ofType(FETCH_CATEGORY_DETAIL_PENDING).mergeMap(({ payload }) =>
    onCategoryEachGetAjax({
      id: payload.id,
      access_token: getState().auth.cookies.token_data.access_token
    })
      .map(({ response }) => ({
        type: FETCH_CATEGORY_DETAIL_FULFILLED,
        payload: response
      }))
      .catch(ajaxError => {
        return Observable.of({ type: FETCH_CATEGORY_DETAIL_REJECTED });
      })
  )
);

export const onCategoryEachList = ({ id, access_token }) => dispatch => {
  onCategoryEachGet({ id, access_token })
    .then(response => {
      dispatch({ type: FETCH_CATEGORY_EACH_FULFILLED, payload: response.data });
    })
    .catch(error =>
      dispatch({ type: FETCH_CATEGORY_EACH_REJECTED, payload: error })
    );

  dispatch({ type: FETCH_CATEGORY_EACH_PENDING });
};

export const toggleCategoryEditModal = payload => ({
  type: TOGGLE_CATEGORY_EDIT_MODAL,
  payload
});

export const onRemoveCategoryData = ({ obj }) => {
  return {
    type: REMOVE_CATEGORY_DATA_FULFILLED,
    payload: obj
  };
};

export const onUnmountCategory = () => ({ type: UNMOUNT_CATEGORY });

export const onUnmountCategoryData = () => ({
  type: UNMOUNT_CATEGORY_DATA,
  payload: null
});

export const onUnmountSubCategories = () => {
  return {
    type: UNMOUNT_SUB_CATEGORY,
    payload: []
  };
};

export default epics;
