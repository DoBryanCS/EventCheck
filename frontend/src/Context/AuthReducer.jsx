// Reducer function to manage authentication state changes
const AuthReducer = (state, action) => {
  switch (action.type) {
    case "LOGIN": {
      // When the LOGIN action is dispatched, set currentUser to the action payload
      return {
        currentUser: action.payload,
      };
    }
    case "LOGOUT": {
      // When the LOGOUT action is dispatched, set currentUser to null
      return {
        currentUser: null,
      };
    }
    default:
      // If no matching action type is found, return the current state
      return state;
  }
};

export default AuthReducer;
