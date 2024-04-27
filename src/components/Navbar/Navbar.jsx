import { useState } from 'react';
import styles from './Navbar.module.css';
import { getImageUrl } from '../../utils';

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
          <li><a href="#">Login </a></li>
          <li><a href="#">Next Race </a></li>
          <li><a href="#">Horse Stats </a></li>
        </ul>
      </div>
    </nav>
  )
}

export default Navbar;
