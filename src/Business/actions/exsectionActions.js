import { Observable } from "rxjs/Observable";
import { toast } from "react-toastify";

import {
  FETCH_EXSECTION_SECTIONS_FULFILLED,
  FETCH_EXSECTION_SECTIONS_PENDING,
  FETCH_EXSECTION_SECTIONS_REJECTED,
  CHANGE_ACTIVE_EXSECTION_SECTION,
  CREATE_EXSECTION_BUSINESS_SECTION_PENDING,
  CREATE_EXSECTION_BUSINESS_SECTION_FULFILLED,
  CREATE_EXSECTION_BUSINESS_SECTION_REJECTED,
  FETCH_EXSECTION_SECTION_ATTRIBUTES_PENDING,
  FETCH_EXSECTION_SECTION_ATTRIBUTES_FULFILLED,
  FETCH_EXSECTION_SECTION_ATTRIBUTES_REJECTED,
  FETCH_PARENT_SECTION_LIST_BUSINESS_PENDING,
  FETCH_PARENT_SECTION_LIST_BUSINESS_FULFILLED,
  FETCH_PARENT_SECTION_LIST_BUSINESS_REJECTED,
  CHANGE_ACTIVE_CHILD_EXSECTION,
  CHANGE_SELETED_SECTION_DETAILS_BUSINESS,
  RESET_SECTION_STATE,
  CHANGE_SELETED_SECTION_DETAILS_BUSINESS_DATA_PENDING,
  CHANGE_SELETED_SECTION_DETAILS_BUSINESS_DATA_FULFILLED,
  CHANGE_SELETED_SECTION_DETAILS_BUSINESS_DATA_REJECTED,
  //entity update
  FETCH_EXSECTION_SECTION_ENTITY_EACH_PENDING,
  FETCH_EXSECTION_SECTION_ENTITY_EACH_FULFILLED,
  FETCH_EXSECTION_SECTION_ENTITY_EACH_REJECTED,
  CHANGE_ACTIVE_PARENT_ADMIN_EXSECTION,
  CHANGE_ROOT_SECTION_ADMIN
} from "./types";

import {
  onExsectionSectionsGet,
  onExsectionSectionAttributesGet,
  onExsectionSectionDetailGetAdmin
} from "../../Admin/config/adminServerCall";

import {
  onSectionBusinessPost,
  onParentSectionBusinessGet,
  onSectionsListExsectionBusinessData,
  onExsectionEntityEachGet
} from "../config/businessServerCall";

const epics = [];

// sections
export const onSectionsListExsection = () => ({
  type: FETCH_EXSECTION_SECTIONS_PENDING,
  first: true
});

epics.push((action$, { getState }) =>
  action$.ofType(FETCH_EXSECTION_SECTIONS_PENDING).mergeMap(action => {
    const { first } = action;
    return onExsectionSectionsGet()
      .concatMap(({ response }) => {
        const extra = [];
        if (first) {
          extra.push({
            type: CHANGE_ACTIVE_EXSECTION_SECTION,
            payload: response.uid,
            first: first,
            // oldSection: "9b4623c4d6c24531a8f64e9673397cf1"
            oldSectionAdminId: response.uid
          });
        }

        return [
          {
            type: FETCH_EXSECTION_SECTIONS_FULFILLED,
            payload: response
          },
          ...extra
        ];
      })
      .catch(ajaxError => {
        toast.error("Error Fetching Categories");
        return Observable.of({ type: FETCH_EXSECTION_SECTIONS_REJECTED });
      });
  })
);

//onChangeActiveSectionBusiness
export const onChangeActiveSectionBusiness = (
  newSectionAdminId,
  oldSectionAdminId,
  leafDetected = false,
  activeChildrenAdmin = null,
  rootSectionAdmin = null
) => {
  return {
    type: CHANGE_ACTIVE_EXSECTION_SECTION,
    payload: newSectionAdminId,
    oldSectionAdminId,
    leafDetected,
    activeChildrenAdmin,
    rootSectionAdmin
  };
};

epics.push((action$, { getState }) =>
  action$.ofType(CHANGE_ACTIVE_EXSECTION_SECTION).mergeMap(action => {
    // console.log("action", action);
    const {
      payload: newSectionAdminId,
      oldSectionAdminId,
      leafDetected,
      activeChildrenAdmin,
      rootSectionAdmin
    } = action;
    // console.log("activeChildrenAdmin", activeChildrenAdmin);
    const businessId = getState().auth.cookies.user_data.business_id;

    return onExsectionSectionDetailGetAdmin({
      uid: newSectionAdminId
    }).concatMap(({ response }) => {
      const stuffs = [];
      stuffs.push({
        type: CHANGE_SELETED_SECTION_DETAILS_BUSINESS,
        payload: response
      });

      stuffs.push({
        type: CHANGE_ACTIVE_CHILD_EXSECTION,
        payload: activeChildrenAdmin
      });

      stuffs.push({
        type: CHANGE_ROOT_SECTION_ADMIN,
        payload: rootSectionAdmin
      });

      stuffs.push({
        type: CHANGE_ACTIVE_PARENT_ADMIN_EXSECTION,
        payload: oldSectionAdminId
      });

      stuffs.push({
        type: FETCH_EXSECTION_SECTION_ATTRIBUTES_PENDING,
        payload: {
          body: { sectionId: newSectionAdminId }
        }
      });

      if (!action.first) {
        stuffs.push({
          type: CHANGE_SELETED_SECTION_DETAILS_BUSINESS_DATA_PENDING,
          payload: {
            body: { sectionId: newSectionAdminId }
          }
        });
      }

      if (!action.first) {
        if (action.oldSectionAdminId !== "9b4623c4d6c24531a8f64e9673397cf1") {
          stuffs.push({
            type: FETCH_PARENT_SECTION_LIST_BUSINESS_PENDING,
            payload: {
              body: {
                businessIdd: businessId,
                asid: oldSectionAdminId
              }
            }
          });
        }
      }

      return stuffs;
    });
  })
);

