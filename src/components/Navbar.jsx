import React from 'react';
import  {Button, Menu, Typography, Avatar} from 'antd';
import { Link } from 'react-router-dom';
import { HomeOutlined, MoneyCollectOutlined,UserOutlined, BulbOutlined, FundOutlined, MenuOutlined, InfoCircleOutlined } from '@ant-design/icons';
import icon from "../images/logo.png";
const Navbar = () => {
  return (
    <div className='nav-container'>
        <div className='logo-container'>
            <Avatar src={icon} size="large"/>
            <Typography.Title level={2} className='logo'>
                <Link to="/">Crypto</Link>
            </Typography.Title>
        </div>
        <Menu theme='light'>
            <Menu.Item icon={<HomeOutlined/>}>
                <Link to="/">Home</Link>
            </Menu.Item>
            <Menu.Item icon={<FundOutlined/>}>
                <Link to="/cryptocurrencies">Cryptocurrencies</Link>
            </Menu.Item>
            <Menu.Item icon={<UserOutlined/>}>
                <Link to="/login">Login</Link>
            </Menu.Item>
            <Menu.Item icon={<InfoCircleOutlined/>}>
                <Link to="/aboutus">About Us</Link>
            </Menu.Item>
           
        </Menu>
    </div>
  )
}

export default Navbar