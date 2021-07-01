import "../styles/Settings/settings.css";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import UpdateAvatar from "../components/Settings/UpdateAvatar";
import UpdateOtherInfo from "../components/Settings/UpdateOtherInfo";
import config from "../config";

const Settings = () => {
  const { user, isAuthenticated, isLoading } = useSelector(
    (state) => state.authReducer
  );
  const history = useHistory();

  useEffect(() => {
    // if our data is loaded and server request is done,
    // but if the user is still not authenticated, then
    // I want to redirect the user to the 404 page
    if (!isLoading) {
      if (!isAuthenticated) {
        history.push("/notFound");
      }
    }

    document.title = `${config.applicationName} / Settings`;
  }, [isLoading]);

  return (
    <div className="settings_page">
      <UpdateAvatar user={user} />
      <UpdateOtherInfo user={user} />
    </div>
  );
};

export default Settings;
