import React, { useState, useEffect } from 'react';
import { FlatList, Text } from 'react-native';
import Binance from 'binance-api-node';

const MyComponent = () => {
  const [tickerData, setTickerData] = useState([]);

  useEffect(() => {
    const client = Binance({
      apiKey: 'q1pQetgeBRA3WDaaWVOQM68oYTDWB8mMO9ATg8Lpp74r91KOCHozNeU0RxecULLz',
      apiSecret: 'cjvelBcWP05hZw6e5UttMzKGqrspYLphfx6Q7LZv0up3sE9QyTjgUk6fvwqcjo36',
    });

    client.ws.ticker('BTCUSDT', (ticker) => {
      setTickerData((prevData) => [...prevData, ticker]);
    });
  }, []);

  return (
    <FlatList
      data={tickerData}
      renderItem={({ item }) => (
        <Text>{`${item.symbol}: ${item.price}`}</Text>
      )}
      keyExtractor={(item) => item.symbol}
    />
  );
};
console.log(MyComponent);
export default MyComponent;