import { onCategoryPost } from "../Common/utils/serverCall";
import { FETCH_USER } from "./types";

export const onCategorySubmit = ({ category, industry }) => ({
  type: FETCH_USER,
  payload: onCategoryPost({ category, industry })
});
