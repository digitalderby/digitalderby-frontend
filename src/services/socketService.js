import { io } from 'socket.io-client'

export const BACKEND_URL = import.meta.env.VITE_API_URL

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
