import { Observable } from "rxjs/Observable";
import { toast } from "react-toastify";

import {
  onBusinessAllGet,
  onPaymentMethodsGet,
  onCompanyTypeGet,
  onBusinessPut,
  onBusinessEachGet,
  onPrimaryAddressGet,
  onPrimaryAddressPut,
  onAboutGet,
  onAboutPut,
  onWorkingHourGet,
  onWorkingHourPut,
  onBusinessBranchGet,
  onBranchPost,
  onBranchGet,
  onBranchPut,
  onBranchDelete,
  onBusinessDetailsGet,
  onBusinessDetailsPut,
  onBusinessLogoCoverImageGet,
  onBusinessLogoCoverImagePut,
  onSlugPut,
  onSlugCheckPost
} from "../config/businessServerCall";

import {
  onIndustryEachGet,
  onCountryEachGet,
  onStateEachGet,
  onDistrictEachGet,
  onCityEachGet,
  onSocialLinksGet,
  onSocialLinkUrlPost,
  onSocialLinkUrlGet
} from "../../Admin/config/adminServerCall";

import { onUserGet } from "../../Common/utils/serverCall";

import {
  FETCH_BUSINESS_FULFILLED,
  FETCH_BUSINESS_REJECTED,
  FETCH_BUSINESS_PENDING,
  FETCH_PAYMENT_METHODS_FULFILLED,
  FETCH_PAYMENT_METHODS_REJECTED,
  FETCH_PAYMENT_METHODS_PENDING,
  FETCH_COMPANY_TYPE_FULFILLED,
  FETCH_COMPANY_TYPE_REJECTED,
  FETCH_COMPANY_TYPE_PENDING,
  FETCH_ADDRESS_TREE_FULFILLED,
  FETCH_ADDRESS_TREE_REJECTED,
  FETCH_ADDRESS_TREE_PENDING,
  EDIT_BUSINESS_FULFILLED,
  EDIT_BUSINESS_PENDING,
  EDIT_BUSINESS_REJECTED,
  EDIT_PRIMARY_ADDRESS_FULFILLED,
  EDIT_PRIMARY_ADDRESS_PENDING,
  EDIT_PRIMARY_ADDRESS_REJECTED,
  FETCH_BUSINESS_EACH_FULFILLED,
  FETCH_BUSINESS_EACH_REJECTED,
  FETCH_BUSINESS_EACH_PENDING,
  FETCH_INDUSTRY_EACH_PENDING,
  FETCH_INDUSTRY_EACH_FULFILLED,
  FETCH_INDUSTRY_EACH_REJECTED,
  FETCH_PRIMARY_ADDRESS_FULFILLED,
  FETCH_PRIMARY_ADDRESS_PENDING,
  FETCH_PRIMARY_ADDRESS_REJECTED,
  FETCH_ABOUT_FULFILLED,
  FETCH_ABOUT_PENDING,
  FETCH_ABOUT_REJECTED,
  EDIT_ABOUT_FULFILLED,
  EDIT_ABOUT_PENDING,
  EDIT_ABOUT_REJECTED,
  FETCH_WORKING_HOUR_FULFILLED,
  FETCH_WORKING_HOUR_PENDING,
  FETCH_WORKING_HOUR_REJECTED,
  EDIT_WORKING_HOUR_FULFILLED,
  EDIT_WORKING_HOUR_PENDING,
  EDIT_WORKING_HOUR_REJECTED,
  FETCH_BUSINESS_BRANCH_FULFILLED,
  FETCH_BUSINESS_BRANCH_PENDING,
  FETCH_BUSINESS_BRANCH_REJECTED,
  CREATE_BRANCH_FULFILLED,
  CREATE_BRANCH_PENDING,
  CREATE_BRANCH_REJECTED,
  DELETE_BRANCH_FULFILLED,
  DELETE_BRANCH_PENDING,
  DELETE_BRANCH_REJECTED,
  EDIT_BRANCH_EACH_FULFILLED,
  EDIT_BRANCH_EACH_PENDING,
  EDIT_BRANCH_EACH_REJECTED,
  FETCH_BRANCH_EACH_FULFILLED,
  FETCH_BRANCH_EACH_PENDING,
  FETCH_BRANCH_EACH_REJECTED,
  FETCH_BUSINESS_DETAILS_FULFILLED,
  FETCH_BUSINESS_DETAILS_PENDING,
  FETCH_BUSINESS_DETAILS_REJECTED,
  EDIT_BUSINESS_DETAILS_FULFILLED,
  EDIT_BUSINESS_DETAILS_PENDING,
  EDIT_BUSINESS_DETAILS_REJECTED,
  FETCH_LOGO_COVER_IMAGE_FULFILLED,
  FETCH_LOGO_COVER_IMAGE_PENDING,
  FETCH_LOGO_COVER_IMAGE_REJECTED,
  EDIT_LOGO_COVER_IMAGE_FULFILLED,
  EDIT_LOGO_COVER_IMAGE_PENDING,
  EDIT_LOGO_COVER_IMAGE_REJECTED,
  FETCH_CATEGORY_ARRAY_PENDING,
  FETCH_CATEGORY_ARRAY_FULFILLED,
  FETCH_CATEGORY_ARRAY_REJECTED,
  EDIT_SLUG_FULFILLED,
  FETCH_SOCIAL_LINK_FULFILLED,
  FETCH_SOCIAL_LINK_PENDING,
  FETCH_SOCIAL_LINK_REJECTED,
  CREATE_SOCIAL_LINK_URL_FULFILLED,
  CREATE_SOCIAL_LINK_URL_PENDING,
  CREATE_SOCIAL_LINK_URL_REJECTED,
  FETCH_SOCIAL_LINK_URL_FULFILLED,
  FETCH_SOCIAL_LINK_URL_PENDING,
  FETCH_SOCIAL_LINK_URL_REJECTED,
  EDIT_SLUG_PENDING,
  EDIT_SLUG_REJECTED,
  CHECK_SLUG_FULFILLED,
  CHECK_SLUG_PENDING,
  CHECK_SLUG_REJECTED,
  UNMOUNT_BRANCH,
  TOGGLE_EDIT
} from "./types";

