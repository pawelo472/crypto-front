import React, { useState, useEffect} from 'react';
import { Input,Typography,Space, Table, Tooltip} from 'antd';
import axios from "axios";

import '../App.css';
const CryptoJS = require('crypto-js');


 
  function Wallet() {

  const { Title } = Typography;
  const [searchKeyword, setSearchKeyword] = useState('');
  const [walletData, setWalletData] = useState([]);

    //const { data:godzina} = useGetServerTimeQuery();
  const time_server=Date.now();
    const apiPublic='q1pQetgeBRA3WDaaWVOQM68oYTDWB8mMO9ATg8Lpp74r91KOCHozNeU0RxecULLz';
    const apiSecret= 'cjvelBcWP05hZw6e5UttMzKGqrspYLphfx6Q7LZv0up3sE9QyTjgUk6fvwqcjo36';
    const signature = CryptoJS.HmacSHA256(`timestamp=${time_server}`, apiSecret).toString(CryptoJS.enc.Hex);
    axios.defaults.baseURL = 'https://api.binance.com';
    
    const request = (method, url, data) => {
    
        return axios({
            method: method,
            url: url,
            headers: {
              "X-MBX-APIKEY": apiPublic,
          },
            data: data,
            params: {
                timestamp: time_server,
                signature: signature,
            },
        });
    };
    const WalletUser = () => {
        request(
            "GET",
             '/sapi/v1/capital/config/getall',
            {
            
            }).then(
            (response) => {
              //console.log(response.data);
              setWalletData(response.data);
          // history.push('/');
          // window.location.reload();
            }).catch(
            (error) => {
               
            }
        );
    };

// const { data: wallet} = useGetWalletQuery();
//   console.log(wallet);
  
    useEffect(() => {
      const delay = 2000; // Opóźnienie w milisekundach (1 sekunda w tym przypadku)
    
      const timeoutId = setTimeout(() => {
        WalletUser();
      }, delay);
  
      // Wyczyszczenie timera przy odmontowaniu komponentu
      return () => clearTimeout(timeoutId);
      }, []); 
  
      const filteredCryptos = walletData.filter((crypto) =>
      crypto.coin.toLowerCase().includes(searchKeyword.toLowerCase())
    );

    const columns = [
      {
        title: (
          <span>
            <Tooltip title="This is the Coin name.">
              <span>Coin</span>
            </Tooltip>
          </span>
        ),
        dataIndex: 'coin',
        key: 'coin',
        //render: (text, record) => <Link to={`/crypto/${record.coin}USDT`}>{text}</Link>,
        sorter: (a, b) => a.coin.localeCompare(b.coin),
      },
      {
        title: (
          <span>
            <Tooltip title="This column indicates whether deposit all is enabled or not.">
              <span>Deposit All Enable</span>
            </Tooltip>
            
          </span>
        ),
        dataIndex: 'depositAllEnable',
        key: 'depositAllEnable',
        render: (text) => text.toString(),
        
      },
      {
        title: (
          <span>
            <Tooltip title="This is the Free Coins column.">
              <span>Free Coins</span>
            </Tooltip>
          
          </span>
        ),
        dataIndex: 'free',
        key: 'free',
        sorter: (a, b) => a.free - b.free, // Add this line for sorting
        //sortOrder: 'descend', // Add this line for default descending order
      },
      {
        title: (
          <span>
            <Tooltip title="This is the Freeze column.">
              <span>Freeze</span>
            </Tooltip>
          
          </span>
        ),
        dataIndex: 'freeze',
        key: 'freeze',
        sorter: (a, b) => a.freeze - b.freeze,
      },
    ];
  

      
  return(
    <>
      <div>
        <Title level={2}>Wallet</Title>
        <Space style={{ marginBottom: '16px' }}>
          <Input
            placeholder="Search COIN"
            onChange={(e) => setSearchKeyword(e.target.value)}
          />
        </Space>
        <Table
          dataSource={filteredCryptos}
          columns={columns}
          rowKey={(record) => record.coin}
        />
      </div>
    </>
  );
  
 }
export default Wallet;
