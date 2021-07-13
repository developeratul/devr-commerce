import { applyMiddleware, combineReducers, compose, createStore } from "redux";
import thunk from "redux-thunk";

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
  compose(
    applyMiddleware(thunk),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  )
);

export default store;
