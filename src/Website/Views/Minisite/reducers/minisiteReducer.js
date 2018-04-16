import {
  TOGGLE_EDIT_MAIN,
  TOGGLE_EDIT_ABOUT_US,
  SAVE_ABOUT_US
} from "../actions/types";

const INITIAL_STATE = {
  edit: {
    main: false,
    aboutUs: false
  },
  data: {
    aboutUs:
      '<p class="ql-align-center">Mollit et et enim non quis cillum excepteur non enim commodo excepteur.Aute in velit mollit labore eiusmod exercitation.Incididunt labore aliqua sint proident ut ad esse ex eu.Reprehenderit Lorem est reprehenderit </p><p class="ql-align-center"><br></p><h3 class="ql-align-center"><strong>consectetur est.Quis irure eiusmod in labore.Lorem</strong>.</h3><p class="ql-align-center"><br></p><p class="ql-align-center">Mollit et et enim non quis ci<u>llum excepteur non en</u>im commodo excepteur.Aute in velit mollit labore eiusmod exercitation.Incididunt labore aliqua sint proident ut ad esse ex eu.Reprehenderit Lorem est reprehenderit consectetur est.Quis irure eiusmod in labore.Lorem.</p><ol><li>etur est.Quis irure eiusmod in labore.Lorem.</li><li>etur est.Quis irure eiusmod in labore.Lorem.</li><li>etur est.Quis irure <em>eiusmod</em> in labore.Lorem.</li><li>etur est.Quis irure eiusmod in labore.<u>Lorem</u>.</li><li>etur est.Quis irure eiusmod in labore.Lorem.</li></ol><p><br></p>'
  }
};

export default function(state = INITIAL_STATE, action) {
  switch (action.type) {
    case TOGGLE_EDIT_MAIN:
      return { ...state, edit: { ...state.edit, main: !state.edit.main } };
    case TOGGLE_EDIT_ABOUT_US:
      return {
        ...state,
        edit: { ...state.edit, aboutUs: !state.edit.aboutUs }
      };
    case SAVE_ABOUT_US:
      return {
        ...state,
        data: { ...state.data, aboutUs: action.payload },
        edit: { ...state.edit, aboutUs: !state.edit.aboutUs }
      };
    default:
      return state;
  }
}
