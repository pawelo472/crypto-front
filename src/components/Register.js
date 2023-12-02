import React, { useState} from 'react';
import { Form, Input, Button, Row, Col, Typography, Progress, Card, notification } from 'antd';
import zxcvbn from 'zxcvbn';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { setUser, setError } from './authSlice';
import { useRegisterUserMutation } from '../services/CryptoApi';
import axios from "axios";

function Register() {
  const openNotification = (type, message) => {
    notification[type]({
      message: message,
    });
  };

  const dispatch = useDispatch();
  const history = useHistory();

  const [username, setRegUserename] = useState('');
  const [email, setRegEmail] = useState('');
  const [password, setRegPassword] = useState('');
  const [apikey, setapiKey] = useState('');

  const getAuthToken = () => {
    return window.localStorage.getItem('auth_token');
  };
  
  const setAuthHeader = (token) => {
    window.localStorage.setItem('auth_token', token);
  };
  
  axios.defaults.baseURL = 'http://localhost:8085';
  axios.defaults.headers.post['Content-Type'] = 'application/json';
  
  const request = (method, url, data) => {
  
    let headers = {};
    if (getAuthToken() !== null && getAuthToken() !== "null") {
        headers = {'Authorization': `Bearer ${getAuthToken()}`};
    }
  
    return axios({
        method: method,
        url: url,
        headers: headers,
        data: data});
  };
  // const [registerUser, { isLoading, isError }] = useRegisterUserMutation();

  // async function save(event) {
  //   event.preventDefault();
  //   try {
  //     const response = await registerUser({
  //       username,
  //       password,
  //       email,
  //       apikey,
  //     });
  //     // handle successful response
  //     alert('User Registration Successful');
  //   } catch (err) {
  //     // handle error
  //     alert(err);
  //   }
  // }


//  const onChangeHandler = (event) => {
//     const name = event.target.name;
//     const value = event.target.value;
//     setState({[name] : value});
// };

  const RegisterUser = (username, password, email, apikey) => {
    
    request(
        "POST",
        "/register",
        {
            username: username,
            password: password,
            email: email,
            apikey: apikey,
        }).then(
        (response) => {
            setAuthHeader(response.data.token);
            dispatch(setUser(response.data.username));
            openNotification('success', 'Registration in successfully!');
            history.push('/login');
        }).catch(
        (error) => {
            setAuthHeader(null);
            if (error.response && error.response.data && error.response.data.message) {
        
        openNotification('error', error.response.data.message);
      } else {
        openNotification('error', 'Wystąpił błąd podczas rejestracji');
      }
        }
    );
};
  
  
  const [passwordStrength, setPasswordStrength] = useState(0);


  // const onFinishRegistration = (values) => {
  //   console.log('Registration form values:', values);
  // };

  const handlePasswordChange = (e) => {
    const password = e.target.value;
    const result = zxcvbn(password);
    setPasswordStrength(result.score);
  };

  const isSubmitDisabled = !username || !email || !password || !apikey || passwordStrength < 1;
  return (
    <div>
      <Typography.Title level={2}>Register</Typography.Title>
      <Row gutter={[16, 16]}>
        <Col span={12}>
          <Card title="Registration">
            <Form
              name="registration"
              onFinish={(values) => RegisterUser(values.username, values.password,values.email,values.apikey, )}
              labelCol={{ span: 8 }}
              wrapperCol={{ span: 16 }}
            >
              <Form.Item
                label="Username"
                name="username"
                rules={[{ required: true, message: 'Please input your username!' }]}
                //onChange={onChangeHandler}
                value={username}
                onChange={(event) => {
                  setRegUserename(event.target.value);
                }}
              >
                <Input />
              </Form.Item>

              <Form.Item
              type="password"
                label="Password"
                name="password"
                rules={[{ required: true, message: 'Please input your password!' }]}
                //onChange={onChangeHandler}
                value={password}
                onChange={(event) => {
                  setRegPassword(event.target.value);
                }}
              >
                <Input.Password onChange={handlePasswordChange} />
              </Form.Item>

              <Form.Item
                label="Email"
                name="email"
                rules={[
                  { required: true, message: 'Please input your email!' },
                  { type: 'email', message: 'Please enter a valid email address' },
                ]}
                //onChange={onChangeHandler}
                value={email}
                onChange={(event) => {
                  setRegEmail(event.target.value);
                }}
              >
                <Input />
              </Form.Item>

              <Form.Item
                label="API Key"
                name="apikey"
                rules={[{ required: true, message: 'Please input your API Key!'},
                { len: 64, message: 'API Key must be exactly 64 characters long!' },
              ]}
              //onChange={onChangeHandler}
                value={apikey}
                onChange={(event) => {
                  setapiKey(event.target.value);
                }}
              >
                <Input />
              </Form.Item>

              <Form.Item
                wrapperCol={{ span: 24 }}
                label="Password Strength"
              >
                <Progress
                  percent={passwordStrength * 25}
                  status={passwordStrength === 4 ? 'success' : 'active'}
                />
              </Form.Item>

              <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                <Button type="primary" htmlType="submit"  disabled={isSubmitDisabled}>
                  Register
                </Button>
              </Form.Item>
            </Form>
          </Card>
        </Col>
      </Row>
    </div>
  );
}

export default Register;

