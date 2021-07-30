const user = {};

// this reducer will contain the product info of the product in the profile page
const profileReducer = (state = user, action) => {
  switch (action.type) {
    case "GET_PROFILE": {
      return action.payload;
    }

    default: {
      return state;
    }
  }
};

export default profileReducer;
