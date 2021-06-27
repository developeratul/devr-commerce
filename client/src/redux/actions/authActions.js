const logInUser = (user) => ({ type: "LOGIN_USER", payload: user });
const logOutUser = () => ({ type: "LOG_OUT" });

export { logInUser, logOutUser };
