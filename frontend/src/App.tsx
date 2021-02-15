import React from 'react';
import ApiTest from './components/apiTest';
import RegisterUserForm from './pages/registerUserForm';


const App = () => {
  return (
    <div>
      <h1>SellPoint</h1>
      <RegisterUserForm />
      <ApiTest />
    </div>
  );
};

export default App;
