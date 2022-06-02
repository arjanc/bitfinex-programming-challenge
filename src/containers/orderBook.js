import React, {useEffect, useContext } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import Collapsible from '../components/collapsible/collapsible';
import Book from '../components/book/book';
import { WebSocketContext } from '../WebSocket';
import { addOrder } from '../features/orderbook/orderBookSlice';

const OrderBook = () => {
    const { orders } = useSelector((state) => state.orderbook)
    const dispatch = useDispatch();

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
            // note: I'am not fully aware of the data structure of the order book right now.
            if (payload && payload[1] && payload.event === undefined) {
                dispatch(addOrder(payload))
            }

        }
    }, [dispatch, ws]);

    return (
        <Collapsible title="orderbook">
            <div>
                <Book orders={orders} />
            </div>
        </Collapsible>
    )
}

export default OrderBook;
