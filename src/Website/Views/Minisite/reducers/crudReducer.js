import {
  UPDATE_ABOUT_FULFILLED,
  FETCH_BUSINESS_FULFILLED,
  UPDATE_COVER_PHOTO_FULFILLED
} from "../actions/types";

const INITIAL_STATE = {
  id: "",
  about: {
    tagline: "",
    aboutUs: "",
    establishedYear: ""
    // companyType: ""
  },
  business_name: "",
  username: "",
  cover_photo: "/media/default_cover.png",
  logo: "/media/default_logo.png",
  aboutUs:
    '<p class="ql-align-center">Mollit et et enim non quis cillum excepteur non enim commodo excepteur.Aute in velit mollit labore eiusmod exercitation.Incididunt labore aliqua sint proident ut ad esse ex eu.Reprehenderit Lorem est reprehenderit </p><p class="ql-align-center"><br></p><h3 class="ql-align-center"><strong>consectetur est.Quis irure eiusmod in labore.Lorem</strong>.</h3><p class="ql-align-center"><br></p><p class="ql-align-center">Mollit et et enim non quis ci<u>llum excepteur non en</u>im commodo excepteur.Aute in velit mollit labore eiusmod exercitation.Incididunt labore aliqua sint proident ut ad esse ex eu.Reprehenderit Lorem est reprehenderit consectetur est.Quis irure eiusmod in labore.Lorem.</p><ol><li>etur est.Quis irure eiusmod in labore.Lorem.</li><li>etur est.Quis irure eiusmod in labore.Lorem.</li><li>etur est.Quis irure <em>eiusmod</em> in labore.Lorem.</li><li>etur est.Quis irure eiusmod in labore.<u>Lorem</u>.</li><li>etur est.Quis irure eiusmod in labore.Lorem.</li></ol><p><br></p>'
};

export default function(state = INITIAL_STATE, action) {
  switch (action.type) {
    case FETCH_BUSINESS_FULFILLED:
      return { ...INITIAL_STATE, ...action.payload };

    case UPDATE_ABOUT_FULFILLED:
    case UPDATE_COVER_PHOTO_FULFILLED:
      return { ...state, ...action.payload };

    default:
      return state;
  }
}
