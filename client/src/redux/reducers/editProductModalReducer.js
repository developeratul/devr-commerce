const initialState = {
  modalShouldRender: false,
  product: {},
};

const editProductModalReducer = (state = initialState, action) => {
  switch (action.type) {
    // for opening the modal
    case "OPEN_MODAL": {
      return { modalShouldRender: true, product: action.payload };
    }

    // for closing the modal
    case "CLOSE_MODAL": {
      return { modalShouldRender: false, product: {} };
    }

    default:
      return state;
  }
};

export default editProductModalReducer;
