import  { useState } from 'react';
import { useAuth } from './AuthContext';

const AuthForm = ({ isRegistering }) => {
  const { login, register } = useAuth();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    if (isRegistering) {
      register(username, password, email);
    } else {
      login(username, password);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" placeholder="Username" value={username} onChange={e => setUsername(e.target.value)} required />
      <input type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} required />
      {isRegistering && (
        <input type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} required />
      )}
      <button type="submit">{isRegistering ? "Register" : "Login"}</button>
    </form>
  );
};

export default AuthForm;
