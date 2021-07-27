import { useEffect, useState } from "react";
import { Button } from "@material-ui/core";
import { toast } from "react-toastify";
import validator from "validator";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { updateUser } from "../../../redux/actions/authActions";

const AccountSettings = ({ TabPanel, value, theme, user }) => {
  const [formData, setFormData] = useState({
    name: user.name,
    email: user.email,
    phone: user.phone,
    about: user.about,
    country: user.country,
    productCategory: user.productCategory,

    facebook: user.facebook,
    linkedIn: user.linkedIn,
    twitter: user.twitter,
    portfolio: user.portfolio,

    showEmail: user.showEmail && user.showEmail.toString(),
    showPhone: user.showPhone && user.showPhone.toString(),
  });
  const [countryData, setCountryData] = useState([]);

  const productCategoriesAvailable = useSelector(
    (state) => state.getProductCategories
  );

  const history = useHistory();
  const dispatch = useDispatch();

  const {
    name,
    email,
    phone,
    about,
    country,
    productCategory,
    showEmail,
    showPhone,
    facebook,
    linkedIn,
    twitter,
    portfolio,
  } = formData;

  function InputChange(event) {
    const { name, value } = event.target;

    setFormData((pre) => ({ ...pre, [name]: value }));
  }

  async function fetchCountryData() {
    const res = await fetch("https://restcountries.eu/rest/v2/all");
    const body = await res.json();

    setCountryData(body);
  }

  async function updateAccountInformation() {
    try {
      const res = await fetch("/get_user/update_account_information", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          country,
          productCategory,
          phone,
          showEmail,
          showPhone,
          about,
          facebook,
          linkedIn,
          twitter,
          portfolio,
        }),
      });

      const body = await res.json();

      if (res.status === 201) {
        dispatch(updateUser(body.user));
        history.push(`/profile/${user._id}`);
        toast.dark(body.message);
      }
    } catch (err) {
      console.log(err);
    }
  }

  // for validation input information's
  function Validate() {
    const validation = {
      nameLength: name.length <= 25,
      allFields: name && email && country && phone,
      emailOk: validator.isEmail(email),
      about_length: about.length <= 500,
    };
    const { nameLength, allFields, emailOk, about_length } = validation;

    if (!allFields) {
      toast.error("Please fill all the fields properly");
    } else if (!emailOk) {
      toast.error("Your email is invalid");
    } else if (!nameLength) {
      toast.error("Name length cannot be greater than 25");
    } else if (!about_length) {
      toast.error("About length can not have more than 500 chars");
    } else if (allFields && emailOk && nameLength && about_length) {
      updateAccountInformation(); // for registering a user in our database
    }
  }

  useEffect(() => {
    fetchCountryData();
  }, []);

  return (
    <div className="account_settings tab_panel_single_settings">
      <TabPanel value={value} index={0} dir={theme.direction}>
        <h2 className="title">Account Settings</h2>

        <div className="fields_container">
          <div className="single_field">
            <input
              type="text"
              onChange={InputChange}
              name="name"
              value={formData.name}
              placeholder="Update user name"
            />
          </div>

          <div className="single_field">
            <input
              type="email"
              onChange={InputChange}
              name="email"
              value={formData.email}
              placeholder="Update email"
            />
          </div>

          <div className="single_field">
            <input
              type="number"
              onChange={InputChange}
              name="phone"
              value={formData.phone}
              placeholder="Update phone"
            />
          </div>

          <div className="single_field">
            <select
              onChange={InputChange}
              name="country"
              value={formData.country}
            >
              <option value="" disabled>
                Update Country
              </option>
              {countryData.map((item, index) => (
                <option value={item.name} key={index}>
                  {item.name}
                </option>
              ))}
            </select>
          </div>

          <div className="single_field">
            <select
              onChange={InputChange}
              name="productCategory"
              value={formData.productCategory}
            >
              <option value="Not specified yet" disabled>
                Your Product Category
              </option>
              {productCategoriesAvailable.map((category, index) => {
                return (
                  <option value={category} key={index}>
                    {category}
                  </option>
                );
              })}
            </select>
          </div>

          <div className="single_field">
            <select
              name="showEmail"
              onChange={InputChange}
              value={formData.showEmail}
            >
              <option value="" disabled>
                Do you want to show email in your profile?
              </option>
              <option value="true">Yes</option>
              <option value="false">No</option>
            </select>
          </div>

          <div className="single_field">
            <select
              name="showPhone"
              onChange={InputChange}
              value={formData.showPhone}
            >
              <option value="" disabled>
                Do you want to show phone number in your profile?
              </option>
              <option value="true">Yes</option>
              <option value="false">No</option>
            </select>
          </div>

          <div className="single_field">
            <input
              type="text"
              onChange={InputChange}
              name="facebook"
              value={formData.facebook}
              placeholder="Your facebook URL"
            />
          </div>

          <div className="single_field">
            <input
              type="text"
              onChange={InputChange}
              name="linkedIn"
              value={formData.linkedIn}
              placeholder="Your linkedIn URL"
            />
          </div>

          <div className="single_field">
            <input
              type="text"
              onChange={InputChange}
              name="twitter"
              value={formData.twitter}
              placeholder="Your twitter URL"
            />
          </div>

          <div className="single_field">
            <input
              type="text"
              onChange={InputChange}
              name="portfolio"
              value={formData.portfolio}
              placeholder="Your portfolio URL"
            />
          </div>

          <div className="single_field">
            <textarea
              name="about"
              cols="30"
              rows="10"
              placeholder="Your intro / about"
              onChange={InputChange}
              name="about"
              value={formData.about}
            ></textarea>
          </div>

          <div className="single_field">
            <Button variant="contained" onClick={Validate}>
              Update Profile
            </Button>
          </div>
        </div>
      </TabPanel>
    </div>
  );
};

export default AccountSettings;
