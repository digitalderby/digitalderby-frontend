import { useContext, useState, useEffect } from 'react';
import axios from 'axios';
import { SocketContext } from '../../contexts/SocketContext';

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

    const handleBetChange = (index, value) => {
        if (!isNaN(value) && value >= 0) {  // Allow only non-negative numeric input
            setBets(prev => ({
                ...prev,
                [index]: parseInt(value, 10)  // Convert to integer
            }));
        }
    };

    const placeBet = async (betValue, index) => {
        const horse = gameState.race.horses[index];
        console.log(user)
        // const betValue = parseInt(bets[index], 10);

        if (betValue > wallet) {
            console.log(wallet)
            alert("You don't have enough in your wallet to place this bet.");
            return;
        }

        try {
            const response = await axios.put('/currentGame/bet', {
                username: user.username,
                userId: user.id,
                betValue,
                horseIdx: index,
                horseId: horse.spec._id,
                gameId,
            });

            if (response.status === 200) {
                const updatedWallet = wallet - betValue;
                setWallet(updatedWallet);
                console.log(response.data.message);
            }
        } catch (error) {
            console.error('Failed to place bet:', error);
        }
    };

    if (!gameState || !gameState.race || !gameState.race.horses) {
        return <div>Loading betting information...</div>;
    }

    return (
        <div className="betting-container">
            <h1>Place Your Bets</h1>
            <h2>Time left: {Math.max(0, timeLeft)} seconds</h2>
            <ul>
                {gameState.race.horses.map((horse, index) => {
                    const [betValue, setBetValue] = useState(0)
                    return <li key={index}>
                        <span>{horse.spec.name} - Top Speed: {horse.topSpeed}, Stamina: {horse.stamina}, Acceleration: {horse.acceleration}</span>
                        <input
                            type="number"
                            placeholder="Bet amount"
                            value={betValue}
                            onChange={(e) => setBetValue(e.target.value) }
                        />
                        <button onClick={() => placeBet(betValue, index)}>Bet</button>
                    </li>
                    })}
            </ul>
            <div>Wallet Balance: ${wallet}</div>
        </div>
    );
};

export default BettingMode;
