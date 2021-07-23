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
    country: "",
    phone: "",
    isSeller: "",
  });
  const [responseSentToServer, setResponseSentToServer] = useState(false);
  const [countryData, setCountryData] = useState([]);
  const history = useHistory();
  const dispatch = useDispatch();

  // for registering a user
  const registerUser = async () => {
    setResponseSentToServer(true);

    const { name, email, country, phone, password, isSeller } = formData;

    try {
      const res = await fetch("/get_auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          credentials: "include",
        },
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
      console.log(err);

      if (err.message) {
        toast.error(err.message);
      } else {
        toast.error(err);
      }
    }
  };

  // for handling the input fields
  function HandleInputChange(event) {
    const { name, value } = event.target;

    setFormData((pre) => ({ ...pre, [name]: value }));
  }

  // for validation input information's
  function Validate() {
    const { name, email, password, conPass, country, phone } = formData;
    const validation = {
      passwordLength: password.length >= 8,
      nameLength: name.length <= 25,
      allFields: name && email && password && conPass && country && phone,
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

  // for fetching the data of countries
  const fetchCountryData = async () => {
    try {
      const res = await fetch("https://restcountries.eu/rest/v2/all");
      const data = await res.json();

      if (res.status === 200) {
        setCountryData(data);
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchCountryData();
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
            <select
              name="country"
              onChange={HandleInputChange}
              value={formData.country}
            >
              <option disabled value="">
                Select Country
              </option>

              {countryData.map((country, index) => {
                return (
                  <option key={index} value={country.name}>
                    {country.name}
                  </option>
                );
              })}
            </select>
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
