import { useContext, useState, useEffect } from "react";
import { socket } from "../../services/socketService";
import styles from "./racingComponents.module.css";
import { getImageUrl } from "../../utils";
import { Modal, Button } from "react-bootstrap";
import HorsesForBetting from "./HorsesForBetting";
import { useNavigate } from "react-router";
import useCountdown from "../../hooks/useCountdown";
import { SocketContext } from "../../contexts/SocketContext";

const BettingMode = ({ show, handleClose, }) => {
  const {
    gameState,
    raceInfo,
    clientStatus,
  } = useContext(SocketContext)

  const [timer] = useCountdown(gameState?.raceStartTime || Date.now())
  const navigate = useNavigate();
  const [betValues, setBetValues] = useState(
    Array(raceInfo?.race.horses.length || 4).fill(0)
  )

  if (clientStatus === null) { return }

  const currentBet = clientStatus.bet

  let currentWallet = clientStatus.wallet
  if (currentBet !== null) {
    currentWallet -= clientStatus.bet.betValue
  }

  const placeBet = async (betValue, index) => {
    setBetValues(Array.raceInfo?.race.horses.length || 4).fill(0)
    const horseIdx = index;

    if (betValue > clientStatus.wallet) {
      console.log(clientStatus.wallet);
      alert("You don't have enough in your wallet to place this bet.");
      return;
    } else if (betValue < raceInfo?.minimumBet) {
      alert(`Bet must be at least ${raceInfo?.minimumBet}.`)
      return
    }

    socket.emit("bet", { betValue, horseIdx }, (res) =>
      console.log(res.message)
    );
  };

  if (!gameState || !raceInfo.race || !raceInfo.race.horses) {
    return <div>Loading betting information...</div>;
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
        <h2>Time left: {timer.currentTime} seconds</h2>
        <ul className={styles.betList}>
          {raceInfo.race.horses.map((horse, index) =>
            <HorsesForBetting
              betValue={betValues[index]}
              setBetValue={setBetValues}
              key={index}
              horse={horse}
              index={index}
              placeBet={placeBet}
            />
          )}
        </ul>
        <div>Wallet Balance: ${clientStatus.wallet} ({currentWallet})</div>
      </Modal.Body>
      <Modal.Footer>
            <Button onClick={closeGame}>Exit Race</Button>
      </Modal.Footer>
    </Modal>
  );
};

export default BettingMode;
