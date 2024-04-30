import { createContext, useEffect, useState } from "react";
import { connect, socket } from "../services/socketService";

export const SocketContext = createContext(null);

export function SocketContextProvider({ children }) {
  const [connected, setConnected] = useState(socket.connected);
  const [username, setUsername] = useState('');
  const [gameState, setGameState] = useState(null);
  const [betResults, setBetResults] = useState(null);
  const [currentBet, setCurrentBet] = useState(null);

  useEffect(() => {
    socket.on('connect', () => setConnected(true));
    socket.on('username', (name) => setUsername(name));
    socket.on('disconnect', () => {
      setConnected(false);
      setBetResults(null);
      setCurrentBet(null);
      setGameState(null);
    });
    socket.on('gamestate', setGameState);
    socket.on('currentBet', setCurrentBet);
    socket.on('betResults', setBetResults);

    return () => {
      socket.off('connect');
      socket.off('username');
      socket.off('disconnect');
      socket.off('gamestate');
      socket.off('currentBet');
      socket.off('betResults');
    };
  }, []);

  // Function to connect the socket, exposed through context
  const connectSocket = (token) => {
    connect(token); 
  };

  return (
    <SocketContext.Provider value={{
      gameState,
      connected,
      username,
      currentBet,
      betResults,
      connectSocket, // Expose connectSocket function
    }}>
      {children}
    </SocketContext.Provider>
  );
}
