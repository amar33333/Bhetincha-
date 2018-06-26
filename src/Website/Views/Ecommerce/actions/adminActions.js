import { Observable } from "rxjs/Observable";
import { toast } from "react-toastify";

import {
  FETCH_ECOMMERCE_CATEGORIES_FULFILLED,
  FETCH_ECOMMERCE_CATEGORIES_PENDING,
  FETCH_ECOMMERCE_CATEGORIES_REJECTED,
  CREATE_ECOMMERCE_CATEGORIES_FULFILLED,
  CREATE_ECOMMERCE_CATEGORIES_PENDING,
  CREATE_ECOMMERCE_CATEGORIES_REJECTED,
  CHANGE_ACTIVE_ECOMMERCE_CATEGORY,
  OPEN_ALL_ON_SEARCH,
  FETCH_ECOMMERCE_CATEGORY_FULFILLED,
  FETCH_ECOMMERCE_CATEGORY_PENDING,
  FETCH_ECOMMERCE_CATEGORY_REJECTED,
  UPDATE_ECOMMERCE_CATEGORY_FULFILLED,
  UPDATE_ECOMMERCE_CATEGORY_PENDING,
  UPDATE_ECOMMERCE_CATEGORY_REJECTED,
  DELETE_ECOMMERCE_CATEGORY_FULFILLED,
  DELETE_ECOMMERCE_CATEGORY_PENDING,
  DELETE_ECOMMERCE_CATEGORY_REJECTED,
  FETCH_ECOMMERCE_ATTRIBUTES_PENDING,
  FETCH_ECOMMERCE_ATTRIBUTES_FULFILLED,
  FETCH_ECOMMERCE_ATTRIBUTES_REJECTED,
  CREATE_PROPERTY_CATEGORY_FULFILLED,
  CREATE_PROPERTY_CATEGORY_PENDING,
  CREATE_PROPERTY_CATEGORY_REJECTED,
  DELETE_PROPERTY_CATEGORY_FULFILLED,
  DELETE_PROPERTY_CATEGORY_PENDING,
  DELETE_PROPERTY_CATEGORY_REJECTED
} from "./types";

import {
  onCategoriesGet,
  onCategoryPost,
  onCategoryDetailGet,
  onCategoryDetailPost,
  onCategoryDetailDelete,
  onAttributesGet,
  onPropertiesPost,
  onPropertiesDelete
} from "../config/ecommerceServerCall";

const epics = [];

// attirbutes
export const onAttributesList = () => ({
  type: FETCH_ECOMMERCE_ATTRIBUTES_PENDING
});

epics.push((action$, { getState }) =>
  action$.ofType(FETCH_ECOMMERCE_ATTRIBUTES_PENDING).mergeMap(action =>
    onAttributesGet()
      .map(({ response }) => ({
        type: FETCH_ECOMMERCE_ATTRIBUTES_FULFILLED,
        payload: response
      }))
      .catch(ajaxError => {
        console.log(ajaxError);
        toast.error("Error Fetching Attributes");
        return Observable.of({ type: FETCH_ECOMMERCE_ATTRIBUTES_REJECTED });
      })
  )
);

export const onPropertySubmit = payload => ({
  type: CREATE_PROPERTY_CATEGORY_PENDING,
  payload
});

epics.push((action$, { getState }) =>
  action$.ofType(CREATE_PROPERTY_CATEGORY_PENDING).mergeMap(action => {
    const payload = getState().EcommerceContainer.admin.activeCategory;
    const { body } = action.payload;

    return onPropertiesPost({ body })
      .concatMap(({ response }) => {
        if (response.msg === "success") {
          toast.success("Attribute created successfully");
          return [
            { type: CREATE_PROPERTY_CATEGORY_FULFILLED },
            { type: CHANGE_ACTIVE_ECOMMERCE_CATEGORY, payload }
          ];
        } else {
          throw new Error(response.msg);
        }
      })
      .catch(ajaxError => {
        toast.error(ajaxError.toString());
        return Observable.of({ type: CREATE_PROPERTY_CATEGORY_REJECTED });
      });
  })
);

export const onPropertyRemove = payload => ({
  type: DELETE_PROPERTY_CATEGORY_PENDING,
  payload
});

epics.push((action$, { getState }) =>
  action$.ofType(DELETE_PROPERTY_CATEGORY_PENDING).mergeMap(action => {
    const payload = getState().EcommerceContainer.admin.activeCategory;
    const body = action.payload;

    return onPropertiesDelete({ body })
      .concatMap(({ response }) => {
        if (response.msg === "success") {
          toast.success("Attribute Deleted Successfully");
          return [
            { type: DELETE_PROPERTY_CATEGORY_FULFILLED },
            { type: CHANGE_ACTIVE_ECOMMERCE_CATEGORY, payload }
          ];
        } else {
          throw new Error(response.msg);
        }
      })
      .catch(ajaxError => {
        toast.error(ajaxError.toString());
        return Observable.of({ type: DELETE_PROPERTY_CATEGORY_REJECTED });
      });
  })
);

