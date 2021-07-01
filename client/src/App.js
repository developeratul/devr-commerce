import { useEffect, useState } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch } from "react-redux";

// actions
import { logInUser, logOutUser } from "./redux/actions/authActions";

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

const App = () => {
  const [responseEnded, setResponseEnded] = useState(false);
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
      alert("we are having unexpected server error please come back later");
    }
  }

  useEffect(() => {
    checkAuth();
  }, []);

  return (
    <>
      {/* till we don't get any response from the server, this loader should be rendered
      instead of the routes */}
      {!responseEnded ? (
        <FullPageLoader />
      ) : (
        <Router>
          {/* toast container */}
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

          {/* nav bar */}
          <Nav />

          <Switch>
            {/* Home page */}
            <Route path="/" exact component={Home} />
            {/* The login page */}
            <Route path="/login" component={Login} />
            {/* The registration / signup page */}
            <Route path="/register" component={Register} />
            {/* The profile page */}
            <Route path="/profile/:id" component={Profile} />
            {/* The shopping cart of the authenticated user */}
            <Route path="/cart" component={Cart} />
            {/* the settings page of the authenticated user */}
            <Route path="/settings" component={Settings} />
            {/* 404 not found page */}
            <Route path="/notFound" component={NotFound} />
            {/* if a route doesn't exists */}
            <Route path="*" component={NotFound} />
          </Switch>
        </Router>
      )}
    </>
  );
};

export default App;
