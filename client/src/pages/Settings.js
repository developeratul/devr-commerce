import "../styles/Settings/settings.css";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import UpdateAvatar from "../components/Settings/UpdateAvatar";
import UpdateOtherInfo from "../components/Settings/UpdateOtherInfo";
import config from "../config";

const Settings = () => {
  const { user } = useSelector((state) => state.authReducer);

  useEffect(() => {
    document.title = `${config.applicationName} / Settings`;
  }, []);

  return (
    <div className="settings_page">
      <UpdateAvatar user={user} />
      <UpdateOtherInfo user={user} />
    </div>
  );
};

export default Settings;
