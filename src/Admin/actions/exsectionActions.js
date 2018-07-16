import { Observable } from "rxjs/Observable";
import { toast } from "react-toastify";

import {
  FETCH_EXSECTION_ATTRIBUTES_PENDING,
  FETCH_EXSECTION_ATTRIBUTES_FULFILLED,
  FETCH_EXSECTION_ATTRIBUTES_REJECTED,
  FETCH_EXSECTION_SECTIONS_PENDING,
  CHANGE_ACTIVE_EXSECTION_SECTION,
  FETCH_EXSECTION_SECTIONS_FULFILLED,
  FETCH_EXSECTION_SECTIONS_REJECTED,
  FETCH_EXSECTION_SECTION_PENDING,
  FETCH_EXSECTION_SECTION_REJECTED,
  FETCH_EXSECTION_SECTION_FULFILLED,
  CREATE_EXSECTION_SECTIONS_PENDING,
  CREATE_EXSECTION_SECTIONS_FULFILLED,
  CREATE_EXSECTION_SECTIONS_REJECTED
} from "./types";

//import { onEcommerceCategoriesGet } from "../config/adminServerCall";

import {
  onExsectionAttributesGet,
  onExsectionSectionsGet,
  onExSectionSectionDetailGet,
  onExsectionSectionPost
} from "../config/adminServerCall";

const epics = [];

// attirbutes
export const onAttributesListExsection = () => ({
  type: FETCH_EXSECTION_ATTRIBUTES_PENDING
});

epics.push((action$, { getState }) =>
  action$.ofType(FETCH_EXSECTION_ATTRIBUTES_PENDING).mergeMap(action =>
    onExsectionAttributesGet()
      .map(({ response }) => ({
        type: FETCH_EXSECTION_ATTRIBUTES_FULFILLED,
        payload: response
      }))
      .catch(ajaxError => {
        console.log(ajaxError);
        toast.error("Error Fetching Attributes");
        return Observable.of({ type: FETCH_EXSECTION_ATTRIBUTES_REJECTED });
      })
  )
);

//sections

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
            payload: response.uid
          });
        }
        console.log("GIVE ME THE THING");
        console.log(response);
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

// epics.push((action$, { getState }) =>
//   action$
//     .ofType(CHANGE_ACTIVE_EXSECTION_SECTION)
//     .mergeMap(action => {
//       const { payload: newSection, oldSection } = action;
//       if (!oldSection || newSection !== oldSection) {
//         //return onEcommerceCategoryDetailGet({ uid: newCategory })
//         return onExSectionSectionDetailGet({ uid: newSection })
//           .map(({ response }) => {
//             return {
//               type: FETCH_EXSECTION_SECTION_FULFILLED,
//               payload: response
//             };
//           })
//           .catch(ajaxError => {
//             toast.error("Error fetching Categories");
//             return Observable.of({ type: FETCH_EXSECTION_SECTION_REJECTED });
//           });
//       } else {
//         return Observable.empty();
//       }
//     })
//     .startWith({ type: FETCH_EXSECTION_SECTION_PENDING })
// );

export const onSectionSubmitExsection = payload => ({
  type: CREATE_EXSECTION_SECTIONS_PENDING,
  payload
});

epics.push((action$, { getState }) =>
  action$.ofType(CREATE_EXSECTION_SECTIONS_PENDING).mergeMap(action => {
    const parent = getState().AdminContainer.exsection.activeSection;
    const { name } = action.payload;

    return onExsectionSectionPost({ name, parent })
      .concatMap(({ response }) => {
        if (response.msg === "success") {
          toast.success("Category created successfully");
          return [
            { type: CREATE_EXSECTION_SECTIONS_FULFILLED },
            { type: FETCH_EXSECTION_SECTIONS_PENDING }
          ];
        } else {
          throw new Error(response.msg);
        }
      })
      .catch(ajaxError => {
        toast.error(ajaxError.toString());
        return Observable.of({ type: CREATE_EXSECTION_SECTIONS_REJECTED });
      });
  })
);

export const onChangeActiveSectionExSection = (newSection, oldSection) => ({
  type: CHANGE_ACTIVE_EXSECTION_SECTION,
  payload: newSection,
  oldSection
});

export default epics;
