import React, { useState, useEffect} from 'react';
import { Form, Input, Button, Row, Col, Typography, Progress, Card , notification} from 'antd';
import axios from "axios";
import { useGetWalletQuery, useGetServerTimeQuery} from '../services/CryptoApi';
const CryptoJS = require('crypto-js');


 
  function Wallet() {
    const { data:godzina} = useGetServerTimeQuery();
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
              console.log(response.data);
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
        WalletUser();
        

    
      }, []); 
  

  return(
    
    <div>
      <Typography.Title level={2}>Wallet</Typography.Title>
      <Row gutter={[16, 16]}>
        <Col span={12}>
          <Card title="Wallet">
        
            
          </Card>
        </Col>
      </Row>
    </div>
  );
 }
export default Wallet;
