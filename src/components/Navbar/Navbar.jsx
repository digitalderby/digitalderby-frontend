import { useState } from 'react';
import styles from './Navbar.module.css';
import { getImageUrl } from '../../utils';
import { NavLink } from 'react-router-dom';
import Wallet from './Wallet';


function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLinkClick = () => {
    setMenuOpen(false);
  };

  return (
    <nav className={styles.navbar}>
      <a className={styles.title} href="/">Digitalderby</a>
      ><div className={styles.wallet}><Wallet /></div>
      <div className={styles.menu}>
        <img 
          className={styles.menuBtn} 
          src={getImageUrl('nav/menuIcon.png')}
          alt='menu-button' 
          onClick={() => setMenuOpen(!menuOpen)} 
        />
        <ul className={`${styles.menuitems} ${menuOpen ? styles.visible : styles.hidden}`}>
          <NavLink to="/login" onClick={handleLinkClick}>Login</NavLink>
          <NavLink to="/race" onClick={handleLinkClick}>Next Race</NavLink>
          <NavLink to="/horses" onClick={handleLinkClick}>Horse Stats</NavLink>
          <NavLink to="/user" onClick={handleLinkClick}>User</NavLink>
          <NavLink to="/test" onClick={handleLinkClick}>Test</NavLink>
        </ul>
      </div>
    </nav>
  )
}

export default Navbar;
