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
  onAssignedPathPost
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
  onSalesUserGet
} from "../../Business/config/businessServerCall";

import {
  CREATE_COMPANY_TYPE_FULFILLED,
  CREATE_COMPANY_TYPE_PENDING,
  CREATE_COMPANY_TYPE_REJECTED,
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
  UNMOUNT_COMPANY_TYPE,
  UNMOUNT_PAYMENT_METHOD
} from "./types";

const epics = [];

export const onAssignedPathSubmit = payload => ({
  type: CREATE_ASSIGNED_PATH_PENDING,
  payload
});

epics.push((action$, { getState }) =>
  action$.ofType(CREATE_ASSIGNED_PATH_PENDING).mergeMap(action => {
    const access_token = getState().auth.cookies.token_data.access_token;
    const { body } = action.payload;

    return onAssignedPathPost({ body, access_token })
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
    const filterValue = getState().AdminContainer.filterBusiness;
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
          toast.success("Businesses fetched successfully!");
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
          toast.success("Businesses fetched successfully!");
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
    const filterValue = getState().AdminContainer.filterAssignBusiness;
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
          toast.success("Businesses fetched successfully!");
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
      // console.log("asdadsadADasd: ", response.data);

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
            console.log("industry each: ", newResponse);
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
      .mergeMap(({ response }) => console.log(response))
      .catch(ajaxError => {
        console.log(ajaxError);
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
        console.log(ajaxError);
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
          throw new Error(response.msg[Object.keys(response.msg)[0]][0]);
        }
      })
      .catch(ajaxError => {
        toast.error(ajaxError.toString());
        return Observable.of({
          type: CREATE_BUSINESS_REJECTED,
          payload: ajaxError
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
        console.log("bussiness acction toogle called: ", EDIT);
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
      dispatch({
        type: TOGGLE_EDIT,
        payload: !EDIT
      });

      onBusinessEachGet({ username: id, access_token })
        .then(response => {
          console.log("asdadsadADasd: ", response.data);

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

      if (response.data.msg === "success") {
        toast.success("Business Updated Successfully!");
        console.log("bussiness acction toogle called: ", EDIT);
        dispatch({ type: EDIT_BUSINESS_FULFILLED, payload: response.data });
      } else {
        toast.error("Error in Updating!!!");
        dispatch({ type: EDIT_BUSINESS_REJECTED, payload: response.data.msg });
      }
    })
    .catch(error => {
      toast.error("Error in Updating!!!");
      dispatch({ type: EDIT_BUSINESS_REJECTED, payload: error });
    });
  dispatch({ type: EDIT_BUSINESS_PENDING });
};

// const getAddressTree = payload => {
//   console.log("address tree sss: ", payload);

//   return {
//     type: FETCH_ADDRESS_TREE_GET_PENDING,
//     payload: payload
//   };
// };

// epics.push((action$, { getState }) =>
//   action$.ofType(FETCH_ADDRESS_TREE_GET_PENDING).mergeMap(({ payload }) => {
//     console.log("address tree: ", payload);

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
//         console.log("business each: ", response);
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
//         //       console.log("industry each: ", newResponse);
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
      console.log("asdadsadADasd: ", response.data);

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
            console.log("industry each: ", newResponse);
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
      // console.log(
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

const getAddressTree = (
  countryId,
  stateId,
  districtId,
  cityId,
  access_token,
  dispatch
) => {
  if (countryId !== "")
    onCountryEachGet({ id: countryId, access_token })
      .then(countryResponse => {
        dispatch({
          type: FETCH_ADDRESS_TREE_FULFILLED,
          payload: countryResponse.data
        });
        if (stateId !== "")
          onStateEachGet({ id: stateId, access_token })
            .then(stateResponse => {
              dispatch({
                type: FETCH_ADDRESS_TREE_FULFILLED,
                payload: stateResponse.data
              });
              if (districtId !== "")
                onDistrictEachGet({ id: districtId, access_token })
                  .then(districtResponse => {
                    dispatch({
                      type: FETCH_ADDRESS_TREE_FULFILLED,
                      payload: districtResponse.data
                    });
                    if (cityId !== "")
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
          throw new Error(response.msg[Object.keys(response.msg)[0]][0]);
        }
      })
      .catch(ajaxError => {
        toast.error(ajaxError.toString());
        return Observable.of({
          type: CREATE_COMPANY_TYPE_REJECTED,
          payload: ajaxError
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
          throw new Error(response.msg[Object.keys(response.msg)[0]][0]);
        }
      })
      .catch(ajaxError => {
        toast.error(ajaxError.toString());
        return Observable.of({
          type: CREATE_PAYMENT_METHODS_REJECTED,
          payload: ajaxError
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
          toast.success("company_type Updated successfully!");
          return [
            { type: EDIT_COMPANY_TYPE_FULFILLED },
            { type: FETCH_COMPANY_TYPE_PENDING },
            { type: TOGGLE_COMPANY_TYPE_EDIT_MODAL }
          ];
        } else {
          throw new Error(response.msg[Object.keys(response.msg)[0]][0]);
        }
      })
      .catch(ajaxError => {
        toast.error(ajaxError.toString());
        return Observable.of({
          type: EDIT_COMPANY_TYPE_REJECTED,
          payload: ajaxError
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
          toast.success("payment_method Updated successfully!");
          return [
            { type: EDIT_PAYMENT_METHOD_FULFILLED },
            { type: FETCH_PAYMENT_METHODS_PENDING },
            { type: TOGGLE_PAYMENT_METHOD_EDIT_MODAL }
          ];
        } else {
          throw new Error(response.msg[Object.keys(response.msg)[0]][0]);
        }
      })
      .catch(ajaxError => {
        toast.error(ajaxError.toString());
        return Observable.of({
          type: EDIT_PAYMENT_METHOD_REJECTED,
          payload: ajaxError
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

export const onUnmountPaymentMethod = () => ({ type: UNMOUNT_PAYMENT_METHOD });

export const ToogleEDIT = value => ({
  type: TOGGLE_EDIT,
  payload: value
});

export default epics;
