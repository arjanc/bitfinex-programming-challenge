import { createSlice } from '@reduxjs/toolkit';

export const orderBookSlice = createSlice({
    name: 'orderbook',
    initialState: {
        orders: [
            [0,
                [0, 0, 0]
            ]
        ]
    },
    reducers: {
        addOrder: (state, action) => {
            state.orders.push(action.payload)
            // cleanup to not overload memory
            state.orders = state.orders.slice(-20)
        },
    },
})

export const { addOrder } = orderBookSlice.actions;

export default orderBookSlice.reducer;
