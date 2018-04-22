import React from "react";
import { object } from "prop-types";

export default (key, reducer) => WrappedComponent => {
  const Extended = (props, context) => {
    context.store.injectReducer(key, reducer);
    return <WrappedComponent {...props} />;
  };

  Extended.contextTypes = { store: object };

  return Extended;
};
