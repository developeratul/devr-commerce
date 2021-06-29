import "../styles/Profile/Profile.css";
import { useState, useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import { toast } from "react-toastify";

// components
import InlineLoader from "../components/InlineLoader";
import ProfileSideBar from "../components/Profile/ProfileSideBar";
import ProfileContentAndTabs from "../components/Profile/ProfileContentAndTabs";

const Profile = () => {
  const [currentUser, setCurrentUser] = useState({});
  const [loading, setLoading] = useState(true);

  const { id } = useParams();
  const history = useHistory();

  // for fetching the data of the user according to the id
  async function fetchProfileInfo(abortController) {
    try {
      const res = await fetch(`/get_user/${id}`, {
        method: "GET",
        signal: abortController.signal,
        headers: {
          "Content-Type": "application/json",
        },
      });

      const body = await res.json();

      if (res.status === 201) {
        setLoading(false);
        setCurrentUser(body);
        document.title = `${body.name}'s Store`;
      } else if (res.status === 404) {
        history.push("/notFound");
        toast.error(body.message);
      }
    } catch (err) {
      if (err.message) {
        toast.error(err.message);
      } else {
        toast.error(err);
      }
    }
  }

  useEffect(() => {
    const abortController = new AbortController();

    fetchProfileInfo(abortController);
    document.title = "Loading...";

    return () => abortController.abort();
  }, []);

  return (
    <div className="profile_page">
      {loading ? (
        <div className="loading_container">
          <InlineLoader />
        </div>
      ) : (
        <div className="profile_content_container">
          <ProfileSideBar user={currentUser} />
          <ProfileContentAndTabs user={currentUser} />
        </div>
      )}
    </div>
  );
};

export default Profile;
