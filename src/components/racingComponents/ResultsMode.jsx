import { Modal, Button } from "react-bootstrap";
import { useNavigate } from "react-router";
import { socket } from "../../services/socketService";
import { useContext } from "react";
import { SocketContext } from "../../contexts/SocketContext";

const ResultsMode = ({ show, handleClose }) => {
  const {
      gameState,
      raceInfo,
  } = useContext(SocketContext)
  const navigate = useNavigate();
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

  const closeGame = () => {
    socket.close();
    navigate("/");
  };

  return (
    <Modal show={show} onHide={handleClose} centered backdrop="static">
      <Modal.Header>
        <Modal.Title>Results</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {(!gameState || gameState.status !== 'results') ? (
          <div>Loading results...</div>
        ) : (
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
                  {horse.horse.name} - Finished with a time of{" "}
                  {horse.finishTime}
                  ms, Final speed: {horse.currentSpeed}
                </li>
              ))}
            </ol>
          </div>
        )}
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={closeGame}>Exit Race</Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ResultsMode;
