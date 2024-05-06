import { Modal, Button } from "react-bootstrap";
import { useContext, useEffect } from "react";
import { SocketContext } from "../../contexts/SocketContext";
import styles from "./racingComponents.module.css"

const ResultsMode = ({ show, handleClose, savedBet }) => {
  const {
      gameState,
      raceInfo,
  } = useContext(SocketContext)

  if (
    !gameState ||
    gameState.status !== 'results'
  ) {
    return null;
  }

  const { rankings, finishTimes } = gameState

  // Sort horses based on rankings to display in order
  const sortedHorses = rankings.map((index) => ({
    index: index,
    horseInfo: raceInfo.race.horses[index],
    finishTime: finishTimes[index]
  }))

  // Identify the winner (first in the rankings array)
  const winner = sortedHorses[0];

  // confirm if winner matches horse from user bet
  let isUserWinner = raceInfo.race.horses[savedBet]?.id === winner.horseInfo.id
  savedBet === null ? isUserWinner = null : null // if user didn't place a bet

  const modalStyle = {backgroundColor: "black", color: "white"}

  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header className={styles.modal}>
        <Modal.Title>Race Results</Modal.Title>
      </Modal.Header>
      <Modal.Body className={styles.modal}>
        {(!gameState || gameState.status !== 'results') ? (
          <div>Loading results...</div>
        ) : (
          <div className={styles.resultsBody}>
            <div className="winLoseMsg">
              {
                isUserWinner
                ? <h1>You Won</h1>
                : isUserWinner === false ? <h1>You Lost</h1> : null
              }
            </div>
            {winner ? (
              <div className={styles.winner}>
                <h2>🏆 {winner.horseInfo.name}</h2>
                <ul>
                  <li>Finish Time: {winner.finishTime / 1000} s</li>
                </ul>
              </div>
            ) : (
              <p className={styles.winner}>No results available.</p>
            )}
            <ol>
              {sortedHorses.map((horse, index) => {
                const finishTime = finishTimes[horse.index]
                const minutes = Math.floor(finishTime/(60*1000))
                const seconds = Math.floor((finishTime - minutes*60*1000)/1000)
                const ms = finishTime-seconds

                return (
                  <li key={index} className="row m-2 w-100">
                    <div className="col-6">{index === 0 ? "🏆" : null} {horse.horseInfo.name}</div>
                    <div className="col-6">time: {" "} {minutes}:{seconds}:{ms}</div>
                  </li>
                )
              })}
            </ol>
          </div>
        )}
      </Modal.Body>
      <Modal.Footer style={modalStyle}>
        <Button onClick={handleClose} variant="secondary">Close</Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ResultsMode;
