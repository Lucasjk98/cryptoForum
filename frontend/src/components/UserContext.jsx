import React, { createContext, useContext, useState } from 'react';

export const UserContext = createContext();

// eslint-disable-next-line react/prop-types
export function UserProvider({ children }) {
  const [user, setUser] = useState(null);

  const updateUser = (newUser) => {
    setUser(newUser);
  };

  return (
    // eslint-disable-next-line react/jsx-no-constructed-context-values
    <UserContext.Provider value={{ user, updateUser }}>
      {children}
    </UserContext.Provider>
  );
}

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};
