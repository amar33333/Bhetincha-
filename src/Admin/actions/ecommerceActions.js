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
  CREATE_ECOMMERCE_PROPERTY_CATEGORY_FULFILLED,
  CREATE_ECOMMERCE_PROPERTY_CATEGORY_PENDING,
  CREATE_ECOMMERCE_PROPERTY_CATEGORY_REJECTED,
  DELETE_ECOMMERCE_PROPERTY_CATEGORY_FULFILLED,
  DELETE_ECOMMERCE_PROPERTY_CATEGORY_PENDING,
  DELETE_ECOMMERCE_PROPERTY_CATEGORY_REJECTED,
  UPDATE_ECOMMERCE_PROPERTY_CATEGORY_FULFILLED,
  UPDATE_ECOMMERCE_PROPERTY_CATEGORY_PENDING,
  UPDATE_ECOMMERCE_PROPERTY_CATEGORY_REJECTED,
  ASSIGN_CATEGORIES_ECOMMERCE_FULFILLED,
  ASSIGN_CATEGORIES_ECOMMERCE_PENDING,
  ASSIGN_CATEGORIES_ECOMMERCE_REJECTED,
  FETCH_CATEGORY_DETAIL_PENDING,
  FETCH_ECOMMERCE_ROOT_CATEGORIES_FULFILLED,
  FETCH_ECOMMERCE_ROOT_CATEGORIES_PENDING,
  FETCH_ECOMMERCE_ROOT_CATEGORIES_REJECTED
} from "./types";

import {
  onEcommerceCategoriesGet,
  onEcommerceRootCategoriesGet,
  onEcommerceCategoryPost,
  onEcommerceCategoryDetailGet,
  onEcommerceCategoryDetailPost,
  onEcommerceCategoryDetailDelete,
  onEcommerceAttributesGet,
  onEcommercePropertiesPost,
  onEcommercePropertiesPut,
  onEcommercePropertiesDelete,
  onCategoryPut
} from "../config/adminServerCall";

const epics = [];

// category assignment

export const onCategoryAssignEcommerce = payload => ({
  type: ASSIGN_CATEGORIES_ECOMMERCE_PENDING,
  payload
});

epics.push((action$, { getState }) =>
  action$
    .ofType(ASSIGN_CATEGORIES_ECOMMERCE_PENDING)
    .mergeMap(({ payload }) => {
      const { ecommerce_categories, id } = payload;
      const access_token = getState().auth.cookies.token_data.access_token;

      return onCategoryPut({
        body: {
          ecommerce_categories
        },
        id: id,
        access_token
      })
        .concatMap(({ response }) => {
          if (response.msg === "success") {
            toast.success("Category Updated successfully!");
            return [
              { type: ASSIGN_CATEGORIES_ECOMMERCE_FULFILLED },
              { type: FETCH_CATEGORY_DETAIL_PENDING, payload: { id } }
            ];
          } else {
            throw new Error(JSON.stringify(response.msg));
          }
        })
        .catch(ajaxError => {
          toast.error("Error: Updating Category");
          return Observable.of({
            type: ASSIGN_CATEGORIES_ECOMMERCE_REJECTED,
            payload: ajaxError.status
              ? ajaxError.message
              : JSON.parse(ajaxError.message)
          });
        });
    })
);

// attirbutes
export const onAttributesListEcommerce = () => ({
  type: FETCH_ECOMMERCE_ATTRIBUTES_PENDING
});

