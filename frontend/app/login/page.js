'use client';

import { Form, Input, Button, message } from 'antd';
import { login } from '../../services/authService';

export default function LoginForm() {
  const onFinish = async (values) => {
    try {
      const { token, user } = await login(values.username, values.password);
      localStorage.setItem('token', token);
      message.success(`Welcome ${user.username}`);
    } catch (err) {
      message.error('Login failed');
    }
  };

  return (
    <Form onFinish={onFinish}>
      <Form.Item name="username" rules={[{ required: true }]}>
        <Input placeholder="Username" />
      </Form.Item>
      <Form.Item name="password" rules={[{ required: true }]}>
        <Input.Password placeholder="Password" />
      </Form.Item>
      <Button type="primary" htmlType="submit">Login</Button>
    </Form>
  );
}