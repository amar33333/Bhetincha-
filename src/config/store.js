import { applyMiddleware, createStore } from "redux";
import promiseMiddleware from "redux-promise-middleware";

import reducers from "../reducers";

const createStoreWithMiddleware = applyMiddleware(promiseMiddleware())(
  createStore
);

export default () => createStoreWithMiddleware(reducers);
