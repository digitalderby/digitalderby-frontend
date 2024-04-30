import { createContext, useContext, useState } from 'react';
import axios from 'axios';
import { removeToken } from '../services/tokenService';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null); 

  const login = async (username, password) => {
    try {
      const response = await axios.post('/api/login', { username, password });
      if (response.status === 200) {
        setUser(response.data);
        setError(null);  // Clear error on successful login
        console.log('Login successful:', response.data);
      } else {
        throw new Error('Login failed, please check your username and password'); // More specific error
      }
    } catch (error) {
      setError(error.response ? error.response.data : 'Login failed, please try again'); // Set error message from response
      console.error('Login failed:', error);
    }
  };

  const register = async (username, password, email) => {
    try {
      const response = await axios.post('/api/register', { username, password, email });
      if (response.status === 200) {
        setUser(response.data);
        setError(null);  // Clear error on successful registration
        console.log('Registration successful:', response.data);
      } else {
        throw new Error('Registration failed, please try again'); // More specific error
      }
    } catch (error) {
      setError(error.response ? error.response.data : 'Registration failed, please try again'); // Set error message from response
      console.error('Registration failed:', error);
    }
  };

  const logout = () => {
    setUser(null);
    removeToken();
    console.log('logout successful');
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout, error }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
