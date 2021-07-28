import { useEffect } from "react";
import ErrorImage from "../assets/img/not_found.png";

const ServerError = () => {
  useEffect(() => {
    document.title = "500 Server Error";
  }, []);

  return (
    <div className="server_error">
      <div className="image">
        <img src={ErrorImage} alt="Server error illustration" />
      </div>

      <div className="desc">
        <h2>500 server error</h2>
        <p>
          We are having unexpected server side problems. Please come back later.
        </p>
      </div>
    </div>
  );
};

export default ServerError;
