import React, { useContext } from 'react';
import { SocketContext } from '../../contexts/SocketContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';  
import { faUser, faWallet, faCreditCard, faListAlt } from '@fortawesome/free-solid-svg-icons';  
import styles from './UserProfile.module.css';

const UserProfile = () => {
  const { user } = useContext(SocketContext);

  if (!user) {
    return <div>User data not available.</div>;
  }

  const betLog = user.profile?.betLog || []; 

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>User Profile</h2>
      <div className={styles.profileInfo}>
        <p className={styles.username}><FontAwesomeIcon icon={faUser} /> Username: {user.username}</p>
        <p className={styles.userId}><FontAwesomeIcon icon={faCreditCard} /> ID: {user.id}</p>
        <p className={styles.wallet}><FontAwesomeIcon icon={faWallet} /> Wallet: {user.wallet}</p>
        <p className={styles.bankruptcy}>Bankruptcies: {user.bankruptcies}</p>
        <div className={styles.betLog}>
          <p><FontAwesomeIcon icon={faListAlt} /> Previous Bets:</p>
          <ul>
            {betLog.map((bet, index) => (
              <li key={index}>
                Game ID: {bet.gameId}, Bet Value: {bet.betValue}, Returns: {bet.returns}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
