import { createContext, useEffect, useState } from "react";
import { connect, socket } from "../services/socketService";

export const SocketContext = createContext(null);

export function SocketContextProvider({ children }) {
  const [connected, setConnected] = useState(socket.connected);
  const [connectionError, setConnectionError] = useState(null);

  const [raceInfo, setRaceInfo] = useState(null);
  const [clientStatus, setClientStatus] = useState(null);
  const [gameState, setGameState] = useState(null);
  const [betResults, setBetResults] = useState(null);
  const [poolValue, setPoolValue] = useState(null);

  useEffect(() => {
    socket.on('connect', () => setConnected(true));
    socket.on('connect_error', (err) => {
        console.log(err)
        setConnectionError(err)
    });
    socket.on('disconnect', () => {
      setConnected(false);

      setBetResults(null);
      setGameState(null);
      setClientStatus(null);
      setPoolValue(null);
    });

    socket.on('gameStatev2', setGameState);
    socket.on('betResults', setBetResults);
    socket.on('clientStatus', setClientStatus);
    socket.on('poolValue', setPoolValue);
    socket.on('raceInfo', setRaceInfo);

    return () => {
      socket.off('connect');
      socket.off('connect_error');
      socket.off('username');
      socket.off('disconnect');
      socket.off('gamestate');
      socket.off('currentBet');
      socket.off('betResults');
      socket.off('clientStatus');
    };
  }, []);

  // Function to connect the socket, exposed through context
  const connectSocket = (token) => {
    connect(token); 
  };

  return (
    <SocketContext.Provider value={{
      connected,
      connectionError,

      raceInfo,
      clientStatus,
      gameState,
      betResults,
      poolValue,

      connectSocket, // Expose connectSocket function
    }}>
      {children}
    </SocketContext.Provider>
  );
}

