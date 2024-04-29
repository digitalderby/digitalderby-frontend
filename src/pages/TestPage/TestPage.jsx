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
      <div style={{textAlign: 'left', backgroundColor: 'black', color: 'white',}}>
        <pre>
          {JSON.stringify(gameState, null, 2)}
        </pre>
      </div>
    </>
  )
}
