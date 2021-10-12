import { Button } from "@material-ui/core";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import validator from "validator";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logInUser } from "../../redux/actions/authActions";

const Form = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    conPass: "",
    phone: "",
    isSeller: "",
  });
  const [country, setCountry] = useState("");
  const [responseSentToServer, setResponseSentToServer] = useState(false);
  const history = useHistory();
  const dispatch = useDispatch();

  // for registering a user
  const registerUser = async () => {
    setResponseSentToServer(true);

    const { name, email, phone, password, isSeller } = formData;

    try {
      const res = await fetch("/get_auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({
          name,
          email,
          country,
          phone,
          password,
          isSeller,
        }),
      });

      const body = await res.json();

      const { status } = res;

      if (status === 200) {
        history.push("/");
        dispatch(logInUser(body.user));
        toast.dark(body.message);
        setResponseSentToServer(false);
      } else if (status === 403) {
        toast.error(body.message);
        setResponseSentToServer(false);
      } else if (status === 500) {
        toast.error(body.message);
        setResponseSentToServer(false);
      }
    } catch (err) {
      toast.error(err.message || err);
    }
  };

  // for handling the input fields
  function HandleInputChange(event) {
    const { name, value } = event.target;

    setFormData((pre) => ({ ...pre, [name]: value }));
  }

  // for validation input information's
  function Validate() {
    const { name, email, password, conPass, phone } = formData;
    const validation = {
      passwordLength: password.length >= 8,
      nameLength: name.length <= 25,
      allFields: name && email && password && conPass && phone,
      passwordMatched: password === conPass,
      emailOk: validator.isEmail(email),
    };
    const { passwordLength, passwordMatched, allFields, emailOk, nameLength } =
      validation;

    if (!allFields) {
      toast.error("Please fill all the fields properly");
    } else if (!emailOk) {
      toast.error("Your email is invalid");
    } else if (!passwordLength) {
      toast.error("Password must have 8 chars");
    } else if (!passwordMatched) {
      toast.error("Password doesn't matched");
    } else if (!nameLength) {
      toast.error("Name length cannot be greater than 25");
    } else if (
      passwordLength &&
      allFields &&
      passwordMatched &&
      emailOk &&
      nameLength
    ) {
      registerUser(); // for registering a user in our database
    }
  }

  // for fetching the location of the user
  const fetchCountryData = async (abortController) => {
    try {
      const endpoint = "https://geolocation-db.com/json/";
      const apiKey = process.env.REACT_APP_GEOLOCATION_API_KEY;
      const res = await fetch(`${endpoint}${apiKey}`, {
        signal: abortController.signal,
      });
      const body = await res.json();
      setCountry(body);
    } catch (err) {
      toast.error(err.message || err);
    }
  };

  useEffect(() => {
    const abortController = new AbortController();
    fetchCountryData(abortController);
    return () => abortController.abort();
  }, []);

  return (
    <div className="register_form">
      <div className="form_container">
        <h1>Register Account</h1>

        <div className="form">
          <div className="single_field">
            <input
              type="text"
              placeholder="Enter your name"
              name="name"
              onChange={HandleInputChange}
              value={formData.name}
            />
          </div>

          <div className="single_field">
            <input
              type="email"
              placeholder="Enter your email"
              name="email"
              onChange={HandleInputChange}
              value={formData.email}
            />
          </div>

          <div className="single_field">
            <input
              type="password"
              placeholder="Enter password"
              name="password"
              onChange={HandleInputChange}
              value={formData.password}
            />
          </div>

          <div className="single_field">
            <input
              type="password"
              placeholder="Confirm Password"
              name="conPass"
              onChange={HandleInputChange}
              value={formData.conPass}
            />
          </div>

          <div className="single_field">
            <input
              type="number"
              onChange={HandleInputChange}
              placeholder="Enter phone number"
              name="phone"
              value={formData.phone}
            />
          </div>

          <div className="single_field">
            <select
              name="isSeller"
              onChange={HandleInputChange}
              value={formData.isSeller}
            >
              <option value="" disabled>
                Would you like to be a seller?
              </option>
              <option value="true">Yes</option>
              <option value="false">No</option>
            </select>
          </div>

          <div className="single_field">
            <Button
              onClick={Validate}
              disabled={responseSentToServer}
              variant="contained"
            >
              Register Account
            </Button>
          </div>

          <div className="form_footer">
            <p>
              Already have an account? <Link to="/login">Log In</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Form;
