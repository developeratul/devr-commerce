import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { AnimatePresence } from "framer-motion";

import { Provider } from "react-redux";
import store from "./redux/store";

ReactDOM.render(
  <Provider store={store}>
    <AnimatePresence>
      <App />
    </AnimatePresence>
  </Provider>,
  document.querySelector("#root")
);
