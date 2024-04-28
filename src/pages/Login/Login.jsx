import { Link, useNavigate } from 'react-router-dom';
import styles from './Login.module.css';
import { useState } from 'react';
import { loginUser, registerUser } from '../../services/apiService';


function Login() {
  const navigate = useNavigate()

  const [registering, setRegistering] = useState(false)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')


  function handleToggleRegister() {
    registering ? setRegistering(false) : setRegistering(true)
  }

  async function handleSubmitForm(e) {
    e.preventDefault()
    const apiResponse = registering
      ? await registerUser(username, password)
      : await loginUser(username, password)
    console.log(apiResponse)
    if (apiResponse.status === 200) {
      navigate('/')
    }
  }
  
  return (
    <div className={styles.authForm}>
      <h1 className={styles.title}>{registering ? "Register" : "Login"}</h1>
      <form onSubmit={handleSubmitForm}>
        <div className={styles.email}>
          <input type='text' name='username' value={username} onChange={(e) => setUsername(e.target.value)}/>
          <label htmlFor='username' >Username</label>
        </div>
        <div className={styles.password}>
          <input type='password' name='password' value={password} onChange={(e) => setPassword(e.target.value)}/>
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