import React, { createContext } from 'react';
import { WS_BASE } from './config';

const WebSocketContext = createContext(null);

export { WebSocketContext };

const BitfinexWebSocket = ({ children }) => {
    let socket;
    let ws;

    if (!socket) {
        socket = new WebSocket(WS_BASE)

        socket.close = () => {
            // automatically re-connect
            setTimeout(() => {
                socket = new WebSocket(WS_BASE)
            })
        }

        ws = {
            socket
        }
    }

    return (
        <WebSocketContext.Provider value={ws}>
            {children}
        </WebSocketContext.Provider>
    )
}

export default BitfinexWebSocket;
