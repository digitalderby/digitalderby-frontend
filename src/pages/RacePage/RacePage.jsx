import { useContext, useEffect, useState } from "react";
import { SocketContext } from "../../contexts/SocketContext";
import BettingMode from "../../components/racingComponents/BettingMode";
import RaceMode from "../../components/racingComponents/RaceMode";
import ResultsMode from "../../components/racingComponents/ResultsMode";
import "./racePage.css";
import { Button } from "react-bootstrap";

const RacePage = () => {
  //Pull in game state
  const {
    gameState,
    raceInfo,
    sendConnect,
    username,
    currentBet,
    betResults,
    user,
    connected,
  } = useContext(SocketContext);
  //if betMode is true, BetModal is displayed
  const initialState = { open: false, userClosed: false };
  const openState = { open: true, userClosed: false };

  const [betMode, setBetMode] = useState(initialState);
  const userCloseBet = () => setBetMode({ open: false, userClosed: true });
  const handleShowBet = () => setBetMode(openState);
  const autoCloseBet = () => setBetMode(initialState);

  //if resultsMode is true, ResultsModal is displayed
  const [resultsMode, setResultsMode] = useState(initialState);
  const userCloseRes = () => setResultsMode({ open: false, userClosed: true });
  const handleShowRes = () => setResultsMode(openState);
  const autoCloseRes = () => setResultsMode(initialState);

  function switchToBetMode() {
    autoCloseRes();
    handleShowBet();
  }
  useEffect(() => {
    switch (gameState?.status) {
      case "betting":
        !betMode.open && !betMode.userClosed && switchToBetMode();
        break;
      case "race":
          betMode.open && autoCloseBet();
        break;
      case "results":
        !resultsMode.userClosed && handleShowRes();
        break;
      default:
        null;
        break;
    }
  }, [gameState]);

  return (
    <>
      <RaceMode gameState={gameState} />
      <BettingMode
        gameState={gameState}
        show={betMode.open}
        handleClose={userCloseBet}
        user={user}
      />
      <ResultsMode
        gameState={gameState}
        show={resultsMode.open}
        handleClose={userCloseRes}
      />
      {gameState?.status === "betting" || gameState?.status === "results" ? (
        gameState?.status === "betting"
        ? <Button
          id="openModals"
          onClick={handleShowBet}
        >Place a Bet</Button>
        : <Button
        id="openModals"
        onClick={handleShowRes}
      >See Results</Button>
      ) : null}
    </>
  );
};

export default RacePage;
