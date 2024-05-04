import { Modal, Button } from "react-bootstrap";
import { useNavigate } from "react-router";
import { socket } from "../../services/socketService";
import { useContext } from "react";
import { SocketContext } from "../../contexts/SocketContext";
import "./racingComponents.module.css"

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

  const modalStyle = {backgroundColor: "black", color: "white"}

  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header style={modalStyle}>
        <Modal.Title>Results</Modal.Title>
      </Modal.Header>
      <Modal.Body style={modalStyle}>
        {(!gameState || gameState.status !== 'results') ? (
          <div>Loading results...</div>
        ) : (
          <div>
            <h1>Race Results</h1>
            {winner ? (
              <div className="winner">
                <h2>🏆 {winner.horseInfo.name}</h2>
                <p>Details:</p>
                <ul>
                  <li>Finish Time: {winner.finishTime / 1000} s</li>
                </ul>
              </div>
            ) : (
              <p>No results available.</p>
            )}
            <h3>All Participants:</h3>
            <ol>
              {sortedHorses.map((horse, index) => {
                const finishTime = finishTimes[horse.index]
                const minutes = Math.floor(finishTime/(60*1000))
                const seconds = Math.floor((finishTime - minutes*60*1000)/1000)
                const ms = finishTime-seconds

                return (
                  <li key={index}>
                    {horse.horseInfo.name} - Finished with a time of{" "}
                    {minutes}:{seconds}:{ms}
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
