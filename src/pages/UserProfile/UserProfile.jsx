import { useContext } from 'react';
import { SocketContext } from '../../contexts/SocketContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';  
import { faUser, faWallet, faCreditCard } from '@fortawesome/free-solid-svg-icons';  
import styles from './UserProfile.module.css';

const UserProfile = () => {
  const { user } = useContext(SocketContext);

  if (!user) {
    return <div>User data not available.</div>;
  }

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>User Profile:</h2>
      <div className={styles.profileInfo}>
        <p className={styles.username}><FontAwesomeIcon icon={faUser} /> Username: {user.username}</p>
        <p className={styles.userId}><FontAwesomeIcon icon={faCreditCard} /> ID: {user.id}</p>
        <p className={styles.wallet}><FontAwesomeIcon icon={faWallet} /> Wallet: {user.wallet}</p>
        <p className={styles.bankruptcy}>Bankruptcies: {user.bankruptcies}</p>
        {/* Add more profile information as needed */}
      </div>
    </div>
  );
};

export default UserProfile;
