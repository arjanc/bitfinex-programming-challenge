import React, { useState, useEffect, useContext } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import Collapsible from '../components/collapsible/collapsible';
import Book from '../components/book/book';
import { WebSocketContext } from '../WebSocket';
import { addOrder } from '../features/orderbook/orderBookSlice';

const OrderBook = () => {
    const { sellOrders, buyOrders } = useSelector((state) => state.orderbook)
    const dispatch = useDispatch();
    const [channel, setChannel] = useState(null);
    const [precision, setPrecision] = useState('P0');

    const ws = useContext(WebSocketContext);

    useEffect(() => {
        ws.socket.onopen = () => {
            const msg = JSON.stringify({
                event: 'subscribe',
                channel: 'book',
                symbol: 'tBTCUSD',
                prec: precision,
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


            if (payload.event) {
                console.log('event: ', payload.event, ' / ', payload);
            }

            if (channel && payload[0] === channel) {
                dispatch(addOrder(payload))
            }
        }
    }, [dispatch, ws, channel, setChannel, precision]);

    useEffect(() => {
        if (ws.socket.readyState >= 1) {
            // first unsubscribe to existing channel
            const unsubscribe = JSON.stringify({
                event: 'unsubscribe',
                chanId: channel,
            })
            ws.socket.send(unsubscribe);

            // subscribe to channel with different precision
            const msg = JSON.stringify({
                event: 'subscribe',
                channel: 'book',
                symbol: 'tBTCUSD',
                prec: precision,
                freq: 'F0',
                len: '25',
            })
            ws.socket.send(msg);
        }

    }, [precision])

    return (
        <>
            <form>
                <label>Change precision
                <select id='precision' onChange={(evt) => setPrecision(evt.target.value)}>
                    <option value='P0'>P0</option>
                    <option value='P1'>P1</option>
                    <option value='P2'>P2</option>
                    <option value='P3'>P3</option>
                </select>
                </label>
            </form>
            <Collapsible title="orderbook">
                <div style={{display: 'flex'}}>
                    <Book orders={buyOrders} />
                    <Book orders={sellOrders} />
                </div>
            </Collapsible>
        </>
    )
}

export default OrderBook;
