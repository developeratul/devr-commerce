import { useState } from "react";
import { Button } from "@material-ui/core";
import { toast } from "react-toastify";
import bcrypt from "bcryptjs";
import { useHistory } from "react-router-dom";

import { useDispatch } from "react-redux";
import { updateUser } from "../../../redux/actions/authActions";

const SecuritySettings = ({ TabPanel, value, theme, user }) => {
  const [formData, setFormData] = useState({
    oldPass: "",
    newPass: "",
    conPass: "",
  });
  const { oldPass, newPass, conPass } = formData;
  const dispatch = useDispatch();
  const history = useHistory();

  function InputChange(event) {
    const { name, value } = event.target;

    setFormData((pre) => ({ ...pre, [name]: value }));
  }

  // for updating the user in the database
  async function updatePassword() {
    try {
      const res = await fetch("/get_user/update_security_information", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ password: newPass }),
      });

      const body = await res.json();

      if (res.status === 201) {
        dispatch(updateUser(body.user));
        history.push(`/profile/${user._id}`);
        toast.dark(body.message);
      }
    } catch (error) {
      console.log(error);
    }
  }

  // for validating the input information's
  async function Validate() {
    const validation = {
      passwordOk: await bcrypt.compare(oldPass, user.password),
      passwordLength: newPass.length >= 8,
      passwordMatch: newPass === conPass,
    };
    const { passwordOk, passwordLength, passwordMatch } = validation;

    if (!passwordOk) {
      toast.error("Invalid password");
    } else if (!passwordLength) {
      toast.error("Password length must be greater than 8 chars");
    } else if (!passwordMatch) {
      toast.error("Please confirm your new password correctly");
    } else if (passwordOk && passwordLength && passwordMatch) {
      updatePassword();
    }
  }

  return (
    <div className="account_settings tab_panel_single_settings">
      <TabPanel value={value} index={1} dir={theme.direction}>
        <h2 className="title">Security Settings</h2>

        <div className="fields_container">
          <div className="single_field">
            <input
              type="password"
              onChange={InputChange}
              name="oldPass"
              value={formData.oldPass}
              placeholder="Enter old password"
            />
          </div>

          <div className="single_field">
            <input
              type="password"
              onChange={InputChange}
              name="newPass"
              value={formData.newPass}
              placeholder="Enter new password"
            />
          </div>

          <div className="single_field">
            <input
              type="password"
              onChange={InputChange}
              name="conPass"
              value={formData.conPass}
              placeholder="Confirm Password"
            />
          </div>

          <div className="single_field">
            <Button variant="contained" onClick={Validate}>
              Update Password
            </Button>
          </div>
        </div>
      </TabPanel>
    </div>
  );
};

export default SecuritySettings;
