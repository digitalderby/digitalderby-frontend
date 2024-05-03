
import { useState, useEffect } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';

import { useContext } from 'react';

import styles from './Navbar.module.css';
import { getImageUrl } from '../../utils';
import Wallet from './Wallet';
import { AuthContext } from '../../contexts/AuthContext';
import { SocketContext } from '../../contexts/SocketContext';

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  const { isLoggedIn, logout } = useContext(AuthContext)
  const { disconnectSocket } = useContext(SocketContext)

  const handleLinkClick = () => {
    setMenuOpen(false);
  };

  const logoutAndDisconnect = () => {
    disconnectSocket()
    logout()
  }

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
            isLoggedIn && <NavLink to="/user" onClick={handleLinkClick}>User</NavLink>
          }
          {
            isLoggedIn
            ? <NavLink to="/" onClick={logoutAndDisconnect}>Logout</NavLink>
            : <NavLink to="/login" onClick={handleLinkClick}>Login</NavLink>

          }
        </ul>
      </div>
    </nav>
  )
}

export default Navbar;
