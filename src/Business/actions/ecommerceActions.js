import { Observable } from "rxjs/Observable";
import { toast } from "react-toastify";

import {
  FETCH_ECOMMERCE_CATEGORIES_FULFILLED,
  FETCH_ECOMMERCE_CATEGORIES_PENDING,
  FETCH_ECOMMERCE_CATEGORIES_REJECTED,
  CHANGE_ACTIVE_ECOMMERCE_CATEGORY,
  OPEN_ALL_ON_SEARCH,
  FETCH_ECOMMERCE_CATEGORY_ATTRIBUTES_FULFILLED,
  FETCH_ECOMMERCE_CATEGORY_ATTRIBUTES_PENDING,
  FETCH_ECOMMERCE_CATEGORY_ATTRIBUTES_REJECTED,
  FETCH_ECOMMERCE_CATEGORY_PRODUCTS_FULFILLED,
  FETCH_ECOMMERCE_CATEGORY_PRODUCTS_PENDING,
  FETCH_ECOMMERCE_CATEGORY_PRODUCTS_REJECTED,
  CREATE_ECOMMERCE_PRODUCT_FULFILLED,
  CREATE_ECOMMERCE_PRODUCT_PENDING,
  CREATE_ECOMMERCE_PRODUCT_REJECTED,
  UPDATE_ECOMMERCE_PRODUCT_FULFILLED,
  UPDATE_ECOMMERCE_PRODUCT_PENDING,
  UPDATE_ECOMMERCE_PRODUCT_REJECTED,
  DELETE_ECOMMERCE_PRODUCT_FULFILLED,
  DELETE_ECOMMERCE_PRODUCT_PENDING,
  DELETE_ECOMMERCE_PRODUCT_REJECTED,
  FETCH_ECOMMERCE_PRODUCT_EACH_FULFILLED,
  FETCH_ECOMMERCE_PRODUCT_EACH_PENDING,
  FETCH_ECOMMERCE_PRODUCT_EACH_REJECTED
} from "./types";
import {
  onEcommerceCategoriesGet,
  onEcommerceCategoryAttributesGet,
  onEcommerceCategoryProductsGet,
  onEcommerceProductPost,
  onEcommerceProductEachGet,
  onEcommerceProductEachPut,
  onEcommerceProductEachDelete
} from "../../Admin/config/adminServerCall";

const epics = [];

// Products
export const onCreateEcommerceProduct = payload => ({
  type: CREATE_ECOMMERCE_PRODUCT_PENDING,
  payload
});

epics.push((action$, { getState }) =>
  action$.ofType(CREATE_ECOMMERCE_PRODUCT_PENDING).mergeMap(({ payload }) => {
    const globalState = getState();
    const {
      // attributes: { categories },
      activeCategory: categoryId
    } = globalState.BusinessContainer.ecommerce;
    const businessId = globalState.auth.cookies.user_data.business_id;

    return onEcommerceProductPost({
      body: { ...payload.body, categoryId, businessId }
    })
      .concatMap(({ response }) => {
        if (response.msg === "success") {
          toast.success("Product added successfully!");
          return [
            { type: CREATE_ECOMMERCE_PRODUCT_FULFILLED },
            {
              type: FETCH_ECOMMERCE_CATEGORY_PRODUCTS_PENDING,
              payload: {
                params: {
                  categoryId,
                  businessId
                }
              }
            }
          ];
        } else {
          throw new Error("Error Creating Product");
        }
      })
      .catch(ajaxError => {
        toast.error(ajaxError.toString());
        return Observable.of({ type: CREATE_ECOMMERCE_PRODUCT_REJECTED });
      });
  })
);

export const onUpdateEcommerceProduct = payload => ({
  type: UPDATE_ECOMMERCE_PRODUCT_PENDING,
  payload
});

epics.push((action$, { getState }) =>
  action$.ofType(UPDATE_ECOMMERCE_PRODUCT_PENDING).mergeMap(({ payload }) => {
    const {
      body,
      // categories,
      categoryId,
      uid
    } = payload;
    const businessId = getState().auth.cookies.user_data.business_id;

    return onEcommerceProductEachPut({
      body,
      uid
    })
      .concatMap(({ response }) => {
        if (response.msg === "success") {
          toast.success("Product updated successfully!");
          return [
            { type: UPDATE_ECOMMERCE_PRODUCT_FULFILLED },
            {
              type: FETCH_ECOMMERCE_CATEGORY_PRODUCTS_PENDING,
              payload: {
                params: {
                  categoryId,
                  businessId
                }
              }
            }
          ];
        } else {
          throw new Error("Error Updating Product");
        }
      })
      .catch(ajaxError => {
        toast.error(ajaxError.toString());
        return Observable.of({ type: UPDATE_ECOMMERCE_PRODUCT_REJECTED });
      });
  })
);

export const onRemoveEcommerceProduct = payload => ({
  type: DELETE_ECOMMERCE_PRODUCT_PENDING,
  payload
});

