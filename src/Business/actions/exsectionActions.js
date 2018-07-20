import { Observable } from "rxjs/Observable";
import { toast } from "react-toastify";

import {
  FETCH_EXSECTION_SECTIONS_FULFILLED,
  FETCH_EXSECTION_SECTIONS_PENDING,
  FETCH_EXSECTION_SECTIONS_REJECTED,
  CHANGE_ACTIVE_EXSECTION_SECTION
} from "./types";

import {
  onExsectionSectionsGet
  // onEcommerceCategoryAttributesGet,
  // onEcommerceCategoryProductsGet,
  // onEcommerceProductPost,
  // onEcommerceProductEachGet,
  // onEcommerceProductEachPut,
  // onEcommerceProductEachDelete
} from "../../Admin/config/adminServerCall";

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
        toast.error("Error Fetching Categories");
        return Observable.of({ type: FETCH_EXSECTION_SECTIONS_REJECTED });
      });
  })
);

// export const onChangeActiveCategoryEcommerce = (
//   newCategory,
//   oldCategory,
//   leafDetected = false
// ) => ({
//   type: CHANGE_ACTIVE_EXSECTION_SECTION,
//   payload: newCategory,
//   oldCategory,
//   leafDetected
// });

// epics.push((action$, { getState }) =>
//   action$.ofType(CHANGE_ACTIVE_EXSECTION_SECTION).concatMap(action => {
//     const { payload: newCategory, oldCategory, leafDetected } = action;
//     const businessId = getState().auth.cookies.user_data.business_id;
//     const stuffs = [];
//     if (leafDetected && (!oldCategory || newCategory !== oldCategory)) {
//       stuffs.push({
//         type: FETCH_EXSECTION_SECTION_ATTRIBUTES_PENDING,
//         payload: {
//           body: { categoryId: newCategory }
//         }
//       });
//     }
//     if (!oldCategory || newCategory !== oldCategory) {
//       stuffs.push({
//         type: FETCH_EXSECTION_SECTION_PRODUCTS_PENDING,
//         payload: {
//           params: { categoryId: newCategory, businessId }
//         }
//       });
//     }
//     return stuffs;
//   })
// );

export default epics;
