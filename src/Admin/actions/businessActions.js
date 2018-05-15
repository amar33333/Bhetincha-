import { Observable } from "rxjs/Observable";
import { toast } from "react-toastify";
import {
  onCompanyTypePost,
  onPaymentMethodPost,
  onIndustryEachGet,
  onCountryEachGet,
  onStateEachGet,
  onDistrictEachGet,
  onCityEachGet
} from "../config/adminServerCall";

import {
  onBusinessPost,
  onBusinessPut,
  onCompanyTypeGet,
  onPaymentMethodsGet,
  onBusinessAllGetAjax,
  onBusinessEachGet,
  onBusinessEachDeleteAjax
} from "../../Business/config/businessServerCall";

import {
  CREATE_COMPANY_TYPE_FULFILLED,
  CREATE_COMPANY_TYPE_PENDING,
  CREATE_COMPANY_TYPE_REJECTED,
  CREATE_PAYMENT_METHODS_FULFILLED,
  CREATE_PAYMENT_METHODS_PENDING,
  CREATE_PAYMENT_METHODS_REJECTED,
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
  TOGGLE_EDIT
} from "./types";

const epics = [];

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

            getAddressTree({
              branchcountryId,
              branchstateId,
              branchdistrictId,
              branchcityId,
              access_token,
              dispatch
            });
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

// export const getAddressTree = () => ({
//   type: FETCH_ADDRESS_TREE_PENDING
// });

// epics.push((action$, { getState }) =>
//   action$.ofType(FETCH_ADDRESS_TREE_PENDING).mergeMap(({ payload }) => {
//     const { countryId, stateId, districtId, cityId } = payload;
//     const access_token = getState().auth.cookies.token_data.access_token;

//     return onCountryEachGet({ id: countryId, access_token }).map(
//       ({ response }) => {
//         return {
//           type: FETCH_ADDRESS_TREE_FULFILLED,
//           payload: response
//         };
//       }
//     );
//   })
// );

const getAddressTree = (
  countryId,
  stateId,
  districtId,
  cityId,
  access_token,
  dispatch
) => {
  if (countryId !== "")
    return {
      type: FETCH_ADDRESS_TREE_PENDING,
      payload: { id: countryId, access_token }
    };
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

// const getAddressTree = (
//   countryId,
//   stateId,
//   districtId,
//   cityId,
//   access_token,
//   dispatch
// ) => {
//   if (countryId !== "")
//     onCountryEachGet({ id: countryId, access_token })
//       .then(countryResponse => {
//         dispatch({
//           type: FETCH_ADDRESS_TREE_FULFILLED,
//           payload: countryResponse.data
//         });
//         if (stateId !== "")
//           onStateEachGet({ id: stateId, access_token })
//             .then(stateResponse => {
//               dispatch({
//                 type: FETCH_ADDRESS_TREE_FULFILLED,
//                 payload: stateResponse.data
//               });
//               if (districtId !== "")
//                 onDistrictEachGet({ id: districtId, access_token })
//                   .then(districtResponse => {
//                     dispatch({
//                       type: FETCH_ADDRESS_TREE_FULFILLED,
//                       payload: districtResponse.data
//                     });
//                     if (cityId !== "")
//                       onCityEachGet({ id: cityId, access_token })
//                         .then(cityResponse =>
//                           dispatch({
//                             type: FETCH_ADDRESS_TREE_FULFILLED,
//                             payload: cityResponse.data
//                           })
//                         )
//                         .catch(cityErr =>
//                           dispatch({
//                             type: FETCH_ADDRESS_TREE_REJECTED,
//                             payload: cityErr
//                           })
//                         );
//                   })
//                   .catch(districtErr =>
//                     dispatch({
//                       type: FETCH_ADDRESS_TREE_REJECTED,
//                       payload: districtErr
//                     })
//                   );
//             })
//             .catch(stateErr =>
//               dispatch({ type: FETCH_ADDRESS_TREE_REJECTED, payload: stateErr })
//             );
//       })
//       .catch(countryErr =>
//         dispatch({ type: FETCH_ADDRESS_TREE_REJECTED, payload: countryErr })
//       );
// };

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

export const onCompanyTypeSubmit = payload => ({
  type: CREATE_COMPANY_TYPE_PENDING,
  payload
});

epics.push((action$, { getState }) =>
  action$.ofType(CREATE_COMPANY_TYPE_PENDING).mergeMap(({ payload }) => {
    const { company_type } = payload;
    const access_token = getState().auth.cookies.token_data.access_token;

    return onCompanyTypePost({ company_type, access_token })
      .map(({ response }) => {
        if (response.msg === "success") {
          toast.success("Company Type Created Successfully!");
          return { type: CREATE_COMPANY_TYPE_FULFILLED };
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

    return onPaymentMethodPost({ payment_method, access_token })
      .map(({ response }) => {
        if (response.msg === "success") {
          toast.success("Payment Method Created Successfully!");
          return { type: CREATE_PAYMENT_METHODS_FULFILLED };
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
      .map(({ response }) => {
        toast.success("Company Types Fetched Successfully!");
        return { type: FETCH_COMPANY_TYPE_FULFILLED, payload: response };
      })
      .catch(ajaxError => {
        toast.error(ajaxError.toString());
        return Observable.of({
          type: FETCH_COMPANY_TYPE_REJECTED,
          payload: ajaxError
        });
      });
  })
);

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
        toast.success("Payment Methods Fetched Successfully!");
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

export const ToogleEDIT = value => ({
  type: TOGGLE_EDIT,
  payload: value
});

export default epics;
