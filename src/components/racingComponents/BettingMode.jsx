import { useContext, useState, useEffect } from "react";
import { socket } from "../../services/socketService";
import styles from "./racingComponents.module.css";
import { getImageUrl } from "../../utils";
import { Modal, Button } from "react-bootstrap";
import HorsesForBetting from "./HorsesForBetting";
import { useNavigate } from "react-router";

const BettingMode = ({ userId, gameId, show, handleClose, user, gameState }) => {
  const navigate = useNavigate();
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
          initialBets[index] = "";
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
    console.log(user);

    if (betValue > wallet) {
      console.log(wallet);
      alert("You don't have enough in your wallet to place this bet.");
      return;
    }

    socket.emit("bet", { betValue, horseIdx }, (res) =>
      console.log(res.message)
    );
  };

  if (!gameState || !gameState.race || !gameState.race.horses) {
    return null;
  }

  const closeGame = () => {
    socket.close()
    navigate('/')
  }

  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header>
        <Modal.Title>Place Your Bets!</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <h2>Time left: {Math.max(0, timeLeft / 1000)} seconds</h2>
        <ul className={styles.betList}>
          {gameState.race.horses.map((horse, index) => <HorsesForBetting horse={horse} index={index} placeBet={placeBet} key={index}/>)}
        </ul>
        <div>Wallet Balance: ${wallet}</div>
      </Modal.Body>
      <Modal.Footer>
            <Button onClick={handleClose} variant="secondary">Close</Button>
      </Modal.Footer>
    </Modal>
  );
};

export default BettingMode;
