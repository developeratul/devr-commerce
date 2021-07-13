// for updating the user cart in DB
async function updateCartInDB(items) {
  try {
    await fetch("/get_cart/update_cart", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ items }),
    });
  } catch (err) {
    console.log(err);
  }
}

const initialState = [];

const cartReducer = (state = initialState, action) => {
  switch (action.type) {
    // * for adding a item into cart
    case "ADD_TO_CART": {
      const payload = action.payload;

      let doesItemExist = false;

      const newState = state.map((item) => {
        // if the item already exists
        if (item._id === payload._id) {
          // changing the value of the item's price and quantity
          item.quantity++;
          item.total_price = item.price * item.quantity;
          doesItemExist = true;
        }

        return item;
      });

      if (doesItemExist) {
        updateCartInDB(newState);
        return newState;
      }

      // if the item doesn't exists I am just adding a new cart item
      // and putting a quantity and total price property in each object
      const newCart = [
        ...state,
        { ...payload, quantity: 1, total_price: payload.price },
      ];

      updateCartInDB(newCart);

      return newCart;
    }

    // * for getting the previous cart items from DB
    case "GET_PREVIOUS_CART_ITEMS": {
      return action.payload;
    }

    default:
      return state;
  }
};

export default cartReducer;
