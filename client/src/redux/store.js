import { combineReducers, createStore } from "redux";

// reducers
import authReducer from "./reducers/authReducer";
import getProductCategories from "./reducers/productCategories";
import editProductModalReducer from "./reducers/editProductModalReducer";

const rootReducer = {
  authReducer,
  getProductCategories,
  editProductModalReducer,
};

const store = createStore(
  combineReducers(rootReducer),
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

export default store;
