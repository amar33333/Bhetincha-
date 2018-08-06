import { Observable } from "rxjs/Observable";
import { toast } from "react-toastify";
import {
  onCompanyTypePostAjax,
  onPaymentMethodPostAjax,
  onCompanyTypeEachDeleteAjax,
  onPaymentMethodEachDeleteAjax,
  onIndustryEachGet,
  onCountryEachGet,
  onStateEachGet,
  onDistrictEachGet,
  onCityEachGet,
  onCountryEachGetAjax,
  onStateEachGetAjax,
  onCompanyTypePut,
  onPaymentMethodPut,
  onAssignedPathPost,
  onAssignedPathEachGet,
  onAssignedBusinessAllGetAjax,
  onBusinessVerifyPost,
  onSubCategoryGet,
  onSocialLinkUrlPost,
  onSocialLinkUrlGet,
  onSocialLinkUrlPut,
  onSocialLinkUrlDelete
} from "../config/adminServerCall";

import {
  onBusinessPost,
  onBusinessPut,
  onCompanyTypeGet,
  onPaymentMethodsGet,
  onBusinessAllGetAjax,
  onBusinessEachGet,
  onBusinessEachDeleteAjax,
  onBusinessEachGetAjax,
  onAppBusinessPost,
  onAppBusinessGet,
  onAppBusinessEachGet,
  onAppBusinessEachDelete,
  onSalesUserGet,
  onBranchPost,
  onBranchGet,
  onBranchPut,
  onBranchDelete,
  onBusinessBranchGet
} from "../../Business/config/businessServerCall";

import {
  FETCH_CATEGORY_ARRAY_PENDING,
  FETCH_CATEGORY_ARRAY_FULFILLED,
  FETCH_CATEGORY_ARRAY_REJECTED,
  CREATE_COMPANY_TYPE_FULFILLED,
  CREATE_COMPANY_TYPE_PENDING,
  CREATE_COMPANY_TYPE_REJECTED,
  CREATE_BRANCH_FULFILLED,
  CREATE_BRANCH_PENDING,
  CREATE_BRANCH_REJECTED,
  DELETE_COMPANY_TYPE_FULFILLED,
  DELETE_COMPANY_TYPE_PENDING,
  DELETE_COMPANY_TYPE_REJECTED,
  CREATE_PAYMENT_METHODS_FULFILLED,
  CREATE_PAYMENT_METHODS_PENDING,
  CREATE_PAYMENT_METHODS_REJECTED,
  DELETE_PAYMENT_METHODS_FULFILLED,
  DELETE_PAYMENT_METHODS_PENDING,
  DELETE_PAYMENT_METHODS_REJECTED,
  FETCH_INDUSTRY_EACH_PENDING,
  FETCH_INDUSTRY_EACH_FULFILLED,
  FETCH_INDUSTRY_EACH_REJECTED,
  FETCH_BUSINESS_FULFILLED,
  FETCH_BUSINESS_REJECTED,
  FETCH_BUSINESS_PENDING,
  FETCH_BUSINESS_EACH_FULFILLED,
  FETCH_BUSINESS_EACH_REJECTED,
  FETCH_BUSINESS_EACH_PENDING,
  CREATE_BUSINESS_FULFILLED,
  CREATE_BUSINESS_REJECTED,
  CREATE_BUSINESS_PENDING,
  FETCH_PAYMENT_METHODS_FULFILLED,
  FETCH_PAYMENT_METHODS_REJECTED,
  FETCH_PAYMENT_METHODS_PENDING,
  FETCH_COMPANY_TYPE_FULFILLED,
  FETCH_COMPANY_TYPE_REJECTED,
  FETCH_COMPANY_TYPE_PENDING,
  DELETE_BUSINESS_FULFILLED,
  DELETE_BUSINESS_PENDING,
  DELETE_BUSINESS_REJECTED,
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
  FETCH_ADDRESS_TREE_FULFILLED,
  FETCH_ADDRESS_TREE_REJECTED,
  FETCH_ADDRESS_TREE_PENDING,
  EDIT_BUSINESS_FULFILLED,
  EDIT_BUSINESS_PENDING,
  EDIT_BUSINESS_REJECTED,
  FETCH_ADDRESS_TREE_GET_PENDING,
  TOGGLE_EDIT,
  TOGGLE_COMPANY_TYPE_EDIT_MODAL,
  TOGGLE_PAYMENT_METHOD_EDIT_MODAL,
  EDIT_COMPANY_TYPE_PENDING,
  EDIT_COMPANY_TYPE_FULFILLED,
  EDIT_COMPANY_TYPE_REJECTED,
  EDIT_PAYMENT_METHOD_FULFILLED,
  EDIT_PAYMENT_METHOD_PENDING,
  EDIT_PAYMENT_METHOD_REJECTED,
  FETCH_APP_BUSINESS_FULFILLED,
  FETCH_APP_BUSINESS_REJECTED,
  FETCH_APP_BUSINESS_PENDING,
  FETCH_ASSIGN_BUSINESS_FULFILLED,
  FETCH_ASSIGN_BUSINESS_REJECTED,
  FETCH_ASSIGN_BUSINESS_PENDING,
  CREATE_ASSIGNED_PATH_FULFILLED,
  CREATE_ASSIGNED_PATH_PENDING,
  CREATE_ASSIGNED_PATH_REJECTED,
  DELETE_APP_BUSINESS_FULFILLED,
  DELETE_APP_BUSINESS_REJECTED,
  DELETE_APP_BUSINESS_PENDING,
  FETCH_APP_BUSINESS_EACH_FULFILLED,
  FETCH_APP_BUSINESS_EACH_REJECTED,
  FETCH_APP_BUSINESS_EACH_PENDING,
  APPROVE_BUSINESS_FULFILLED,
  APPROVE_BUSINESS_PENDING,
  APPROVE_BUSINESS_REJECTED,
  FETCH_SALES_USERS_FULFILLED,
  FETCH_SALES_USERS_PENDING,
  FETCH_SALES_USERS_REJECTED,
  FETCH_ASSIGNED_PATH_PENDING,
  FETCH_ASSIGNED_PATH_FULFILLED,
  FETCH_ASSIGNED_PATH_REJECTED,
  CREATE_VERIFIED_BUSINESS_FULFILLED,
  CREATE_VERIFIED_BUSINESS_PENDING,
  CREATE_VERIFIED_BUSINESS_REJECTED,
  FETCH_BRANCH_EACH_FULFILLED,
  FETCH_BRANCH_EACH_PENDING,
  FETCH_BRANCH_EACH_REJECTED,
  EDIT_BRANCH_EACH_FULFILLED,
  EDIT_BRANCH_EACH_PENDING,
  EDIT_BRANCH_EACH_REJECTED,
  FETCH_BUSINESS_BRANCH_FULFILLED,
  FETCH_BUSINESS_BRANCH_PENDING,
  FETCH_BUSINESS_BRANCH_REJECTED,
  DELETE_BRANCH_FULFILLED,
  DELETE_BRANCH_PENDING,
  DELETE_BRANCH_REJECTED,
  CREATE_SOCIAL_LINK_URL_FULFILLED,
  CREATE_SOCIAL_LINK_URL_PENDING,
  CREATE_SOCIAL_LINK_URL_REJECTED,
  FETCH_SOCIAL_LINK_URL_FULFILLED,
  FETCH_SOCIAL_LINK_URL_PENDING,
  FETCH_SOCIAL_LINK_URL_REJECTED,
  EDIT_SOCIAL_LINK_URL_FULFILLED,
  EDIT_SOCIAL_LINK_URL_PENDING,
  EDIT_SOCIAL_LINK_URL_REJECTED,
  DELETE_SOCIAL_LINK_URL_FULFILLED,
  DELETE_SOCIAL_LINK_URL_PENDING,
  DELETE_SOCIAL_LINK_URL_REJECTED,
  UNMOUNT_BRANCH,
  UNMOUNT_COMPANY_TYPE,
  UNMOUNT_PAYMENT_METHOD,
  RESET_PAYMENT_COMPANY_ERRORS,
  TOGGLE_SOCIAL_LINK_URL_EDIT_MODAL
} from "./types";

