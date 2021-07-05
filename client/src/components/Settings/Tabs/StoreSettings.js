import { useState } from "react";
import { toast } from "react-toastify";
import { useHistory } from "react-router-dom";

import { Button } from "@material-ui/core";

import { useDispatch } from "react-redux";
import { updateUser } from "../../../redux/actions/authActions";

// if the user is not a seller, he is unable to edit the store settings
// till he became a seller

const StoreSettings = ({ TabPanel, value, theme, user }) => {
  const [isSeller, setIsSeller] = useState("");
  const [input, setInput] = useState({});
  const history = useHistory();
  const dispatch = useDispatch();

  // if the user is not a seller at first I will make him a seller
  // then he will be able to edit the other store settings
  async function MakeHimSeller() {
    try {
      const res = await fetch("/get_user/update_store_information", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ type: "make_him_seller", isSeller }),
      });

      const body = await res.json();

      if (res.status === 201) {
        history.push(`/profile/${user._id}`);
        dispatch(updateUser(body.user));
        toast.dark(body.message);
      }
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <div className="account_settings tab_panel_single_settings">
      <TabPanel value={value} index={2} dir={theme.direction}>
        <h2 className="title">Store Settings</h2>

        <div className="fields_container">
          {
            // if the user is a seller he is able to edit the store settings
            user.isSeller ? (
              <h1>Hi</h1>
            ) : (
              // if the user is not a seller, he is unable to see the other settings
              <div className="not_a_seller_view">
                <h2>Looks like you are not a seller</h2>

                <div className="single_field">
                  <select
                    value={isSeller || user.isSeller.toString()}
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
