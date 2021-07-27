import { Avatar, Button } from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import { toast } from "react-toastify";
import { logOutUser } from "../../../redux/actions/authActions";

const AuthHeader = () => {
  const { user } = useSelector((state) => state.authReducer);
  const dispatch = useDispatch();
  const history = useHistory();

  async function LogOut() {
    try {
      const res = await fetch("/get_auth/logout", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          credentials: "include",
        },
      });

      const body = await res.json();

      if (res.status === 200) {
        dispatch(logOutUser());
        history.push("/login");
        toast.dark(body.message);
      }
    } catch (err) {}
  }

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
