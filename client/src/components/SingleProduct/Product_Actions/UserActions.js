import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { toast } from "react-toastify";

import { IconButton } from "@material-ui/core";
// icons
import ShoppingCartOutlinedIcon from "@material-ui/icons/ShoppingCartOutlined";
import DoneIcon from "@material-ui/icons/Done";
// hooks
import useProductCanBeShipped from "../../../hooks/useProductCanBeShipped";
// actions
import { addToCart } from "../../../redux/actions/cartActions";

const UserActions = () => {
  const product = useSelector((state) => state.singleProductReducer);
  const { canBeShipped } = useProductCanBeShipped(product);
  const { isAuthenticated } = useSelector((state) => state.authReducer);
  const { cart_items } = useSelector((state) => state.cartReducer);
  const dispatch = useDispatch();
  const history = useHistory();

  const existsInCart = cart_items.find((item) => item._id === product._id)
    ? true
    : false;

  // * for adding an item into cart
  const addIntoShoppingCart = () => {
    // if the user is not authenticated, he is unable to perform this action
    if (isAuthenticated) {
      // if product is out of stock the user is unable to perform this action
      if (product.max_quantity > 0) {
        // if the product can not be shipped in the user's country he is unable to perform this action
        if (!canBeShipped) {
          toast.error("This product cannot be shipped in your country");
        } else {
          dispatch(addToCart(product));
        }
      } else {
        toast.error("Out of stock");
      }
    } else {
      history.push("/login");
      toast.info("Please login to perform this action");
    }
  };

  return (
    <div className="user_actions actions">
      <div className="single_action">
        {!existsInCart ? (
          <IconButton onClick={addIntoShoppingCart}>
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
