import React, { createContext, useContext, useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [authToken, setAuthToken] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadToken = async () => {
      const token = await AsyncStorage.getItem("authToken");
      if (token) {
        setAuthToken(token);
      }
      setLoading(false);
    };
    loadToken();
  }, []);

  const login = async (token) => {
    setAuthToken(token);
    await AsyncStorage.setItem("authToken", token);
  };

  const logout = async () => {
    setAuthToken(null);
    await AsyncStorage.removeItem("authToken");
  };

  return (
    <AuthContext.Provider value={{ authToken, setAuthToken: login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);