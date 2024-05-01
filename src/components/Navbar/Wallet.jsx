import React, { useContext } from 'react';
import { SocketContext } from '../../contexts/SocketContext';

const Wallet = () => {


  const { user } = useContext(SocketContext);
  console.log(user)
  if (!user || !user.wallet) {
    return <div>Wallet data not available.</div>;
  }

  return (
    <div className="wallet-container">
      <p>Balance: ${user.wallet}</p>
    </div>
  );
};

export default Wallet;
