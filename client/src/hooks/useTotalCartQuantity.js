import { useSelector } from "react-redux";

// for getting the total quantity of the cart items
const useTotalCartQuantity = () => {
  const { cart_items } = useSelector((state) => state.cartReducer);

  let total = 0;

  for (let i = 0; i < cart_items.length; i++) {
    total += cart_items[i].quantity;
  }

  return total;
};

export default useTotalCartQuantity;