epics.push((action$, { getState }) =>
  action$.ofType(FETCH_ECOMMERCE_ATTRIBUTES_PENDING).mergeMap(action =>
    onEcommerceAttributesGet()
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

export const onPropertySubmitEcommerce = payload => ({
  type: CREATE_ECOMMERCE_PROPERTY_CATEGORY_PENDING,
  payload
});

epics.push((action$, { getState }) =>
  action$
    .ofType(CREATE_ECOMMERCE_PROPERTY_CATEGORY_PENDING)
    .mergeMap(action => {
      const payload = getState().AdminContainer.ecommerce.activeCategory;
      const { body } = action.payload;

      return onEcommercePropertiesPost({ body })
        .concatMap(({ response }) => {
          if (response.msg === "success") {
            toast.success("Attribute created successfully");
            return [
              { type: CREATE_ECOMMERCE_PROPERTY_CATEGORY_FULFILLED },
              { type: CHANGE_ACTIVE_ECOMMERCE_CATEGORY, payload }
            ];
          } else {
            throw new Error(response.msg);
          }
        })
        .catch(ajaxError => {
          toast.error(ajaxError.toString());
          return Observable.of({
            type: CREATE_ECOMMERCE_PROPERTY_CATEGORY_REJECTED
          });
        });
    })
);

export const onPropertyUpdateEcommerce = payload => ({
  type: UPDATE_ECOMMERCE_PROPERTY_CATEGORY_PENDING,
  payload
});

epics.push((action$, { getState }) =>
  action$
    .ofType(UPDATE_ECOMMERCE_PROPERTY_CATEGORY_PENDING)
    .mergeMap(action => {
      const payload = getState().AdminContainer.ecommerce.activeCategory;
      const { body } = action.payload;

      return onEcommercePropertiesPut({ body })
        .concatMap(({ response }) => {
          if (response.msg === "success") {
            toast.success("Attribute updated successfully");
            return [
              { type: UPDATE_ECOMMERCE_PROPERTY_CATEGORY_FULFILLED },
              { type: CHANGE_ACTIVE_ECOMMERCE_CATEGORY, payload }
            ];
          } else {
            throw new Error(response.msg);
          }
        })
        .catch(ajaxError => {
          toast.error(ajaxError.toString());
          return Observable.of({
            type: UPDATE_ECOMMERCE_PROPERTY_CATEGORY_REJECTED
          });
        });
    })
);

export const onPropertyRemoveEcommerce = payload => ({
  type: DELETE_ECOMMERCE_PROPERTY_CATEGORY_PENDING,
  payload
});

epics.push((action$, { getState }) =>
  action$
    .ofType(DELETE_ECOMMERCE_PROPERTY_CATEGORY_PENDING)
    .mergeMap(action => {
      const payload = getState().AdminContainer.ecommerce.activeCategory;
      const body = action.payload;

      return onEcommercePropertiesDelete({ body })
        .concatMap(({ response }) => {
          if (response.msg === "success") {
            toast.success("Attribute Deleted Successfully");
            return [
              { type: DELETE_ECOMMERCE_PROPERTY_CATEGORY_FULFILLED },
              { type: CHANGE_ACTIVE_ECOMMERCE_CATEGORY, payload }
            ];
          } else {
            throw new Error(response.msg);
          }
        })
        .catch(ajaxError => {
          toast.error(ajaxError.toString());
          return Observable.of({
            type: DELETE_ECOMMERCE_PROPERTY_CATEGORY_REJECTED
          });
        });
    })
);

// categories
export const onCategoriesListEcommerce = (currentId, routeOnError) => ({
  type: FETCH_ECOMMERCE_CATEGORIES_PENDING,
  first: true,
  payload: currentId,
  routeOnError
});

epics.push((action$, { getState }) =>
  action$.ofType(FETCH_ECOMMERCE_CATEGORIES_PENDING).mergeMap(action => {
    const { first, payload, routeOnError } = action;
    return onEcommerceCategoriesGet()
      .concatMap(({ response }) => {
        const extra = [];
        if (first) {
          extra.push({
            type: CHANGE_ACTIVE_ECOMMERCE_CATEGORY,
            payload: payload || response.uid,
            routeOnError
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

export const onRootCategoriesListEcommerce = () => ({
  type: FETCH_ECOMMERCE_ROOT_CATEGORIES_PENDING
});

epics.push((action$, { getState }) =>
  action$.ofType(FETCH_ECOMMERCE_ROOT_CATEGORIES_PENDING).mergeMap(action => {
    return onEcommerceRootCategoriesGet()
      .map(({ response }) => ({
        type: FETCH_ECOMMERCE_ROOT_CATEGORIES_FULFILLED,
        payload: response
      }))
      .catch(ajaxError => {
        toast.error("Error Fetching Categories");
        return Observable.of({
          type: FETCH_ECOMMERCE_ROOT_CATEGORIES_REJECTED
        });
      });
  })
);

export const onCategorySubmitEcommerce = payload => ({
  type: CREATE_ECOMMERCE_CATEGORIES_PENDING,
  payload
});

epics.push((action$, { getState }) =>
  action$.ofType(CREATE_ECOMMERCE_CATEGORIES_PENDING).mergeMap(action => {
    const parent = getState().AdminContainer.ecommerce.activeCategory;
    const { name, tags, className } = action.payload;

    return onEcommerceCategoryPost({ body: { name, className, parent, tags } })
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

export const onCategoryUpdateEcommerce = payload => ({
  type: UPDATE_ECOMMERCE_CATEGORY_PENDING,
  payload
});

epics.push((action$, { getState }) =>
  action$.ofType(UPDATE_ECOMMERCE_CATEGORY_PENDING).mergeMap(action => {
    const uid = getState().AdminContainer.ecommerce.activeCategory;
    const { body } = action.payload;

    return onEcommerceCategoryDetailPost({ body, uid })
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

export const onCategoryDeleteEcommerce = payload => ({
  type: DELETE_ECOMMERCE_CATEGORY_PENDING,
  payload
});

epics.push((action$, { getState }) =>
  action$.ofType(DELETE_ECOMMERCE_CATEGORY_PENDING).mergeMap(action => {
    const { uid } = action.payload;

    return onEcommerceCategoryDetailDelete({ uid })
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

export const onChangeActiveCategoryEcommerce = (
  newCategory,
  oldCategory,
  routeOnError,
  justToggle
) => ({
  type: CHANGE_ACTIVE_ECOMMERCE_CATEGORY,
  payload: newCategory,
  oldCategory,
  routeOnError,
  justToggle
});

epics.push((action$, { getState }) =>
  action$
    .ofType(CHANGE_ACTIVE_ECOMMERCE_CATEGORY)
    .switchMap(action => {
      const { payload: newCategory, oldCategory, routeOnError } = action;
      if (!oldCategory || newCategory !== oldCategory) {
        return onEcommerceCategoryDetailGet({ uid: newCategory })
          .map(({ response }) => {
            if (!response.msg || (response.msg && response.msg === "success")) {
              return {
                type: FETCH_ECOMMERCE_CATEGORY_FULFILLED,
                payload: response
              };
            } else {
              routeOnError && routeOnError();
              throw new Error(response.msg);
            }
          })
          .catch(ajaxError => {
            // toast.error("Error fetching Categories");
            return Observable.of({ type: FETCH_ECOMMERCE_CATEGORY_REJECTED });
          });
      } else {
        return Observable.empty();
      }
    })
    .startWith({ type: FETCH_ECOMMERCE_CATEGORY_PENDING })
);

export const openAllOnSearchEcommerce = payload => ({
  type: OPEN_ALL_ON_SEARCH,
  payload
});

export default epics;
