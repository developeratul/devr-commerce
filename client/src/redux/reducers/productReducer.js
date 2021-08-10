// this reducer is being used to control the product informations in the product page
const initialState = {
  products: [],
  isLoading: true,
};

function productReducer(state = initialState, action) {
  switch (action.type) {
    case "GET_PRODUCTS": {
      return {
        isLoading: false,
        products: action.payload,
      };
    }
    default: {
      return state;
    }
  }
}

export default productReducer;
