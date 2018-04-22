import { applyMiddleware, createStore } from "redux";
import thunkMiddleware from "redux-thunk";
import { createLogger } from "redux-logger";
import createReducer from "../reducers";

const loggerMiddleware = createLogger();

export default () => {
  const createStoreWithMiddleware = applyMiddleware(
    thunkMiddleware,
    loggerMiddleware
  )(createStore);

  const store = createStoreWithMiddleware(
    createReducer(),

    // This must only be in the production
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  );

  store.asyncReducers = {};
  store.injectReducer = (key, reducer) => {
    // console.log("this is store ", );
    if (!store.getState()[key]) {
      store.asyncReducers[key] = reducer;
      store.replaceReducer(createReducer(store.asyncReducers));
    }
  };
  return store;
};
