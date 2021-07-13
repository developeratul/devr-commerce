const addToCart = (payload) => ({ type: "ADD_TO_CART", payload });
const removeFromCart = (payload) => ({ type: "REMOVE_FROM_CART", payload });

const getPreviousCartItems = (payload) => ({
  type: "GET_PREVIOUS_CART_ITEMS",
  payload,
});

export { addToCart, removeFromCart, getPreviousCartItems };
