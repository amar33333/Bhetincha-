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
  CHANGE_ACTIVE_PARENT_ADMIN_ID_EXSECTION,
  CHANGE_ACTIVE_PARENT_ADMIN_ID_EXSECTION_FULFILLED
} from "./types";

import {
  onExsectionSectionsGet,
  onExsectionSectionAttributesGet,
  onExsectionSectionDetailGetAdmin
} from "../../Admin/config/adminServerCall";

import {
  onSectionBusinessPost,
  onParentSectionBusinessGet
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
            oldSection: "9b4623c4d6c24531a8f64e9673397cf1"
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
  newSection,
  oldSection,
  leafDetected = false,
  activeChildren
) => ({
  type: CHANGE_ACTIVE_EXSECTION_SECTION,
  payload: newSection,
  oldSection,
  leafDetected,
  activeChildren
});

epics.push((action$, { getState }) =>
  action$.ofType(CHANGE_ACTIVE_EXSECTION_SECTION).mergeMap(action => {
    //console.log("consoling action", action);
    const {
      payload: newSection,
      oldSection,
      leafDetected,
      activeChildren
    } = action;
    //console.log("Consoling actions", action);
    const businessId = getState().auth.cookies.user_data.business_id;
    return onExsectionSectionDetailGetAdmin({ uid: newSection }).concatMap(
      ({ response }) => {
        // console.log("Logging RESO", oldSection);
        const stuffs = [];

        stuffs.push({
          type: CHANGE_SELETED_SECTION_DETAILS_BUSINESS,
          payload: response
        });

        stuffs.push({
          type: CHANGE_ACTIVE_CHILD_EXSECTION,
          payload: activeChildren
        });

        // stuffs.push({
        //   type: CHANGE_ACTIVE_PARENT_ADMIN_ID_EXSECTION,
        //   payload: {
        //     body: { sectionId: oldSection }
        //   }
        // });

        stuffs.push({
          type: FETCH_EXSECTION_SECTION_ATTRIBUTES_PENDING,
          payload: {
            body: { sectionId: newSection }
          }
        });

        if (!action.first) {
          if (action.oldSection !== "9b4623c4d6c24531a8f64e9673397cf1") {
            stuffs.push({
              type: FETCH_PARENT_SECTION_LIST_BUSINESS_PENDING,
              payload: {
                body: {
                  businessIdd: businessId,
                  asid: oldSection
                }
              }
            });
          }
        }

        return stuffs;
      }
    );
  })
);

// epics.push(action$ =>
//   action$
//     .ofType(CHANGE_ACTIVE_PARENT_ADMIN_ID_EXSECTION)
//     .mergeMap(({ payload: { body } }) => {
//       console.log("Consoling body", body);
//       const oldSection = body.sectionId;
//       return onExsectionSectionDetailGetAdmin({ uid: oldSection })
//         .map(({ response }) => {
//           if (response.msg === "success") {
//             console.log("CHANGE_ACTIVE_PARENT_ADMIN_ID_EXSECTION", response);
//             return {
//               type: CHANGE_ACTIVE_PARENT_ADMIN_ID_EXSECTION_FULFILLED,
//               payload: response
//             };
//           } else {
//             throw new Error(response.msg);
//           }
//         })
//         .catch(ajaxError => {
//           toast.error(ajaxError.toString());
//           return Observable.of({
//             type: "CHANGE_ACTIVE_PARENT_ADMIN_ID_EXSECTION_REJECTED"
//           });
//         });
//     })
// );

epics.push(action$ =>
  action$
    .ofType(FETCH_EXSECTION_SECTION_ATTRIBUTES_PENDING)
    .mergeMap(({ payload: { body } }) => {
      return onExsectionSectionAttributesGet({ body })
        .map(({ response }) => {
          if (response.msg === "success") {
            //console.log("On active change", response);
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
      // console.log("CXonsong body", body);

      return onParentSectionBusinessGet({ body })
        .map(({ response }) => {
          if (response.msg === "success") {
            //console.log("On active change", response);
            return {
              type: FETCH_PARENT_SECTION_LIST_BUSINESS_FULFILLED,
              payload: response
            };
          } else {
            //console.log("ERROR logged");
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
      // const {
      //   activeCategory: sectionId
      // } = globalState.BusinessContainer.exsection;
      const businessIdd = globalState.auth.cookies.user_data.business_id;

      return onSectionBusinessPost({
        body: { ...payload.body, businessIdd }
      })
        .concatMap(({ response }) => {
          if (response.msg === "success") {
            toast.success("added successfully!");
            return [{ type: CREATE_EXSECTION_BUSINESS_SECTION_FULFILLED }];
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

export default epics;
