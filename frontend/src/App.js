import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';  // Use Routes instead of Switch
import LoginPage from './components/views/LoginPage';  // Import LoginPage component
import HomePage from './components/views/HomePage';    // Import HomePage component

const App = () => {
  return (
    <Router>
      <Routes>  {/* Use Routes instead of Switch */}
        <Route path="/" element={<HomePage />} />        {/* Home page route */}
        <Route path="/login" element={<LoginPage />} />  {/* Login page route */}
      </Routes>
    </Router>
  );
};

export default App;
