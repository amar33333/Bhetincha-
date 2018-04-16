import { TOGGLE_EDIT, SAVE_ABOUT_US } from "./types";

export const onEditClicked = () => ({ type: TOGGLE_EDIT });

export const handleAboutUsSaved = text => ({
  type: SAVE_ABOUT_US,
  payload: text
});
