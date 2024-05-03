import { useContext, useState, useEffect } from "react";
import axios from "axios";
import { SocketContext } from "../../contexts/SocketContext";
import { socket } from "../../services/socketService";
import styles from "./racingComponents.module.css";
import { getImageUrl } from "../../utils";
import { Modal, Button } from "react-bootstrap";
import HorsesForBetting from "./HorsesForBetting";
import { useNavigate } from "react-router";
import useCountdown from "../../hooks/useCountdown";

const BettingMode = ({ show, handleClose, }) => {
  const {
    gameState,
    raceInfo,
    clientInfo,
  } = useContext(SocketContext)

  const [timer, setEndTime] = useCountdown(gameState?.raceStartTime || Date.now())
  const navigate = useNavigate();
  const [bets, setBets] = useState({});

  let currentWallet = clientInfo.wallet
  if (clientInfo.bet !== null) {
    currentWallet -= clientInfo.bet.betValue
  }

  const placeBet = async (betValue, index) => {
    const horseIdx = index;

    if (betValue > clientInfo.wallet) {
      console.log(clientInfo.wallet);
      alert("You don't have enough in your wallet to place this bet.");
      return;
    }

    socket.emit("bet", { betValue, horseIdx }, (res) =>
      console.log(res.message)
    );
  };

  if (!gameState || !gameState.race || !gameState.race.horses) {
    return <div>Loading betting information...</div>;
  }

  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header>
        <Modal.Title>Place Your Bets!</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <h2>Time left: {Math.max(0, 0/ 1000)} seconds</h2>
        <ul className={styles.betList}>
          {gameState.raceInfo.race.horses.map((horse, index) => <HorsesForBetting horse={horse} index={index} placeBet={placeBet} key={index}/>)}
        </ul>
        <div>Wallet Balance: ${clientInfo.wallet}</div>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={() => navigate('/')}>Exit Race</Button>
      </Modal.Footer>
    </Modal>
  );
};

export default BettingMode;