const epics = [];

export const toggleSocialLinkUrlEditModal = payload => ({
  type: TOGGLE_SOCIAL_LINK_URL_EDIT_MODAL,
  payload
});

export const onSocialLinkUrlList = payload => ({
  type: FETCH_SOCIAL_LINK_URL_PENDING,
  payload
});

epics.push((action$, { getState }) =>
  action$.ofType(FETCH_SOCIAL_LINK_URL_PENDING).mergeMap(({ payload }) =>
    onSocialLinkUrlGet({
      access_token: getState().auth.cookies.token_data.access_token,
      ...payload
    })
      .map(({ response }) => {
        return {
          type: FETCH_SOCIAL_LINK_URL_FULFILLED,
          payload: response
        };
      })
      .catch(ajaxError => {
        // toast.error("Error Adding Social Link !!!");
        return Observable.of({
          type: FETCH_SOCIAL_LINK_URL_REJECTED,
          payload: ajaxError.status
            ? ajaxError.message
            : JSON.parse(ajaxError.message)
        });
      })
  )
);
export const onSocialLinkUrlEdit = payload => ({
  type: EDIT_SOCIAL_LINK_URL_PENDING,
  payload
});

epics.push((action$, { getState }) =>
  action$.ofType(EDIT_SOCIAL_LINK_URL_PENDING).mergeMap(({ payload }) =>
    onSocialLinkUrlPut({
      access_token: getState().auth.cookies.token_data.access_token,
      ...payload
    })
      .concatMap(({ response }) => {
        if (response.msg === "success") {
          toast.success("Social Link Updated Successfully!");

          return [
            {
              type: EDIT_SOCIAL_LINK_URL_FULFILLED,
              payload: response
            },
            {
              type: FETCH_SOCIAL_LINK_URL_PENDING,
              payload: { id: payload.id }
            },
            {
              type: TOGGLE_SOCIAL_LINK_URL_EDIT_MODAL,
              payload: null
            }
          ];
        } else throw new Error(JSON.stringify(response.msg));
      })
      .catch(ajaxError => {
        toast.error("Error Updating Social Link !!!");
        return Observable.of({
          type: EDIT_SOCIAL_LINK_URL_REJECTED,
          payload: ajaxError.status
            ? ajaxError.message
            : JSON.parse(ajaxError.message)
        });
      })
  )
);

export const onSocialLinkUrlRemove = payload => ({
  type: DELETE_SOCIAL_LINK_URL_PENDING,
  payload
});

epics.push((action$, { getState }) =>
  action$.ofType(DELETE_SOCIAL_LINK_URL_PENDING).mergeMap(({ payload }) => {
    return onSocialLinkUrlDelete({
      access_token: getState().auth.cookies.token_data.access_token,
      ...payload
    })
      .concatMap(({ response }) => {
        if (response.msg === "success") {
          toast.success("Social Link Deleted Successfully!");

          return [
            {
              type: DELETE_SOCIAL_LINK_URL_FULFILLED,
              payload: response
            },
            { type: FETCH_SOCIAL_LINK_URL_PENDING, payload: { id: payload.id } }
          ];
        } else throw new Error(JSON.stringify(response.msg));
      })
      .catch(ajaxError => {
        toast.error("Error Deleting Social Link !!!");
        return Observable.of({
          type: DELETE_SOCIAL_LINK_URL_REJECTED,
          payload: ajaxError.status
            ? ajaxError.message
            : JSON.parse(ajaxError.message)
        });
      });
  })
);

export const onSocialLinkUrlSubmit = payload => ({
  type: CREATE_SOCIAL_LINK_URL_PENDING,
  payload
});

epics.push((action$, { getState }) =>
  action$.ofType(CREATE_SOCIAL_LINK_URL_PENDING).mergeMap(({ payload }) =>
    onSocialLinkUrlPost({
      access_token: getState().auth.cookies.token_data.access_token,
      ...payload
    })
      .concatMap(({ response }) => {
        if (response.msg === "success") {
          toast.success("Social Link Created Successfully!");

          return [
            {
              type: CREATE_SOCIAL_LINK_URL_FULFILLED,
              payload: response
            },
            { type: FETCH_SOCIAL_LINK_URL_PENDING, payload: { id: payload.id } }
          ];
        } else throw new Error(JSON.stringify(response.msg));
      })
      .catch(ajaxError => {
        toast.error("Error Adding Social Link !!!");
        return Observable.of({
          type: CREATE_SOCIAL_LINK_URL_REJECTED,
          payload: ajaxError.status
            ? ajaxError.message
            : JSON.parse(ajaxError.message)
        });
      })
  )
);

export const onBusinessBranchList = payload => ({
  type: FETCH_BUSINESS_BRANCH_PENDING,
  payload
});

epics.push((action$, { getState }) =>
  action$.ofType(FETCH_BUSINESS_BRANCH_PENDING).mergeMap(({ payload }) => {
    const access_token = getState().auth.cookies.token_data.access_token;
    const { business_slug } = payload;

    return onBusinessBranchGet({ access_token, business_slug })
      .map(({ response }) => {
        return { type: FETCH_BUSINESS_BRANCH_FULFILLED, payload: response };
      })
      .catch(ajaxError => {
        toast.error(ajaxError.toString());
        return Observable.of({
          type: FETCH_BUSINESS_BRANCH_REJECTED,
          payload: ajaxError
        });
      });
  })
);

