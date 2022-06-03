import { createSlice } from '@reduxjs/toolkit';

export const orderBookSlice = createSlice({
    name: 'orderbook',
    initialState: {
        sellOrders: [],
        buyOrders: [],
    },
    reducers: {
        addOrder: (state, action) => {
            if (action.payload[1].length > 3) {
                // bulk orders
                action.payload[1].map(ord => {
                    const order = {
                        channel: action.payload[0],
                        price: ord[0],
                        count: ord[1],
                        amount: ord[2]
                    }

                    if (order.count > 0) {
                        if (order.amount > 0) {
                            // add to sellorder
                            state.sellOrders.push(order)
                        } else {
                            state.buyOrders.push(order)
                        }
                    }

                    return ord;
                })
            } else {
                // single order
                const order = {
                    channel: action.payload[0],
                    price: action.payload[1][0],
                    count: action.payload[1][1],
                    amount: action.payload[1][2]
                }

                if (order.count > 0) {
                    if (order.amount > 0) {
                        // add to sellorder
                        state.sellOrders.push(order)
                    } else {
                        state.buyOrders.push(order)
                    }
                }
            }

            // cleanup to not overload memory
            state.sellOrders = state.sellOrders.slice(-20);
            state.buyOrders = state.buyOrders.slice(-20);
        }
    },
})

export const { addOrder } = orderBookSlice.actions;

export default orderBookSlice.reducer;
