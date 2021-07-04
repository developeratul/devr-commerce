import { useEffect } from "react";
import { useSelector } from "react-redux";
import config from "../config";
import NotFound from "./NotFound";

const Cart = () => {
  const { user, isAuthenticated } = useSelector((state) => state.authReducer);

  useEffect(() => {
    document.title = `${config.applicationName} / Cart`;
  }, []);

  return (
    <>
      {isAuthenticated ? (
        <div>
          <h1>{user.name}'s Cart</h1>
        </div>
      ) : (
        <NotFound />
      )}
    </>
  );
};

export default Cart;
