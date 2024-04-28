import { Link } from 'react-router-dom';
import styles from './Register.module.css';

function Register() {
  return (
    <div className={styles.authForm}>
      <h1 className={styles.title}>Register</h1>
      <form action=''>
        <div className={styles.username}>
          <input type='text' />
          <label htmlFor='' >Username</label>
        </div>
        <div className={styles.email}>
          <input type='email' />
          <label htmlFor='' >Your Email</label>
        </div>
        <div className={styles.password}>
          <input type='password' />
          <label htmlFor='' >Password</label>
        </div>
        <div className={styles.confirmPassword}>
          <input type='password' />
          <label htmlFor='' >Confirm Password</label>
        </div>
        <button className={styles.registerBtn} type='submit'>Create Account</button>
        <div>
          <span className={styles.login}>Already have an account? <Link to='/login'>Login here</Link></span>
        </div>
      </form>
    </div>
  )
}

export default Register;