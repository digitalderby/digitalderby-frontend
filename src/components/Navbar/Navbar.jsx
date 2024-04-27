import { useState } from 'react';
import styles from './Navbar.module.css';
import { getImageUrl } from '../../utils';
import { NavLink } from 'react-router-dom';

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className={styles.navbar}>
      <a className={styles.title} href="/">Digitalderby</a>
      <div className={styles.menu}>
        <img 
          className={styles.menuBtn} 
          src={getImageUrl('nav/menuIcon.png')}
          alt='menu-button' 
          onClick={() => setMenuOpen(!menuOpen)} 
        />
        <ul className={`${styles.menuitems} ${menuOpen ? styles.visible : styles.hidden}`}>
          <NavLink to="/login">Login</NavLink>
          <NavLink to="/race">Next Race</NavLink>
          <NavLink to="/horses">Horse Stats</NavLink>
          <NavLink to="/user">User</NavLink>
        </ul>
      </div>
    </nav>
  )
}

export default Navbar;
