import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { useEffect, useState } from 'react';

const binanceApiHeaders = {
  //'content-type': 'application/json',
};


const createRequest = (url) => ({ url, headers: binanceApiHeaders });

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

export const register = createApi({
  reducerPath: 'register',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:8085/api/v1/' }),
  endpoints: (builder) => ({
    registerUser: builder.mutation({
      query: (user) => ({
        url: 'user/save',
        method: 'POST',
        body: user,
      }),
    }),
  }),
});

export const {
  reducer,
  middleware,
  useRegisterUserMutation,
} = register;