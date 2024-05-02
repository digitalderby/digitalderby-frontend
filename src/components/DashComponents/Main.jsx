import styles from './Main.module.css';

const Main = () => {
  const handleStartServer = async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/startRaceServer`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        }
      });

      if (!response.ok) {
        throw new Error('Failed to start the server');
      }

      const data = await response.json();
      alert(data.message); 

    } catch (error) {
      alert('Error starting the server: ' + error.message); 
    }
  };

  return (
    <div className={styles.mainContent}>
      <h1 className={styles.title}>Welcome to Dashboard</h1>
      <button className={styles.serverBtn} onClick={handleStartServer}>Start Server</button>
    </div>
  );
};

export default Main;
