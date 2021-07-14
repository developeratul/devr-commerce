// for adding a single item in the cart
const addToCart = (payload) => ({ type: "ADD_TO_CART", payload });
// for changing the cart quantity
const changeQuantity = (cartItem, quantity) => ({
  type: "CHANGE_QUANTITY",
  cartItem,
  quantity,
});
// for removing a single item from the cart
const removeItem = (cartItem) => ({ type: "REMOVE_ITEM", cartItem });
// for removing all the items in the cart
const emptyCart = () => ({ type: "EMPTY_CART" });

// for putting all the previous cart items which was previously added in the cart by the authenticated user
const getPreviousCartItems = (payload) => ({
  type: "GET_PREVIOUS_CART_ITEMS",
  payload,
});

export {
  addToCart,
  getPreviousCartItems,
  emptyCart,
  changeQuantity,
  removeItem,
};