// categories
export const onCategoriesList = () => ({
  type: FETCH_ECOMMERCE_CATEGORIES_PENDING,
  first: true
});

epics.push((action$, { getState }) =>
  action$.ofType(FETCH_ECOMMERCE_CATEGORIES_PENDING).mergeMap(action => {
    const { first } = action;
    return onCategoriesGet()
      .concatMap(({ response }) => {
        const extra = [];
        if (first) {
          extra.push({
            type: CHANGE_ACTIVE_ECOMMERCE_CATEGORY,
            payload: response.uid
          });
        }
        return [
          {
            type: FETCH_ECOMMERCE_CATEGORIES_FULFILLED,
            payload: response
          },
          ...extra
        ];
      })
      .catch(ajaxError => {
        toast.error("Error Fetching Categories");
        return Observable.of({ type: FETCH_ECOMMERCE_CATEGORIES_REJECTED });
      });
  })
);

export const onCategorySubmit = payload => ({
  type: CREATE_ECOMMERCE_CATEGORIES_PENDING,
  payload
});

epics.push((action$, { getState }) =>
  action$.ofType(CREATE_ECOMMERCE_CATEGORIES_PENDING).mergeMap(action => {
    const parent = getState().EcommerceContainer.admin.activeCategory;
    const { name } = action.payload;

    return onCategoryPost({ name, parent })
      .concatMap(({ response }) => {
        if (response.msg === "success") {
          toast.success("Category created successfully");
          return [
            { type: CREATE_ECOMMERCE_CATEGORIES_FULFILLED },
            { type: FETCH_ECOMMERCE_CATEGORIES_PENDING }
          ];
        } else {
          throw new Error(response.msg);
        }
      })
      .catch(ajaxError => {
        toast.error(ajaxError.toString());
        return Observable.of({ type: CREATE_ECOMMERCE_CATEGORIES_REJECTED });
      });
  })
);

export const onCategoryUpdate = payload => ({
  type: UPDATE_ECOMMERCE_CATEGORY_PENDING,
  payload
});

epics.push((action$, { getState }) =>
  action$.ofType(UPDATE_ECOMMERCE_CATEGORY_PENDING).mergeMap(action => {
    const uid = getState().EcommerceContainer.admin.activeCategory;
    const { body } = action.payload;

    return onCategoryDetailPost({ body, uid })
      .concatMap(({ response }) => {
        if (response.msg === "success") {
          toast.success("Category updated successfully");
          return [
            { type: UPDATE_ECOMMERCE_CATEGORY_FULFILLED },
            { type: FETCH_ECOMMERCE_CATEGORIES_PENDING },
            { type: CHANGE_ACTIVE_ECOMMERCE_CATEGORY, payload: uid }
          ];
        } else {
          toast.error(response.msg);
          return [{ type: CHANGE_ACTIVE_ECOMMERCE_CATEGORY, payload: uid }];
        }
      })
      .catch(ajaxError => {
        toast.error(ajaxError.toString());
        return Observable.of({ type: UPDATE_ECOMMERCE_CATEGORY_REJECTED });
      });
  })
);

export const onCategoryDelete = payload => ({
  type: DELETE_ECOMMERCE_CATEGORY_PENDING,
  payload
});

epics.push((action$, { getState }) =>
  action$.ofType(DELETE_ECOMMERCE_CATEGORY_PENDING).mergeMap(action => {
    const { uid } = action.payload;

    return onCategoryDetailDelete({ uid })
      .concatMap(({ response }) => {
        if (response.msg === "success") {
          toast.success("Category deleted successfully");
          return [
            { type: DELETE_ECOMMERCE_CATEGORY_FULFILLED },
            { type: FETCH_ECOMMERCE_CATEGORIES_PENDING, first: true }
          ];
        } else {
          throw new Error(response.msg);
        }
      })
      .catch(ajaxError => {
        toast.error(ajaxError.toString());
        return Observable.of({ type: DELETE_ECOMMERCE_CATEGORY_REJECTED });
      });
  })
);

export const onChangeActiveCategory = (newCategory, oldCategory) => ({
  type: CHANGE_ACTIVE_ECOMMERCE_CATEGORY,
  payload: newCategory,
  oldCategory
});

epics.push((action$, { getState }) =>
  action$
    .ofType(CHANGE_ACTIVE_ECOMMERCE_CATEGORY)
    .mergeMap(action => {
      const { payload: newCategory, oldCategory } = action;
      if (!oldCategory || newCategory !== oldCategory) {
        return onCategoryDetailGet({ uid: newCategory })
          .map(({ response }) => {
            return {
              type: FETCH_ECOMMERCE_CATEGORY_FULFILLED,
              payload: response
            };
          })
          .catch(ajaxError => {
            toast.error("Error Creating Categories");
            return Observable.of({ type: FETCH_ECOMMERCE_CATEGORY_REJECTED });
          });
      } else {
        return Observable.empty();
      }
    })
    .startWith({ type: FETCH_ECOMMERCE_CATEGORY_PENDING })
);

export const openAllOnSearch = payload => ({
  type: OPEN_ALL_ON_SEARCH,
  payload
});

export default epics;