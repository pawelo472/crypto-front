import React from 'react'
import { Typography} from 'antd';

function Aboutus() {
  const { Title } = Typography;
  return (
    <>
    <Title level={2}>About Us</Title>
    <div>
      <h1>Welcome to Our Crypto Exchange Platform</h1>
      <p>
        Our platform is designed to provide a seamless experience for trading on the Binance exchange.
        Explore features like creating orders, managing your portfolio, and stay tuned for future integrations
        with other cryptocurrency exchanges.
      </p>
      <p>
        At Crypto, we are committed to delivering a secure and user-friendly environment for
        cryptocurrency enthusiasts. 
      </p>
    </div>
    </>
  )
}

export default Aboutus