import {
  FETCH_USER_FULFILLED,
  FETCH_USER_REJECTED,
  FETCH_USER_PENDING
} from "../../actions/types";

import CookiesProvider from "../../Common/utils/CookiesProvider";
import { EmptyObservable } from "rxjs/observable/EmptyObservable";

const epics = [];

export const onUnmountBranch = () => ({ type: UNMOUNT_BRANCH });

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
          payload: JSON.parse(ajaxError.message)
        });
      })
  )
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
            }
          ];
        } else throw new Error(JSON.stringify(response.msg));
      })
      .catch(ajaxError => {
        toast.error("Error Adding Social Link !!!");
        return Observable.of({
          type: CREATE_SOCIAL_LINK_URL_REJECTED,
          payload: JSON.parse(ajaxError.message)
        });
      })
  )
);

export const onSocialLinksList = () => ({
  type: FETCH_SOCIAL_LINK_PENDING
});

epics.push((action$, { getState }) =>
  action$.ofType(FETCH_SOCIAL_LINK_PENDING).mergeMap(({ payload }) =>
    onSocialLinksGet({
      access_token: getState().auth.cookies.token_data.access_token
    })
      .concatMap(({ response }) => {
        // toast.success("Social Link Created Successfully!");
        return [
          {
            type: FETCH_SOCIAL_LINK_FULFILLED,
            payload: response
          }
        ];
      })
      .catch(ajaxError => {
        // toast.error("Error Creating Social Link !!!");
        return Observable.of({
          type: FETCH_SOCIAL_LINK_REJECTED,
          payload: JSON.parse(ajaxError.message)
        });
      })
  )
);

export const onSlugCheckSubmit = payload => ({
  type: CHECK_SLUG_PENDING,
  payload
});

