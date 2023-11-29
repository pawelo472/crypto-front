import { configureStore } from "@reduxjs/toolkit";
import {binanceApi,register,login} from '../services/CryptoApi';
export default configureStore({
    reducer:{[binanceApi.reducerPath]:binanceApi.reducer,[register.reducerPath]:register.reducer,},
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(binanceApi.middleware,register.middleware,),
});