export const onBranchAddressList = ({
  business_slug,
  branch_id,
  access_token
}) => dispatch => {
  onBranchGet({ access_token, business_slug, branch_id })
    .then(response => {
      const countryId = response.data.country ? response.data.country.id : "";
      const stateId = response.data.state ? response.data.state.id : "";
      const districtId = response.data.district
        ? response.data.district.id
        : "";
      const cityId = response.data.city ? response.data.city.id : "";

      getAddressTree(
        countryId,
        stateId,
        districtId,
        cityId,
        access_token,
        dispatch
      );

      dispatch({ type: FETCH_ADDRESS_TREE_PENDING });
      dispatch({ type: FETCH_BRANCH_EACH_FULFILLED, payload: response.data });
    })
    .catch(error =>
      dispatch({ type: FETCH_BRANCH_EACH_REJECTED, payload: error })
    );
  dispatch({ type: FETCH_BRANCH_EACH_PENDING });
};

export const onBranchRemove = payload => ({
  type: DELETE_BRANCH_PENDING,
  payload
});

epics.push((action$, { getState }) =>
  action$.ofType(DELETE_BRANCH_PENDING).mergeMap(action => {
    const access_token = getState().auth.cookies.token_data.access_token;
    const { business_slug, branch_id } = action.payload;

    return onBranchDelete({ business_slug, branch_id, access_token })
      .concatMap(({ response }) => {
        if (response.msg === "success") {
          toast.success("Branch Deleted Successfully!");
          return [
            {
              type: FETCH_BUSINESS_BRANCH_PENDING,
              payload: { business_slug }
            },

            { type: DELETE_BRANCH_FULFILLED }
          ];
        } else {
          throw new Error(response.msg[Object.keys(response.msg)[0]][0]);
        }
      })
      .catch(ajaxError => {
        toast.error(ajaxError.toString());
        return Observable.of({ type: DELETE_BRANCH_REJECTED });
      });
  })
);

export const onBranchEdit = payload => ({
  type: EDIT_BRANCH_EACH_PENDING,
  payload
});

epics.push((action$, { getState }) =>
  action$.ofType(EDIT_BRANCH_EACH_PENDING).mergeMap(({ payload }) => {
    const access_token = getState().auth.cookies.token_data.access_token;
    const { business_slug, branch_id, body } = payload;

    return onBranchPut({ access_token, business_slug, branch_id, body })
      .map(({ response }) => {
        if (response.msg === "success") {
          toast.success("Branch Updated Successfully!");

          return { type: EDIT_BRANCH_EACH_FULFILLED, payload: response };
        } else throw new Error(JSON.stringify(response.msg));
      })
      .catch(ajaxError => {
        toast.error("Error: Updating Branch !!!");
        return Observable.of({
          type: EDIT_BRANCH_EACH_REJECTED,
          payload: ajaxError.status
            ? ajaxError.message
            : JSON.parse(ajaxError.message)
        });
      });
  })
);

// export const onBranchAddressLists = payload => ({
//   type: FETCH_BRANCH_EACH_PENDING,
//   payload
// });

// epics.push((action$, { getState }) =>
//   action$.ofType(FETCH_BRANCH_EACH_PENDING).mergeMap(({ payload }) => {
//     const access_token = getState().auth.cookies.token_data.access_token;
//     const { business_slug, branch_id } = payload;

//     return onBranchGet({ access_token, business_slug, branch_id })
//       .map(({ response }) => {
//         return { type: FETCH_BRANCH_EACH_FULFILLED, payload: response };
//       })
//       .catch(ajaxError => {
//         toast.error(ajaxError.toString());
//         return Observable.of({
//           type: FETCH_BRANCH_EACH_REJECTED,
//           payload: ajaxError
//         });
//       });
//   })
// );

export const onBranchAdd = payload => ({
  type: CREATE_BRANCH_PENDING,
  payload
});

epics.push((action$, { getState }) =>
  action$.ofType(CREATE_BRANCH_PENDING).mergeMap(action => {
    const access_token = getState().auth.cookies.token_data.access_token;
    const { business_slug, body } = action.payload;

    return onBranchPost({ business_slug, body, access_token })
      .map(({ response }) => {
        if (response.msg === "success") {
          toast.success("Branch Added Successfully!");
          return { type: CREATE_BRANCH_FULFILLED };
        } else {
          throw new Error(JSON.stringify(response.msg));
        }
      })
      .catch(ajaxError => {
        toast.error("Error: Adding Branch !!!");
        return Observable.of({
          type: CREATE_BRANCH_REJECTED,
          payload: ajaxError.status
            ? ajaxError.message
            : JSON.parse(ajaxError.message)
        });
      });
  })
);

export const onBusinessVerify = payload => ({
  type: CREATE_VERIFIED_BUSINESS_PENDING,
  payload
});

epics.push((action$, { getState }) =>
  action$.ofType(CREATE_VERIFIED_BUSINESS_PENDING).mergeMap(action => {
    const access_token = getState().auth.cookies.token_data.access_token;
    const { id, body } = action.payload;

    return onBusinessVerifyPost({ id, body, access_token })
      .map(({ response }) => {
        if (response.msg === "success") {
          toast.success("Business Verified Successfully!");
          return { type: CREATE_VERIFIED_BUSINESS_FULFILLED };
        } else {
          throw new Error(response.msg[Object.keys(response.msg)[0]][0]);
        }
      })
      .catch(ajaxError => {
        toast.error(ajaxError.toString());
        return Observable.of({ type: CREATE_VERIFIED_BUSINESS_REJECTED });
      });
  })
);

export const onAssignedPathEachList = payload => ({
  type: FETCH_ASSIGNED_PATH_PENDING,
  payload
});

epics.push((action$, { getState }) =>
  action$.ofType(FETCH_ASSIGNED_PATH_PENDING).mergeMap(action => {
    const access_token = getState().auth.cookies.token_data.access_token;
    const { id } = action.payload;

    return onAssignedPathEachGet({ access_token, id })
      .map(({ response }) => ({
        type: FETCH_ASSIGNED_PATH_FULFILLED,
        payload: response
      }))
      .catch(ajaxError => {
        toast.error(ajaxError.toString());
        return Observable.of({
          type: FETCH_ASSIGNED_PATH_REJECTED,
          payload: ajaxError
        });
      });
  })
);

export const onAssignedPathSubmit = payload => ({
  type: CREATE_ASSIGNED_PATH_PENDING,
  payload
});

epics.push((action$, { getState }) =>
  action$.ofType(CREATE_ASSIGNED_PATH_PENDING).mergeMap(action => {
    const access_token = getState().auth.cookies.token_data.access_token;
    const { body, mongoId } = action.payload;

    return onAssignedPathPost({ body, mongoId, access_token })
      .map(({ response }) => {
        if (response.msg === "success") {
          toast.success("Path Assigned Successfully!");
          return { type: CREATE_ASSIGNED_PATH_FULFILLED };
        } else {
          throw new Error(response.msg[Object.keys(response.msg)[0]][0]);
        }
      })
      .catch(ajaxError => {
        toast.error(ajaxError.toString());
        return Observable.of({ type: CREATE_ASSIGNED_PATH_REJECTED });
      });
  })
);

export const onSalesUserList = payload => ({
  type: FETCH_SALES_USERS_PENDING,
  payload
});

