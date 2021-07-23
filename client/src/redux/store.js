import { combineReducers, createStore } from "redux";

// reducers
import authReducer from "./reducers/authReducer";
import getProductCategories from "./reducers/productCategories";
import editProductModalReducer from "./reducers/editProductModalReducer";
import cartReducer from "./reducers/cartReducer";

const rootReducer = {
  authReducer,
  getProductCategories,
  editProductModalReducer,
  cartReducer,
};

const store = createStore(
  combineReducers(rootReducer),
  process.env.NODE_ENV === "development" &&
    window.__REDUX_DEVTOOLS_EXTENSION__ &&
    window.__REDUX_DEVTOOLS_EXTENSION__()
);

export default store;
