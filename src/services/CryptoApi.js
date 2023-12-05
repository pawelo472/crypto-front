import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { useEffect, useState } from 'react';
const CryptoJS = require('crypto-js');

const recvWindow = 60000;
var time_server=Date.now();
const time_minus_one_hour = time_server - (10000);
//console.log(time_server);
// const payload = time_server + "\n" + nonce + "\n" + body + "\n";
const apiPublic='q1pQetgeBRA3WDaaWVOQM68oYTDWB8mMO9ATg8Lpp74r91KOCHozNeU0RxecULLz';
const apiSecret= 'cjvelBcWP05hZw6e5UttMzKGqrspYLphfx6Q7LZv0up3sE9QyTjgUk6fvwqcjo36';
const signature = CryptoJS.HmacSHA256(time_server, apiSecret).toString(CryptoJS.enc.Hex);
const createRequest = (url) => ({ url, headers: binanceApiHeaders });
const createRequest2 = (url) => ({ url, headers: binanceApiHeaders2,params: parameters });


const binanceApiHeaders = {
  //'content-type': 'application/json',
};
const binanceApiHeaders2 = {
  "x-mbx-apikey": apiPublic,
};
const parameters = {
  timestamp: time_server,
  signature: signature,
  recvWindow: recvWindow,
};



export const binanceApi = createApi({
  reducerPath: 'binanceApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://api.binance.com/api/v3/' }),
  endpoints: (builder) => ({
    getServerTime: builder.query({
      query: () => createRequest('time'),
    }),
    getCryptos: builder.query({
      query: () => createRequest('ticker/price'),
    }),
    getCryptosDetails: builder.query({
      query: () => createRequest('/ticker/24hr'),
    }),
  }),
});



export const {
  useGetServerTimeQuery,
  useGetCryptosQuery,
  useGetCryptosDetailsQuery,
} = binanceApi;

export const wallet = createApi({
  reducerPath: 'wallet',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://api.binance.com' }),
  endpoints: (builder) => ({
    getWallet: builder.query({
      query: () => createRequest2('/sapi/v1/capital/config/getall'),
    }),
  }),
});

export const {
   reducer,
  middleware,
  useGetWalletQuery,
} = wallet;

// export const register = createApi({
//   reducerPath: 'register',
//   baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:8085/api/v1/' }),
//   endpoints: (builder) => ({
//     registerUser: builder.mutation({
//       query: (user) => ({
//         url: 'user/save',
//         method: 'POST',
//         body: user,
//       }),
//     }),
//   }),
// });

// export const {
//   reducer,
//   middleware,
//   useRegisterUserMutation,
// } = register;
