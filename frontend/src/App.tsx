import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import './styles/main.css';
import MainRouter from './pages/MainRouter';

const App = () => {
  return (
    <>
      <Router>
        <MainRouter />
      </Router>
    </>
  );
};

export default App;
