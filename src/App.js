import { Route, Link } from 'react-router-dom';
import {Layout, Typography, Space, Statistic} from 'antd';

import {Navbar, Homepage, Cryptocurrencies, CryptoDetails, Aboutus,Register,Login, Wallet} from './components';
import './App.css';
import React, { useEffect, useState } from 'react';
import { useGetServerTimeQuery } from './services/CryptoApi';
import { setAuthHeader, getAuthToken } from './components/axios_helper';

const App = () => {
  
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
  
  const { data, refetch } = useGetServerTimeQuery();
  const formattedTime = data ? new Date(data.serverTime).toString() : 'Loading...';
  // Function to fetch data every second
  const fetchDataEverySecond = () => {
    refetch();
  };

  useEffect(() => {
    // Start fetching data every second when the component mounts
    const interval = setInterval(fetchDataEverySecond, 3000);

    // Clear the interval when the component unmounts
    return () => clearInterval(interval);
  }, []); // Empty dependency array to run this effect only once when the component mounts
  return (
    <div className="app">
        <div className='navbar'>
            <Navbar/>
        </div>
        <div className='main'>
        <Layout>
          <div className='routes'>
            <switch>
              <Route exact path='/'>
                <Homepage/>
              </Route>
              <Route exact path='/cryptocurrencies'>
                <Cryptocurrencies/>
              </Route>
              {isLoggedIn && (
              <Route exact path='/wallet'>
                <Wallet/>
              </Route>
              )}
              <Route exact path='/crypto/:symbol'>
                <CryptoDetails/>
              </Route>
              <Route exact path='/aboutus'>
                <Aboutus/>
              </Route>
              {isLoggedOut && (
              <Route exact path='/register'>
                <Register/>
              </Route>
              )}
              {isLoggedOut && (
              <Route exact path='/login'>
                <Login/>
              </Route>
              )}
            </switch>
          </div>
        </Layout>
        
        <div className='footer'>
          <Typography.Text >
            Crypto All right reserved
          </Typography.Text>
          <Space>
            <Link to="/">Home</Link>
            <Link to="/cryptocurrencies">Cryptocurrencies</Link>
            <Link to="/aboutus">Aboutus</Link>
          </Space>
          <Typography.Text  value={formattedTime} style={{ color: 'black', textAlign: 'center', fontSize: '20px', }}>{formattedTime}</Typography.Text>


          </div>
        </div>
    </div>
  )
}

export default App