const initialState = {
  isAuthenticated: false,
  user: {},
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case "LOGIN_USER": {
    }
    case "LOG_OUT": {
    }
    default: {
      return state;
    }
  }
};

export default authReducer;
