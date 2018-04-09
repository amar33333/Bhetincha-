import { onIndustryPost, onIndustryGet } from "../Common/utils/serverCall";
import { FETCH_INDUSTRY, CREATE_INDUSTRY } from "./types";

export const onIndustrySubmit = ({ industry }) => ({
  type: CREATE_INDUSTRY,
  payload: onIndustryPost({ industry })
});

export const onIndustryList = () => ({
  type: FETCH_INDUSTRY,
  payload: onIndustryGet()
});
