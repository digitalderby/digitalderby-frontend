import { useState, useEffect } from 'react';
import axios from 'axios';
import styles from './racingComponents.module.css';
import { getImageUrl } from '../../utils';


const BettingMode = ({ gameState, userId, gameId }) => {
    const [bets, setBets] = useState({});
    const [timeLeft, setTimeLeft] = useState(gameState.bettingTimer);

    useEffect(() => {
        const initialBets = {};
        gameState.race.horses.forEach((horse, index) => {
            initialBets[index] = '';
        });
        setBets(initialBets);
        setTimeLeft(gameState.bettingTimer);
    }, [gameState]);

    useEffect(() => {
      if (timeLeft > 0) {
          const timerId = setTimeout(() => {
              setTimeLeft(timeLeft - 1000);
          }, 1000);

          return () => clearTimeout(timerId);
      }
  }, [timeLeft]);

    const handleBetChange = (index, value) => {
        setBets(prev => ({ ...prev, [index]: value }));
    };

    const placeBet = async (index) => {
        const horse = gameState.race.horses[index];
        const betValue = bets[index];
        console.log(`Attempting to place bet on horse ${index + 1}`);

        try {
            const response = await axios.post('/currentGame/bet', {
                username: 'YourUsername', 
                userId: userId,
                betValue: betValue,
                horseIdx: index,
                horseId: horse.spec._id,
                gameId: gameId,
            });

            console.log(response.data.message);
        } catch (error) {
            console.error('Failed to place bet:', error);
        }
    };

    if (!gameState.race || !gameState.race.horses) {
        return <div>Loading betting information...</div>;
    }

    return (
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
                        <input
                            type="number"
                            className={styles.betInput}
                            placeholder="Bet amount"
                            value={bets[index]}
                            onChange={(e) => handleBetChange(index, e.target.value)}
                            min="1"
                        />
                        <button className={styles.betButton} onClick={() => placeBet(index)}>Bet</button>
                    </li>
                ))}
            </ul>
        </div>
        </>
    );
};


export default BettingMode;
