import { useContext, useState } from 'react'
import "./racePage.css"
import { SocketContext } from '../../contexts/SocketContext';
import BettingMode from '../../components/racingComponents/BettingMode';
import RaceMode from '../../components/racingComponents/RaceMode';
import ResultsMode from '../../components/racingComponents/ResultsMode';

const RacePage = () => {
    const {
        gameState,
        raceInfo,
    } = useContext(SocketContext)

    const [betMode, setBetMode] = useState(false);
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
            <RaceMode />
            <BettingMode show={betMode} handleClose={handleCloseBet}/>
            <ResultsMode show={resultsMode} handleClose={handleCloseRes}/>

        </>
    )
}

export default RacePage
