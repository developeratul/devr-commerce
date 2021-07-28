import { Avatar, Button } from "@material-ui/core";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

// hooks
import useLogout from "../../../hooks/useLogout";

const AuthHeader = () => {
  const { user } = useSelector((state) => state.authReducer);

  // the logout function
  const LogOut = useLogout();

  return (
    <div className="auth_header">
      <div className="auth_info_container">
        <div className="image_container">
          <Avatar src={user.photoUrl} alt={user.name + "'s profile Avatar"} />
        </div>

        <div className="desc_container">
          <h2>
            You are authenticated as <span>{user.name}</span>
          </h2>
        </div>
      </div>

      <div className="options_container">
        <div className="single_option">
          <Button
            component={Link}
            to={`/profile/${user._id}`}
            variant="contained"
          >
            View Profile
          </Button>
        </div>
        <div className="single_option">
          <Button variant="contained" onClick={LogOut}>
            Log Out
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AuthHeader;
