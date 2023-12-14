import React, { useEffect, useState } from 'react';
import { Typography, Card, Row, Col, Button, Input, Form, Select } from 'antd';
import { useGetCryptosDetailsQuery, useGetCryptosQuery } from '../services/CryptoApi';
import '../App.css';
import  { useParams } from 'react-router-dom';
import { setAuthHeader, getAuthToken } from './axios_helper';
import { DollarCircleOutlined} from '@ant-design/icons';
import axios from "axios";
import {getApikey,getSecretApikey} from './axios_helper';
import { notification } from 'antd';

const CryptoJS = require('crypto-js');
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
  const [form] = Form.useForm();
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

  const { Option } = Select;
  // Define your form structure
  const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
  };

  const onFinish = (values) => {
    // Calculate the price based on the entered quantity and the current cryptocurrency price
    const quantity = parseFloat(values.quantity);
    const price = filteredCryptos.length > 0 ? filteredCryptos[0].price : 0;
    const total = quantity * price;

    // Handle form submission here; you can use 'values' and 'total' as needed
    console.log('Form values:', values);
    console.log('Total price:', total);
 

  const time_server=Date.now();
  const apikey = getApikey();
  const secretapikey = getSecretApikey();
 
    const signature = CryptoJS.HmacSHA256(`symbol=${values.symbol}&side=${values.side}&type=${values.type}&quantity=${values.quantity}&timestamp=${time_server}`, secretapikey).toString(CryptoJS.enc.Hex);
    
    axios.defaults.baseURL = 'https://api.binance.com';
    

    const request = (method, url) => {
      return axios({
          method: method,
          maxBodyLength: Infinity,
          url: url,
          headers: {
            "X-MBX-APIKEY": apikey,
        },
          params: {
            symbol: values.symbol,
            side: values.side,
            type: values.type,
            //timeInForce:"UTC",
            quantity: values.quantity,
           //recvWindow:20000,
            timestamp: time_server,
            signature: signature,
          },
      });
  };
  const Order = () => {
      request(
          "POST",
           //`/api/v3/order/test?symbol=${values.symbol}&side=${values.side}&type=${values.type}&quantity=${values.quantity}&timestamp=${time_server}&signature=${signature}`,
           '/api/v3/order/test',
          {
          }).then(
          (response) => {
            console.log(response);
            notification.success({
              message: 'Order Placed Successfully',
              description: 'Your order has been placed successfully.',
            });
          }).catch(
          (error) => {
             console.log(error);
             notification.error({
              message: 'Error Placing Order',
              description: error.response.data.msg,
            });
          }
      );
  };
  Order();
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
            <Card title="Buy/Sell Cryptocurrency">
            <Form {...layout} form={form} name="buyCryptoForm" onFinish={onFinish}>
              <Form.Item label="Symbol" initialValue={symbol} name="symbol" rules={[{ required: true, message: 'Please enter the symbol' }]}>
                <Input placeholder="Enter symbol" />
              </Form.Item>
              <Form.Item label="Side" name="side" rules={[{ required: true, message: 'Please select the side' }]}>
                <Select placeholder="Select side">
                  <Option value="BUY">Buy</Option>
                  <Option value="SELL">Sell</Option>
                </Select>
              </Form.Item>
              <Form.Item label="Type" name="type" initialValue="MARKET" rules={[{ required: true, message: 'Please select the type' }]}>
                <Select placeholder="Select type">
                  <Option value="MARKET">MARKET</Option>
                </Select>
              </Form.Item>
              <Form.Item
                label="Quantity"
                name="quantity"
                rules={[{ required: true, message: 'Please enter the quantity' }]}
              >
                <Input
                  type="number"
                  placeholder="Enter quantity"
                  onChange={(e) => {
                    const quantity = parseFloat(e.target.value || 0);
                    const price = filteredCryptos.length > 0 ? filteredCryptos[0].price : 0;
                    form.setFieldsValue({ price: (quantity * price).toFixed(12) });
                  }}
                />
              </Form.Item>
              <Form.Item
                label="Price"
                name="price"
                rules={[{ required: true}]}
              >
                <Input type="number" placeholder="Enter price" readOnly />
              </Form.Item>
              <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                <Button type="primary" htmlType="submit">
                  Submit
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
