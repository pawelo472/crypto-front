import React from 'react';
import { Typography, Row, Col, Statistic } from 'antd';
import { useAutoRefresh, useGetCryptosQuery } from '../services/CryptoApi';

const { Title } = Typography;

export const Cryptocurrencies = () => {
  
  const { data, isFetching } = useGetCryptosQuery();

  // Sprawdzamy, czy dane są dostępne i czy są w formie tablicy
  if (!data || !Array.isArray(data)) {
    return (
      <>
        <Title level={2}>Cryptocurrencies</Title>
        <p>Loading...</p>
      </>
    );
  }

  // Filtrujemy tylko symbole zawierające "USDT"
  const usdtplnCrypto = data.find(crypto => crypto.symbol === "USDTPLN");
  const filteredCryptos = data.filter(crypto => crypto.symbol.includes("USDT"));

  return (
    <>
      <Title level={2}>Cryptocurrencies</Title>
      <Row gutter={[32, 32]}>
        {filteredCryptos.map(crypto => (
          <Col xs={24} sm={12} lg={6} key={crypto.id}>
            <Statistic title={crypto.symbol.replace("USDT", "")} value={crypto.price*usdtplnCrypto.price} />
          </Col>
        ))}
      </Row>
    </>
  );
}

export default Cryptocurrencies;
