import { Observable } from "rxjs/Observable";
import { toast } from "react-toastify";

import {
  onSubCategoryPut,
  onSubCategoryPostAjax,
  onSubCategoryGetAjax,
  onSubCategoryEachDeleteAjax
} from "../config/adminServerCall";

import {
  CREATE_SUB_CATEGORY_FULFILLED,
  CREATE_SUB_CATEGORY_REJECTED,
  CREATE_SUB_CATEGORY_PENDING,
  FETCH_SUB_CATEGORY_PENDING,
  FETCH_SUB_CATEGORY_FULFILLED,
  FETCH_SUB_CATEGORY_REJECTED,
  EDIT_SUB_CATEGORY_FULFILLED,
  EDIT_SUB_CATEGORY_REJECTED,
  EDIT_SUB_CATEGORY_PENDING,
  DELETE_SUB_CATEGORY_FULFILLED,
  DELETE_SUB_CATEGORY_PENDING,
  DELETE_SUB_CATEGORY_REJECTED,
  TOGGLE_SUB_CATEGORY_EDIT_MODAL,
  UNMOUNT_SUB_CATEGORY
} from "./types";

const epics = [];

export const onSubCategorySubmit = payload => ({
  type: CREATE_SUB_CATEGORY_PENDING,
  payload
});

epics.push((action$, { getState }) =>
  action$.ofType(CREATE_SUB_CATEGORY_PENDING).mergeMap(({ payload }) => {
    const { subCategory, extraSection, tags, category } = payload;
    const access_token = getState().auth.cookies.token_data.access_token;

    return onSubCategoryPostAjax({
      subCategory,
      extraSection,
      tags,
      category,
      access_token
    })
      .concatMap(({ response }) => {
        if (response.msg === "success") {
          toast.success("Subcategory added successfully!");
          return [
            { type: CREATE_SUB_CATEGORY_FULFILLED },
            { type: FETCH_SUB_CATEGORY_PENDING }
          ];
        } else {
          throw new Error(response.msg[Object.keys(response.msg)[0]][0]);
        }
      })
      .catch(ajaxError => {
        toast.error(ajaxError.toString());
        return Observable.of({
          type: CREATE_SUB_CATEGORY_REJECTED,
          payload: ajaxError
        });
      });
  })
);

export const onSubCategoryList = payload => ({
  type: FETCH_SUB_CATEGORY_PENDING,
  payload
});

epics.push((action$, { getState }) =>
  action$.ofType(FETCH_SUB_CATEGORY_PENDING).mergeMap(({ payload }) => {
    const {
      rows,
      page,
      name,
      filterIndustry,
      filterCategory,
      sortby
    } = getState().AdminContainer.filterSubCategory;

    const params = {};
    params.rows = rows;
    params.page = page;
    if (name) {
      params.name = name;
    }
    params.sortby = sortby.map(data => `${data.id}${data.desc ? "-desc" : ""}`);
    if (filterIndustry.length) {
      params.industry = filterIndustry.map(industry => industry.id);
    }
    if (filterCategory.length) {
      params.category = filterCategory.map(category => category.id);
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
      if (payload.filterCategory) {
        params.category = payload.filterCategory.map(category => category.id);
      }
    }

    return onSubCategoryGetAjax({
      access_token: getState().auth.cookies.token_data.access_token,
      params
    })
      .map(({ response }) => ({
        type: FETCH_SUB_CATEGORY_FULFILLED,
        payload: response
      }))
      .catch(ajaxError => Observable.of({ type: FETCH_SUB_CATEGORY_REJECTED }));
  })
);

export const onSubCategoryEdit = payload => ({
  type: EDIT_SUB_CATEGORY_PENDING,
  payload
});

epics.push((action$, { getState }) =>
  action$.ofType(EDIT_SUB_CATEGORY_PENDING).mergeMap(({ payload }) => {
    const { subCategory, industry } = payload;
    const access_token = getState().auth.cookies.token_data.access_token;

    return onSubCategoryPut({ subCategory, industry, access_token })
      .concatMap(({ response }) => {
        if (response.msg === "success") {
          toast.success("Sub_Category Updated successfully!");
          return [
            { type: EDIT_SUB_CATEGORY_FULFILLED },
            { type: FETCH_SUB_CATEGORY_PENDING },
            { type: TOGGLE_SUB_CATEGORY_EDIT_MODAL }
          ];
        } else {
          throw new Error(response.msg[Object.keys(response.msg)[0]][0]);
        }
      })
      .catch(ajaxError => {
        toast.error(ajaxError.toString());
        return Observable.of({
          type: EDIT_SUB_CATEGORY_REJECTED,
          payload: ajaxError
        });
      });
  })
);

export const onSubCategoryDelete = payload => ({
  type: DELETE_SUB_CATEGORY_PENDING,
  payload
});

epics.push((action$, { getState }) =>
  action$.ofType(DELETE_SUB_CATEGORY_PENDING).mergeMap(({ payload }) =>
    onSubCategoryEachDeleteAjax({
      id: payload.id,
      access_token: getState().auth.cookies.token_data.access_token
    })
      .concatMap(() => {
        toast.success("Deleted Successfully!");
        return [
          { type: FETCH_SUB_CATEGORY_PENDING },
          { type: DELETE_SUB_CATEGORY_FULFILLED }
        ];
      })
      .catch(ajaxError => {
        toast.error("Error Deleting Subcategory");
        console.log(ajaxError);
        return Observable.of({ type: DELETE_SUB_CATEGORY_REJECTED });
      })
  )
);

export const toggleSubCategoryEditModal = payload => ({
  type: TOGGLE_SUB_CATEGORY_EDIT_MODAL,
  payload
});

export const onUnmountSubCategory = () => ({ type: UNMOUNT_SUB_CATEGORY });

export default epics;
