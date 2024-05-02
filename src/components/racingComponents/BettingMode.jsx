import { useContext, useState, useEffect } from 'react';
import axios from 'axios';
<<<<<<< HEAD
import styles from './racingComponents.module.css';
import { getImageUrl } from '../../utils';

=======
import { SocketContext } from '../../contexts/SocketContext';
import { socket } from '../../services/socketService';
>>>>>>> 7822bbd0e69a69d2e7c24d682a3f8184c2bd5620

const BettingMode = ({ userId, gameId }) => {
    const { gameState, currentBet, betResults, connectSocket, user } = useContext(SocketContext);
    const [bets, setBets] = useState({});
    const [timeLeft, setTimeLeft] = useState(gameState ? gameState.bettingTimer : 0);
    const [wallet, setWallet] = useState(user ? user.wallet : 0);

    
    useEffect(() => {
        if (user && user.wallet !== undefined) {
            setWallet(user.wallet);
        }
    }, [user]);

    useEffect(() => {
        if (gameState && gameState.race && gameState.race.horses) {
            const initialBets = {};
            gameState.race.horses.forEach((horse, index) => {
              
                if (!bets[index]) {
                    initialBets[index] = '';  
                }
            });
            setBets(initialBets);
        }
        setTimeLeft(gameState ? gameState.bettingTimer : 0);
    }, [gameState]);

  
    useEffect(() => {
        if (timeLeft > 0) {
            const timerId = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
            return () => clearTimeout(timerId);
        }
    }, [timeLeft]);

    // const handleBetChange = (index, value) => {
    //     if (!isNaN(value) && value >= 0) {  // Allow only non-negative numeric input
    //         setBets(prev => ({
    //             ...prev,
    //             [index]: parseInt(value, 10)  // Convert to integer
    //         }));
    //     }
    // };

    const placeBet = async (betValue, index) => {
        const horse = gameState.race.horses[index];
        const horseIdx = index
        console.log(user)
        // const betValue = parseInt(bets[index], 10);

        if (betValue > wallet) {
            console.log(wallet)
            alert("You don't have enough in your wallet to place this bet.");
            return;
        }

        socket.emit('bet', {betValue, horseIdx}, (res) => console.log(res.message) )
    };

    if (!gameState || !gameState.race || !gameState.race.horses) {
        return <div>Loading betting information...</div>;
    }

    return (
<<<<<<< HEAD
        <>
        <div className={styles.background}>
            <img src={getImageUrl('betting/Screenshot.png')} alt='background image'></img>
        </div>
        <div className={styles.bettingContainer}>
            <h1 className={styles.bettingHeader}>Place Your Bets</h1>
            <h2>Time left: {Math.max(0, timeLeft / 1000)} seconds</h2>
            <ul className={styles.betList}>
                {gameState.race.horses.map((horse, index) => (
                    <li className={styles.betListItem} key={index}>
                        <span className={styles.horseDetails}>{horse.spec.name} - Top Speed: {horse.topSpeed}, Stamina: {horse.stamina}, Acceleration: {horse.acceleration}</span>
=======
        <div className="betting-container">
            <h1>Place Your Bets</h1>
            <h2>Time left: {Math.max(0, timeLeft)} seconds</h2>
            <ul>
                {gameState.race.horses.map((horse, index) => {
                    const [betValue, setBetValue] = useState(0)
                    return <li key={index}>
                        <span className='stats'>{horse.spec.name} - Top Speed: {horse.topSpeed}, Stamina: {horse.stamina}, Acceleration: {horse.acceleration}</span>
>>>>>>> 7822bbd0e69a69d2e7c24d682a3f8184c2bd5620
                        <input
                            type="number"
                            className={styles.betInput}
                            placeholder="Bet amount"
                            value={betValue}
                            onChange={(e) => setBetValue(e.target.value) }
                        />
<<<<<<< HEAD
                        <button className={styles.betButton} onClick={() => placeBet(index)}>Bet</button>
=======
                        <button onClick={() => placeBet(betValue, index)}>Bet</button>
>>>>>>> 7822bbd0e69a69d2e7c24d682a3f8184c2bd5620
                    </li>
                    })}
            </ul>
            <div>Wallet Balance: ${wallet}</div>
        </div>
        </>
    );
};


export default BettingMode;
