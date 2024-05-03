import React, { useContext } from 'react';
import { SocketContext } from '../../contexts/SocketContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';  
import { faWallet } from '@fortawesome/free-solid-svg-icons';  

const Wallet = () => {
  const { user } = useContext(SocketContext);

  if (!user || !user.wallet) {
    return <div>Wallet data not available.</div>;
  }

  return (
    <div className="wallet-container">
      <p><FontAwesomeIcon icon={faWallet} /> My Wallet: USD${user.wallet}</p>
    </div>
  );
};

export default Wallet;
