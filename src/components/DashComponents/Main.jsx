import { useEffect, useState } from 'react';
import { startServer, startMainLoop } from '../../services/apiService';
import styles from './Main.module.css';

const Main = () => {
  const [error, setError] = useState('');

    const handleStartServer = async () => {
        try {
            const serverData = await startServer();
            alert(`Server Started: ${serverData.message}`);
        } catch (error) {
            setError(error.message);
        }
    };

    const handleStartMainLoop = async () => {
        try {
            const loopData = await startMainLoop();
            alert(`Main Loop Started: ${loopData.message}`);
        } catch (error) {
            setError(error.message);
        }
    };

  return (
    <div className={styles.mainContent}>
      <h1 className={styles.title}>Welcome to the Admin Dashboard</h1>
      <button className={styles.serverBtn} onClick={handleStartServer}>Start Server</button>
      <button className={styles.serverBtn} onClick={handleStartMainLoop}>Start Loop</button>
      {error && <div className={styles.error}>{error}</div>}
    </div>
  );
};

export default Main;
