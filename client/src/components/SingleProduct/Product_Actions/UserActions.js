import { IconButton } from "@material-ui/core";
import ShoppingCartOutlinedIcon from "@material-ui/icons/ShoppingCartOutlined";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { toast } from "react-toastify";
import DoneIcon from "@material-ui/icons/Done";
import { useEffect, useState } from "react";

import { addToCart } from "../../../redux/actions/cartActions";

const UserActions = ({ product }) => {
  const [canBeShipped, setCanBeShipped] = useState(true);
  const { isAuthenticated, user } = useSelector((state) => state.authReducer);
  const { cart_items } = useSelector((state) => state.cartReducer);
  const dispatch = useDispatch();
  const history = useHistory();

  const existsInCart = cart_items.find((item) => item._id === product._id)
    ? true
    : false;

  // * for checking if the product can be shipped in the users country
  // * who wants to purchase this product
  function checkAvailabilityInUsersCountry() {
    // putting all the countries from the shipping_options in an array
    const temp = [];
    for (let i = 0; i < product.shipping_options.length; i++) {
      temp.push(product.shipping_options[i].countries);
    }
    const shippingCountries = temp.join().split(",");

    // checking if the product can be shipped in the users country
    setCanBeShipped(shippingCountries.includes(user.country));
  }

  useEffect(() => {
    checkAvailabilityInUsersCountry();
  }, []);

  return (
    <div className="user_actions actions">
      <div className="single_action">
        {!existsInCart ? (
          <IconButton
            onClick={() => {
              if (isAuthenticated) {
                if (!canBeShipped) {
                  toast.error("This product cannot be shipped in your country");
                } else {
                  dispatch(addToCart(product));
                }
              } else {
                history.push("/login");
                toast.info("Please login to perform this action");
              }
            }}
          >
            <ShoppingCartOutlinedIcon />
          </IconButton>
        ) : (
          <IconButton disabled>
            <DoneIcon />
          </IconButton>
        )}
      </div>
    </div>
  );
};

export default UserActions;
