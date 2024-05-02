import { useEffect } from "react";
import { Modal, Button } from "react-bootstrap";
import styles from "./racingComponents.module.css";
import { useNavigate } from "react-router";

const ResultsMode = ({ gameState, show, handleClose }) => {
  // useEffect(() => {
  //   console.log('Current gameState in ResultsMode:', gameState);
  // }, [gameState]);
  const navigate = useNavigate()

  if (
    !gameState ||
    !gameState.raceStates ||
    !gameState.raceStates.horseStates
  ) {
    return <div>Loading results...</div>;
  }

  // Extract horse states and rankings
  const { horseStates, rankings } = gameState.raceStates;

  // Sort horses based on rankings to display in order
  const sortedHorses = rankings.map((index) => horseStates[index]);

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
              <h2>🏆 {winner.horse.name}</h2>
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
            {sortedHorses.map((horse, index) => (
              <li key={index}>
                {horse.horse.name} - Finished with a time of {horse.finishTime}
                ms, Final speed: {horse.currentSpeed}
              </li>
            ))}
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
