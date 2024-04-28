import { Link } from 'react-router-dom';
import styles from './Login.module.css';

function Login() {
  return (
    <div>
      <h1 className={styles.title}>Login</h1>
      <form action=''>
        <div>
          <input type='email' />
          <label htmlFor='' >Your Email</label>
        </div>
        <div>
          <input type='password' />
          <label htmlFor='' >Password</label>
        </div>
        <button type='submit'>Login</button>
        <div>
          <span>New Here? <Link to='/register'>Create an account</Link></span>
        </div>
      </form>
    </div>
  )
}

export default Login