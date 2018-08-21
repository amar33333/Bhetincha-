import { Observable } from "rxjs/Observable";
import { toast } from "react-toastify";

import {
  FETCH_EXSECTION_SECTIONS_PENDING,
  FETCH_EXSECTION_SECTIONS_FULFILLED,
  FETCH_EXSECTION_SECTIONS_REJECTED,
  CREATE_EXSECTION_SECTIONS_PENDING,
  CREATE_EXSECTION_SECTIONS_FULFILLED,
  CREATE_EXSECTION_SECTIONS_REJECTED,
  FETCH_EXSECTION_SECTION_PENDING,
  FETCH_EXSECTION_SECTION_REJECTED,
  FETCH_EXSECTION_SECTION_FULFILLED,
  CREATE_EXSECTION_PROPERTY_PENDING,
  CREATE_EXSECTION_PROPERTY_FULFILED,
  CREATE_EXSECTION_PROPERTY_REJECTED,
  CHANGE_ACTIVE_EXSECTION_SECTION,
  FETCH_EXSECTION_ATTRIBUTES_PENDING,
  FETCH_EXSECTION_ATTRIBUTES_FULFILLED,
  FETCH_EXSECTION_ATTRIBUTES_REJECTED,
  CREATE_EXSECTION_PROPERTY_SECTION_FULFILLED,
  CREATE_EXSECTION_PROPERTY_SECTION_PENDING,
  CREATE_EXSECTION_PROPERTY_SECTION_REJECTED,
  DELETE_EXSECTION_PROPERTY_SECTION_PENDING,
  DELETE_EXSECTION_PROPERTY_SECTION_FULFILLED,
  DELETE_EXSECTION_PROPERTY_SECTION_REJECTED,
  UPDATE_EXSECTION_SECTION_PENDING,
  UPDATE_EXSECTION_SECTION_FULFILLED,
  UPDATE_EXSECTION_SECTION_REJECTED,
  UPDATE_EXSECTION_PROPERTY_SECTION_PENDING,
  UPDATE_EXSECTION_PROPERTY_SECTION_FULFILLED,
  UPDATE_EXSECTION_PROPERTY_SECTION_REJECTED,
  DELETE_EXSECTION_SUBSECTION_PENDING,
  DELETE_EXSECTION_SUBSECTION_FULFILLED,
  DELETE_EXSECTION_SUBSECTION_REJECTED
} from "./types";

import {
  onExsectionAttributesGetAdmin,
  onExsectionSectionsGetAdmin,
  onExsectionSectionDetailGetAdmin,
  onExsectionSectionPostAdmin,
  OnExsectionSubSectionDetailDelete,
  //onExsectionPropertiesPost,
  onExsectionAttributesPostAdmin,
  onExsectionPropertiesDelete,
  onExsectionSectionDetailPost,
  onExsectionPropertiesPut
} from "../config/adminServerCall";
import { EXSECTION_ATTRIBUTE_URL } from "../config/ADMIN_API";

const epics = [];

