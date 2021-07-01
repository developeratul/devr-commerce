const logInUser = (user) => ({ type: "LOGIN_USER", payload: user });
const logOutUser = () => ({ type: "LOG_OUT" });

const updateUser = (payload) => ({ type: "UPDATE_USER", payload });

export { logInUser, logOutUser, updateUser };
