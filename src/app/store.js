import { configureStore } from "@reduxjs/toolkit";
import {binanceApi,wallet} from '../services/CryptoApi';
export default configureStore({
    reducer:{[binanceApi.reducerPath]:binanceApi.reducer,[wallet.reducerPath]:wallet.reducer,},
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(binanceApi.middleware,wallet.middleware,),
});

