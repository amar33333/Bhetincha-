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
  FETCH_EXSECTION_SECTION_ENTITY_EACH_PENDING,
  FETCH_EXSECTION_SECTION_ENTITY_EACH_FULFILLED,
  FETCH_EXSECTION_SECTION_ENTITY_EACH_REJECTED,
  CHANGE_ROOT_SECTION_ADMIN,
  CHANGE_ACTIVE_EXSECTION_SECTION_BY_CLICK,
  INITIALIZE_TOP_SECTION_ADMIN_ID,
  PARENT_SECTION_BIZ_FLAG,
  FETCH_BUSINESS_CAT_DETAILS_FULFILLED,
  FETCH_BUSINESS_CAT_DETAILS_PENDING,
  FETCH_BUSINESS_CAT_DETAILS_REJECTED,
  FETCH_CATEGORY_EACH_FULFILLED,
  FETCH_CATEGORY_EACH_PENDING,
  FETCH_CATEGORY_EACH_REJECTED,
  FETCH_CATEGORY_SECTION_DATA,
  UPDATE_EXSECTION_SECTION_ENTITY_EACH_PENDING,
  UPDATE_EXSECTION_SECTION_ENTITY_EACH_FULFILLED,
  UPDATE_EXSECTION_SECTION_ENTITY_EACH_REJECTED,
  DELETE_EXSECTION_SECTION_ENTITY_PENDING,
  DELETE_EXSECTION_SECTION_ENTITY_FULFILLED,
  DELETE_EXSECTION_SECTION_ENTITY_REJECTED
} from "./types";

import {
  onExsectionSectionsGet,
  onExsectionSectionAttributesGet,
  onExsectionSectionDetailGetAdmin,
  onCategoryEachGet
} from "../../Admin/config/adminServerCall";

import {
  onSectionBusinessPost,
  onParentSectionBusinessGet,
  onSectionsListExsectionBusinessData,
  onExsectionEntityEachGet,
  onBusinessCatDetailsGet,
  onUpdateExsectionSectionEntityPut,
  onRemoveExsectionSectionEntityDelete
} from "../config/businessServerCall";

const epics = [];

export const onSectionsListExsection = () => ({
  type: FETCH_EXSECTION_SECTIONS_PENDING,
  first: true
});

