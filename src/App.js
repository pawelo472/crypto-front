import React from 'react'
import { Switch, Route, Link } from 'react-router-dom';
import {Layout, Typography, Space} from 'antd';

import {Navbar, Homepage, Cryptocurrencies, CryptoDetails, Aboutus,Login} from './components';
import './App.css';

const App = () => {
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
              <Route exact path='/crypto/:cryptoID'>
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
          </div>
        </div>
    </div>
  )
}

export default App