epics.push((action$, { getState }) =>
  action$
    .ofType(CHECK_SLUG_PENDING)
    .debounceTime(200)
    .switchMap(({ payload }) => {
      const cookies = getState().auth.cookies;
      const access_token = cookies.token_data.access_token;

      const { slug } = payload;

      return onSlugCheckPost({ access_token, slug })
        .map(({ response }) => {
          return {
            type: CHECK_SLUG_FULFILLED,
            payload: response
          };
        })
        .catch(ajaxError => {
          toast.error(ajaxError.toString());
          return Observable.of({
            type: CHECK_SLUG_REJECTED,
            payload: ajaxError
          });
        });
    })
);

export const onSlugEdit = payload => ({
  type: EDIT_SLUG_PENDING,
  payload
});

epics.push((action$, { getState }) =>
  action$.ofType(EDIT_SLUG_PENDING).mergeMap(({ payload }) => {
    const cookies = getState().auth.cookies;
    const access_token = cookies.token_data.access_token;
    const id = cookies.user_data.business_id;

    const { slug, history } = payload;

    return onSlugPut({ id, access_token, slug })
      .mergeMap(({ response }) => {
        if (response.msg === "success") {
          toast.success("Slug Changed Successfully");

          return onUserGet({ access_token });
        } else throw new Error(response.msg);
      })
      .concatMap(({ response }) => {
        const { permissions, ...rest } = response;
        console.log("permis rest: ", permissions, rest);
        const expiryDate = new Date(CookiesProvider.getExpiryDate());
        console.log("expiy Date: ", expiryDate);

        CookiesProvider.setCookies("user_data", rest, "/", expiryDate);

        return [
          {
            type: FETCH_USER_FULFILLED,
            payload: {
              cookies: {
                token_data: CookiesProvider.getTokenData(),
                user_data: { ...CookiesProvider.getUserData(), permissions }
              }
            },
            history
          }
        ];
      })

      .catch(ajaxError => {
        toast.error(ajaxError.toString());
        console.log("slug erro: ", ajaxError.toString());
        return Observable.of({
          type: EDIT_SLUG_REJECTED,
          payload: ajaxError
        });
      });
  })
);

export const onBusinessLogoCoverImageList = () => ({
  type: FETCH_LOGO_COVER_IMAGE_PENDING
});

epics.push((action$, { getState }) =>
  action$.ofType(FETCH_LOGO_COVER_IMAGE_PENDING).mergeMap(() => {
    const cookies = getState().auth.cookies;
    const access_token = cookies.token_data.access_token;
    const id = cookies.user_data.business_id;

    return onBusinessLogoCoverImageGet({ id, access_token })
      .map(({ response }) => {
        return {
          type: FETCH_LOGO_COVER_IMAGE_FULFILLED,
          payload: response
        };
      })
      .catch(ajaxError => {
        // toast.error(ajaxError.toString());
        console.log("business detais errror: ", ajaxError);
        return Observable.of({
          type: FETCH_LOGO_COVER_IMAGE_REJECTED,
          payload: ajaxError
        });
      });
  })
);

export const onBusinessLogoCoverImageEdit = payload => ({
  type: EDIT_LOGO_COVER_IMAGE_PENDING,
  payload
});

epics.push((action$, { getState }) =>
  action$.ofType(EDIT_LOGO_COVER_IMAGE_PENDING).mergeMap(({ payload }) => {
    const cookies = getState().auth.cookies;
    const access_token = cookies.token_data.access_token;
    const id = cookies.user_data.business_id;
    const { body } = payload;

    return onBusinessLogoCoverImagePut({ id, body, access_token })
      .concatMap(({ response }) => {
        if (response.msg === "success") {
          toast.success("Image Section Updated Successfully!");
          return [
            {
              type: EDIT_LOGO_COVER_IMAGE_FULFILLED,
              payload: response
            },
            {
              type: FETCH_LOGO_COVER_IMAGE_PENDING,
              payload: { id }
            }
          ];
        } else throw new Error(response.msg);
      })
      .catch(ajaxError => {
        toast.error(ajaxError.toString());
        return Observable.of({
          type: EDIT_LOGO_COVER_IMAGE_REJECTED,
          payload: ajaxError
        });
      });
  })
);

export const onBusinessDetailsList = payload => ({
  type: FETCH_BUSINESS_DETAILS_PENDING,
  payload
});

