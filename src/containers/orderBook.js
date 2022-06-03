import React, { useEffect, useState, useRef, useContext } from 'react';
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
    const initialized = useRef(false);
    const websocketState = useRef(null);

    const ws = useContext(WebSocketContext);

    useEffect(() => {
        if (!initialized.current) {
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

            initialized.current = true;
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [initialized]);

    useEffect(() => {
        if (websocketState.current !== ws.socket.readyState && ws.socket.readyState === 0) {
            websocketState.current = ws.socket.readyState
            ws.socket.onmessage = ({ data }) => {
                const payload = JSON.parse(data);

                if (payload.event === 'subscribed') {
                    setChannel(payload.chanId)
                }

                if (typeof payload[0] === 'number') {
                    dispatch(addOrder(payload))
                }
            }
        }
    }, [ws, websocketState, setChannel, dispatch])

    const handlePrecisionChange = (event) => {
        const newPrecision = event.target.value;

        if (ws.socket.readyState >= 1 && precision !== newPrecision) {
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
                prec: newPrecision,
                freq: 'F0',
                len: '25',
            })
            ws.socket.send(msg);
        }

        setPrecision(newPrecision)
    }

    return (
        <>
            <form>
                <label>Change precision
                <select id='precision' onChange={handlePrecisionChange}>
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
                    <Book orders={sellOrders} alignment="right" />
                </div>
            </Collapsible>
        </>
    )
}
export default OrderBook;
