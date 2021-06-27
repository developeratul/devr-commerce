import { combineReducers, createStore } from "redux";

function reducer(state = {}, action) {
  return state;
}

const store = createStore(
  combineReducers({ reducer }),
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

export default store;
