"use client";
import React, { createContext, useEffect, useState } from 'react';

export const Context = createContext();

export const ContextProvider = ({ children }) => {
  const [search, setSearch] = useState("");
  const [currentUser, setCurrentUser] = useState(null);
  const [isAuth, setIsAuth] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setIsAuth(true);
    }
  }, []);

  return (
    <Context.Provider value={{ 
        search, 
        setSearch,
        isAuth,
        setIsAuth, 
      }}>
      {children}
    </Context.Provider>
  );
};

export default ContextProvider;