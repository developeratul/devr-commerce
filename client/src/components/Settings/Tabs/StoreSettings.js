import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useHistory } from "react-router-dom";

import { Button, IconButton } from "@material-ui/core";
import DeleteOutlinedIcon from "@material-ui/icons/DeleteOutlined";

import { useDispatch } from "react-redux";
import { updateUser } from "../../../redux/actions/authActions";

// if the user is not a seller, he is unable to edit the store settings
// till he became a seller

const StoreSettings = ({ TabPanel, value, theme, user }) => {
  const [isSeller, setIsSeller] = useState(user.isSeller.toString());
  const [input, setInput] = useState({
    title: "",
    charge: "",
  });
  const [countrySelect, setCountrySelect] = useState([]);
  const [shippingOptions, setShippingOptions] = useState(
    user.shipping_options || []
  );

  const [countryApi, setCountryApi] = useState([]);

  const history = useHistory();
  const dispatch = useDispatch();

  // if the user is not a seller at first I will make him a seller
  // then he will be able to edit the other store settings
  async function MakeHimSeller() {
    try {
      const res = await fetch("/get_user/make_him_seller", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ isSeller }),
      });

      const body = await res.json();

      if (res.status === 200) {
        history.push(`/profile/${user._id}`);
        dispatch(updateUser(body.user));
        toast.dark(body.message);
      }
    } catch (err) {
      console.log(err);
    }
  }

  // for handling the text input fields
  function HandleInputChange(event) {
    const { name, value } = event.target;

    setInput((pre) => ({ ...pre, [name]: value }));
  }

  // for handling the multiple select field
  function HandleSelectChange(event) {
    const value = Array.from(
      event.target.selectedOptions,
      (option) => option.value
    );

    setCountrySelect(value);
  }

  // for pushing the current shipping option in the array
  // but not saving in the database yet
  function AddShippingOption() {
    if (input.title && input.charge && countrySelect.length > 0) {
      setShippingOptions([
        ...shippingOptions,
        {
          title: input.title,
          charge: input.charge,
          countries: countrySelect,
        },
      ]);

      setInput({ title: "", charge: "" });
      setCountrySelect([]);
    }
  }

  // * for saving current changes in the database
  async function SaveStoreInfo() {
    // checking if the shipping_options the user has just deleted are in use
    // if yes he is unable to save changes till he removed the options from the product
    let optionsAreInUse = true;

    for (let i = 0; i < user.products.length; i++) {}

    // try {
    //   const res = await fetch("/get_user/update_store_information", {
    //     method: "POST",
    //     headers: {
    //       "Content-Type": "application/json",
    //     },
    //     body: JSON.stringify({ shippingOptions }),
    //   });

    //   const body = await res.json();

    //   if (res.status === 200) {
    //     dispatch(updateUser(body.user));
    //     history.push(`/profile/${user._id}`);
    //     toast.dark(body.message);
    //   }
    // } catch (err) {
    //   console.log(err);
    // }
  }

  // for fetching country information from this api and add them in the select field
  async function fetchCountryApi() {
    const res = await fetch("https://restcountries.eu/rest/v2/all");
    const body = await res.json();
    setCountryApi(body);
  }

  useEffect(() => {
    fetchCountryApi();
  }, []);

  return (
    <div className="account_settings tab_panel_single_settings">
      <TabPanel value={value} index={2} dir={theme.direction}>
        <h2 className="title">Store Settings</h2>

        <div className="fields_container">
          {
            // if the user is a seller he is able to edit the store settings
            user.isSeller ? (
              <>
                <div className="add_shipping_option_section">
                  <h2>Add Shipping Options</h2>

                  <div className="single_field">
                    <input
                      type="text"
                      name="title"
                      value={input.title}
                      onChange={HandleInputChange}
                      placeholder="Shipping option title"
                    />
                  </div>

                  <div className="single_field">
                    <input
                      type="number"
                      name="charge"
                      value={input.charge}
                      onChange={HandleInputChange}
                      placeholder="Shipping Charge"
                    />
                  </div>

                  <div className="single_field">
                    <select
                      value={countrySelect}
                      onChange={HandleSelectChange}
                      multiple
                    >
                      <option value="" disabled>
                        Select Shipping Countries
                      </option>

                      {countryApi.map((item, index) => {
                        return (
                          <option key={index} value={item.name}>
                            {item.name}
                          </option>
                        );
                      })}
                    </select>
                  </div>

                  <div className="single_field">
                    <Button onClick={AddShippingOption} variant="contained">
                      Add Shipping Option
                    </Button>
                  </div>

                  <div className="previous_options">
                    {shippingOptions.length > 0 ? (
                      shippingOptions.map((option, index) => {
                        return (
                          <div className="single_shipping_option" key={index}>
                            <h1>{option.title}</h1>
                            <p>{option.charge} $</p>
                            <p>
                              Available countries:{" "}
                              {option.countries.map((country, index) => {
                                return <span key={index}>{country}</span>;
                              })}
                            </p>

                            <div className="actions">
                              <IconButton
                                onClick={() =>
                                  setShippingOptions((pre) =>
                                    pre.filter(
                                      (option, itemIndex) => itemIndex !== index
                                    )
                                  )
                                }
                              >
                                <DeleteOutlinedIcon />
                              </IconButton>
                            </div>
                          </div>
                        );
                      })
                    ) : (
                      <div className="no_message">
                        <h2>No Shipping Options</h2>
                      </div>
                    )}
                  </div>
                </div>

                <div className="single_field">
                  <Button variant="contained" onClick={SaveStoreInfo}>
                    Save Changes
                  </Button>
                </div>
              </>
            ) : (
              // if the user is not a seller, he is unable to see the other settings
              <div className="not_a_seller_view">
                <h2>Looks like you are not a seller</h2>

                <div className="single_field">
                  <select
                    value={isSeller}
                    onChange={(event) => setIsSeller(event.target.value)}
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
                    variant="contained"
                    onClick={MakeHimSeller}
                    disabled={!isSeller}
                  >
                    Save Changes
                  </Button>
                </div>
              </div>
            )
          }
        </div>
      </TabPanel>
    </div>
  );
};

export default StoreSettings;
