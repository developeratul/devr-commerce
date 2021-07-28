import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { toast } from "react-toastify";
import { logOutUser } from "../redux/actions/authActions";

// the log out function over the whole app
const useLogout = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  // the function for logging out
  async function logout() {
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

  return logout;
};

export default useLogout;