epics.push((action$, { getState }) =>
  action$.ofType(FETCH_BUSINESS_DETAILS_PENDING).mergeMap(({ payload }) => {
    const access_token = getState().auth.cookies.token_data.access_token;
    const { id } = payload;

    return onBusinessDetailsGet({ id, access_token })
      .concatMap(({ response }) => {
        const id = response.industry ? response.industry.id : "";
        const ids = response.categories.map(category => category.id);

        console.log("ids: ", ids);

        if (id && ids)
          return [
            {
              type: FETCH_BUSINESS_DETAILS_FULFILLED,
              payload: response
            },
            {
              type: FETCH_INDUSTRY_EACH_PENDING,
              payload: { id }
            },
            {
              type: FETCH_CATEGORY_ARRAY_PENDING,
              payload: { ids }
            }
          ];
        else
          return [
            {
              type: FETCH_BUSINESS_DETAILS_FULFILLED,
              payload: response
            }
          ];
      })
      .catch(ajaxError => {
        // toast.error(ajaxError.toString());
        console.log("business detais errror: ", ajaxError);
        return Observable.of({
          type: FETCH_BUSINESS_DETAILS_REJECTED,
          payload: ajaxError
        });
      });
  })
);

export const onBusinessDetailsEdit = payload => ({
  type: EDIT_BUSINESS_DETAILS_PENDING,
  payload
});

