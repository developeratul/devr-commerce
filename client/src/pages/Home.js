import "../styles/Home/home.css";
import { useSelector } from "react-redux";
import { useEffect } from "react";

// components
import AuthUserView from "../components/Home/AuthUser/AuthUserView";
import NotAuthUserView from "../components/Home/NoAuth/NotAuthUserView";

const Home = () => {
  const { user, isAuthenticated } = useSelector((state) => state.authReducer);

  useEffect(() => {
    document.title = isAuthenticated
      ? `${user.name}'s Dashboard`
      : "DevR Commerce / Home";
  }, [isAuthenticated]);

  return (
    <div className="home_page">
      {!isAuthenticated ? <NotAuthUserView /> : <AuthUserView user={user} />}
    </div>
  );
};

export default Home;
