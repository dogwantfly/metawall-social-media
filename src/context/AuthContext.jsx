import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useNavigate, useLocation } from 'react-router-dom';
import { getAuthToken, setAuthToken, removeAuthToken } from './AuthUtils';
import { AuthContext } from './useAuth';
import {
  login as loginApi,
  signUp as signUpApi,
  getUserInfo,
} from '../api/user';
import { toast } from 'react-toastify';

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(!!getAuthToken());
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogin = async (email, password) => {
    try {
      const data = {
        email,
        password,
      };
      const response = await loginApi(data);
      if (response.status) {
        setAuthToken(response.data.token);
        document.cookie = `authToken=${
          response.data.token
        }; path=/; expires=${new Date(
          Date.now() + 1000 * 60 * 60 * 24 * 30
        ).toUTCString()}`;
        document.cookie = `userName=${
          response.data.name
        }; path=/; expires=${new Date(
          Date.now() + 1000 * 60 * 60 * 24 * 30
        ).toUTCString()}`;
        navigate('/');
        document.cookie = `userEmail=${
          response.data.email
        }; path=/; expires=${new Date(
          Date.now() + 1000 * 60 * 60 * 24 * 30
        ).toUTCString()}`;
        navigate('/');
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

      if (response.status) {
        setAuthToken(response.data.token);
        document.cookie = `authToken=${
          response.data.token
        }; path=/; expires=${new Date(
          Date.now() + 1000 * 60 * 60 * 24 * 30
        ).toUTCString()}`;
        setIsAuthenticated(true);
        document.cookie = `userName=${
          response.data.name
        }; path=/; expires=${new Date(
          Date.now() + 1000 * 60 * 60 * 24 * 30
        ).toUTCString()}`;
        navigate('/');
        document.cookie = `userEmail=${
          response.data.email
        }; path=/; expires=${new Date(
          Date.now() + 1000 * 60 * 60 * 24 * 30
        ).toUTCString()}`;
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

  const handleUserInfo = async () => {
    const res = await getUserInfo();

    if (res.status) {
      setUser(res.data);
    }
  };

  useEffect(() => {
    if (getAuthToken()) {
      handleUserInfo();
    }
  }, [location.pathname]);

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        handleLogin,
        logout,
        user,
        handleSignUp,
        handleUserInfo,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
