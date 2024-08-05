import React, { createContext, useState, useContext, useEffect } from 'react';
import { fetchUser } from '../libs/apis/auth-api';

// Create the context
const UserContext = createContext();

// Create a provider component
export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const getUser = async () => {
      try {
        const userData = await fetchUser();
        setUser(userData);
      } catch (error) {
        setUser(null);
      }
    };

    getUser();
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

// Create a custom hook for easy access to the context
export const useUser = () => useContext(UserContext);
