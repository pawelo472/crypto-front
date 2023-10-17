import React from 'react'
import millify from 'millify'
import {Link} from 'react-router-dom';
import {Typography, Row, Col, Statistic} from 'antd';


const {Title} = Typography;
export const Homepage = () => {
  return (
    <>
    <Title level={2}>Crypto Stats</Title>
    <Row>
        <Col span={12}><Statistic title="Cryptocurrencies" value={5}></Statistic></Col>
    </Row>
    </>
    
  )
}

export default Homepage