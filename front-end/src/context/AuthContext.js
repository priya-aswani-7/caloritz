import React, { useState, createContext, useEffect } from "react";
import jwt from "jwt-decode";
import { tokenData } from "../constants";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(tokenData);
  const [userId, setUserId] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    if (token) {
      let decodedToken = jwt(token);
      setUserId(decodedToken.userId);
      setIsAdmin(decodedToken.type === "admin");
    } else {
      setUserId(null);
      setIsAdmin(false);
    }
  }, [token]);

  return (
    <AuthContext.Provider
      value={{
        token,
        userId,
        isAdmin,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
