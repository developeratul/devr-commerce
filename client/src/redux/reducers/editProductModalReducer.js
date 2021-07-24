// This reducer is for controlling the Edit product modal
// which will be rendered conditionally
// I know this not the best or the write way to do that. But I just found that way

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
