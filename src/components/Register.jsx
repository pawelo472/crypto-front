import React, { useState } from 'react';
import { Form, Input, Button, Row, Col, Typography, Progress, Card } from 'antd';
import zxcvbn from 'zxcvbn';
import { useRegisterUserMutation } from '../services/CryptoApi';
import axios from "axios";

function Register() {

  const [username, setRegUserename] = useState('');
  const [email, setRegEmail] = useState('');
  const [password, setRegPassword] = useState('');
  const [apikey, setapiKey] = useState('');

  const [registerUser, { isLoading, isError }] = useRegisterUserMutation();

  async function save(event) {
    event.preventDefault();
    try {
      const response = await registerUser({
        username,
        password,
        email,
        apikey,
      });
      // handle successful response
      alert('User Registration Successful');
    } catch (err) {
      // handle error
      alert(err);
    }
  }
  
  
  
  const [passwordStrength, setPasswordStrength] = useState(0);


  const onFinishRegistration = (values) => {
    console.log('Registration form values:', values);
  };

  const handlePasswordChange = (e) => {
    const password = e.target.value;
    const result = zxcvbn(password);
    setPasswordStrength(result.score);
  };
  const isSubmitDisabled = !username || !email || !password || !apikey || passwordStrength < 3;
  return (
    <div>
      <Typography.Title level={2}>Register</Typography.Title>
      <Row gutter={[16, 16]}>
        <Col span={12}>
          <Card title="Registration">
            <Form
              name="registration"
              onFinish={onFinishRegistration}
              labelCol={{ span: 8 }}
              wrapperCol={{ span: 16 }}
            >
              <Form.Item
                label="Username"
                name="regUsername"
                rules={[{ required: true, message: 'Please input your username!' }]}

                value={username}
                onChange={(event) => {
                  setRegUserename(event.target.value);
                }}
              >
                <Input />
              </Form.Item>

              <Form.Item
                label="Password"
                name="regPassword"
                rules={[{ required: true, message: 'Please input your password!' }]}

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

                value={email}
                onChange={(event) => {
                  setRegEmail(event.target.value);
                }}
              >
                <Input />
              </Form.Item>

              <Form.Item
                label="API Key"
                name="apiKey"
                rules={[{ required: true, message: 'Please input your API Key!'},
                { len: 64, message: 'API Key must be exactly 64 characters long!' },
              ]}

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
                <Button type="primary" htmlType="submit" onClick={save} disabled={isSubmitDisabled}>
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

