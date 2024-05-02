import { useContext, useState, useEffect } from 'react';
import axios from 'axios';
import { SocketContext } from '../../contexts/SocketContext';
import { socket } from '../../services/socketService';
import styles from './racingComponents.module.css';
import { getImageUrl } from '../../utils';


const BettingMode = ({ userId, gameId }) => {
    const { gameState, currentBet, betResults, connectSocket, user } = useContext(SocketContext);
    const [bets, setBets] = useState({});
    const [timeLeft, setTimeLeft] = useState(gameState ? gameState.bettingTimer : 0);
    const [wallet, setWallet] = useState(user ? user.wallet : 0);
    const [betValue, setBetValue] = useState(''); // Add betValue state

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

    const placeBet = async (betValue, index) => {
        const horse = gameState.race.horses[index];
        const horseIdx = index;

        if (betValue > wallet) {
            alert("You don't have enough in your wallet to place this bet.");
            return;
        }

        socket.emit('bet', {betValue, horseIdx}, (res) => console.log(res.message));
    };

    if (!gameState || !gameState.race || !gameState.race.horses) {
        return <div>Loading betting information...</div>;
    }

    return (
        <>
        <div className={styles.background}>
            <img src={getImageUrl('betting/Screenshot.png')} alt='background image' />
        </div>
        <div className={styles.bettingContainer}>
            <h1 className={styles.bettingHeader}>Place Your Bets</h1>
            <h2>Time left: {Math.max(0, timeLeft / 1000)} seconds</h2>
            <ul className={styles.betList}>
                {gameState.race.horses.map((horse, index) => (
                    <li className={styles.betListItem} key={index}>
                        <span className={styles.horseDetails}>{horse.spec.name} - Top Speed: {horse.topSpeed}, Stamina: {horse.stamina}, Acceleration: {horse.acceleration}</span>
                        <input
                            type="number"
                            className={styles.betInput}
                            placeholder="Bet amount"
                            value={betValue}
                            onChange={(e) => setBetValue(e.target.value) }
                        />
                        <button className={styles.betButton} onClick={() => placeBet(betValue, index)}>Bet</button>
                    </li>
                ))}
            </ul>
            <div>Wallet Balance: ${wallet}</div>
        </div>
        </>
    );
};

export default BettingMode;
