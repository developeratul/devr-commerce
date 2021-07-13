const initialState = {
  isAuthenticated: false,
  user: {},
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    // * for logging in
    case "LOGIN_USER":
      const user = action.payload;

      return { isAuthenticated: true, user };

    // * for logging out
    case "LOG_OUT":
      return { isAuthenticated: false, user: {} };

    // * for updating the user information's
    // this action is called when the updated any information about him
    // using the settings
    case "UPDATE_USER":
      return { isAuthenticated: true, user: action.payload };

    default: {
      return state;
    }
  }
};

export default authReducer;
