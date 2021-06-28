import { useEffect } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch } from "react-redux";

// actions
import { logInUser, logOutUser } from "./redux/actions/authActions";

// components
import Nav from "./components/Nav";

// pages
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";

const App = () => {
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

      const body = await res.json();

      if (res.status === 200) {
        dispatch(logInUser(body));
      }
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    checkAuth();
  }, []);

  return (
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
      </Switch>
    </Router>
  );
};

export default App;
