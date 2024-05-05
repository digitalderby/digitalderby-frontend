import { createContext, useContext, useEffect, useState } from 'react';
import { getToken, removeToken, setToken } from '../services/tokenService';
import { loginUser, registerUser } from '../services/apiService';

export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  useEffect(() => {
    checkIsLoggedIn()
  },[])

  const login = async (username, password) => {
    try {
      const response = await loginUser(username, password);
      if (response.status === 200) {
        setToken(response.data.token) 
        setUser(response.data);
        checkIsLoggedIn()
        // console.log(response.data)
        setError(null);  // Clear error on successful login
        console.log('Login successful:', response);
        return response
      } else {
        throw new Error('Login failed, please check your username and password'); // More specific error
      }
    } catch (error) {
      setError(error.response ? error.response.data : 'Login failed, please try again'); // Set error message from response
      console.error('Login failed:', error);
    }
  };

  const register = async (username, password) => {
    try {
      const response = await registerUser(username, password);
      console.log(response)
      if (response.status === 201) {
        sessionStorage.setItem('token', response.data.token); 
        setUser(response.data);
        setError(null);  // Clear error on successful registration
        console.log('Registration successful:', response);
        return response
      } else {
        throw new Error('Registration failed, please try again'); // More specific error
      }
    } catch (error) {
      setError(error.response ? error.response.data : 'Registration failed, please try again'); // Set error message from response
      console.error('Registration failed:', error);
    }
  };

  const checkIsLoggedIn = () => {
    const token = getToken()
    token ? setIsLoggedIn(true) : setIsLoggedIn(false)
    return token ? true : false
  }

  const logout = () => {
    setUser(null);
    removeToken();
    console.log('logout successful');
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout, isLoggedIn, checkIsLoggedIn, error }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
