import { Link } from "react-router-dom";
import { Button } from "@material-ui/core";
import HeaderImg from "../../../assets/svg/header.svg";

const Header = () => {
  return (
    <div className="home_header">
      <div className="container">
        <div className="header_content_wrapper">
          <div className="header_desc">
            <h1>DevR Commerce</h1>
            <p>
              An E-Commerce platform for worldwide seller and buyers. Where
              people can run their bussiness. Get started for free.
            </p>

            <Button variant="contained" component={Link} to="/register">
              Get Started
            </Button>
          </div>

          <div className="header_img">
            <img src={HeaderImg} alt="Header Image" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
