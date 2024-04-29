import { createContext, useEffect, useState } from "react";
import { connect, socket } from "../services/socketService";

export const SocketContext = createContext(null)

export function SocketContextProvider({ children }) {
  const [connected, setConnected] = useState(socket.connected)
  const [username, setUsername] = useState('')
  const [gameState, setGameState] = useState(null)
  
  const [betResults, setBetResults] = useState(null)
  const [currentBet, setCurrentBet] = useState(null)

  useEffect(() => {
    function onConnect() {
      setConnected(true)
    }

    function onDisconnect() {
      setConnected(false)
      setBetResults(null)
      setCurrentBet(null)
      setGameState(null)
    }

    function onGameState(state) {
      setGameState(state)
    }

    function onCurrentBet(bet) {
      setCurrentBet(bet)
    }

    function onBetResults(results) {
      setBetResults(results)
    }

    socket.on('connect', onConnect)
    socket.on('disconnect', onDisconnect)
    socket.on('gamestate', onGameState)
    socket.on('currentBet', onCurrentBet)
    socket.on('betResults', onBetResults)

    return () => {
      socket.off('connect', onConnect)
      socket.off('disconnect', onDisconnect)
      socket.off('gamestate', onGameState)
      socket.off('currentBet', onCurrentBet)
      socket.off('betResults', onBetResults)
    }
  }, [])

  return (
    <SocketContext.Provider value={{
      gameState,
      connected,
      username,
      currentBet,
      betResults,
    }}>
      {children}
    </SocketContext.Provider>
  )
}