//sections
export const onSectionsListExsection = () => ({
  type: FETCH_EXSECTION_SECTIONS_PENDING,
  first: true
});
epics.push((action$, { getState }) =>
  action$.ofType(FETCH_EXSECTION_SECTIONS_PENDING).mergeMap(action => {
    const { first } = action;
    return onExsectionSectionsGetAdmin()
      .concatMap(({ response }) => {
        const extra = [];
        if (first) {
          extra.push({
            type: CHANGE_ACTIVE_EXSECTION_SECTION,
            payload: response.uid
          });
        }
        //console.log("GIVE ME THE THING");
        //console.log(response);
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

//add section
export const onSectionSubmitExsection = payload => ({
  type: CREATE_EXSECTION_SECTIONS_PENDING,
  payload
});
epics.push((action$, { getState }) =>
  action$.ofType(CREATE_EXSECTION_SECTIONS_PENDING).mergeMap(action => {
    const parent = getState().AdminContainer.exsection.activeSection;
    const { name } = action.payload;
    console.log(parent);
    const hasAttr = true;

    return onExsectionSectionPostAdmin({ name, hasAttr, parent })
      .concatMap(({ response }) => {
        if (response.msg === "success") {
          toast.success("Section created successfully");
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

//onSectionUpdateExsection

export const onSectionUpdateExsection = payload => ({
  type: UPDATE_EXSECTION_SECTION_PENDING,
  payload
});

epics.push((action$, { getState }) =>
  action$.ofType(UPDATE_EXSECTION_SECTION_PENDING).mergeMap(action => {
    const uid = getState().AdminContainer.exsection.activeSection;
    const { body } = action.payload;

    return onExsectionSectionDetailPost({ body, uid })
      .concatMap(({ response }) => {
        if (response.msg === "success") {
          toast.success("Category updated successfully");
          return [
            { type: UPDATE_EXSECTION_SECTION_FULFILLED },
            { type: FETCH_EXSECTION_SECTIONS_PENDING },
            { type: CHANGE_ACTIVE_EXSECTION_SECTION, payload: uid }
          ];
        } else {
          toast.error(response.msg);
          return [{ type: CHANGE_ACTIVE_EXSECTION_SECTION, payload: uid }];
        }
      })
      .catch(ajaxError => {
        toast.error(ajaxError.toString());
        return Observable.of({ type: UPDATE_EXSECTION_SECTION_REJECTED });
      });
  })
);

export const onSubSectionDeleteExsection = payload => ({
  type: "DELETE_EXSECTION_SUBSECTION_PENDING",
  payload
});

epics.push((action$, { getState }) =>
  action$.ofType(DELETE_EXSECTION_SUBSECTION_PENDING).mergeMap(action => {
    const { uid } = action.payload;
    //OnExsectionSubSectionDetailDelete
    return OnExsectionSubSectionDetailDelete({ uid })
      .concatMap(({ response }) => {
        if (response.msg === "success") {
          toast.success("Sub Section deleted successfully");
          return [
            { type: DELETE_EXSECTION_SUBSECTION_FULFILLED },
            { type: FETCH_EXSECTION_SECTIONS_PENDING, first: true }
          ];
        } else {
          throw new Error(response.msg);
        }
      })
      .catch(ajaxError => {
        toast.error(ajaxError.toString());
        return Observable.of({ type: DELETE_EXSECTION_SUBSECTION_REJECTED });
      });
  })
);

export const onChangeActiveSectionExsection = (newSection, oldSection) => ({
  type: CHANGE_ACTIVE_EXSECTION_SECTION,
  payload: newSection,
  oldSection
});

epics.push((action$, { getState }) =>
  action$
    .ofType(CHANGE_ACTIVE_EXSECTION_SECTION)
    .mergeMap(action => {
      const { payload: newSection, oldSection } = action;
      if (!oldSection || newSection !== oldSection) {
        return onExsectionSectionDetailGetAdmin({ uid: newSection })
          .map(({ response }) => {
            return {
              type: FETCH_EXSECTION_SECTION_FULFILLED,
              payload: response
            };
          })
          .catch(ajaxError => {
            toast.error("Error fetching Sections");
            return Observable.of({ type: FETCH_EXSECTION_SECTION_REJECTED });
          });
      } else {
        return Observable.empty();
      }
    })
    .startWith({ type: FETCH_EXSECTION_SECTION_PENDING })
);

// export const onPropertySubmitExsection = payload => ({
//   type: CREATE_EXSECTION_PROPERTY_PENDING,
//   payload
// });

// epics.push((action$, { getState }) =>
//   action$.ofType(CREATE_EXSECTION_PROPERTY_PENDING).mergeMap(action => {
//     const payload = getState().AdminContainer.activeSection;
//     const { body } = action.payload;
//     return onExsectionAttributesPost({ body })
//       .concatMap(({ response }) => {
//         if (response.msg === "UNSUCCESSFUL") {
//           toast.success("Attributes Added successfully");
//           return [
//             { type: CREATE_EXSECTION_PROPERTY_FULFILED },

// attirbutes
export const onAttributesListExsection = () => ({
  type: FETCH_EXSECTION_ATTRIBUTES_PENDING
});

epics.push((action$, { getState }) =>
  action$.ofType(FETCH_EXSECTION_ATTRIBUTES_PENDING).mergeMap(action =>
    onExsectionAttributesGetAdmin()
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
//Add Property(Attributes)
export const onPropertySubmitExsection = payload => ({
  type: CREATE_EXSECTION_PROPERTY_SECTION_PENDING,
  payload
});
epics.push((action$, { getState }) =>
  action$.ofType(CREATE_EXSECTION_PROPERTY_SECTION_PENDING).mergeMap(action => {
    const payload = getState().AdminContainer.exsection.activeSection;
    const { body } = action.payload;
    return onExsectionAttributesPostAdmin({ body })
      .concatMap(({ response }) => {
        if (response.msg === "success") {
          toast.success("Attribute created successfully");
          return [
            { type: CREATE_EXSECTION_PROPERTY_SECTION_FULFILLED },
            { type: CHANGE_ACTIVE_EXSECTION_SECTION, payload }
          ];
        } else {
          throw new Error(response.msg);
        }
      })
      .catch(ajaxError => {
        toast.error(ajaxError.toString());
        return Observable.of({
          type: CREATE_EXSECTION_PROPERTY_SECTION_REJECTED
        });
      });
  })
);

//onPropertyUpdateExsection

export const onPropertyUpdateExsection = payload => ({
  type: UPDATE_EXSECTION_PROPERTY_SECTION_PENDING,
  payload
});

epics.push((action$, { getState }) =>
  action$.ofType(UPDATE_EXSECTION_PROPERTY_SECTION_PENDING).mergeMap(action => {
    const payload = getState().AdminContainer.exsection.activeSection;
    const { body } = action.payload;

    return onExsectionPropertiesPut({ body })
      .concatMap(({ response }) => {
        if (response.msg === "success") {
          toast.success("Attribute updated successfully");
          return [
            { type: UPDATE_EXSECTION_PROPERTY_SECTION_FULFILLED },
            { type: CHANGE_ACTIVE_EXSECTION_SECTION, payload }
          ];
        } else {
          throw new Error(response.msg);
        }
      })
      .catch(ajaxError => {
        toast.error(ajaxError.toString());
        return Observable.of({
          type: UPDATE_EXSECTION_PROPERTY_SECTION_REJECTED
        });
      });
  })
);

//onPropertyRemoveExsection

export const onPropertyRemoveExsection = payload => ({
  type: DELETE_EXSECTION_PROPERTY_SECTION_PENDING,
  payload
});

epics.push((action$, { getState }) =>
  action$.ofType(DELETE_EXSECTION_PROPERTY_SECTION_PENDING).mergeMap(action => {
    const payload = getState().AdminContainer.exsection.activeSection;
    const body = action.payload;

    return onExsectionPropertiesDelete({ body })
      .concatMap(({ response }) => {
        if (response.msg === "success") {
          toast.success("Attribute Deleted Successfully");
          return [
            { type: DELETE_EXSECTION_PROPERTY_SECTION_FULFILLED },
            { type: CHANGE_ACTIVE_EXSECTION_SECTION, payload }
          ];
        } else {
          throw new Error(response.msg);
        }
      })
      .catch(ajaxError => {
        toast.error(ajaxError.toString());
        return Observable.of({
          type: DELETE_EXSECTION_PROPERTY_SECTION_REJECTED
        });
      });
  })
);

export default epics;
