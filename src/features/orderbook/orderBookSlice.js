import { createSlice } from '@reduxjs/toolkit';

export const orderBookSlice = createSlice({
    name: 'orderbook',
    initialState: {
        orders: []
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
                    state.orders.push(order)
                })
            } else {
                // single order
                const order = {
                    channel: action.payload[0],
                    price: action.payload[1][0],
                    count: action.payload[1][1],
                    amount: action.payload[1][2]
                }
                state.orders.push(order)
            }

            // cleanup to not overload memory
            state.orders = state.orders.slice(-20)
        },
    },
})

export const { addOrder } = orderBookSlice.actions;

export default orderBookSlice.reducer;