epics.push((action$, { getState }) =>
  action$.ofType(FETCH_SALES_USERS_PENDING).mergeMap(action => {
    const access_token = getState().auth.cookies.token_data.access_token;

    return onSalesUserGet({ access_token })
      .map(({ response }) => ({
        type: FETCH_SALES_USERS_FULFILLED,
        payload: response
      }))
      .catch(ajaxError => {
        toast.error(ajaxError.toString());
        return Observable.of({
          type: FETCH_SALES_USERS_REJECTED,
          payload: ajaxError
        });
      });
  })
);

export const onBusinessAllGet = payload => ({
  type: FETCH_BUSINESS_PENDING,
  payload
});

epics.push((action$, { getState }) =>
  action$.ofType(FETCH_BUSINESS_PENDING).switchMap(({ payload }) => {
    const {
      rows,
      page,
      q,
      sort_by,
      filterIndustry,
      filterCategory,
      filterSubCategory,
      filterCountry,
      filterState,
      filterDistrict,
      filterCity,
      filterArea
    } = getState().AdminContainer.filterBusiness;
    const params = {};
    params.rows = rows;
    params.page = page;
    if (q) {
      params.q = q.trim();
    }
    if (sort_by.length) {
      params.sort_by = sort_by.map(
        data => `${data.id}-${data.desc ? "desc" : "asc"}`
      );
    }
    if (filterIndustry.length) {
      params.industry = filterIndustry.map(industry => industry.id);
    }
    if (filterCategory.length) {
      params.category = filterCategory.map(category => category.id);
    }
    if (filterSubCategory.length) {
      params.sub_category = filterSubCategory.map(
        subcategory => subcategory.id
      );
    }
    if (filterCountry.length) {
      params.country = filterCountry.map(country => country.id);
    }
    if (filterState.length) {
      params.state = filterState.map(state => state.id);
    }
    if (filterDistrict.length) {
      params.district = filterDistrict.map(district => district.id);
    }
    if (filterCity.length) {
      params.city = filterCity.map(city => city.id);
    }
    if (filterArea.length) {
      params.area = filterArea.map(area => area.id);
    }

    if (payload) {
      if (payload.rows) params.rows = payload.rows;
      if (payload.page) params.page = payload.page;
    }

    return onBusinessAllGetAjax({
      access_token: getState().auth.cookies.token_data.access_token,
      params
    })
      .map(({ response }) => {
        if (
          response !== null &&
          typeof response === "object" &&
          Array.isArray(response) === false
        ) {
          // toast.success("Businesses fetched successfully!");
          return {
            type: FETCH_BUSINESS_FULFILLED,
            payload: response
          };
        } else {
          throw new Error("Error");
        }
      })
      .catch(ajaxError => {
        toast.error("Error Fetching Businesses");
        return Observable.of({ type: FETCH_BUSINESS_REJECTED });
      });
  })
);

export const onAppBusinessList = payload => ({
  type: FETCH_APP_BUSINESS_PENDING,
  payload
});

epics.push((action$, { getState }) =>
  action$.ofType(FETCH_APP_BUSINESS_PENDING).switchMap(({ payload }) => {
    const filterValue = getState().AdminContainer.filterAppBusiness;
    const params = {};
    params.rows = filterValue.rows;
    params.page = filterValue.page;
    params.q = filterValue.q;
    params.sort_by = filterValue.sort_by.map(
      data => `${data.id}-${data.desc ? "desc" : "asc"}`
    );
    params.industry = filterValue.industry
      ? filterValue.industry.map(industry => industry.id)
      : [];

    if (payload) {
      if (payload.rows) params.rows = payload.rows;
      if (payload.page) params.page = payload.page;
    }

    return onAppBusinessGet({
      access_token: getState().auth.cookies.token_data.access_token,
      params
    })
      .map(({ response }) => {
        if (
          response !== null &&
          typeof response === "object" &&
          Array.isArray(response) === false
        ) {
          // toast.success("Businesses fetched successfully!");
          return {
            type: FETCH_APP_BUSINESS_FULFILLED,
            payload: response
          };
        } else {
          throw new Error("Error");
        }
      })
      .catch(ajaxError => {
        toast.error("Error Fetching Businesses");
        return Observable.of({ type: FETCH_APP_BUSINESS_REJECTED });
      });
  })
);

export const onAssignBusinessList = payload => ({
  type: FETCH_ASSIGN_BUSINESS_PENDING,
  payload
});

epics.push((action$, { getState }) =>
  action$.ofType(FETCH_ASSIGN_BUSINESS_PENDING).switchMap(({ payload }) => {
    const {
      rows,
      page,
      q,
      sort_by,
      filterIndustry,
      filterCategory,
      filterSubCategory,
      filterCountry,
      filterState,
      filterDistrict,
      filterCity,
      filterArea
    } = getState().AdminContainer.filterAssignBusiness;
    const params = {};
    params.rows = rows;
    params.page = page;
    if (q) {
      params.q = q.trim();
    }
    if (sort_by.length) {
      params.sort_by = sort_by.map(
        data => `${data.id}-${data.desc ? "desc" : "asc"}`
      );
    }
    if (filterIndustry.length) {
      params.industry = filterIndustry.map(industry => industry.id);
    }
    if (filterCategory.length) {
      params.category = filterCategory.map(category => category.id);
    }
    if (filterSubCategory.length) {
      params.sub_category = filterSubCategory.map(
        subcategory => subcategory.id
      );
    }
    if (filterCountry.length) {
      params.country = filterCountry.map(country => country.id);
    }
    if (filterState.length) {
      params.state = filterState.map(state => state.id);
    }
    if (filterDistrict.length) {
      params.district = filterDistrict.map(district => district.id);
    }
    if (filterCity.length) {
      params.city = filterCity.map(city => city.id);
    }
    if (filterArea.length) {
      params.area = filterArea.map(area => area.id);
    }

    if (payload) {
      if (payload.rows) params.rows = payload.rows;
      if (payload.page) params.page = payload.page;
    }

    return onAssignedBusinessAllGetAjax({
      access_token: getState().auth.cookies.token_data.access_token,
      params
    })
      .map(({ response }) => {
        if (
          response !== null &&
          typeof response === "object" &&
          Array.isArray(response) === false
        ) {
          // toast.success("Businesses fetched successfully!");
          return {
            type: FETCH_ASSIGN_BUSINESS_FULFILLED,
            payload: response
          };
        } else {
          throw new Error("Error");
        }
      })
      .catch(ajaxError => {
        toast.error("Error Fetching Businesses");
        return Observable.of({ type: FETCH_ASSIGN_BUSINESS_REJECTED });
      });
  })
);

