import { io } from 'socket.io-client'

export const BACKEND_URL = 'http://localhost:3000'

export let socket = io(`${BACKEND_URL}/user`, {
    autoConnect: false,
})

export function connect(token) {
    console.log(token)
    socket.auth = {
        token: token,
    }
    socket.connect()
}
