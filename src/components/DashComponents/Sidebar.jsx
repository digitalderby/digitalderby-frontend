
import styles from './Sidebar.module.css'; 
const Sidebar = ({ onSelectPage }) => {
  const handlePageChange = (page) => {
    onSelectPage(page);
  };

  return (
    <div className={styles.sidebar}> 
      <ul>
        <li>
          <button onClick={() => handlePageChange('dashboard')}>Dashboard</button>
        </li>
        <li>
          <button onClick={() => handlePageChange('users')}>User Management</button>
        </li>
        <li>
          <button onClick={() => handlePageChange('settings')}>Settings</button>
        </li>
        <li>
          <button onClick={() => handlePageChange('analytics')}>Analytics</button>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
