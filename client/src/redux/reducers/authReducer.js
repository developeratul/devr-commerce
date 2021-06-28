const initialState = {
  isAuthenticated: false,
  user: {},
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case "LOGIN_USER":
      const payload = action.payload;

      return {
        isAuthenticated: true,
        user: payload,
      };

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
