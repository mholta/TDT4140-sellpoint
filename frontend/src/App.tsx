import React from 'react';
import ApiTest from './components/apiTest';
import RegisterUserForm from './pages/registerUserForm';

import NavigationBar from './components/navBar';
import { BrowserRouter as Router } from 'react-router-dom';
import MainRouter from './MainRouter';

const App = () => {
  return (
    <div>
      <h1>SellPoint</h1>
      <RegisterUserForm />
      <NavigationBar />
      <ApiTest />
      <Router>
        <MainRouter />
      </Router>
    </div>
  );
};

export default App;
