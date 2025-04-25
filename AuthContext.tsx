import React, { createContext, useContext, useState, ReactNode } from 'react';
import { User } from '../types';

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  
  const login = async (email: string, password: string) => {
    // In a real app, this would make an API call to authenticate
    // For demo purposes, we'll simulate a successful login
    return new Promise<void>((resolve) => {
      setTimeout(() => {
        setUser({ email, name: email.split('@')[0] });
        resolve();
      }, 800);
    });
  };
  
  const register = async (name: string, email: string, password: string) => {
    // In a real app, this would make an API call to register a new user
    // For demo purposes, we'll simulate a successful registration
    return new Promise<void>((resolve) => {
      setTimeout(() => {
        setUser({ email, name });
        resolve();
      }, 800);
    });
  };
  
  const logout = () => {
    setUser(null);
  };
  
  return (
    <AuthContext.Provider value={{ 
      user, 
      isAuthenticated: !!user, 
      login, 
      register, 
      logout 
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};