export const onAppBusinessEachList = ({
  username,
  access_token
}) => dispatch => {
  onAppBusinessEachGet({ username, access_token })
    .then(response => {
      const industryId = response.data.industry
        ? response.data.industry.id
        : "";
      const countryId = response.data.address.country
        ? response.data.address.country.id
        : "";
      const stateId = response.data.address.state
        ? response.data.address.state.id
        : "";
      const districtId = response.data.address.district
        ? response.data.address.district.id
        : "";
      const cityId = response.data.address.city
        ? response.data.address.city.id
        : "";

      if (industryId !== "")
        onIndustryEachGet({ id: industryId, access_token })
          .then(newResponse => {
            dispatch({
              type: FETCH_INDUSTRY_EACH_FULFILLED,
              payload: newResponse.data
            });
          })

          .catch(err =>
            dispatch({ type: FETCH_INDUSTRY_EACH_REJECTED, payload: err })
          );

      // This below `dispatch` causes error of payload = undefined in industryEachList Action epics
      // dispatch({ type: FETCH_INDUSTRY_EACH_PENDING });

      //For Primary Address
      getAddressTree(
        countryId,
        stateId,
        districtId,
        cityId,
        access_token,
        dispatch
      );

      // For Branch Address
      response.data.branchAddress.map(each => {
        const branchcountryId = each.country ? each.country.id : "";
        const branchstateId = each.state ? each.state.id : "";
        const branchdistrictId = each.district ? each.district.id : "";
        const branchcityId = each.city ? each.city.id : "";

        getAddressTree(
          branchcountryId,
          branchstateId,
          branchdistrictId,
          branchcityId,
          access_token,
          dispatch
        );
      });

      dispatch({ type: FETCH_ADDRESS_TREE_PENDING });
      dispatch({
        type: FETCH_APP_BUSINESS_EACH_FULFILLED,
        payload: response.data
      });
    })
    .catch(error =>
      dispatch({ type: FETCH_APP_BUSINESS_EACH_REJECTED, payload: error })
    );
  dispatch({ type: FETCH_APP_BUSINESS_EACH_PENDING });
};

export const onBusinessEachDelete = payload => ({
  type: DELETE_BUSINESS_PENDING,
  payload
});

epics.push((action$, { getState }) =>
  action$.ofType(DELETE_BUSINESS_PENDING).mergeMap(action => {
    const { id } = action.payload;
    const { access_token } = getState().auth.cookies.token_data;
    return onBusinessEachDeleteAjax({ id, access_token })
      .concatMap(({ response }) => {
        toast.success("Deleted Successfully!");
        return [
          { type: FETCH_BUSINESS_PENDING },
          { type: DELETE_BUSINESS_FULFILLED }
        ];
      })
      .catch(ajaxError => {
        return Observable.of({ type: DELETE_BUSINESS_REJECTED });
      });
  })
);

export const onAppBusinessEachRemove = payload => ({
  type: DELETE_APP_BUSINESS_PENDING,
  payload
});

epics.push((action$, { getState }) =>
  action$.ofType(DELETE_APP_BUSINESS_PENDING).mergeMap(action => {
    const { id } = action.payload;
    const { access_token } = getState().auth.cookies.token_data;
    return onAppBusinessEachDelete({ id, access_token })
      .mergeMap(({ response }) => console.log(response))
      .catch(ajaxError => {
        return Observable.of({ type: DELETE_APP_BUSINESS_REJECTED });
      });
  })
);

export const onBusinessCreate = payload => ({
  type: CREATE_BUSINESS_PENDING,
  payload
});

epics.push((action$, { getState }) =>
  action$.ofType(CREATE_BUSINESS_PENDING).mergeMap(({ payload }) => {
    const { data } = payload;
    const access_token = getState().auth.cookies.token_data.access_token;

    return onBusinessPost({ data, access_token })
      .map(({ response }) => {
        if (response.msg === "success") {
          toast.success("Business Created Successfully!");
          return { type: CREATE_BUSINESS_FULFILLED };
        } else {
          throw new Error(JSON.stringify(response.msg));
        }
      })
      .catch(ajaxError => {
        toast.error("Error in Adding Business");
        return Observable.of({
          type: CREATE_BUSINESS_REJECTED,
          payload: ajaxError.status
            ? ajaxError.message
            : JSON.parse(ajaxError.message)
        });
      });
  })
);

export const onAppBusinessApproval = payload => ({
  type: APPROVE_BUSINESS_PENDING,
  payload
});

epics.push((action$, { getState }) =>
  action$.ofType(APPROVE_BUSINESS_PENDING).mergeMap(({ payload }) => {
    const { data } = payload;
    const access_token = getState().auth.cookies.token_data.access_token;

    return onBusinessPost({ data, access_token })
      .map(({ response }) => {
        if (response.msg === "success") {
          toast.success("App Business Approved Successfully!");
          return { type: APPROVE_BUSINESS_FULFILLED };
        } else {
          throw new Error(response.msg[Object.keys(response.msg)[0]][0]);
        }
      })
      .catch(ajaxError => {
        toast.error(ajaxError.toString());
        return Observable.of({
          type: APPROVE_BUSINESS_REJECTED,
          payload: ajaxError
        });
      });
  })
);

export const onAppBusinessApprovalS = ({
  data,
  access_token,
  EDIT
}) => dispatch => {
  onBusinessPost({ data, access_token })
    .then(response => {
      dispatch({
        type: TOGGLE_EDIT,
        payload: !EDIT
      });

      if (response.data.msg === "success") {
        toast.success("App Business Approved Successfully!");
        dispatch({ type: APPROVE_BUSINESS_FULFILLED, payload: response.data });
      } else {
        toast.error("Error in Updating!!!");
        dispatch({
          type: APPROVE_BUSINESS_REJECTED,
          payload: response.data.msg
        });
      }
    })
    .catch(error => {
      toast.error("Error in Approving Business!!!");
      dispatch({ type: APPROVE_BUSINESS_REJECTED, payload: error });
    });
  dispatch({ type: APPROVE_BUSINESS_PENDING });
};

// export const onBusinessCreate = ({ data, access_token }) => dispatch => {
//   onBusinessPost({ data, access_token })
//     .then(response => {
//       if (response.data.msg === "success") {
//         toast.success("Business Created Successfully!");
//       } else {
//         toast.error("Business Creation Failed !!!");
//       }
//       dispatch({ type: CREATE_BUSINESS_FULFILLED, payload: response.data });
//     })
//     .catch(error => {
//       toast.error("Business Creation Failed !!!");

//       dispatch({ type: CREATE_BUSINESS_REJECTED, payload: error });
//     });
//   dispatch({ type: CREATE_BUSINESS_PENDING });
// };

