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

const App = () => {
  const dispatch = useDispatch();
  const [responseEnded, setResponseEnded] = useState(false);

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
      }
    } catch (err) {
      dispatch(logOutUser());
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
            <Route path="/" exact component={Home} />
            <Route path="/login" component={Login} />
            <Route path="/register" component={Register} />
            <Route path="/profile/:id" component={Profile} />
            <Route path="/cart" component={Cart} />
            <Route path="*" component={NotFound} />
          </Switch>
        </Router>
      )}
    </>
  );
};

export default App;
