import { useSelector } from "react-redux";

// for getting the subtotal of all the cart items
const useCartSubtotal = () => {
  const { cart_items } = useSelector((state) => state.cartReducer);

  let subtotal = 0;

  for (let i = 0; i < cart_items.length; i++) {
    subtotal += cart_items[i].total_price;
  }

  return subtotal;
};

export default useCartSubtotal;
