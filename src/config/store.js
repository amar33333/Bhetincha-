import { applyMiddleware, createStore, compose } from "redux";
// import { createEpicMiddleware } from "redux-observable";
import thunkMiddleware from "redux-thunk";
import createReducer from "../reducers";
import addNewEpics, { epicMiddleware } from "../Website/epics";
// import addNewEpics from "../Website/epics";
// addNewEpics(newEpic);

// Middleware configuration
const middleware = [thunkMiddleware, epicMiddleware];

// Store Enhancers
const enhancers = [];

if (process.env.NODE_ENV === "development") {
  const { logger } = require("redux-logger");
  middleware.push(logger);
  enhancers.push(
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  );
}

//store instantiation
const store = createStore(
  createReducer(),
  compose(applyMiddleware(...middleware), ...enhancers)
);

// Extra functionality to the store
store.asyncReducers = {};
store.injectReducer = (key, reducer, newEpic) => {
  if (!store.getState()[key]) {
    store.asyncReducers[key] = reducer;
    store.replaceReducer(createReducer(store.asyncReducers));
    addNewEpics(newEpic);
  }
};

export default store;
