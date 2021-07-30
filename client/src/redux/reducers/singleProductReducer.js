const product = {};

// this reducer will contain the product info of the product in the singleProduct page
const singleProductReducer = (state = product, action) => {
  switch (action.type) {
    // for getting the product info
    case "GET_PRODUCT": {
      return action.payload;
    }

    default: {
      return state;
    }
  }
};

export default singleProductReducer;
