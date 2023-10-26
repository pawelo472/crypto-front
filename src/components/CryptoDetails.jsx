import React, { useEffect, useState } from 'react';
import { Typography, Card,Row, Col, Statistic, Button, Space, Input } from 'antd';
import { useGetCryptosDetailsQuery, useGetCryptosQuery } from '../services/CryptoApi';
import '../App.css';
import reactRouterDom,{Link, useParams} from 'react-router-dom';
import { MoneyCollectOutlined, DollarCircleOutlined, FundOutlined, ExclamationCircleOutlined, StopOutlined, TrophyOutlined, CheckOutlined, NumberOutlined, ThunderboltOutlined } from '@ant-design/icons';

const { Title, Text } = Typography;
const CryptoDetails = () => {
  const { symbol } = useParams(); // Pobierz symbol z parametrów URL

  // Zmodyfikuj dane pobierane z API tak, aby filtrować po symbolu
  const { data: cryptosData, refetch: cryptosRefetch } = useGetCryptosQuery(symbol);
  const { data: detailsData, refetch: detailsRefetch } = useGetCryptosDetailsQuery(symbol);

  // Function to fetch data every second for cryptos
  const fetchCryptosDataEverySecond = () => {
    cryptosRefetch();
  };

  // Function to fetch data every second for details
  const fetchDetailsDataEverySecond = () => {
    detailsRefetch();
  };

  useEffect(() => {
    // Start fetching data every second when the component mounts for cryptos
    const cryptosInterval = setInterval(fetchCryptosDataEverySecond, 3000);

    // Start fetching data every second when the component mounts for details
    const detailsInterval = setInterval(fetchDetailsDataEverySecond, 3000);

    // Clear the intervals when the component unmounts
    return () => {
      clearInterval(cryptosInterval);
      clearInterval(detailsInterval);
    };
  }, []); // Empty dependency array to run this effect only once when the component mounts

  // Sprawdzamy, czy dane są dostępne i czy są w formie tablicy
  if (!cryptosData || !Array.isArray(cryptosData) || !detailsData) {
    return (
      <>
        <Title level={2}>Crypto Details for {symbol.replace("USDT", "")}</Title>
        <p>Loading...</p>
      </>
    );
  }

  // Filtrujemy tylko symbole zawierające przekazany symbol
  const filteredCryptos = cryptosData.filter(crypto => crypto.symbol === symbol);
  const price = filteredCryptos.length > 0 ? filteredCryptos[0].price : 0;
  //const filteredDetails = detailsData.filter(cryptodetails => cryptodetails.symbol.toLowerCase() === symbol);
  const stats=[
    {title: 'Price in $', value: parseFloat(price).toFixed(4), icon: <DollarCircleOutlined/>},
    //{title: '24h Volume', value: parseFloat(cryptodetails.volume).toFixed(4), icon: <DollarCircleOutlined/>},
  ]
  return (
    <div>
      <Title level={2}>Crypto Details for {symbol.replace("USDT", "")}</Title>
    {stats.map(({title, icon, value})=>(
      <Col className="coin-stats">
      <Col className="coin-stats-name">
        <Text>{icon}</Text>
        <Text>{title}</Text>
      </Col>
      <Text className="stats">{value}</Text>
    </Col>
    ))}
    </div>
  );
}

export default CryptoDetails