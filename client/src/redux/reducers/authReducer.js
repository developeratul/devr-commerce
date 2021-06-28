const initialState = {
  isAuthenticated: false,
  user: {},
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    // * for logging in
    case "LOGIN_USER":
      const user = action.payload;

      return {
        isAuthenticated: true,
        user,
      };

    // * for logging out
    case "LOG_OUT":
      return {
        isAuthenticated: false,
        user: {},
      };

    default: {
      return state;
    }
  }
};

export default authReducer;
