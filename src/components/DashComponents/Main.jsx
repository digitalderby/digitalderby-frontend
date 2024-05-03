import { useEffect, useState } from 'react';
import {  startMainLoop, endServer, getAllUsers, deleteUser } from '../../services/apiService';
import Sidebar from './Sidebar'; 
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

  

  const handleDeleteUser = async (userId) => {
    try {
        await deleteUser(userId);
        showNotification(`User deleted successfully`);
        setUsers(prevUsers => prevUsers.filter(user => user._id !== userId)); // Update state to remove deleted user
    } catch (error) {
        setError(`Failed to delete user: ${error.message}`);
    }
};


  const showNotification = (message) => {
    setNotification(message);
    setTimeout(() => setNotification(''), 3000);
  };

  const handleStartServerAndLoop = async () => {
    try {
      const data = await startMainLoop();
      console.log(data.message); 
      setServerRunning(true); 
    } catch (error) {
      console.error("Failed to start server and loop:", error);
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
          <div className={styles.users} key={user}>
          <span onClick={() => handleDeleteUser(user._id)}>{user}</span>
          </div>
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
