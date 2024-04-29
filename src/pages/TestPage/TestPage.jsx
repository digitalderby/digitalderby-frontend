import { useContext, useState } from "react";
import { SocketContext } from "../../contexts/SocketContext";
import { loginUser } from "../../services/apiService";
import { connect } from "../../services/socketService";

export default function TestPage() {
  const {
    gameState,
    sendConnect,
    username,
    currentBet,
    betResults,

    connected
  } = useContext(SocketContext)

  let prettifiedGameState = gameState
  if (gameState !== null) {
    prettifiedGameState = {
      status: gameState.status,
      lag: gameState.lag,
    }

    if (gameState.status === 'betting') {
      prettifiedGameState = {
        ...prettifiedGameState,
        horses: gameState.race.horses.map((h) => ({
          name: h.spec.name
        }))
      }
    }

    if (gameState.status === 'race') {
      prettifiedGameState = {
        ...prettifiedGameState,
        horses: gameState.raceStates.horseStates.map((hs) => {
          return {
            name: hs.horse.name,
            position: hs.position,
            finishTime: hs.finishTime,
          }
        }),
        rankings: gameState.raceStates.rankings,
      }
    }

    if (gameState.status === 'results') {
      prettifiedGameState = {
        ...prettifiedGameState,
        horses: gameState.raceStates.horseStates.map((hs) => {
          return {
            name: hs.horse.name,
            position: hs.position,
            finishTime: hs.finishTime,
          }
        }),
        rankings: gameState.raceStates.rankings,
      }
    }
  }

  const [user, setUser] = useState('')
  const [password, setPassword] = useState('')

  async function handleSubmit(evt) {
    evt.preventDefault()
    const resp = await loginUser(user, password)
    if (resp.data.token !== undefined) {
      connect(resp.data.token)
    }
  }

  return (
    <>
      <form onSubmit={handleSubmit}>
        <input 
          type="text"
          name="username"
          value={user}
          onChange={(evt) => setUser(evt.target.value)}
        />
        <input 
          type="password"
          name="password"
          value={password}
          onChange={(evt) => setPassword(evt.target.value)}
        />
        <button type="submit">submit</button>
      </form>
      <div>
        {(connected)
          ? (<>logged in as {username}</>)
          : (<>not connected</>) }
      </div>
      <div style={{textAlign: 'left', backgroundColor: 'black', color: 'white',}}>
        <pre>
          {JSON.stringify(prettifiedGameState, null, 2)}
        </pre>
      </div>
    </>
  )
}
