import { useState, useEffect } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import styles from './Navbar.module.css';
import { getImageUrl } from '../../utils';
import Wallet from './Wallet';

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(!!sessionStorage.getItem('token'));
  const navigate = useNavigate();

  useEffect(() => {
    const token = sessionStorage.getItem('token');
    setIsLoggedIn(!!token);
  }, [isLoggedIn]);

  const handleLinkClick = () => {
    setMenuOpen(false);
  };

  const handleLogout = () => {
    sessionStorage.removeItem('token');
    setIsLoggedIn(false); 
    navigate('/login'); 
  };

  return (
    <nav className={styles.navbar}>
      <NavLink to="/" className={styles.title}>Digitalderby</NavLink>
      <div className={styles.wallet}><Wallet /></div>
      <div className={styles.menu}>
        <img 
          className={styles.menuBtn} 
          src={getImageUrl('nav/menuIcon.png')}
          alt='menu-button' 
          onClick={() => setMenuOpen(!menuOpen)} 
        />
        <ul className={`${styles.menuitems} ${menuOpen ? styles.visible : styles.hidden}`}>
          {isLoggedIn ? (
            <li className={styles.logoutLink} onClick={handleLogout}>Logout</li>
          ) : (
            <NavLink to="/login" onClick={handleLinkClick}>Login</NavLink>
          )}
          <NavLink to="/race" onClick={handleLinkClick}>Next Race</NavLink>
          <NavLink to="/horses" onClick={handleLinkClick}>Horse Stats</NavLink>
          <NavLink to="/user" onClick={handleLinkClick}>User</NavLink>
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
