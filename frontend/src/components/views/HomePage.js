import React from 'react';
import { Button, Typography } from 'antd';
import { Link } from 'react-router-dom';

const { Title, Paragraph } = Typography;

const HomePage = () => {
  return (
    <div style={{ padding: '50px' }}>
      <Title level={1}>Welcome to TRIC System</Title>
      <Paragraph>
        TRIC is a complete system for managing industrial services. 
        With powerful tools and a sleek interface, we make it easy to track and manage your business processes.
      </Paragraph>
      
      <Button type="primary">
        <Link to="/login">Go to Login</Link>
      </Button>
    </div>
  );
};

export default HomePage;
