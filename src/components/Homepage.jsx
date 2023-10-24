//import millify from 'millify';
//import { Link } from 'react-router-dom';
import React from 'react';
import { Typography, Row, Col, Statistic } from 'antd';
//import { useGetServerTimeQuery } from '../services/CryptoApi';

const { Title } = Typography;
export const Homepage = () => {
  // const { data, isFetching } = useGetServerTimeQuery();
  // const formattedTime = data ? new Date(data.serverTime).toString() : 'Loading...';

  return (
    <>
      <Title level={2}>Home</Title>
      <div style={{ padding: '20px' }}>
      <Title level={2}>Witaj na Stronie Kryptowalut</Title>
      <Typography.Paragraph>
        Ta strona ma na celu ułatwienie początkującym inwestorom w zakupie i śledzeniu kryptowalut.
      </Typography.Paragraph>
      <Typography.Paragraph>
        Oto kilka podstawowych zasad działania na naszej stronie:
      </Typography.Paragraph>
      <ul>
        <li>
          <Typography.Text>
            1. Przeglądaj różne kryptowaluty i dowiedz się więcej o nich na stronie "Cryptocurrencies".
          </Typography.Text>
        </li>
        <li>
          <Typography.Text>
            2. Do działania na naszej stronie będzie potrzebny klucz API Binance, który uzyskamy na stronie: <a href="https://www.binance.com/pl/binance-api" target="_blank">https://www.binance.com/pl/binance-api</a>, po ówczesnym zalogowaniu.
          </Typography.Text>
        </li>
        <li>
          <Typography.Text>
            3. Zarejestruj się lub zaloguj, aby śledzić  kryptowaluty i uzyskać dostęp do dodatkowych funkcji.
          </Typography.Text>
        </li>
      </ul>
      <Typography.Paragraph>
        Zaczynajmy inwestycje w kryptowaluty!
      </Typography.Paragraph>
    </div>
    </>
  );
}

export default Homepage;
