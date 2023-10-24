import { Switch, Route, Link } from 'react-router-dom';
import {Layout, Typography, Space, Statistic} from 'antd';

import {Navbar, Homepage, Cryptocurrencies, CryptoDetails, Aboutus,Login} from './components';
import './App.css';
//import React, { useEffect, useState } from 'react';
//import axios from 'axios';
import { useGetServerTimeQuery } from './services/CryptoApi';

// const BinanceAPI = () => {
//     const [timeData, setTimeData] = useState(null);

//   useEffect(() => {
//     const apiUrl = 'https://api.binance.com/api/v3/time';

    
//     axios
//       .get(apiUrl)
//       .then((response) => {
//         setTimeData(response.data);
//       })
//       .catch((error) => {
//         console.error('Błąd API:', error);
//       });
//   }, []);

  
//   return (
//     <div>
//       {timeData && (
//         <div>
//           <p>Server Time: {new Date(timeData.serverTime).toString()}</p>
//         </div>
//       )}
//     </div>
//   );
// };
const App = () => {
  const { data, isFetching } = useGetServerTimeQuery();
  const formattedTime = data ? new Date(data.serverTime).toString() : 'Loading...';
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
          <Statistic title="Server Time" value={formattedTime} style={{ color: 'white', textAlign: 'center' }}></Statistic>


          </div>
        </div>
    </div>
  )
}

export default App