import React from "react";
import { object } from "prop-types";

export default (key, reducer, newEpic) => WrappedComponent => {
  const Extended = (props, context) => {
    context.store.injectRepics(key, reducer, newEpic);
    return <WrappedComponent {...props} />;
  };

  Extended.contextTypes = { store: object };

  return Extended;
};
