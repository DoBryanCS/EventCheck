import { createContext, useEffect, useReducer } from "react";
import AuthReducer from "./AuthReducer";

// Set initial state for the authentication context
const INITIAL_STATE = {
  currentUser: JSON.parse(localStorage.getItem("user")) || null,
};

// Create the authentication context object
export const AuthContext = createContext(INITIAL_STATE);

// Create the authentication context provider
export const AuthContextProvider = ({ children }) => {
  // Use the AuthReducer function to manage state changes
  const [state, dispatch] = useReducer(AuthReducer, INITIAL_STATE);

  // Update localStorage whenever the currentUser value changes
  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(state.currentUser));
  }, [state.currentUser]);

  // Provide the authentication state to the rest of the application
  return (
    <AuthContext.Provider value={{ currentUser: state.currentUser, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
};
