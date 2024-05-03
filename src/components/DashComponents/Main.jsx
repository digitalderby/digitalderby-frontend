import { useEffect, useState } from 'react';
import { startServer, startMainLoop, endServer } from '../../services/apiService';
import styles from './Main.module.css';

const Main = () => {
  const [error, setError] = useState('');
  const [serverRunning, setServerRunning] = useState(false);
  const [notification, setNotification] = useState('');

  // Function to show notifications
  const showNotification = (message) => {
    setNotification(message);
    setTimeout(() => {
      setNotification('');
    }, 3000);  // Notification disappears after 3000 milliseconds
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

  return (
    <div className={styles.mainContent}>
      <h1 className={styles.title}>Welcome to the Admin Dashboard</h1>
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
      {error && <div className={styles.error}>{error}</div>}
      {notification && <div className={styles.notification}>{notification}</div>}
    </div>
  );
};

export default Main;
