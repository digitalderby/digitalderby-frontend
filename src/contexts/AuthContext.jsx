import { createContext, useContext, useState } from 'react';
import axios from 'axios';

const AuthContext = createContext(null); 

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const login = async (username, password) => {
    try {
      const response = await axios.post('/api/login', { username, password });
      setUser(response.data);
      console.log('Login successful:', response.data);
    } catch (error) {
      console.error('Login failed:', error);
      console.error('Detailed error:', error.response ? error.response.data : "No detailed error");
    }
  };

  const register = async (username, password, email) => {
    try {
      const response = await axios.post('/api/register', { username, password, email });
      setUser(response.data);
      console.log('Registration successful:', response.data);
    } catch (error) {
      console.error('Registration failed:', error);
      console.error('Detailed error:', error.response ? error.response.data : "No detailed error");
    }
  };

  return (
    <AuthContext.Provider value={{ user, login, register }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
