import { useState } from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import { getAuthToken, setAuthToken, removeAuthToken } from './AuthUtils';
import { AuthContext } from './useAuth';
import { login as loginApi, signUp as signUpApi } from '../api/user';
import { toast } from 'react-toastify';


export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(!!getAuthToken());
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  const handleLogin = async (email, password) => {
    try {
      const data = {
        email,
        password,
      };
      const response = await loginApi(data);
      console.log('login',response);
      if (response.status) {
        setUser({
          name: response.data.name,
          email: response.data.email,
        });
        setAuthToken(response.data.token);
        document.cookie = `authToken=${response.data.token}; path=/; expires=${new Date(Date.now() + 1000 * 60 * 60 * 24 * 30).toUTCString()}`;
        setIsAuthenticated(true);
        navigate('/');
      } else {
        toast.error('登入失敗');
      }
    } catch (error) {
      toast.error('登入失敗');
      console.log(error);
    }
  };

  const handleSignUp = async (email, password, nickname, confirmPassword) => {
    try {
      const data = {
        email,
        password,
        name: nickname,
        confirmPassword,
      };
      const response = await signUpApi(data);
      console.log('signUp',response);
      if (response.status) {
        setUser({
          name: response.data.name,
          email: response.data.email,
        });
        setAuthToken(response.data.token);
        document.cookie = `authToken=${response.data.token}; path=/; expires=${new Date(Date.now() + 1000 * 60 * 60 * 24 * 30).toUTCString()}`;
        setIsAuthenticated(true);
        navigate('/');
      } else {
        toast.error('註冊失敗');
      }
    } catch (error) {
      toast.error(`註冊失敗: ${error.response.data.message}`);
      console.log(error);
    }
  };

  const logout = () => {
    removeAuthToken();
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, handleLogin, logout, user, handleSignUp }}>
      {children}
    </AuthContext.Provider>
  );
};
AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
