"use client";
import React, { createContext, useEffect, useState } from 'react';
import userAPI from "../API/user.api"

export const Context = createContext();

export const ContextProvider = ({ children }) => {
  const [search, setSearch] = useState("");
  const [currentUser, setCurrentUser] = useState(null);
  const [isAuth, setIsAuth] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      fetchUser(token);
    }
  }, []);

  const fetchUser = async (token) => {
    userAPI.getUser(token)
    .then(response => {
      console.log('response:', response);
        if (!response.auth) {
          setIsAuth(false);
          return;
        }
        setCurrentUser(response.user);
        setIsAuth(true);
    })
    .catch(error => {
      console.log(error);
    });
  };

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