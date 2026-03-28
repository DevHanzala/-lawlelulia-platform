import { createContext, useContext, useEffect } from "react";
import useAuthStore from "../store/authStore";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const { isAuthenticated, logout, refreshUser, user, loading } = useAuthStore();

  useEffect(() => {
    // On app load: if session expired, logout silently
    if (!isAuthenticated()) {
      logout();
      return;
    }
    // Refresh user data from server
    refreshUser();
  }, []);

  return (
    <AuthContext.Provider value={{ user, loading, isAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => useContext(AuthContext);