import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import './styles/main.css';
import MainRouter from './pages/MainRouter';
import { Provider as StoreProvider } from 'react-redux';
import store from './redux/store';
import dotenv from 'dotenv';
import UserSessionWrapper from './components/user/UserSessionWrapper';

dotenv.config();

const App = () => {
  return (
    <StoreProvider store={store}>
      <Router>
        <UserSessionWrapper>
          <MainRouter />
        </UserSessionWrapper>
      </Router>
    </StoreProvider>
  );
};

export default App;
