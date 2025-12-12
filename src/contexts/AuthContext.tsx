import React, { createContext, useContext, useState, ReactNode } from 'react';
import { USERS } from '@/data/mockData';

type User = typeof USERS[0] | null;

interface AuthContextType {
  user: User;
  login: (role: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User>(null);

  const login = (role: string) => {
    // Mock login logic
    const foundUser = USERS.find(u => u.role === role);
    if (foundUser) setUser(foundUser);
  };

  const logout = () => setUser(null);

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within an AuthProvider');
  return context;
};
