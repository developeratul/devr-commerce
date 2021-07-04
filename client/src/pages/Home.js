import "../styles/Home/home.css";
import { useSelector } from "react-redux";
import { useEffect } from "react";

// components
import AuthUserView from "../components/Home/AuthUser/AuthUserView";
import NotAuthUserView from "../components/Home/NoAuth/NotAuthUserView";

const Home = () => {
  const userInfo = useSelector((state) => state.authReducer);
  const { user, isAuthenticated } = userInfo;

  useEffect(() => {
    document.title = "DevR Commerce / Home";
  }, []);

  return (
    <div className="home_page">
      {!isAuthenticated ? <NotAuthUserView /> : <AuthUserView user={user} />}
    </div>
  );
};

export default Home;
