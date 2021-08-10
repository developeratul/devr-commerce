import { combineReducers, createStore } from "redux";

// reducers
import authReducer from "./reducers/authReducer";
import getProductCategories from "./reducers/productCategories";
import editProductModalReducer from "./reducers/editProductModalReducer";
import cartReducer from "./reducers/cartReducer";
import singleProductReducer from "./reducers/singleProductReducer";
import profileReducer from "./reducers/profileReducer";
import productReducer from "./reducers/productReducer";

const rootReducer = {
  authReducer,
  getProductCategories,
  editProductModalReducer,
  cartReducer,
  singleProductReducer,
  profileReducer,
  productReducer,
};

const store = createStore(
  combineReducers(rootReducer),
  process.env.NODE_ENV === "development" &&
    window.__REDUX_DEVTOOLS_EXTENSION__ &&
    window.__REDUX_DEVTOOLS_EXTENSION__()
);

export default store;
