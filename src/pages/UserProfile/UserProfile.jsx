import React, { useContext, useEffect, useState } from 'react';
import { api } from './../../services/apiConnection'
import { SocketContext } from '../../contexts/SocketContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faWallet, faCreditCard, faListAlt } from '@fortawesome/free-solid-svg-icons';
import styles from './UserProfile.module.css';

const UserProfile = () => {
  const { clientStatus } = useContext(SocketContext);
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      if (!clientStatus) return;
      setLoading(true);
      try {
        const response = await api.get(`/users/{clientStatus.username}`)
        setUserData(response.data);
        setError(null);
      } catch (err) {
        setError('Failed to fetch user data');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [clientStatus]);

  if (!clientStatus) {
    return <div>User data not available.</div>;
  }

  if (loading) return <div>Loading user data...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>User Profile</h2>
      <div className={styles.profileInfo}>
        <p className={styles.username}><FontAwesomeIcon icon={faUser} /> Username: {userData?.username}</p>
        <p className={styles.userId}><FontAwesomeIcon icon={faCreditCard} /> ID: {userData?.id}</p>
        <p className={styles.wallet}><FontAwesomeIcon icon={faWallet} /> Wallet: {userData?.profile?.wallet}</p>
        <p className={styles.bankruptcy}>Bankruptcies: {userData?.profile?.bankruptcies}</p>
        <div className={styles.betLog}>
          <p><FontAwesomeIcon icon={faListAlt} /> Previous Bets:</p>
          <ul>
            {userData?.profile?.betLog.map((bet, index) => (
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
