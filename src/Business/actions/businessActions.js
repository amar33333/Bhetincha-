import { toast } from "react-toastify";

import {
  onBusinessAllGet,
  onPaymentMethodsGet,
  onCompanyTypeGet,
  onBusinessPut,
  onBusinessEachGet
} from "../config/businessServerCall";

import {
  onIndustryEachGet,
  onCountryEachGet,
  onStateEachGet,
  onDistrictEachGet,
  onCityEachGet
} from "../../Admin/config/adminServerCall";

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
  FETCH_BUSINESS_EACH_FULFILLED,
  FETCH_BUSINESS_EACH_REJECTED,
  FETCH_BUSINESS_EACH_PENDING,
  FETCH_INDUSTRY_EACH_PENDING,
  FETCH_INDUSTRY_EACH_FULFILLED,
  FETCH_INDUSTRY_EACH_REJECTED,
  TOGGLE_EDIT
} from "./types";

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
        dispatch({ type: EDIT_BUSINESS_REJECTED, payload: response.data.msg });
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
        ? response.data.address.country ? response.data.address.country.id : ""
        : "";
      const stateId = response.data.address
        ? response.data.address.state ? response.data.address.state.id : ""
        : "";
      const districtId = response.data.address
        ? response.data.address.district
          ? response.data.address.district.id
          : ""
        : "";
      const cityId = response.data.address
        ? response.data.address.city ? response.data.address.city.id : ""
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

export const onCompanyTypeList = ({ access_token }) => dispatch => {
  onCompanyTypeGet({ access_token })
    .then(response =>
      dispatch({
        type: FETCH_COMPANY_TYPE_FULFILLED,
        payload: response.data
      })
    )
    .catch(error =>
      dispatch({ type: FETCH_COMPANY_TYPE_REJECTED, payload: error })
    );
  dispatch({ type: FETCH_COMPANY_TYPE_PENDING });
};

export const onPaymentMethodsList = ({ access_token }) => dispatch => {
  onPaymentMethodsGet({ access_token })
    .then(response =>
      dispatch({
        type: FETCH_PAYMENT_METHODS_FULFILLED,
        payload: response.data
      })
    )
    .catch(error =>
      dispatch({ type: FETCH_PAYMENT_METHODS_REJECTED, payload: error })
    );
  dispatch({ type: FETCH_PAYMENT_METHODS_PENDING });
};

export const ToogleEDIT = value => ({
  type: TOGGLE_EDIT,
  payload: value
});
// export const onUnmountBusiness = () => ({
//   type: UNMOUNT_BUSINESS,
//   payload: null
// });
