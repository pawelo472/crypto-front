import { configureStore } from "@reduxjs/toolkit";
import {binanceApi} from '../services/CryptoApi';
export default configureStore({
    reducer:{[binanceApi.reducerPath]:binanceApi.reducer,},
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(binanceApi.middleware),
});

