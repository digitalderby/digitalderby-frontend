import { Link } from 'react-router-dom';
import styles from './Login.module.css';

function Login() {
  return (
    <div className={styles.authForm}>
      <h1 className={styles.title}>Login</h1>
      <form action=''>
        <div className={styles.email}>
          <input type='email' />
          <label htmlFor='' >Your Email</label>
        </div>
        <div className={styles.password}>
          <input type='password' />
          <label htmlFor='' >Password</label>
        </div>
        <button className={styles.loginBtn} type='submit'>Login</button>
        <div>
          <span className={styles.register}>New here? <Link to='/register'>Create an account</Link></span>
        </div>
      </form>
    </div>
  )
}

export default Login