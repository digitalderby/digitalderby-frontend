const Wallet = () => {
    const user = JSON.parse(sessionStorage.getItem('user'));

    if (!user) {
        return null; 
    }

    return (
        <div>
            Wallet Balance: ${user.walletBalance.toFixed(2)}
        </div>
    );
};

export default Wallet;