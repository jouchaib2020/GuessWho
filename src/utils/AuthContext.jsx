import React, { createContext, useState } from 'react';

// Create the AuthContext
export const AuthContext = createContext();

// Create a provider component to wrap the components that need access to the authentication status
export const AuthProvider = ({ children }) => {
  const [authenticatedUser, setAuthenticatedUser] = useState({id:'', email:''});

  const updateAuthentication  = (value) => {
    const prevAuthenticatedUser = authenticatedUser;
    setAuthenticatedUser({...prevAuthenticatedUser, ...value})
  };

  // Context value to be provided to consuming components
  const authContextValue = {
    authenticatedUser,
    updateAuthentication,
  };

  return (
    <AuthContext.Provider value={authContextValue}>
      {children}
    </AuthContext.Provider>
  );
};