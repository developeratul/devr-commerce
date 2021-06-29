import { useEffect } from "react";
import "../styles/Register/register.css";
import config from "../config";

import Form from "../components/Register/Form";
import Rules from "../components/Register/Rules";

const Register = () => {
  useEffect(() => {
    document.title = `${config.applicationName} / Register Account`;
  }, []);

  return (
    <div className="register_page">
      <Rules /> {/* Registration rules section */}
      <Form /> {/* Registration form section */}
    </div>
  );
};

export default Register;
