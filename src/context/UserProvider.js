import React, { useState } from "react";

export const UserContext = React.createContext();

function UserProvider({ children }) {
  const [user, setUser] = useState(null);
  const login = (user) => {
    setUser(user);
  };
  const logout = () => {
      setUser(null);
  }
  const value = {
    user,
    login,
    logout,
  };
  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
}

export default UserProvider;
