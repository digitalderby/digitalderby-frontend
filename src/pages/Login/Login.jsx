import { Link } from 'react-router-dom';
import styles from './Login.module.css';
import { useState } from 'react';


function Login() {
  const [registering, setRegistering] = useState(false)

  function handleToggleRegister() {
    registering ? setRegistering(false) : setRegistering(true)
  }

  
  return (
    <div className={styles.authForm}>
      <h1 className={styles.title}>{registering ? "Register" : "Login"}</h1>
      <form action=''>
        <div className={styles.email}>
          <input type='text' name='username'/>
          <label htmlFor='username' >Username</label>
        </div>
        <div className={styles.password}>
          <input type='password' name='password'/>
          <label htmlFor='password' >Password</label>
        </div>
        <button className={styles.loginBtn} type='submit'>{registering ? "Submit User" : "Login"}</button>
        <div>
          {
            registering
            ? <span className={styles.register}>Already have an account? <a onClick={handleToggleRegister}>Log in instead</a></span>
            : <span className={styles.register}>New here? <a onClick={handleToggleRegister}>Create an account</a></span>
          }
        </div>
      </form>
    </div>
  )
}

export default Login