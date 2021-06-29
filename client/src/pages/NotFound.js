import { Link } from "react-router-dom";
import { Button } from "@material-ui/core";
import notFoundImg from "../assets/img/not_found.png";
import { useEffect } from "react";
import config from "../config";

const NotFound = () => {
  useEffect(() => {
    document.title = `${config.applicationName} / Not Found`;
  }, []);

  return (
    <div className="not_found_page">
      <div className="container">
        <div className="not_found_content">
          <div className="not_found_img">
            <img src={notFoundImg} alt="Not Found illustration / icon" />
          </div>

          <div className="not_found_desc">
            <h2>404 Not Found</h2>
            <p>Your requested url was not found</p>
            <Link to="/">
              <Button>Go to Home</Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
