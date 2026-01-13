'use client';
import { useState } from 'react';
import { Input, Button, Form, Table, message } from 'antd';
import { getUserById, createUser, deleteUser, getAllUsers } from '../services/userService';

export default function UserCrudTest() {
  const [user, setUser] = useState(null);
  const [users, setUsers] = useState([]);

  const handleGetUser = async (id) => {
    try {
      const data = await getUserById(id);
      setUser(data);
    } catch {
      message.error('User not found');
    }
  };

  const handleCreateUser = async (values) => {
    try {
      const newUser = await createUser(values);
      message.success('User created');
      setUsers([...users, newUser]);
    } catch {
      message.error('Failed to create user');
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteUser(id);
      message.success('User soft deleted');
      setUsers(users.filter(u => u.id !== id));
    } catch {
      message.error('Failed to delete user');
    }
  };

  return (
    <div style={{ padding: 20 }}>
      <h1>User CRUD Test</h1>

      <Form onFinish={({ id }) => handleGetUser(id)} layout="inline">
        <Form.Item name="id" rules={[{ required: true }]}>
          <Input placeholder="Enter user ID" />
        </Form.Item>
        <Button type="primary" htmlType="submit">Get User</Button>
      </Form>

      {user && <p>Found user: {user.username} ({user.email})</p>}

      <Form onFinish={handleCreateUser} style={{ marginTop: 20 }}>
        <Form.Item name="username" rules={[{ required: true }]}>
          <Input placeholder="Username" />
        </Form.Item>
        <Form.Item name="email" rules={[{ required: true }]}>
          <Input placeholder="Email" />
        </Form.Item>
        <Form.Item name="passwordHash" rules={[{ required: true }]}>
          <Input placeholder="Password Hash" />
        </Form.Item>
        <Button type="primary" htmlType="submit">Create User</Button>
      </Form>

      <Form onFinish={({ id }) => handleDelete(id)} layout="inline" style={{ marginTop: 20 }}>
        <Form.Item name="id" rules={[{ required: true }]}>
          <Input placeholder="Enter ID to delete" />
        </Form.Item>
        <Button danger htmlType="submit">Soft Delete</Button>
      </Form>

      <Button style={{ marginTop: 20 }} onClick={async () => setUsers(await getAllUsers())}>
        Load All Users
      </Button>

      <Table
        dataSource={users}
        columns={[
          { title: 'ID', dataIndex: 'id' },
          { title: 'Username', dataIndex: 'username' },
          { title: 'Email', dataIndex: 'email' },
        ]}
        rowKey="id"
        style={{ marginTop: 20 }}
      />
    </div>
  );
}