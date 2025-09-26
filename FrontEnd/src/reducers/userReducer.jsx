const UserReducer = (state, action) => {
  switch (action.type) {
    case "Set User":
      return { ...state, ...action.payload };
    case "Get current user":
      try {
        const user = JSON.parse(localStorage.getItem("currentUser"));

        return user;
      } catch (e) {
        console.log(`user not found, error: ${e}`);
      }
      break;

    case "Log Out":
      localStorage.removeItem("currentUser");
      return { ...state, ...{} };

    default:
      return state;
  }
};

export default UserReducer;
