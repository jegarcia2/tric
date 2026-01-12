import React, { useState } from 'react';
import { Form, Input, Button, Alert, Checkbox } from 'antd';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';  // Import useNavigate instead of useHistory

const LoginPage = () => {
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();  // Initialize useNavigate

  // Handle the form submission
  const onFinish = async (values) => {
    const { username, password } = values;

    try {
      // Make an API request to login (backend should handle this)
      const response = await axios.post('http://localhost:5000/api/login', { username, password });

      // Assuming the backend returns a token on successful login
      const { token } = response.data;

      // Save the token (you could also use sessionStorage or cookies)
      localStorage.setItem('token', token);

      // Redirect to the main page (after successful login)
      navigate('/main');  // Use navigate instead of history.push
    } catch (error) {
      // Handle login error
      setErrorMessage('Invalid username or password!');
    }
  };

  return (
    <div style={{ width: '300px', margin: '0 auto', paddingTop: '50px' }}>
      <h2>Login</h2>
      {errorMessage && <Alert message={errorMessage} type="error" />}
      <Form
        name="login"
        onFinish={onFinish}
        initialValues={{
          remember: true,
        }}
      >
        <Form.Item
          label="Username"
          name="username"
          rules={[
            {
              required: true,
              message: 'Please input your username!',
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Password"
          name="password"
          rules={[
            {
              required: true,
              message: 'Please input your password!',
            },
          ]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item name="remember" valuePropName="checked">
          <Checkbox>Remember me</Checkbox>
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" block>
            Log in
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default LoginPage;