epics.push((action$, { getState }) =>
  action$.ofType(DELETE_ECOMMERCE_PRODUCT_PENDING).mergeMap(action => {
    // const payload = getState().AdminContainer.ecommerce.activeCategory;
    const { uid, routeToManageProducts, fetchProductsAgain } = action.payload;

    return onEcommerceProductEachDelete({ uid })
      .concatMap(({ response }) => {
        if (response.msg === "success") {
          toast.success("Product Deleted Successfully");
          routeToManageProducts && routeToManageProducts();
          const extra = [];
          if (fetchProductsAgain) {
            extra.push({ type: FETCH_ECOMMERCE_CATEGORY_PRODUCTS_PENDING });
          }
          return [{ type: DELETE_ECOMMERCE_PRODUCT_FULFILLED }, ...extra];
        } else {
          throw new Error(response.msg);
        }
      })
      .catch(ajaxError => {
        toast.error(ajaxError.toString());
        return Observable.of({ type: DELETE_ECOMMERCE_PRODUCT_REJECTED });
      });
  })
);

export const onEcommerceProductEachList = payload => ({
  type: FETCH_ECOMMERCE_PRODUCT_EACH_PENDING,
  payload
});

epics.push((action$, { getState }) =>
  action$.ofType(FETCH_ECOMMERCE_PRODUCT_EACH_PENDING).mergeMap(action => {
    const { uid } = action.payload;

    return onEcommerceProductEachGet({ uid })
      .concatMap(({ response }) => {
        return [
          { type: FETCH_ECOMMERCE_PRODUCT_EACH_FULFILLED, payload: response },
          {
            type: FETCH_ECOMMERCE_CATEGORY_ATTRIBUTES_PENDING,
            payload: {
              body: {
                categoryId: response.categoryId
              }
            }
          }
        ];
      })
      .catch(ajaxError => {
        toast.error(ajaxError.toString());
        return Observable.of({ type: FETCH_ECOMMERCE_PRODUCT_EACH_REJECTED });
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
  action$.ofType(CHANGE_ACTIVE_ECOMMERCE_CATEGORY).concatMap(action => {
    const { payload: newCategory, oldCategory, routeOnError } = action;
    const businessId = getState().auth.cookies.user_data.business_id;
    const stuffs = [];
    const categories = getState().BusinessContainer.ecommerce.categories;

    let leafDetected = false;

    const updateLeafDetected = category => {
      const { children, uid, hasProduct } = category;
      if (children && children.length) {
        children.forEach(subCategory => updateLeafDetected(subCategory));
      }

      if (uid === newCategory && hasProduct) {
        leafDetected = true;
      }
    };

    if (categories && (!oldCategory || newCategory !== oldCategory)) {
      updateLeafDetected(categories);
    }

    if (leafDetected && (!oldCategory || newCategory !== oldCategory)) {
      stuffs.push({
        type: FETCH_ECOMMERCE_CATEGORY_ATTRIBUTES_PENDING,
        payload: {
          body: { categoryId: newCategory }
        },
        routeOnError
      });
    }
    if (!oldCategory || newCategory !== oldCategory) {
      stuffs.push({
        type: FETCH_ECOMMERCE_CATEGORY_PRODUCTS_PENDING,
        payload: {
          params: { categoryId: newCategory, businessId }
        },
        routeOnError
      });
    }
    return stuffs;
  })
);

epics.push(action$ =>
  action$
    .ofType(FETCH_ECOMMERCE_CATEGORY_ATTRIBUTES_PENDING)
    .switchMap(({ payload: { body }, routeOnError }) => {
      return onEcommerceCategoryAttributesGet({ body })
        .map(({ response }) => {
          if (response.msg === "success") {
            return {
              type: FETCH_ECOMMERCE_CATEGORY_ATTRIBUTES_FULFILLED,
              payload: response
            };
          } else {
            routeOnError && routeOnError();
            throw new Error(response.msg);
          }
        })
        .catch(ajaxError => {
          // toast.error(ajaxError.toString());
          return Observable.of({
            type: FETCH_ECOMMERCE_CATEGORY_ATTRIBUTES_REJECTED
          });
        });
    })
);

export const onFetchEcommerceProducts = payload => ({
  type: FETCH_ECOMMERCE_CATEGORY_PRODUCTS_PENDING,
  payload
});

epics.push((action$, { getState }) =>
  action$
    .ofType(FETCH_ECOMMERCE_CATEGORY_PRODUCTS_PENDING)
    .switchMap(({ payload, routeOnError }) => {
      const params = payload ? payload.params : {};
      return onEcommerceCategoryProductsGet({
        params: {
          businessId: getState().auth.cookies.user_data.business_id,
          categoryId: getState().BusinessContainer.ecommerce.activeCategory,
          count: getState().BusinessContainer.ecommerce.count,
          page: getState().BusinessContainer.ecommerce.page,
          ...params
        }
      })
        .map(({ response }) => {
          if (response.msg === "success") {
            return {
              type: FETCH_ECOMMERCE_CATEGORY_PRODUCTS_FULFILLED,
              payload: response
            };
          } else {
            routeOnError && routeOnError();
            throw new Error(response.msg);
          }
        })
        .catch(ajaxError => {
          // toast.error(ajaxError.toString());
          return Observable.of({
            type: FETCH_ECOMMERCE_CATEGORY_PRODUCTS_REJECTED
          });
        });
    })
);

export const openAllOnSearchEcommerce = payload => ({
  type: OPEN_ALL_ON_SEARCH,
  payload
});

export default epics;
