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

// to state who will contain all the cart items
const initialState = {
  responseEnded: false,
  cart_items: [],
};

const cartReducer = (state = initialState, action) => {
  switch (action.type) {
    // * for adding a item into cart
    case "ADD_TO_CART": {
      const payload = action.payload;

      let doesItemExist = false;

      const newState = state.cart_items.map((item) => {
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
        return { responseEnded: true, cart_items: newState };
      }

      // if the item doesn't exists I am just adding a new cart item
      // and putting a quantity and total price property in each object
      const new_cart_items = [
        ...state.cart_items,
        { ...payload, quantity: 1, total_price: payload.price },
      ];

      updateCartInDB(new_cart_items);

      return { responseEnded: true, cart_items: new_cart_items };
    }

    // * for changing the quantity of a cart item
    case "CHANGE_QUANTITY": {
      const cartItem = action.cartItem;
      const quantity = action.quantity;

      const cart_items = state.cart_items.map((item) => {
        if (item._id === cartItem._id) {
          item.quantity = quantity;
          item.total_price = item.quantity * item.price;
        }

        return item;
      });

      updateCartInDB(cart_items);
      return { responseEnded: true, cart_items };
    }

    // * for removing an item
    case "REMOVE_ITEM": {
      const cartItem = action.cartItem;

      const cart_items = state.cart_items.filter(
        (item) => item._id !== cartItem._id
      );

      updateCartInDB(cart_items);

      return { responseEnded: true, cart_items };
    }

    // * for getting the previous cart items from DB
    case "GET_PREVIOUS_CART_ITEMS": {
      return {
        responseEnded: true,
        cart_items: action.payload,
      };
    }

    case "EMPTY_CART": {
      updateCartInDB([]);
      return { responseEnded: true, cart_items: [] };
    }

    default:
      return state;
  }
};

export default cartReducer;
