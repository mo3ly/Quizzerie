import Pusher from 'pusher-js'
import axios from './axios'

const pusher = new Pusher(process.env.NEXT_PUBLIC_SOKETI_KEY, {
    wsHost: process.env.NEXT_PUBLIC_SOKETI_HOST,
    wsPort: process.env.NEXT_PUBLIC_SOKETI_PORT,
    forceTLS: false,
    encrypted: true,
    disableStats: true,
    enabledTransports: ['ws', 'wss'],
    authorizer: (channel, options) => {
        return {
            authorize: (socketId, callback) => {
                axios
                    .post('/broadcasting/auth', {
                        socket_id: socketId,
                        channel_name: channel.name,
                    })
                    .then(response => {
                        callback(false, response.data)
                    })
                    .catch(error => {
                        callback(true, error)
                    })
            },
        }
    },
})

export default pusher
