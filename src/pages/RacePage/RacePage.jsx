import { useContext, useEffect, useState } from "react";
import { SocketContext } from "../../contexts/SocketContext";
import BettingMode from "../../components/racingComponents/BettingMode";
import RaceMode from "../../components/racingComponents/RaceMode";
import ResultsMode from "../../components/racingComponents/ResultsMode";
import "./racePage.css";
import { Button } from "react-bootstrap";

const RacePage = () => {
  const {
    gameState,
    username,
    user,
  } = useContext(SocketContext);

  const initialState = { open: false, userClosed: false };
  const [raceComments, setRaceComments] = useState([]);
  const [betMode, setBetMode] = useState(initialState);
  const [resultsMode, setResultsMode] = useState(initialState);
  const [savedBet, setSavedBet] = useState(null);

  const handleShowBet = () => setBetMode({ open: true, userClosed: false });
  const handleShowRes = () => setResultsMode({ open: true, userClosed: false });

  const closeBetMode = () => setBetMode({ open: false, userClosed: true });
  const closeResultsMode = () => setResultsMode({ open: false, userClosed: true });

  useEffect(() => {
    switch (gameState?.status) {
      case "betting":
        handleShowBet();
        break;
      case "race":
        closeBetMode();
        break;
      case "results":
        handleShowRes();
        break;
      default:
        break;
    }

    if (gameState?.status === "race" && gameState.eventMessages) {
      const newComments = [...gameState.eventMessages];
      setRaceComments((prevComments) => {
        // Add new comments and ensure only the latest 3 are kept
        return [...prevComments, ...newComments].slice(-3);
      });
    }
  }, [gameState]);

  return (
    <>
      <RaceMode gameState={gameState} />
      <BettingMode
        gameState={gameState}
        show={betMode.open}
        handleClose={closeBetMode}
        user={user}
        setSavedBet={setSavedBet}
      />
      <ResultsMode
        gameState={gameState}
        show={resultsMode.open}
        handleClose={closeResultsMode}
        savedBet={savedBet}
      />
      {gameState?.status === "betting" || gameState?.status === "results" ? (
        <Button
          id="openModals"
          onClick={gameState?.status === "betting" ? handleShowBet : handleShowRes}
        >{gameState?.status === "betting" ? "Place a Bet" : "See Results"}
        </Button>
      ) : null}
      <div className="comment-box">
        <div className="comments">
          {raceComments.map((comment, index) => (
            <p key={index}>{comment}</p>  
          ))}
        </div>
      </div>
    </>
  );
};

export default RacePage;
