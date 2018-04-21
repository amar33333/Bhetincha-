import React from "react";
import { object } from "prop-types";
// import addNewEpics from "../Website/epics";

export default (key, reducer, newEpic) => WrappedComponent => {
  const Extended = (props, context) => {
    context.store.injectReducer(key, reducer, newEpic);
    // addNewEpics(newEpic);
    return <WrappedComponent {...props} />;
  };

  Extended.contextTypes = { store: object };

  return Extended;
};
