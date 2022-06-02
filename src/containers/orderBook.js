import React, { useState, useEffect, useContext } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import Collapsible from '../components/collapsible/collapsible';
import Book from '../components/book/book';
import { WebSocketContext } from '../WebSocket';
import { addOrder } from '../features/orderbook/orderBookSlice';

const OrderBook = () => {
    const { orders } = useSelector((state) => state.orderbook)
    const dispatch = useDispatch();
    const [channel, setChannel] = useState(null);

    const ws = useContext(WebSocketContext);

    useEffect(() => {
        ws.socket.onopen = () => {
            const msg = JSON.stringify({
                event: 'subscribe',
                channel: 'book',
                symbol: 'tBTCUSD',
                prec: 'P0',
                freq: 'F0',
                len: '25',
            })
            ws.socket.send(msg);
        }

        ws.socket.onmessage = evt => {
            const payload = JSON.parse(evt.data);

            if (payload.event === 'subscribed') {
                setChannel(payload.chanId)
            }

            if (channel && payload[0] === channel) {
                // note: I'am not fully aware of the data structure of the order book right now.
                dispatch(addOrder(payload))
            }

        }
    }, [dispatch, ws, channel, setChannel]);

    return (
        <Collapsible title="orderbook">
            <div>
                <Book orders={orders} />
            </div>
        </Collapsible>
    )
}

export default OrderBook;