epics.push((action$, { getState }) =>
  action$
    .ofType(CHANGE_SELETED_SECTION_DETAILS_BUSINESS_DATA_PENDING)
    .mergeMap(({ payload: { body } }) => {
      const globalState = getState();
      const businessIdd = globalState.auth.cookies.user_data.business_id;
      return onSectionsListExsectionBusinessData({ body, businessIdd })
        .map(data => {
          if (data.status === 200) {
            return {
              type: CHANGE_SELETED_SECTION_DETAILS_BUSINESS_DATA_FULFILLED,
              payload: data.response
            };
          }
        })
        .catch(ajaxError => {
          toast.error(ajaxError.toString());
          return Observable.of({
            type: CHANGE_SELETED_SECTION_DETAILS_BUSINESS_DATA_REJECTED
          });
        });
    })
);

epics.push(action$ =>
  action$
    .ofType(FETCH_EXSECTION_SECTION_ATTRIBUTES_PENDING)
    .mergeMap(({ payload: { body } }) => {
      return onExsectionSectionAttributesGet({ body })
        .map(({ response }) => {
          if (response.msg === "success") {
            return {
              type: FETCH_EXSECTION_SECTION_ATTRIBUTES_FULFILLED,
              payload: response
            };
          } else {
            throw new Error(response.msg);
          }
        })
        .catch(ajaxError => {
          toast.error(ajaxError.toString());
          return Observable.of({
            type: FETCH_EXSECTION_SECTION_ATTRIBUTES_REJECTED
          });
        });
    })
);

epics.push(action$ =>
  action$
    .ofType(FETCH_PARENT_SECTION_LIST_BUSINESS_PENDING)
    .mergeMap(({ payload: { body } }) => {
      return onParentSectionBusinessGet({ body })
        .map(({ response }) => {
          if (response.msg === "success") {
            return {
              type: FETCH_PARENT_SECTION_LIST_BUSINESS_FULFILLED,
              payload: response
            };
          } else {
            throw new Error(response.msg);
          }
        })
        .catch(ajaxError => {
          toast.error(ajaxError.toString());
          return Observable.of({
            type: FETCH_PARENT_SECTION_LIST_BUSINESS_REJECTED
          });
        });
    })
);

//onCreateSectionBusiness as an Exsection Action
//onSectionBusinessPost as a serverCall
export const onCreateSectionBusiness = payload => ({
  type: CREATE_EXSECTION_BUSINESS_SECTION_PENDING,
  payload
});

epics.push((action$, { getState }) =>
  action$
    .ofType(CREATE_EXSECTION_BUSINESS_SECTION_PENDING)
    .mergeMap(({ payload }) => {
      const globalState = getState();
      // console.log("log global state", globalState);
      const { activeSectionAdminId } = globalState.BusinessContainer.exsection;
      const newSectionAdminId = activeSectionAdminId;
      const { activeParentAdminId } = globalState.BusinessContainer.exsection;
      const oldSectionAdminId = activeParentAdminId;
      const { activeChildrenAdmin } = globalState.BusinessContainer.exsection;
      const businessIdd = globalState.auth.cookies.user_data.business_id;
      const leafDetected = false;
      return onSectionBusinessPost({
        body: { ...payload.body, businessIdd }
      })
        .concatMap(({ response }) => {
          if (response.msg === "success") {
            toast.success("added successfully!");

            return [
              { type: CREATE_EXSECTION_BUSINESS_SECTION_FULFILLED },
              { type: FETCH_EXSECTION_SECTIONS_PENDING },
              {
                type: CHANGE_ACTIVE_EXSECTION_SECTION,
                payload: newSectionAdminId,
                oldSectionAdminId,
                leafDetected,
                activeChildrenAdmin
              }
            ];
          } else {
            throw new Error("Error Creating section");
          }
        })
        .catch(ajaxError => {
          toast.error(ajaxError.toString());
          return Observable.of({
            type: CREATE_EXSECTION_BUSINESS_SECTION_REJECTED
          });
        });
    })
);

//resetState
export const resetState = () => ({
  type: RESET_SECTION_STATE
});

export const onSectionUpdateBusinessExsection = () => {
  return "hello";
};

///////Actions for implementing Section Entity Update in Bhetincha////

//onExsectionSectionEachList

export const onExsectionSectionEachList = payload => ({
  type: FETCH_EXSECTION_SECTION_ENTITY_EACH_PENDING,
  payload
});

epics.push((action$, { getState }) =>
  action$
    .ofType(FETCH_EXSECTION_SECTION_ENTITY_EACH_PENDING)
    .mergeMap(action => {
      const { uid } = action.payload;

      return onExsectionEntityEachGet({ uid })
        .concatMap(({ response }) => {
          return [
            {
              type: FETCH_EXSECTION_SECTION_ENTITY_EACH_FULFILLED,
              payload: response
            }
          ];
        })
        .catch(ajaxError => {
          toast.error(ajaxError.toString());
          return Observable.of({
            type: FETCH_EXSECTION_SECTION_ENTITY_EACH_REJECTED
          });
        });
    })
);
export default epics;
