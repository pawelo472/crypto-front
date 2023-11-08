import React, { useState } from 'react';
import { Form, Input, Button, Row, Col, Typography, Progress, Card } from 'antd';
import zxcvbn from 'zxcvbn';

function Login() {
  const [passwordStrength, setPasswordStrength] = useState(0);

  const onFinish = (values) => {
    console.log('Login form values:', values);
  };

  const onFinishRegistration = (values) => {
    console.log('Registration form values:', values);
  };

  const handlePasswordChange = (e) => {
    const password = e.target.value;
    const result = zxcvbn(password);
    setPasswordStrength(result.score);
  };

  return (
    <div>
      <Typography.Title level={2}>Login</Typography.Title>
      <Row gutter={[16, 16]}>
        <Col span={12}>
          <Card title="Login">
            <Form
              name="login"
              onFinish={onFinish}
              labelCol={{ span: 8 }}
              wrapperCol={{ span: 16 }}
            >
              <Form.Item
                label="Username"
                name="username"
                rules={[{ required: true, message: 'Please input your username!' }]}
              >
                <Input />
              </Form.Item>

              <Form.Item
                label="Password"
                name="password"
                rules={[{ required: true, message: 'Please input your password!' }]}
              >
                <Input.Password />
              </Form.Item>

              <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                <Button type="primary" htmlType="submit">
                  Login
                </Button>
              </Form.Item>
            </Form>
          </Card>
        </Col>
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
              >
                <Input />
              </Form.Item>

              <Form.Item
                label="Password"
                name="regPassword"
                rules={[{ required: true, message: 'Please input your password!' }]}
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
              >
                <Input />
              </Form.Item>

              <Form.Item
                label="API Key"
                name="apiKey"
                rules={[{ required: true, message: 'Please input your API Key!' }]}
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
                <Button type="primary" htmlType="submit">
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

export default Login;
