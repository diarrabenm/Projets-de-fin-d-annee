import React, { createContext, useContext, useState } from 'react';

// Crée un contexte
const AuthContext = createContext();

// Crée un provider pour encapsuler ton application
export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  return (
    <AuthContext.Provider value={{ isAuthenticated, setIsAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
};

// Hook pour accéder au contexte
export const useAuth = () => useContext(AuthContext);
