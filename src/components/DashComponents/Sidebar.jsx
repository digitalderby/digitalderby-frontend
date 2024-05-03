import styles from './Sidebar.module.css'; 

const Sidebar = ({ onSelectPage }) => {
  return (
    <div className={styles.sidebar}> 
      <ul>
        <li>
          <button onClick={() => onSelectPage('dashboard')}>Dashboard</button>
        </li>
        <li>
          <button onClick={() => onSelectPage('users')}>User Management</button>
        </li>
        <li>
          <button onClick={() => onSelectPage('settings')}>Settings</button>
        </li>
        <li>
          <button onClick={() => onSelectPage('analytics')}>Analytics</button>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
