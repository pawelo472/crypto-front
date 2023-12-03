import React, {useState, useEffect} from 'react';
import  {Button, Menu, Typography, Avatar} from 'antd';
import { Link } from 'react-router-dom';
import { HomeOutlined,UserOutlined, FundOutlined,  InfoCircleOutlined, UserAddOutlined } from '@ant-design/icons';
import icon from "../images/logo.png";
import { setAuthHeader, getAuthToken } from './axios_helper';
const Navbar = () => {
    
    const [isLoggedIn, setLoggedIn] = useState(false);
    const [isLoggedOut, setLoggedOut] = useState(true);
  useEffect(() => {
    const checkAuth = async () => {
      const authToken = getAuthToken();
      if (authToken) {
        setAuthHeader(authToken);
        setLoggedIn(true);
        setLoggedOut(false)
      }
    };

    checkAuth();
  }, []);

  const handleLogout = () => {
    setAuthHeader(null);
    setLoggedIn(false);
    window.localStorage.removeItem('auth_token');
    window.location.reload();
  };
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
            {isLoggedOut && (
            <Menu.Item icon={<UserAddOutlined/>}>
                <Link to="/register">Register</Link>
            </Menu.Item>
            )}
            {isLoggedOut && (
            <Menu.Item icon={<UserOutlined/>}>
                <Link to="/login">Login</Link>
            </Menu.Item>
             )}
            <Menu.Item icon={<InfoCircleOutlined/>}>
                <Link to="/aboutus">About Us</Link>
            </Menu.Item>
            {isLoggedIn && (
          <Menu.Item>
            <Button onClick={handleLogout}>Logout</Button>
          </Menu.Item>
        )}
           
        </Menu>
    </div>
  )
}

export default Navbar