import React, { useEffect, useState } from 'react';
import { Typography, Card, Row, Col, Statistic, Button, Space, Input, Form } from 'antd';
import { useGetCryptosDetailsQuery, useGetCryptosQuery } from '../services/CryptoApi';
import '../App.css';
import millify from 'millify';
import reactRouterDom, { Link, useParams } from 'react-router-dom';
import { setAuthHeader, getAuthToken } from './axios_helper';
import { MoneyCollectOutlined, DollarCircleOutlined, FundOutlined, ExclamationCircleOutlined, StopOutlined, TrophyOutlined, CheckOutlined, NumberOutlined, ThunderboltOutlined } from '@ant-design/icons';

const { Title, Text } = Typography;

const CryptoDetails = () => {

  const [isLoggedIn, setLoggedIn] = useState(false);
    const [isLoggedOut, setLoggedOut] = useState(true);
  useEffect(() => {
    const checkAuth = async () => {
      const authToken = getAuthToken();
      if (authToken) {
        setAuthHeader(authToken);
        setLoggedIn(true);
        setLoggedOut(false)
      }
    };

    checkAuth();
  }, []);

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
  const filteredDetails = detailsData.filter(cryptodetails => cryptodetails.symbol === symbol);
  const filteredCryptos = cryptosData.filter(crypto => crypto.symbol === symbol);
  const price = filteredCryptos.length > 0 ? filteredCryptos[0].price : 0;
  const volume24h = filteredDetails.length > 0 ? filteredDetails[0].volume : 0;
  const openPrice = filteredDetails.length > 0 ? filteredDetails[0].openPrice : 0;
  const highPrice = filteredDetails.length > 0 ? filteredDetails[0].highPrice : 0;
  const lowPrice = filteredDetails.length > 0 ? filteredDetails[0].lowPrice : 0;
  const askPrice = filteredDetails.length > 0 ? filteredDetails[0].askPrice : 0;
  const bidPrice = filteredDetails.length > 0 ? filteredDetails[0].bidPrice : 0;
  const count = filteredDetails.length > 0 ? filteredDetails[0].count : 0;

  const stats = [
    { title: 'Price: ', value: parseFloat(price).toFixed(4), icon: <DollarCircleOutlined /> },
    { title: '24h Volume: ', value: parseFloat(volume24h).toFixed(4), icon: <DollarCircleOutlined /> },
    { title: 'BidPrice: ', value: parseFloat(bidPrice).toFixed(4), icon: <DollarCircleOutlined /> },
    { title: 'AskPrice: ', value: parseFloat(askPrice).toFixed(4), icon: <DollarCircleOutlined /> },
    { title: 'Open Price in the session: ', value: parseFloat(openPrice).toFixed(4), icon: <DollarCircleOutlined /> },
    { title: 'High Price in the session: ', value: parseFloat(highPrice).toFixed(4), icon: <DollarCircleOutlined /> },
    { title: 'Low Price in the session: ', value: parseFloat(lowPrice).toFixed(4), icon: <DollarCircleOutlined /> },
    { title: 'Number of transactions in the session: ', value: count, icon: <DollarCircleOutlined /> },
  ];

  // Define your form structure
  const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
  };

  const onFinish = (values) => {
    // Handle form submission here
    console.log('Form values:', values);
  };

  return (
    <div>
      <Row gutter={16}>
        <Col span={12}>
          <Title level={2}>Crypto Details for {symbol}</Title>
          {stats.map(({ title, icon, value }) => (
            <Col key={title} className="stats-container">
              <Col className="coin-value-statistics">
                <Text>{icon}</Text>
                <Text>{title}</Text>
                <Text className="stats">{value}</Text>
              </Col>
            </Col>
          ))}
        </Col>
        <Col span={12}>
          {isLoggedIn && (
            <Card title={`Buy Cryptocurrency (${symbol})`}>
              <Form {...layout} name="buyCryptoForm" onFinish={onFinish}>
                <Form.Item label="Amount" name="amount" rules={[{ required: true, message: 'Please enter the amount' }]}>
                  <Input type="number" placeholder="Enter amount" />
                </Form.Item>
                <Form.Item label="Price" name="price" rules={[{ required: true, message: 'Please enter the price' }]}>
                  <Input type="number" placeholder="Enter price" />
                </Form.Item>
                <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                  <Button type="primary" htmlType="submit">
                    Buy
                  </Button>
                </Form.Item>
              </Form>
            </Card>
          )}
        </Col>
      </Row>
    </div>
  );
          };
export default CryptoDetails;
