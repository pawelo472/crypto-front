import React, { useState, useEffect} from 'react';
import { Form, Input, Button, Row, Col, Typography, Progress, Card , notification} from 'antd';
import axios from "axios";
const CryptoJS = require('crypto-js');


 
  function Wallet() {
    
    const time_server=Date.now();
    //console.log(time_server);
   // const payload = time_server + "\n" + nonce + "\n" + body + "\n";
    let apiPublic="q1pQetgeBRA3WDaaWVOQM68oYTDWB8mMO9ATg8Lpp74r91KOCHozNeU0RxecULLz";
    const apiSecret= 'cjvelBcWP05hZw6e5UttMzKGqrspYLphfx6Q7LZv0up3sE9QyTjgUk6fvwqcjo36';
    const signature = CryptoJS.HmacSHA256(`timestamp=${time_server}`, apiSecret).toString(CryptoJS.enc.Hex);
    axios.defaults.baseURL = 'https://api.binance.com';
    axios.defaults.headers['X-MBX-APIKEY'] = apiPublic;
    const request = (method, url, data) => {
    
        let headers = {};
        return axios({
            method: method,
            url: url,
            headers: headers,
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
                 
          // history.push('/');
          // window.location.reload();
            }).catch(
            (error) => {
               
            }
        );
    };


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
