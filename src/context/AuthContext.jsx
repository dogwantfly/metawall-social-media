import { useState } from 'react';
import PropTypes from 'prop-types';
import { getAuthToken, setAuthToken, removeAuthToken } from './AuthUtils';
import { AuthContext } from './useAuth';

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(!!getAuthToken());

  const login = (token) => {
    setAuthToken(token);
    setIsAuthenticated(true);
  };

  const logout = () => {
    removeAuthToken();
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
