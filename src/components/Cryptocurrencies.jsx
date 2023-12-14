import React, { useEffect, useState } from 'react';
import { Typography, Card,Row, Col, Statistic, Button, Space, Input } from 'antd';
import { useGetCryptosDetailsQuery, useGetCryptosQuery } from '../services/CryptoApi';
import '../App.css';
import {Link} from 'react-router-dom';

const { Title } = Typography;

export const Cryptocurrencies = () => {

  

  const { data: cryptosData, refetch: cryptosRefetch } = useGetCryptosQuery();
  const { data: detailsData, refetch: detailsRefetch } = useGetCryptosDetailsQuery();
  const [showHidden, setShowHidden] = useState(false);
  const [searchKeyword, setSearchKeyword] = useState('');

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
        <Title level={2}>Cryptocurrencies</Title>
        <p>Loading...</p>
      </>
    );
  }

  // Filtrujemy tylko symbole zawierające "USDT"
  const allCryptos = cryptosData.filter(crypto => crypto.symbol.toLowerCase().includes("usdt"));
  const allCryptosDetails = detailsData.filter(cryptodetails => cryptodetails.symbol.toLowerCase().includes("usdt"));
  const visibleCryptos = showHidden ? allCryptos : allCryptos.slice(0, 12); // Show all or limit to 16
  
  return (
    <>
      <Title level={2}>Cryptocurrencies</Title>
      <Space style={{ marginBottom: '16px' }}>
        <Button onClick={() => setShowHidden(!showHidden)} type="primary">
          {showHidden ? 'Hide Hidden Cryptos' : 'Show Hidden Cryptos'}
        </Button>
        <Input
          placeholder="Search Cryptocurrency"
          onChange={(e) => setSearchKeyword(e.target.value)}
        />
      </Space>
      <Row gutter={[32, 32]} className="crypto-card-container">
        {visibleCryptos
          .filter((crypto) =>
            crypto.symbol.replace("USDT", "").toLowerCase().includes(searchKeyword.toLowerCase())
          )
          .map((crypto) => {
            // Find the corresponding details for this cryptocurrency
            const cryptoDetails = allCryptosDetails.find(
              (detail) => detail.symbol === crypto.symbol
            );
              
            if (cryptoDetails) {
              return (
                <Col xs={24} sm={12} lg={6} key={crypto.symbol} className="crypto-card">
                  <Link to={`/crypto/${crypto.symbol}`}>
                    <Card  style={{ border: '1px solid black'}} title={crypto.symbol.replace("USDT", "")}>
                      <p>Price: <Statistic value={`${parseFloat(crypto.price).toFixed(4)} USDT`} /></p>
                      <p>Price change 24h: <Statistic value={`${cryptoDetails.priceChangePercent} %`} /></p>
                    </Card>
                  </Link>
                </Col>
              );
            } else {
              return null; // Handle cases where details are not found
            }
          })}
      </Row>
    </>
  );
 }  
export default Cryptocurrencies