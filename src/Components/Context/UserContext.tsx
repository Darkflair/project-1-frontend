import React, { createContext, ReactNode, useContext, useState } from 'react';

export const UserContext = createContext<{
  user: { id: number; username: string; role: string; isAuthenticated: boolean };
  login: (id: number, username: string, role: string) => void;
  logout: () => void;
} | null>(null);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState({ id: 0, username: "", role: "", isAuthenticated: false });

  const login = (id: number, username: string, role: string) => {
    setUser({ id, username, role, isAuthenticated: true });
    console.log("Logged in:", username);
  };

  const logout = () => {
    setUser({ id: 0, username: "", role: "", isAuthenticated: false });
    console.log("Logged out");
  };

  return (
    <UserContext.Provider value={{ user, login, logout }}>
      {children}
    </UserContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useAuth must be used within a UserContext.Provider");
  }
  return context;
};