export const onBusinessEdit = ({
  id,
  data,
  access_token,
  EDIT
}) => dispatch => {
  onBusinessPut({ id, data, access_token })
    .then(response => {
      if (response.data.msg === "success") {
        dispatch({
          type: TOGGLE_EDIT,
          payload: !EDIT
        });

        onBusinessEachGet({ username: id, access_token })
          .then(response => {
            // ToogleEDIT(!EDIT);

            const industryId = response.data.industry
              ? response.data.industry.id
              : "";
            const countryId = response.data.address.country
              ? response.data.address.country.id
              : "";
            const stateId = response.data.address.state
              ? response.data.address.state.id
              : "";
            const districtId = response.data.address.district
              ? response.data.address.district.id
              : "";
            const cityId = response.data.address.city
              ? response.data.address.city.id
              : "";

            if (industryId !== "")
              onIndustryEachGet({ id: industryId, access_token })
                .then(newResponse =>
                  dispatch({
                    type: FETCH_INDUSTRY_EACH_FULFILLED,
                    payload: newResponse.data
                  })
                )
                .catch(err =>
                  dispatch({ type: FETCH_INDUSTRY_EACH_REJECTED, payload: err })
                );

            //For Primary Address
            getAddressTree(
              countryId,
              stateId,
              districtId,
              cityId,
              access_token,
              dispatch
            );

            // For Branch Address
            response.data.branchAddress.map(each => {
              const branchcountryId = each.country ? each.country.id : "";
              const branchstateId = each.state ? each.state.id : "";
              const branchdistrictId = each.district ? each.district.id : "";
              const branchcityId = each.city ? each.city.id : "";

              getAddressTree(
                branchcountryId,
                branchstateId,
                branchdistrictId,
                branchcityId,
                access_token,
                dispatch
              );
            });

            // dispatch({ type: FETCH_INDUSTRY_EACH_PENDING });
            dispatch({ type: FETCH_ADDRESS_TREE_PENDING });
            dispatch({
              type: FETCH_BUSINESS_EACH_FULFILLED,
              payload: response.data
            });
          })
          .catch(error =>
            dispatch({ type: FETCH_BUSINESS_EACH_REJECTED, payload: error })
          );
        dispatch({ type: FETCH_BUSINESS_EACH_PENDING });

        toast.success("Business Updated Successfully!");
        dispatch({ type: EDIT_BUSINESS_FULFILLED, payload: response.data });
      } else {
        toast.error("Error in Updating!!!");
        dispatch({
          type: EDIT_BUSINESS_REJECTED,
          payload: response.data.msg
        });
      }
    })
    .catch(error => {
      toast.error("Error in Updating!!!");
      dispatch({ type: EDIT_BUSINESS_REJECTED, payload: error });
    });
  dispatch({ type: EDIT_BUSINESS_PENDING });
};

// const getAddressTree = payload => {

//   return {
//     type: FETCH_ADDRESS_TREE_GET_PENDING,
//     payload: payload
//   };
// };

// epics.push((action$, { getState }) =>
//   action$.ofType(FETCH_ADDRESS_TREE_GET_PENDING).mergeMap(({ payload }) => {

//     const { countryId, stateId, districtId, cityId } = payload;
//     const access_token = getState().auth.cookies.token_data.access_token;

//     return onCountryEachGetAjax({ id: countryId, access_token }).map(
//       ({ response }) => {
//         return {
//           type: FETCH_ADDRESS_TREE_FULFILLED,
//           payload: response
//         };
//       }
//     );
//     // .mergeMap(() => onStateEachGetAjax({ id: stateId, access_token }))
//     // .mergeMap(({ response }) => {
//     //   return {
//     //     type: FETCH_ADDRESS_TREE_FULFILLED,
//     //     payload: response
//     //   };
//     // });
//   })
// );

// export const onBusinessEachList = payload => ({
//   type: FETCH_BUSINESS_EACH_PENDING,
//   payload: payload
// });

// epics.push((action$, { getState }) =>
//   action$.ofType(FETCH_BUSINESS_EACH_PENDING).mergeMap(({ payload }) => {
//     const { username } = payload;
//     const access_token = getState().auth.cookies.token_data.access_token;

//     return onBusinessEachGetAjax({ slug: username, access_token }).concatMap(
//       ({ response }) => {
//         const industryId = response.industry ? response.industry.id : "";
//         const countryId = response.address.country
//           ? response.address.country.id
//           : "";
//         const stateId = response.address.state ? response.address.state.id : "";
//         const districtId = response.address.district
//           ? response.address.district.id
//           : "";
//         const cityId = response.address.city ? response.address.city.id : "";

//         const returnStuffs = [];
//         if (industryId !== "")
//           returnStuffs.push({
//             type: FETCH_INDUSTRY_EACH_PENDING,
//             payload: { id: industryId }
//           });

//         return [
//           {
//             type: FETCH_BUSINESS_EACH_FULFILLED,
//             payload: response
//           },
//           ...returnStuffs
//         ];
//         //   onIndustryEachGet({ id: industryId, access_token })
//         //     .map(newResponse => {
//         //       return ({
//         //         type: FETCH_INDUSTRY_EACH_FULFILLED,
//         //         payload: newResponse.data
//         //       });
//         //     })

//         //     .catch(err =>
//         //       return ({ type: FETCH_INDUSTRY_EACH_REJECTED, payload: err })
//         //     );
//       }
//     );
//     // .mergeMap(() => onStateEachGetAjax({ id: stateId, access_token }))
//     // .mergeMap(({ response }) => {
//     //   return {
//     //     type: FETCH_ADDRESS_TREE_FULFILLED,
//     //     payload: response
//     //   };
//     // });
//   })
// );

export const onBusinessEachList = ({ username, access_token }) => dispatch => {
  onBusinessEachGet({ username, access_token })
    .then(response => {
      const industryId = response.data.industry
        ? response.data.industry.id
        : "";
      const countryId = response.data.address.country
        ? response.data.address.country.id
        : "";
      const stateId = response.data.address.state
        ? response.data.address.state.id
        : "";
      const districtId = response.data.address.district
        ? response.data.address.district.id
        : "";
      const cityId = response.data.address.city
        ? response.data.address.city.id
        : "";

      if (industryId !== "")
        onIndustryEachGet({ id: industryId, access_token })
          .then(newResponse => {
            // const ids = newResponse.data.categories.map(
            //   category => category.id
            // );

            // onSubCategoryGet({ params: { ids }, access_token })
            //   .then(subResponse => {
            //     dispatch({
            //       type: FETCH_SUB_CATEGORY_ARRAY_FULFILLED,
            //       payload: subResponse.data
            //     });
            //   })
            //   .catch(err => {
            //     dispatch({
            //       type: FETCH_SUB_CATEGORY_ARRAY_REJECTED,
            //       payload: err
            //     });
            //   });

            // dispatch({
            //   type: FETCH_CATEGORY_ARRAY_PENDING,
            //   payload: { ids }
            // });

            dispatch({
              type: FETCH_INDUSTRY_EACH_FULFILLED,
              payload: newResponse.data
            });
          })

          .catch(err =>
            dispatch({ type: FETCH_INDUSTRY_EACH_REJECTED, payload: err })
          );
      const ids = response.data.categories.map(category => category.id);

      if (ids.length)
        dispatch({
          type: FETCH_CATEGORY_ARRAY_PENDING,
          payload: { ids }
        });

      // This below `dispatch` causes error of payload = undefined in industryEachList Action epics
      // dispatch({ type: FETCH_INDUSTRY_EACH_PENDING });

      //For Primary Address
      getAddressTree(
        countryId,
        stateId,
        districtId,
        cityId,
        access_token,
        dispatch
      );
      //   "primary addresss: ",
      //   getAddressTree(
      //     countryId,
      //     stateId,
      //     districtId,
      //     cityId,
      //     access_token,
      //     dispatch
      //   )
      // );

      // return {
      //   type: FETCH_ADDRESS_TREE_GET_PENDING,
      //   payload: {
      //     countryId,
      //     stateId,
      //     districtId,
      //     cityId,
      //     access_token,
      //     dispatch
      //   }
      // };

      // For Branch Address
      response.data.branchAddress.map(each => {
        const branchcountryId = each.country ? each.country.id : "";
        const branchstateId = each.state ? each.state.id : "";
        const branchdistrictId = each.district ? each.district.id : "";
        const branchcityId = each.city ? each.city.id : "";

        getAddressTree(
          branchcountryId,
          branchstateId,
          branchdistrictId,
          branchcityId,
          access_token,
          dispatch
        );
      });

      dispatch({ type: FETCH_ADDRESS_TREE_PENDING });
      dispatch({ type: FETCH_BUSINESS_EACH_FULFILLED, payload: response.data });
    })
    .catch(error =>
      dispatch({ type: FETCH_BUSINESS_EACH_REJECTED, payload: error })
    );
  dispatch({ type: FETCH_BUSINESS_EACH_PENDING });
};

