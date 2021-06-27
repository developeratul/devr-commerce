import { useEffect } from "react";
import Form from "../components/Register/Form";
import Rules from "../components/Register/Rules";
import "../styles/Register/register.css";

const Register = () => {
  useEffect(() => {
    document.title = "DevR Commerce / Register Account";
  }, []);

  return (
    <div className="register_page">
      <Rules /> {/* Registration rules section */}
      <Form /> {/* Registration form section */}
    </div>
  );
};

export default Register;
