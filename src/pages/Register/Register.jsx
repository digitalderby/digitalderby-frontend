import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { registerUser } from '../../services/apiService';
import styles from '../Login/Login.module.css';

function Register() {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleRegistration = async (event) => {
    event.preventDefault();
    if (password.length < 5) {
      setError('Password must be at least 5 characters long');
      return;
    }

    try {
      const response = await registerUser(username, password);
      if (response.status === 201) {
        
        navigate('/race');
      } else {
        throw new Error('Registration failed');
      }
    } catch (err) {
      setError(err.response.data.message || 'Registration failed');
    }
  };

  return (
    <div className={styles.authForm}>
      <h1 className={styles.title}>Register</h1>
      <form onSubmit={handleRegistration}>
        <div className={styles.email}>
          <input type='text' name='username' value={username} onChange={(e) => setUsername(e.target.value)} />
          <label htmlFor='username'>Username</label>
        </div>
        <div className={styles.password}>
          <input type='password' name='password' value={password} onChange={(e) => setPassword(e.target.value)} />
          <label htmlFor='password'>Password</label>
        </div>
        {error && <div className={styles.error}>{error}</div>}
        <button className={styles.loginBtn} type='submit'>Register</button>
      </form>
    </div>
  );
}



export default Register;
