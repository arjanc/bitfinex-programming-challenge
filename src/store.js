import { configureStore } from '@reduxjs/toolkit';
import orderReducer from './features/orderbook/orderBookSlice';

export default configureStore({
    reducer: {
        orderbook: orderReducer
    },
})