epics.push((action$, { getState }) =>
  action$.ofType(EDIT_BUSINESS_DETAILS_PENDING).mergeMap(({ payload }) => {
    const access_token = getState().auth.cookies.token_data.access_token;
    const EDIT = getState().BusinessContainer.business_reducer.EDIT;

    const { id, body } = payload;

    return onBusinessDetailsPut({
      access_token,
      id,
      body
    })
      .concatMap(({ response }) => {
        if (response.msg === "success") {
          toast.success("Business Detail Updated Successfully!");

          return [
            { type: EDIT_BUSINESS_DETAILS_FULFILLED, payload: response },
            {
              type: TOGGLE_EDIT,
              payload: !EDIT
            },

            { type: FETCH_BUSINESS_DETAILS_PENDING, payload: { id } }
          ];
        } else throw new Error(JSON.stringify(response.msg));
      })
      .catch(ajaxError => {
        toast.error("Error Updating Business Details !!!");
        return Observable.of({
          type: EDIT_BUSINESS_DETAILS_REJECTED,
          payload: JSON.parse(ajaxError.message)
        });
      });
  })
);

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
          payload: JSON.parse(ajaxError.message)
        });
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
        toast.error("Error: Branch Updating !!!");
        return Observable.of({
          type: EDIT_BRANCH_EACH_REJECTED,
          payload: JSON.parse(ajaxError.message)
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
      console.log("asdadsadADasd: ", response.data);

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

export const onWorkingHourList = payload => ({
  type: FETCH_WORKING_HOUR_PENDING,
  payload
});

epics.push((action$, { getState }) =>
  action$.ofType(FETCH_WORKING_HOUR_PENDING).mergeMap(({ payload }) => {
    const access_token = getState().auth.cookies.token_data.access_token;
    const { id } = payload;

    return onWorkingHourGet({ id, access_token })
      .map(({ response }) => {
        return {
          type: FETCH_WORKING_HOUR_FULFILLED,
          payload: response
        };
      })
      .catch(ajaxError => {
        toast.error(ajaxError.toString());
        return Observable.of({
          type: FETCH_WORKING_HOUR_REJECTED,
          payload: ajaxError
        });
      });
  })
);

export const onWorkingHourEdit = payload => ({
  type: EDIT_WORKING_HOUR_PENDING,
  payload
});

epics.push((action$, { getState }) =>
  action$.ofType(EDIT_WORKING_HOUR_PENDING).mergeMap(({ payload }) => {
    const access_token = getState().auth.cookies.token_data.access_token;
    const EDIT = getState().BusinessContainer.business_reducer.EDIT;

    const { id, body } = payload;

    return onWorkingHourPut({ id, body, access_token })
      .concatMap(({ response }) => {
        if (response.msg === "success") {
          toast.success("Working Hour Section Updated Successfully!");
          return [
            {
              type: TOGGLE_EDIT,
              payload: !EDIT
            },
            {
              type: EDIT_WORKING_HOUR_FULFILLED,
              payload: response
            },
            {
              type: FETCH_WORKING_HOUR_PENDING,
              payload: { id }
            }
          ];
        } else throw new Error(response.msg);
      })
      .catch(ajaxError => {
        toast.error(ajaxError.toString());
        return Observable.of({
          type: EDIT_WORKING_HOUR_REJECTED,
          payload: ajaxError
        });
      });
  })
);

export const onAboutList = payload => ({
  type: FETCH_ABOUT_PENDING,
  payload
});

epics.push((action$, { getState }) =>
  action$.ofType(FETCH_ABOUT_PENDING).mergeMap(({ payload }) => {
    const access_token = getState().auth.cookies.token_data.access_token;
    const { id } = payload;

    return onAboutGet({ id, access_token })
      .map(({ response }) => {
        return {
          type: FETCH_ABOUT_FULFILLED,
          payload: response
        };
      })
      .catch(ajaxError => {
        toast.error(ajaxError.toString());
        return Observable.of({
          type: FETCH_ABOUT_REJECTED,
          payload: ajaxError
        });
      });
  })
);

export const onAboutEdit = payload => ({
  type: EDIT_ABOUT_PENDING,
  payload
});

epics.push((action$, { getState }) =>
  action$.ofType(EDIT_ABOUT_PENDING).mergeMap(({ payload }) => {
    const access_token = getState().auth.cookies.token_data.access_token;
    const EDIT = getState().BusinessContainer.business_reducer.EDIT;

    const { id, body } = payload;

    return onAboutPut({ id, body, access_token })
      .concatMap(({ response }) => {
        if (response.msg === "success") {
          toast.success("About Section Updated Successfully!");
          return [
            {
              type: TOGGLE_EDIT,
              payload: !EDIT
            },
            {
              type: EDIT_ABOUT_FULFILLED,
              payload: response
            },
            {
              type: FETCH_ABOUT_PENDING,
              payload: { id }
            }
          ];
        } else throw new Error(response.msg);
      })
      .catch(ajaxError => {
        toast.error(ajaxError.toString());
        return Observable.of({
          type: EDIT_ABOUT_REJECTED,
          payload: ajaxError
        });
      });
  })
);

// export const onPrimaryAddressLists = payload => ({
//   type: FETCH_PRIMARY_ADDRESS_PENDING,
//   payload
// });

// epics.push((action$, { getState }) =>
//   action$.ofType(FETCH_PRIMARY_ADDRESS_PENDING).mergeMap(({ payload }) => {
//     const access_token = getState().auth.cookies.token_data.access_token;
//     const { id } = payload;

//     return onPrimaryAddressGet({ id, access_token })
//       .map(({ response }) => {
//         return {
//           type: FETCH_PRIMARY_ADDRESS_FULFILLED,
//           payload: response
//         };
//       })
//       .catch(ajaxError => {
//         toast.error(ajaxError.toString());
//         return Observable.of({
//           type: FETCH_PRIMARY_ADDRESS_REJECTED,
//           payload: ajaxError
//         });
//       });
//   })
// );

export const onPrimaryAddressEdit = ({
  id,
  data,
  access_token,
  EDIT
}) => dispatch => {
  onPrimaryAddressPut({ id, data, access_token })
    .then(response => {
      if (response.data.msg === "success") {
        dispatch({
          type: TOGGLE_EDIT,
          payload: !EDIT
        });

        onPrimaryAddressGet({ id, access_token })
          .then(innerResponse => {
            // ToogleEDIT(!EDIT);

            // console.log("EDIT: ", innerResponse);

            const countryId = innerResponse.data.country
              ? innerResponse.data.country.id
              : "";
            const stateId = innerResponse.data.state
              ? innerResponse.data.state.id
              : "";
            const districtId = innerResponse.data.district
              ? innerResponse.data.district.id
              : "";
            const cityId = innerResponse.data.city
              ? innerResponse.data.city.id
              : "";

            getAddressTree(
              countryId,
              stateId,
              districtId,
              cityId,
              access_token,
              dispatch
            );

            // dispatch({ type: FETCH_INDUSTRY_EACH_PENDING });
            dispatch({ type: FETCH_ADDRESS_TREE_PENDING });
            dispatch({
              type: FETCH_PRIMARY_ADDRESS_FULFILLED,
              payload: innerResponse.data
            });
          })
          .catch(error =>
            dispatch({ type: EDIT_PRIMARY_ADDRESS_REJECTED, payload: error })
          );
        dispatch({ type: FETCH_PRIMARY_ADDRESS_PENDING });

        toast.success("Primary Address Updated Successfully!");
        // console.log("bussiness acction toogle called: ", EDIT);
        dispatch({
          type: EDIT_PRIMARY_ADDRESS_FULFILLED,
          payload: response.data
        });
      } else {
        toast.error("Error in Updating!!!");
        dispatch({
          type: EDIT_PRIMARY_ADDRESS_REJECTED,
          payload: response.data.msg
        });
      }
    })
    .catch(error => {
      toast.error("Error in Updating!!!");
      dispatch({ type: EDIT_PRIMARY_ADDRESS_REJECTED, payload: error });
    });
  dispatch({ type: EDIT_PRIMARY_ADDRESS_PENDING });
};

export const onPrimaryAddressList = ({ id, access_token }) => dispatch => {
  onPrimaryAddressGet({ id, access_token })
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

      dispatch({
        type: FETCH_PRIMARY_ADDRESS_FULFILLED,
        payload: response.data
      });
    })
    .catch(error =>
      dispatch({ type: FETCH_PRIMARY_ADDRESS_REJECTED, payload: error })
    );
  dispatch({ type: FETCH_PRIMARY_ADDRESS_PENDING });
};

