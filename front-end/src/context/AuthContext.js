import React, { useState, createContext, useEffect } from "react";
import jwt from "jwt-decode";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2MjgxMTgxYWY3MDAwNDMxM2UxMDAzZWYiLCJlbWFpbCI6ImNhdEBnbWFpbC5jb20iLCJ0eXBlIjoiYWRtaW4iLCJpYXQiOjE2NTI2Mjc0ODIsImV4cCI6MTY1MzIzMjI4Mn0.89GctRUPKLJ7QyX5ryPqZT1vtw1IMyISPiu5XhW-5N8"
  );
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
