import { useState, useEffect } from 'react';

const Wallet = () => {
    const [wallet, setWallet] = useState(0);

    useEffect(() => {
        const userData = JSON.parse(sessionStorage.getItem('user'));
        if (userData && userData.wallet) {
            setWallet(userData.wallet);
        }
    }, []);

    return (
        <div>
            Wallet Balance: ${wallet.toFixed(2)}
        </div>
    );
};

export default Wallet;
