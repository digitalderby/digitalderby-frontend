import React, { useContext } from 'react';
import { SocketContext } from '../../contexts/SocketContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';  
import { faWallet } from '@fortawesome/free-solid-svg-icons';  
import { AuthContext } from '../../contexts/AuthContext';

const Wallet = () => {
  const { clientStatus } = useContext(SocketContext);
  const { isLoggedIn } = useContext(AuthContext)

  if (!isLoggedIn) {
    return null
  } else if (!clientStatus || !clientStatus.wallet) {
    return <div>Wallet data not available.</div>;
  }

  return (
    <div className="wallet-container">
      <p><FontAwesomeIcon icon={faWallet} /> My Wallet: USD${clientStatus.wallet}</p>
    </div>
  );
};

export default Wallet;
