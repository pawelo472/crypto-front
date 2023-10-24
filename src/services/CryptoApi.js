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
  }),
});

export const {
  useGetServerTimeQuery,
  useGetCryptosQuery,
} = binanceApi;

// Dodaj hook do odświeżania danych co sekundę
export const useAutoRefresh = (queryHook, interval = 1000) => {
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const result = await queryHook();
      setData(result.data);
    };

    const intervalId = setInterval(fetchData, interval);

    return () => {
      clearInterval(intervalId);
    };
  }, [queryHook, interval]);

  return data;
};