export const onBusinessList = () => dispatch => {
  onBusinessAllGet()
    .then(response =>
      dispatch({ type: FETCH_BUSINESS_FULFILLED, payload: response.data })
    )
    .catch(error =>
      dispatch({ type: FETCH_BUSINESS_REJECTED, payload: error })
    );
  dispatch({ type: FETCH_BUSINESS_PENDING });
};

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
        dispatch({
          type: EDIT_PRIMARY_ADDRESS_REJECTED,
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

export const onBusinessEachList = ({ username, access_token }) => dispatch => {
  onBusinessEachGet({ username, access_token })
    .then(response => {
      // console.log("business get response success ", response.data);

      const industryId = response.data.industry
        ? response.data.industry.id
        : "";
      const countryId = response.data.address
        ? response.data.address.country
          ? response.data.address.country.id
          : ""
        : "";
      const stateId = response.data.address
        ? response.data.address.state
          ? response.data.address.state.id
          : ""
        : "";
      const districtId = response.data.address
        ? response.data.address.district
          ? response.data.address.district.id
          : ""
        : "";
      const cityId = response.data.address
        ? response.data.address.city
          ? response.data.address.city.id
          : ""
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
    .catch(error => {
      console.log("business get response error: ", error);

      dispatch({ type: FETCH_BUSINESS_EACH_REJECTED, payload: error });
    });
  dispatch({ type: FETCH_BUSINESS_EACH_PENDING });
};

export const onCompanyTypeList = () => ({
  type: FETCH_COMPANY_TYPE_PENDING
});

epics.push((action$, { getState }) =>
  action$.ofType(FETCH_COMPANY_TYPE_PENDING).mergeMap(({ payload }) => {
    const access_token = getState().auth.cookies.token_data.access_token;

    return onCompanyTypeGet({ access_token })
      .map(({ response }) => {
        // toast.success("Company Types Fetched Successfully!");
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
  action$.ofType(FETCH_PAYMENT_METHODS_PENDING).mergeMap(({ payload }) => {
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
// export const onUnmountBusiness = () => ({
//   type: UNMOUNT_BUSINESS,onBusinessEachGet
//   payload: null
// });

export default epics;
