import React, { useState} from 'react';
import { Form, Input, Button, Row, Col, Typography, Progress, Card , notification} from 'antd';

import { useDispatch } from 'react-redux';
import { setUser, setError } from './authSlice';
import axios from "axios";
import { useHistory } from 'react-router-dom';
import classNames from 'classnames';
import { request, setAuthHeader } from './axios_helper';
import Navbar from './Navbar';


    // const [loginUser, { isLoading, isError }] = useLoginUserMutation();
    // const dispatch = useDispatch();
  
    // const [username, setUsername] = useState('');
    // const [password, setPassword] = useState('');
  
    // async function login(event) {
    //   event.preventDefault();
    //   try {
    //     const response = await loginUser, {
    //       method: 'POST',
    //       headers: {
    //         'Content-Type': 'application/json',
    //       },
    //       body: JSON.stringify({
    //         username: username,
    //         password: password,
    //       }),
    //     });
  
    //     const data = await response.json();
  
    //     console.log(data);
  
    //     if (data.message === 'Email not exists') {
    //       dispatch(setError('Email not exists'));
    //     } else if (data.message === 'Login Success') {
    //       dispatch(setUser(data.user));
    //       navigator('/');
    //     } else {
    //       dispatch(setError('Incorrect Email and Password not match'));
    //     }
    //   } catch (err) {
    //     console.error(err);
    //     dispatch(setError('An error occurred'));
    //   }
    
    
  //   const history = useHistory();
  //   const [username, setUsername] = useState("");
  //   const [password, setPassword] = useState("");
  //   async function login(event) {
  //       event.preventDefault();
  //       try {
  //         await axios.post("http://localhost:8085/api/v1/user/login", {
  //           username: username,
  //           password: password,
  //           }).then((res) => 
  //           {
  //            console.log(res.data);
             
  //            if (res.data.message == "Email not exits") 
  //            {
  //              alert("Email not exits");
  //            } 
  //            else if(res.data.message == "Login Success")
  //            { 
                
  //               history.push('/');
                
  //            } 
  //             else 
  //            { 
  //               alert("Incorrect Email and Password not match");
  //            }
  //         }, fail => {
  //          console.error(fail); // Error!
  // });
  //       }
 
  //        catch (err) {
  //         alert(err);
  //       }
      
  //     }
 
  function Login() {

  
    const openNotification = (type, message) => {
      notification[type]({
        message: message,
      });
    };

    const dispatch = useDispatch();
  const history = useHistory();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');




   const LoginUser = (username, password) => {
      request(
          "POST",
          "/login",
          {
              username: username,
              password: password,
          }).then(
          (response) => {
              setAuthHeader(response.data.token);
              dispatch(setUser(response.data.username));
              openNotification('success', 'Logged in successfully: '+ response.data.username);
            
        // history.push('/');
        // window.location.reload();
          }).catch(
          (error) => {
              setAuthHeader(null);
              if (error.response && error.response.data && error.response.data.message) {
                
                openNotification('error', error.response.data.message);
              } else {
                openNotification('error', 'Wystąpił błąd podczas logowania');
              }
          }
      );
  };

 

// onChangeHandler = (event) => {
//     let name = event.target.name;
//     let value = event.target.value;
//     this.setState({[name] : value});



  return(
    
    <div>
      <Typography.Title level={2}>Login</Typography.Title>
      <Row gutter={[16, 16]}>
        <Col span={12}>
          <Card title="Login">
          
            <Form
              name="login"
              labelCol={{ span: 8 }}
              wrapperCol={{ span: 16 }}
              onFinish={(values) => LoginUser(values.username, values.password,)}
            >
              <Form.Item
              type="username"
                label="Username"
                name="username"
                rules={[{ required: true, message: 'Please input your username!' }]}
                //onChange={this.onChangeHandler}
                value={username}
                onChange={(event) => {
                  setUsername(event.target.value);
                }}
              >
                <Input />
              </Form.Item>

              <Form.Item
              type="password"
                label="Password"
                name="password"
                rules={[{ required: true, message: 'Please input your password!' }]}
                //onChange={this.onChangeHandler}
                value={password}
                onChange={(event) => {
                  setPassword(event.target.value);
                }}
              >
                <Input.Password />
              </Form.Item>

              <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                <Button type="primary" htmlType="submit" >
                  Login
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
