import { Switch, Route, Link } from 'react-router-dom';
import {Layout, Typography, Space, Statistic} from 'antd';

import {Navbar, Homepage, Cryptocurrencies, CryptoDetails, Aboutus,Login} from './components';
import './App.css';
import React, { useEffect, useState } from 'react';
import { useGetServerTimeQuery } from './services/CryptoApi';

const App = () => {
  
  
  const { data, isFetching, refetch } = useGetServerTimeQuery();
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
              <Route exact path='/crypto/:symbol'>
                <CryptoDetails/>
              </Route>
              <Route exact path='/aboutus'>
                <Aboutus/>
              </Route>
              <Route exact path='/login'>
                <Login/>
              </Route>
            </switch>
          </div>
        </Layout>
        
        <div className='footer'>
          <Typography.Title level={4} style={{color:'white', textAlign:'center'}}>
            Crypto <br/>
            All right reserved
          </Typography.Title>
          <Space>
            <Link to="/">Home</Link>
            <Link to="/cryptocurrencies">Cryptocurrencies</Link>
            <Link to="/aboutus">Aboutus</Link>
          </Space>
          <Statistic title="Server Time" value={formattedTime} style={{ color: 'white', textAlign: 'center' }}></Statistic>


          </div>
        </div>
    </div>
  )
}

export default App