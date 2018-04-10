import { applyMiddleware, createStore } from "redux";
import thunkMiddleware from "redux-thunk";
import { createLogger } from "redux-logger";

import reducers from "../reducers";

const loggerMiddleware = createLogger();

export const store = createStore(
  reducers,
  applyMiddleware(thunkMiddleware, loggerMiddleware)
);
// const createStoreWithMiddleware = applyMiddleware(thunkMiddleware)(createStore);

// export default () => createStoreWithMiddleware(reducers);
