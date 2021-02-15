import React from 'react';
import ApiTest from './components/apiTest';
import RegisterUserForm from './pages/registerUser/components/registerUserForm';

import NavigationBar from './components/navBar';
import { BrowserRouter as Router } from 'react-router-dom';
import MainRouter from './pages/MainRouter';

const App = () => {
  return (
    <div>
      <NavigationBar />
      <Router>
        <MainRouter />
      </Router>
      <ApiTest />
    </div>
  );
};

export default App;
