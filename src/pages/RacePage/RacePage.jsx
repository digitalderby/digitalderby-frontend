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

    const [betMode, setBetMode] = useState(true);
    // const [resultsMode, setResultsMode] = useState(false)
    const handleClose = () => setBetMode(false);
    const handleShow = () => setBetMode(true);

    switch (gameState?.status) {
        case "betting": !betMode && handleShow()
            break;
        case "race": betMode && handleClose()
            break;
        case "results": console.log('results mode')
            break;
        default : null
            break;
    }

    return (
        <>
            <RaceMode gameState={gameState}/>
            <BettingMode gameState={gameState} show={betMode} handleClose={handleClose} user={user}/>
            <Button variant="primary" onClick={handleShow}>
                Launch Betting Modal
            </Button>
        </>
    )
}

export default RacePage