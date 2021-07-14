const addToCart = (payload) => ({ type: "ADD_TO_CART", payload });
const changeQuantity = (cartItem, quantity) => ({
  type: "CHANGE_QUANTITY",
  cartItem,
  quantity,
});
const removeItem = (cartItem) => ({ type: "REMOVE_ITEM", cartItem });
const emptyCart = () => ({ type: "EMPTY_CART" });

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
