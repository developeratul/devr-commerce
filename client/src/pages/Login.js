import { useState } from "react";
import "../styles/Login/login.css";
import { Button } from "@material-ui/core";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logInUser } from "../redux/actions/authActions";

const Login = () => {
  const [formInfo, setFormInfo] = useState({ email: "", password: "" });
  const history = useHistory();
  const dispatch = useDispatch();

  // for handling input change
  function HandleInputChange(event) {
    const { name, value } = event.target;

    setFormInfo((pre) => ({ ...pre, [name]: value }));
  }

  // for logging in a user
  async function loginUser() {
    const { email, password } = formInfo;

    try {
      const res = await fetch("/get_auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          credentials: "include",
        },
        body: JSON.stringify({ email, password }),
      });

      const body = await res.json();

      if (res.status === 201) {
        history.push("/");
        dispatch(logInUser(body.user));
        toast.dark(body.message);
      } else if (res.status === 409) {
        toast.error(body.message);
      }
    } catch (err) {
      console.log(err);
      if (err.message) {
        toast.error(err.message);
      }

      toast.error(err);
    }
  }

  return (
    <div className="login_page">
      <div className="container">
        <div className="login_form_container">
          <div className="form_header">
            <h1 className="title">Log In</h1>

            <div className="dual_line_container">
              <div className="line line1"></div>
              <div className="line line2"></div>
            </div>
          </div>

          <div className="form_fields_container">
            <div className="single_field">
              <input
                type="email"
                placeholder="Enter your email"
                onChange={HandleInputChange}
                name="email"
                value={formInfo.email}
              />
            </div>

            <div className="single_field">
              <input
                type="password"
                placeholder="Enter your password"
                onChange={HandleInputChange}
                name="password"
                value={formInfo.password}
              />
            </div>

            <div className="single_field">
              <Button onClick={loginUser} variant="contained" fullWidth>
                Log In
              </Button>
            </div>
          </div>

          <div className="form_footer">
            <p>
              Don't have any account?{" "}
              <Link to="/register">Register Account</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
