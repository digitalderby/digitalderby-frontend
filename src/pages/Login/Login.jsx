import { Link, useNavigate } from 'react-router-dom';
import styles from './Login.module.css';
import { useState } from 'react';
import { loginUser, registerUser } from '../../services/apiService';

function Login() {
  const navigate = useNavigate();
  const [registering, setRegistering] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');  // State to hold any login or registration errors

  function handleToggleRegister() {
    setRegistering(!registering);
    setError('');  // Clear errors when toggling between login and register
  }

  async function handleSubmitForm(e) {
    e.preventDefault();
    try {
      const apiResponse = registering
        ? await registerUser(username, password)
        : await loginUser(username, password);

      console.log(apiResponse);
      if (apiResponse.status === 200) {
        navigate('/');
      } else {
        // Handle non-200 responses
        throw new Error(apiResponse.data || 'Unexpected error occurred');
      }
    } catch (err) {
      // Set the error state to display the error message
      setError(err.message || 'Error during login/register');
      console.error('Error:', err);
    }
  }
  
  return (
    <div className={styles.authForm}>
      <h1 className={styles.title}>{registering ? "Register" : "Login"}</h1>
      <form onSubmit={handleSubmitForm}>
        <div className={styles.email}>
          <input type='text' name='username' value={username} onChange={(e) => setUsername(e.target.value)}/>
          <label htmlFor='username'>Username</label>
        </div>
        <div className={styles.password}>
          <input type='password' name='password' value={password} onChange={(e) => setPassword(e.target.value)}/>
          <label htmlFor='password'>Password</label>
        </div>
        {error && <div className={styles.error}>{error}</div>}  {/* Display the error message */}
        <button className={styles.loginBtn} type='submit'>{registering ? "Submit User" : "Login"}</button>
        <div>
          {registering
            ? <span className={styles.register}>Already have an account? <button onClick={handleToggleRegister}>Log in instead</button></span>
            : <span className={styles.register}>New here? <button onClick={handleToggleRegister}>Create an account</button></span>
          }
        </div>
      </form>
    </div>
  )
}

export default Login;
