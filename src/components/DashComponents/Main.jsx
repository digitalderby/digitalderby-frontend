import { useEffect, useState } from 'react';
import { startServer, startMainLoop, endServer, getAllUsers } from '../../services/apiService';
import Sidebar from './Sidebar'; // Assuming this is the correct path
import styles from './Main.module.css';

const Main = () => {
  const [error, setError] = useState('');
  const [serverRunning, setServerRunning] = useState(false);
  const [notification, setNotification] = useState('');
  const [currentSection, setCurrentSection] = useState('dashboard');
  const [users, setUsers] = useState([]);

  useEffect(() => {
    if (currentSection === 'users') {
      fetchUsers();
    }
  }, [currentSection]);

  const fetchUsers = async () => {
    try {
      const userList = await getAllUsers();
      setUsers(userList);
    } catch (error) {
      setError(error.message);
    }
  };

  const showNotification = (message) => {
    setNotification(message);
    setTimeout(() => setNotification(''), 3000);
  };

  const handleStartServerAndLoop = async () => {
    try {
      const serverData = await startServer();
      showNotification(`Server Started: ${serverData.message}`);
      const loopData = await startMainLoop();
      showNotification(`Main Loop Started: ${loopData.message}`);
      setServerRunning(true);
    } catch (error) {
      setError(error.message);
      setServerRunning(false);
    }
  };

  const handleEndServer = async () => {
    try {
      const endData = await endServer();
      showNotification(`Server Stopped: ${endData.message}`);
      setServerRunning(false);
    } catch (error) {
      setError(error.message);
    }
  };

  const renderContent = () => {
    switch(currentSection) {
      case 'dashboard':
        return <>
          {!serverRunning && (
            <button className={styles.serverBtn} onClick={handleStartServerAndLoop}>
              Start Server
            </button>
          )}
          {serverRunning && (
            <button className={styles.serverBtn} onClick={handleEndServer}>
              End Server
            </button>
          )}
        </>;
      case 'users':
        return users.map(user => (
          <div className={styles.users} key={user.username}>{user}</div>
        ));
      default:
        return null;
    }
  };

  return (
    <div className={styles.mainContent}>
      <Sidebar onSelectPage={setCurrentSection} />
      <h1 className={styles.title}>Welcome to the Admin Dashboard</h1>
      {renderContent()}
      {error && <div className={styles.error}>{error}</div>}
      {notification && <div className={styles.notification}>{notification}</div>}
    </div>
  );
};

export default Main;