export const onGetAddressTreeList = data => dispatch => {
  const { countryId, stateId, districtId, cityId, access_token } = data;

  getAddressTree(
    countryId,
    stateId,
    districtId,
    cityId,
    access_token,
    dispatch
  );
  dispatch({ type: FETCH_ADDRESS_TREE_PENDING });
};

const getAddressTree = (
  countryId,
  stateId,
  districtId,
  cityId,
  access_token,
  dispatch
) => {
  if (countryId !== "" && countryId !== undefined) {
    onCountryEachGet({ id: countryId, access_token })
      .then(countryResponse => {
        dispatch({
          type: FETCH_ADDRESS_TREE_FULFILLED,
          payload: countryResponse.data
        });
        if (stateId !== "" && stateId !== undefined)
          onStateEachGet({ id: stateId, access_token })
            .then(stateResponse => {
              dispatch({
                type: FETCH_ADDRESS_TREE_FULFILLED,
                payload: stateResponse.data
              });
              if (districtId !== "" && districtId !== undefined)
                onDistrictEachGet({ id: districtId, access_token })
                  .then(districtResponse => {
                    dispatch({
                      type: FETCH_ADDRESS_TREE_FULFILLED,
                      payload: districtResponse.data
                    });
                    if (cityId !== "" && cityId !== undefined)
                      onCityEachGet({ id: cityId, access_token })
                        .then(cityResponse =>
                          dispatch({
                            type: FETCH_ADDRESS_TREE_FULFILLED,
                            payload: cityResponse.data
                          })
                        )
                        .catch(cityErr =>
                          dispatch({
                            type: FETCH_ADDRESS_TREE_REJECTED,
                            payload: cityErr
                          })
                        );
                  })
                  .catch(districtErr =>
                    dispatch({
                      type: FETCH_ADDRESS_TREE_REJECTED,
                      payload: districtErr
                    })
                  );
            })
            .catch(stateErr =>
              dispatch({ type: FETCH_ADDRESS_TREE_REJECTED, payload: stateErr })
            );
      })
      .catch(countryErr =>
        dispatch({ type: FETCH_ADDRESS_TREE_REJECTED, payload: countryErr })
      );
  }
};

export const onCompanyTypeSubmit = payload => ({
  type: CREATE_COMPANY_TYPE_PENDING,
  payload
});

epics.push((action$, { getState }) =>
  action$.ofType(CREATE_COMPANY_TYPE_PENDING).mergeMap(({ payload }) => {
    const { company_type } = payload;
    const access_token = getState().auth.cookies.token_data.access_token;

    return onCompanyTypePostAjax({ company_type, access_token })
      .concatMap(({ response }) => {
        if (response.msg === "success") {
          toast.success("Company Type added successfully!");
          return [
            { type: CREATE_COMPANY_TYPE_FULFILLED },
            { type: FETCH_COMPANY_TYPE_PENDING }
          ];
        } else {
          throw new Error(JSON.stringify(response.msg));
        }
      })
      .catch(ajaxError => {
        toast.error("Error: Creating Company Type");
        return Observable.of({
          type: CREATE_COMPANY_TYPE_REJECTED,
          payload: ajaxError.status
            ? ajaxError.message
            : JSON.parse(ajaxError.message)
        });
      });
  })
);

// export const onCompanyTypeSubmit = ({
//   company_type,
//   access_token
// }) => dispatch => {
//   onCompanyTypePost({
//     company_type,
//     access_token
//   })
//     .then(response =>
//       dispatch({ type: CREATE_COMPANY_TYPE_FULFILLED, payload: response.data })
//     )
//     .catch(error =>
//       dispatch({ type: CREATE_COMPANY_TYPE_REJECTED, payload: error })
//     );
//   dispatch({ type: CREATE_COMPANY_TYPE_PENDING });
// };

export const onPaymentMethodSubmit = payload => ({
  type: CREATE_PAYMENT_METHODS_PENDING,
  payload
});

epics.push((action$, { getState }) =>
  action$.ofType(CREATE_PAYMENT_METHODS_PENDING).mergeMap(({ payload }) => {
    const { payment_method } = payload;
    const access_token = getState().auth.cookies.token_data.access_token;

    return onPaymentMethodPostAjax({ payment_method, access_token })
      .concatMap(({ response }) => {
        if (response.msg === "success") {
          toast.success("Payment Method added successfully!");
          return [
            { type: CREATE_PAYMENT_METHODS_FULFILLED },
            { type: FETCH_PAYMENT_METHODS_PENDING }
          ];
        } else {
          throw new Error(JSON.stringify(response.msg));
        }
      })
      .catch(ajaxError => {
        toast.error("Error: Creating Payment Method");
        return Observable.of({
          type: CREATE_PAYMENT_METHODS_REJECTED,
          payload: ajaxError.status
            ? ajaxError.message
            : JSON.parse(ajaxError.message)
        });
      });
  })
);

// export const onPaymentMethodSubmit = ({
//   payment_method,
//   access_token
// }) => dispatch => {
//   onPaymentMethodPost({
//     payment_method,
//     access_token
//   })
//     .then(response =>
//       dispatch({
//         type: CREATE_PAYMENT_METHODS_FULFILLED,
//         payload: response.data
//       })
//     )
//     .catch(error =>
//       dispatch({ type: CREATE_PAYMENT_METHODS_REJECTED, payload: error })
//     );
//   dispatch({ type: CREATE_PAYMENT_METHODS_PENDING });
// };

export const onCompanyTypeList = () => ({
  type: FETCH_COMPANY_TYPE_PENDING
});

