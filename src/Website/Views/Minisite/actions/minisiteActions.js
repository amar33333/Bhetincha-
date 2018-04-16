import { TOGGLE_EDIT_MAIN, TOGGLE_EDIT_ABOUT_US, SAVE_ABOUT_US } from "./types";

export const onEditMainClicked = () => ({ type: TOGGLE_EDIT_MAIN });
export const onEditAboutUsClicked = () => ({ type: TOGGLE_EDIT_ABOUT_US });

export const handleAboutUsSave = text => ({
  type: SAVE_ABOUT_US,
  payload: text
});
