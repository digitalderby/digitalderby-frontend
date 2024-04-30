import React, { useContext, useEffect } from 'react'
import "./racePage.css"
import { SocketContext } from '../../contexts/SocketContext';
import BettingMode from '../../components/racingComponents/BettingMode';
import RaceMode from '../../components/racingComponents/RaceMode';
import ResultsMode from '../../components/racingComponents/ResultsMode';

const RacePage = () => {
    //Pull in game state
    const {
        gameState,
        sendConnect,
        username,
        currentBet,
        betResults,
    
        connected
    } = useContext(SocketContext)

    useEffect(() => {
        console.log(gameState)
      }, [gameState])

    // switch rendered component based on game state
    switch (gameState?.status) {
        case "betting":
            return <BettingMode gameState={gameState}/>
            break;
        case "race":
            return <RaceMode gameState={gameState}/>
            break;
        case "results":
            return <ResultsMode gameState={gameState}/>
            break;
        default : 
            return <div>default case</div>
            break;
    }
}

export default RacePage