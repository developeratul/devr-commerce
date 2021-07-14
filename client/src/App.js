import { useEffect, useState } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch, useSelector } from "react-redux";

// actions
import { logInUser, logOutUser } from "./redux/actions/authActions";
import { getPreviousCartItems } from "./redux/actions/cartActions";

// components
import Nav from "./components/Nav";
import FullPageLoader from "./components/FullPageLoader";

// pages
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Profile from "./pages/Profile";
import Cart from "./pages/Cart";
import NotFound from "./pages/NotFound";
import Settings from "./pages/Settings";
import Product from "./pages/Product";
import SingleProduct from "./pages/SingleProduct";

const App = () => {
  const [responseEnded, setResponseEnded] = useState(false);
  const { user } = useSelector((state) => state.authReducer);
  const dispatch = useDispatch();

  // for checking if the user is authenticated
  async function checkAuth() {
    try {
      const res = await fetch("/get_auth", {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          credentials: "include",
          "Access-Control-Allow-Origin": "*",
          Connection: "keep-alive",
          "Keep-Alive": "timeout=5",
        },
      });

      if (typeof res.status === "number") {
        setResponseEnded(true);
      }

      const body = await res.json();

      if (res.status === 200) {
        dispatch(logInUser(body));
      } else if (res.status === 401) {
        dispatch(logOutUser());
      }
    } catch (err) {
      dispatch(logOutUser());
    }
  }

  // for getting the previous cart items from the user collection in the DB
  async function getCartItemsFromDB(abortController) {
    try {
      const res = await fetch("/get_cart/get_cart_items", {
        method: "GET",
        signal: abortController.signal,
        headers: {
          "Content-Type": "application/json",
        },
      });

      const body = await res.json();

      if (res.status === 200) {
        dispatch(getPreviousCartItems(body));
      }
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    const abortController = new AbortController();

    checkAuth();
    getCartItemsFromDB(abortController);

    return () => {
      abortController.abort();
    };
  }, [user._id]);

  return (
    <>
      {/* till we don't get any response from the server, this loader should be rendered
      instead of the routes */}
      {!responseEnded ? (
        <FullPageLoader />
      ) : (
        <Router>
          <ToastContainer
            position="top-center"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            limit={2}
          />

          <Nav />

          {/* {user.isSeller && isAuthenticated && <EditProductModal />} */}

          <Switch>
            <Route path="/" exact component={Home} />
            <Route path="/login" component={Login} />
            <Route path="/register" component={Register} />
            <Route path="/profile/:id" component={Profile} />
            <Route path="/product/:id" component={SingleProduct} />
            <Route path="/cart" component={Cart} />
            <Route path="/settings" component={Settings} />
            <Route path="/products" component={Product} />
            <Route path="/notfound" component={NotFound} />
            <Route path="*" component={NotFound} />
          </Switch>
        </Router>
      )}
    </>
  );
};

export default App;
