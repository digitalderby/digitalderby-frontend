
import { useState, useEffect } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';

import { useContext, useState } from 'react';

import styles from './Navbar.module.css';
import { getImageUrl } from '../../utils';
import Wallet from './Wallet';
import { AuthContext } from '../../contexts/AuthContext';
import { Nav } from 'react-bootstrap';

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  const { user, logout } = useContext(AuthContext)

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
        <NavLink to="/race" onClick={handleLinkClick}>Next Race</NavLink>
        <NavLink to="/horses" onClick={handleLinkClick}>Horse Stats</NavLink>
        {
          user && <NavLink to="/user" onClick={handleLinkClick}>User</NavLink>
        }
        {
          user
          ? <NavLink to="/" onClick={logout}>Logout</NavLink>
          : <NavLink to="/login" onClick={handleLinkClick}>Login</NavLink>
        }
      </ul>
    </div>
  </nav>
);

        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
