import { useContext, useEffect } from "react";
import { Modal, Button } from "react-bootstrap";
import styles from "./racingComponents.module.css";
import { useNavigate } from "react-router";
import { SocketContext } from "../../contexts/SocketContext";

const ResultsMode = ({ show, handleClose }) => {
  const {
    gameState,
    raceInfo,
  } = useContext(SocketContext)
  const navigate = useNavigate()

  if (
    !gameState ||
    gameState.status !== 'results'
  ) {
    return <div>Loading results...</div>;
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

  return (
    <Modal show={show} onHide={handleClose} centered backdrop="static">
      <Modal.Header>
        <Modal.Title>Results</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div>
          <h1>Race Results</h1>
          {winner ? (
            <div className="winner">
              <h2>🏆 {winner.horseInfo.name}</h2>
              <p>Details:</p>
              <ul>
                <li>Finish Time: {winner.finishTime / 1000} s</li>
                <li>Current Speed: {winner.currentSpeed}</li>
              </ul>
            </div>
          ) : (
            <p>No results available.</p>
          )}
          <h3>All Participants:</h3>
          <ol>
            {sortedHorses.map((horse, index) => {
              const name = horse.horseInfo.name
              const finishTime = finishTimes[horse.index]
              const minutes = Math.floor(finishTime/(60 * 1000))
              const seconds = Math.floor((finishTime - minutes*60*1000)/1000)
              const ms = finishTime - seconds*1000

              return (
                <li key={index}>
                  {name} - Finished with a time of {minutes}:{seconds}:{ms}
                  ms
                </li>
              )
            }
            )}
          </ol>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={() => navigate('/')}>Exit Race</Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ResultsMode;