epics.push((action$, { getState }) =>
  action$.ofType(FETCH_COMPANY_TYPE_PENDING).mergeMap(action => {
    const access_token = getState().auth.cookies.token_data.access_token;

    return onCompanyTypeGet({ access_token })
      .map(({ response }) => ({
        type: FETCH_COMPANY_TYPE_FULFILLED,
        payload: response
      }))
      .catch(ajaxError => {
        toast.error(ajaxError.toString());
        return Observable.of({
          type: FETCH_COMPANY_TYPE_REJECTED,
          payload: ajaxError
        });
      });
  })
);

export const onCompanyTypeEdit = payload => ({
  type: EDIT_COMPANY_TYPE_PENDING,
  payload
});

epics.push((action$, { getState }) =>
  action$.ofType(EDIT_COMPANY_TYPE_PENDING).mergeMap(({ payload }) => {
    const { company_type } = payload;
    const access_token = getState().auth.cookies.token_data.access_token;

    return onCompanyTypePut({ company_type, access_token })
      .concatMap(({ response }) => {
        if (response.msg === "success") {
          toast.success("Company Type Updated successfully!");
          return [
            { type: EDIT_COMPANY_TYPE_FULFILLED },
            { type: FETCH_COMPANY_TYPE_PENDING },
            { type: TOGGLE_COMPANY_TYPE_EDIT_MODAL }
          ];
        } else {
          throw new Error(JSON.stringify(response.msg));
        }
      })
      .catch(ajaxError => {
        toast.error("Error: Updating Company Type");
        return Observable.of({
          type: EDIT_COMPANY_TYPE_REJECTED,
          payload: ajaxError.status
            ? ajaxError.message
            : JSON.parse(ajaxError.message)
        });
      });
  })
);

export const onCompanyTypeDelete = payload => ({
  type: DELETE_COMPANY_TYPE_PENDING,
  payload
});

epics.push((action$, { getState }) =>
  action$.ofType(DELETE_COMPANY_TYPE_PENDING).mergeMap(({ payload }) =>
    onCompanyTypeEachDeleteAjax({
      id: payload.id,
      access_token: getState().auth.cookies.token_data.access_token
    })
      .concatMap(() => {
        toast.success("Deleted Successfully!");
        return [
          { type: FETCH_COMPANY_TYPE_PENDING },
          { type: DELETE_COMPANY_TYPE_FULFILLED }
        ];
      })
      .catch(ajaxError => {
        toast.error("Error Deleting Country");
        return Observable.of({ type: DELETE_COMPANY_TYPE_REJECTED });
      })
  )
);

export const resetPaymentCompanyErrors = () => ({
  type: RESET_PAYMENT_COMPANY_ERRORS
});

export const toggleCompanyTypeEditModal = payload => ({
  type: TOGGLE_COMPANY_TYPE_EDIT_MODAL,
  payload
});

export const togglePaymentMethodEditModal = payload => ({
  type: TOGGLE_PAYMENT_METHOD_EDIT_MODAL,
  payload
});

// export const onCompanyTypeList = ({ access_token }) => dispatch => {
//   onCompanyTypeGet({ access_token })
//     .then(response =>
//       dispatch({
//         type: FETCH_COMPANY_TYPE_FULFILLED,
//         payload: response.data
//       })
//     )
//     .catch(error =>
//       dispatch({ type: FETCH_COMPANY_TYPE_REJECTED, payload: error })
//     );
//   dispatch({ type: FETCH_COMPANY_TYPE_PENDING });
// };

export const onPaymentMethodsList = () => ({
  type: FETCH_PAYMENT_METHODS_PENDING
});

epics.push((action$, { getState }) =>
  action$.ofType(FETCH_PAYMENT_METHODS_PENDING).mergeMap(action => {
    const access_token = getState().auth.cookies.token_data.access_token;

    return onPaymentMethodsGet({ access_token })
      .map(({ response }) => {
        // toast.success("Payment Methods Fetched Successfully!");
        return {
          type: FETCH_PAYMENT_METHODS_FULFILLED,
          payload: response
        };
      })
      .catch(ajaxError => {
        toast.error(ajaxError.toString());
        return Observable.of({
          type: FETCH_PAYMENT_METHODS_REJECTED,
          payload: ajaxError
        });
      });
  })
);

export const onPaymentMethodEdit = payload => ({
  type: EDIT_PAYMENT_METHOD_PENDING,
  payload
});

epics.push((action$, { getState }) =>
  action$.ofType(EDIT_PAYMENT_METHOD_PENDING).mergeMap(({ payload }) => {
    const { payment_method } = payload;
    const access_token = getState().auth.cookies.token_data.access_token;

    return onPaymentMethodPut({ payment_method, access_token })
      .concatMap(({ response }) => {
        if (response.msg === "success") {
          toast.success("Payment Method Updated successfully!");
          return [
            { type: EDIT_PAYMENT_METHOD_FULFILLED },
            { type: FETCH_PAYMENT_METHODS_PENDING },
            { type: TOGGLE_PAYMENT_METHOD_EDIT_MODAL }
          ];
        } else {
          throw new Error(JSON.stringify(response.msg));
        }
      })
      .catch(ajaxError => {
        toast.error("Error: Updating Payment Method");
        return Observable.of({
          type: EDIT_PAYMENT_METHOD_REJECTED,
          payload: ajaxError.status
            ? ajaxError.message
            : JSON.parse(ajaxError.message)
        });
      });
  })
);

// export const onPaymentMethodsList = ({ access_token }) => dispatch => {
//   onPaymentMethodsGet({ access_token })
//     .then(response =>
//       dispatch({
//         type: FETCH_PAYMENT_METHODS_FULFILLED,
//         payload: response.data
//       })
//     )
//     .catch(error =>
//       dispatch({ type: FETCH_PAYMENT_METHODS_REJECTED, payload: error })
//     );
//   dispatch({ type: FETCH_PAYMENT_METHODS_PENDING });
// };

export const onPaymentMethodDelete = payload => ({
  type: DELETE_PAYMENT_METHODS_PENDING,
  payload
});

epics.push((action$, { getState }) =>
  action$.ofType(DELETE_PAYMENT_METHODS_PENDING).mergeMap(({ payload }) =>
    onPaymentMethodEachDeleteAjax({
      id: payload.id,
      access_token: getState().auth.cookies.token_data.access_token
    })
      .concatMap(() => {
        toast.success("Deleted Successfully!");
        return [
          { type: FETCH_PAYMENT_METHODS_PENDING },
          { type: DELETE_PAYMENT_METHODS_FULFILLED }
        ];
      })
      .catch(ajaxError => {
        toast.error("Error Deleting Country");
        return Observable.of({ type: DELETE_PAYMENT_METHODS_REJECTED });
      })
  )
);

export const onUnmountCompanyType = () => ({ type: UNMOUNT_COMPANY_TYPE });
export const onUnmountBranch = () => ({ type: UNMOUNT_BRANCH });

export const onUnmountPaymentMethod = () => ({ type: UNMOUNT_PAYMENT_METHOD });

export const ToogleEDIT = value => ({
  type: TOGGLE_EDIT,
  payload: value
});

export default epics;
