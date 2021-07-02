import { useEffect } from "react";
import { useSelector } from "react-redux";
import config from "../config";

const Cart = () => {
  const { user, isAuthenticated, isLoading } = useSelector(
    (state) => state.authReducer
  );

  useEffect(() => {
    document.title = `${config.applicationName} / Cart`;
  }, [isLoading]);

  return (
    <div>
      <h1>{user.name}'s Cart</h1>
    </div>
  );
};

export default Cart;
