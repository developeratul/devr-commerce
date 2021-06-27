import { Button } from "@material-ui/core";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import validator from "validator";
import callApi from "../../lib/callApi";

const Form = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    conPass: "",
    country: "",
    phone: "",
  });
  const [countryData, setCountryData] = useState([]);

  // for registering a user
  const registerUser = async () => {
    try {
      const api = await callApi("/get_auth/register", "POST", {
        "Content-Type": "application/json",
      });

      toast.dark(api.body.message);
    } catch (err) {
      console.log(err);
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
      allFields: name && email && password && conPass && country && phone,
      passwordMatched: password === conPass,
      emailOk: validator.isEmail(email),
    };
    const { passwordLength, passwordMatched, allFields, emailOk } = validation;

    if (!allFields) {
      toast.error("Please fill all the fields properly");
    } else if (!emailOk) {
      toast.error("Your email is invalid");
    } else if (!passwordLength) {
      toast.error("Password must have 8 chars");
    } else if (!passwordMatched) {
      toast.error("Password doesn't matched");
    } else if (passwordLength && allFields && passwordMatched && emailOk) {
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
            <Button onClick={Validate} variant="contained">
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
