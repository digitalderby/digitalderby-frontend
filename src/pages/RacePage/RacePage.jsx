import { useContext, useEffect, useState } from 'react'
import "./racePage.css"
import { SocketContext } from '../../contexts/SocketContext';
import BettingMode from '../../components/racingComponents/BettingMode';
import RaceMode from '../../components/racingComponents/RaceMode';
import ResultsMode from '../../components/racingComponents/ResultsMode';
import { Button } from 'react-bootstrap';

const RacePage = () => {
    //Pull in game state
    const {
        gameState,
        sendConnect,
        username,
        currentBet,
        betResults,
        user,
        connected
    } = useContext(SocketContext)

    const [betMode, setBetMode] = useState(false);
    // const [resultsMode, setResultsMode] = useState(false)
    const handleCloseBet = () => setBetMode(false);
    const handleShowBet = () => setBetMode(true);

    const [resultsMode, setResultsMode] = useState(false)
    const handleCloseRes = () => setResultsMode(false)
    const handleShowRes = () => setResultsMode(true)
    function switchToBetMode () {
        handleCloseRes()
        handleShowBet()
    }

    switch (gameState?.status) {
        case "betting": !betMode ? switchToBetMode() : null 
            break;
        case "race": betMode && handleCloseBet()
            break;
        case "results": !resultsMode && handleShowRes()
            break;
        default : null
            break;
    }

    return (
        <>
            <RaceMode gameState={gameState}/>
            <BettingMode gameState={gameState} show={betMode} handleClose={handleCloseBet} user={user}/>
            <ResultsMode gameState={gameState} show={resultsMode} handleClose={handleCloseRes}/>
            <Button variant="primary" onClick={handleShowBet}>
                Launch Betting Modal
            </Button>
        </>
    )
}

export default RacePage