import React from "react";
import { createContext, useContext, useState, useEffect } from "react";

export const userContext = createContext();

export const useUser = () => useContext(userContext);

export const UserProvider = ({ children }) => {
  const [userData, setUserData] = useState(() => {
    const localData = localStorage.getItem("userDataEcomm")
    return localData ? JSON.parse(localData) : null;
  });
 

  useEffect(() => {
    localStorage.setItem("userDataEcomm", JSON.stringify(userData));
  }, [userData]);

  const updateUser = (data) => {
    setUserData((prevState) => ({
      ...prevState,
      ...data,
    }));
  };

  const logout = () => {
    localStorage.removeItem("userDataEcomm");
  };

  return (
    <userContext.Provider value={{ userData, updateUser, logout }}>
      {children}
    </userContext.Provider>
  );
};