epics.push(action$ =>
  action$.ofType(FETCH_EXSECTION_SECTIONS_PENDING).mergeMap(action => {
    const { first } = action;
    return onExsectionSectionsGet()
      .concatMap(({ response }) => {
        const extra = [];
        if (first) {
          extra.push({
            type: INITIALIZE_TOP_SECTION_ADMIN_ID,
            payload: response.uid
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
        toast.error("Error Fetching Sections");
        return Observable.of({ type: FETCH_EXSECTION_SECTIONS_REJECTED });
      });
  })
);

export const onChangeActiveSectionBusiness = (
  newSectionAdminId,
  // oldSectionAdminId,
  activeChildrenAdmin = null,
  topSectionAdmin = null
) => {
  return {
    type: CHANGE_ACTIVE_EXSECTION_SECTION,
    payload: newSectionAdminId,
    // oldSectionAdminId,
    activeChildrenAdmin,
    topSectionAdmin
  };
};

epics.push((action$, { getState }) =>
  action$.ofType(CHANGE_ACTIVE_EXSECTION_SECTION).mergeMap(action => {
    const {
      payload: newSectionAdminId,
      // oldSectionAdminId,
      activeChildrenAdmin,
      topSectionAdmin
    } = action;
    const businessId = getState().auth.cookies.user_data.business_id;
    const rootNodeAdminId = getState().BusinessContainer.exsection
      .rootNodeAdminId;

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

      if (topSectionAdmin) {
        stuffs.push({
          type: CHANGE_ROOT_SECTION_ADMIN,
          payload: topSectionAdmin
        });
      }

      // stuffs.push({
      //   type: CHANGE_ACTIVE_PARENT_ADMIN_EXSECTION,
      //   payload: oldSectionAdminId
      // });

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

      // if (!action.first) {
      //   if (action.oldSectionAdminId !== topSectionAdminId) {
      //     stuffs.push({
      //       type: FETCH_PARENT_SECTION_LIST_BUSINESS_PENDING,
      //       payload: {
      //         body: {
      //           businessIdd: businessId,
      //           asid: oldSectionAdminId
      //         }
      //       }
      //     });
      //   }
      // }

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

epics.push((action$, { getState }) =>
  action$
    .ofType(FETCH_PARENT_SECTION_LIST_BUSINESS_PENDING)
    .mergeMap(({ payload: { body } }) => {
      const globalState = getState();
      let topSectionAdminIdd;
      let activeSectionAdminIdd;
      if (
        globalState.BusinessContainer.exsection.topSectionAdmin !== null &&
        globalState.BusinessContainer.exsection.topSectionAdmin !== undefined
      ) {
        topSectionAdminIdd =
          globalState.BusinessContainer.exsection.topSectionAdmin.uid;
        activeSectionAdminIdd =
          globalState.BusinessContainer.exsection.activeSectionAdminId;
      }
      return onParentSectionBusinessGet({ body })
        .map(({ response }) => {
          if (response.msg === "success") {
            if (
              topSectionAdminIdd &&
              activeSectionAdminIdd &&
              topSectionAdminIdd === activeSectionAdminIdd
            ) {
              return {
                type: FETCH_PARENT_SECTION_LIST_BUSINESS_FULFILLED,
                payload: {}
              };
            }
            return {
              type: FETCH_PARENT_SECTION_LIST_BUSINESS_FULFILLED,
              payload: response
            };
          } else if (response.msg.length === 0) {
            // console.log("eroor from else if");
            const parent_flag = false;
            return {
              type: PARENT_SECTION_BIZ_FLAG,
              payload: parent_flag
            };
          } else {
            // console.log("error from here");
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
      //console.log("UID",uid);
      return onExsectionEntityEachGet({ uid })
        .concatMap(({ response }) => {
          //console.log("SectionEntity",response);
          return [
            {
              type: FETCH_EXSECTION_SECTION_ENTITY_EACH_FULFILLED,
              payload: response
            }
            // {
            //   type: FETCH_EXSECTION_SECTION_ATTRIBUTES_PENDING,
            //   payload: {
            //     body: {
            //       sectionId: uid
            //     }
            //   }
            // }
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

//onChangeActiveSectionBusinessByClick,
export const onChangeActiveSectionBusinessByClick = uid => {
  return {
    type: CHANGE_ACTIVE_EXSECTION_SECTION_BY_CLICK,
    payload: uid
  };
};

epics.push((action$, { getState }) =>
  action$.ofType(CHANGE_ACTIVE_EXSECTION_SECTION_BY_CLICK).mergeMap(action => {
    const { payload: uid } = action;
    const businessId = getState().auth.cookies.user_data.business_id;
    const rootNodeAdminId = getState().BusinessContainer.exsection
      .rootNodeAdminId;
    return onExsectionSectionDetailGetAdmin({
      uid: uid
    }).concatMap(({ response }) => {
      const parentSectionAdminId = response.breadCrumbs[1].uid;
      const stuffs = [];
      stuffs.push({
        type: RESET_SECTION_STATE
      });

      stuffs.push({
        type: CHANGE_SELETED_SECTION_DETAILS_BUSINESS,
        payload: response
      });

      stuffs.push({
        type: FETCH_EXSECTION_SECTION_ATTRIBUTES_PENDING,
        payload: {
          body: { sectionId: uid }
        }
      });

      stuffs.push({
        type: CHANGE_SELETED_SECTION_DETAILS_BUSINESS_DATA_PENDING,
        payload: {
          body: { sectionId: uid }
        }
      });

      if (parentSectionAdminId !== rootNodeAdminId) {
        stuffs.push({
          type: FETCH_PARENT_SECTION_LIST_BUSINESS_PENDING,
          payload: {
            body: {
              businessIdd: businessId,
              asid: parentSectionAdminId
            }
          }
        });
        stuffs.push({
          type: "FETCH_PARENT_SECTION_LIST_ADMIN_FULFILLED",
          payload: parentSectionAdminId
        });
      } else {
        stuffs.push({
          type: RESET_SECTION_STATE
        });
      }

      return stuffs;
    });
  })
);

//Get Category For Business
export const onBusinessCatDetailsList = payload => ({
  type: FETCH_BUSINESS_CAT_DETAILS_PENDING,
  payload
});
epics.push((action$, { getState }) =>
  action$.ofType(FETCH_BUSINESS_CAT_DETAILS_PENDING).mergeMap(({ payload }) => {
    const access_token = getState().auth.cookies.token_data.access_token;
    const { id } = payload;

    return onBusinessCatDetailsGet({ id, access_token })
      .concatMap(({ response }) => {
        let catSections = [];
        response.categories.map(category => {
          let id = category.id;
          //console.log("CatID : ", id);
          let access_token = getState().auth.cookies.token_data.access_token;
          //console.log("Access Token : ",access_token);
          return onCategoryEachGet({ id, access_token }).then(response => {
            //console.log("Response : ", response);
            if (response.data.sections.length > 0) {
              catSections.push(response.data.sections);
              //Array.prototype.push.apply(catSections, response.data.sections);
            } else {
              catSections;
            }
          });
        });
        return [
          {
            type: FETCH_CATEGORY_SECTION_DATA,
            payload: catSections
          }
        ];
      })
      .catch(ajaxError => {
        // toast.error(ajaxError.toString());
        console.log("business detais errror: ", ajaxError);
        return Observable.of({
          type: FETCH_BUSINESS_CAT_DETAILS_REJECTED,
          payload: ajaxError
        });
      });
  })
);

//Update Section Entity Each Data
export const onUpdateExsectionSectionEntity = payload => ({
  type: UPDATE_EXSECTION_SECTION_ENTITY_EACH_PENDING,
  payload
});
epics.push((action$, { getState }) =>
  action$
    .ofType(UPDATE_EXSECTION_SECTION_ENTITY_EACH_PENDING)
    .mergeMap(({ payload }) => {
      const { body, uid } = payload;
      const access_token = getState().auth.cookies.token_data.access_token;
      //console.log("Payload From Component", body);
      //console.log("UID", uid);
      //console.log("Access Token", access_token);
      return onUpdateExsectionSectionEntityPut({
        body,
        uid,
        access_token
      })
        .concatMap(({ response }) => {
          if (response.msg === "success") {
            toast.success("Updated successfully!");
            return [{ type: UPDATE_EXSECTION_SECTION_ENTITY_EACH_FULFILLED }];
          } else {
            throw new Error("Error Updating Section Entity");
          }
        })
        .catch(ajaxError => {
          toast.error(ajaxError.toString());
          return Observable.of({
            type: UPDATE_EXSECTION_SECTION_ENTITY_EACH_REJECTED
          });
        });
    })
);

//Delete Section Entity Data
export const onRemoveExsectionSectionEntity = payload => ({
  type: DELETE_EXSECTION_SECTION_ENTITY_PENDING,
  payload
});

epics.push((action$, { getState }) =>
  action$.ofType(DELETE_EXSECTION_SECTION_ENTITY_PENDING).mergeMap(action => {
    const access_token = getState().auth.cookies.token_data.access_token;
    const { uid, routeToManageSections } = action.payload;

    return onRemoveExsectionSectionEntityDelete({ uid, access_token })
      .map(({ response }) => {
        if (response.msg === "success") {
          toast.success("Deleted Successfully");
          routeToManageSections();
          return { type: DELETE_EXSECTION_SECTION_ENTITY_FULFILLED };
        } else {
          throw new Error(response.msg);
        }
      })
      .catch(ajaxError => {
        toast.error(ajaxError.toString());
        return Observable.of({
          type: DELETE_EXSECTION_SECTION_ENTITY_REJECTED
        });
      });
  })
);

export default epics;
