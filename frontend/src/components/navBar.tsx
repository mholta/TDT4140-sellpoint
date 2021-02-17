import React from 'react';
//import Navbar from 'react-bootstrap/Navbar';
import 'bootstrap/dist/css/bootstrap.min.css';
import Logo from './SP-logo.png';

const NavigationBar = () => {
  return (
    <div /*bg="dark" variant="dark"*/>
      <a href="#home" className="m-2">
        <img src={Logo} width="40" height="40" alt="" /> Sellpoint
      </a>
    </div>
  );
};

export default NavigationBar;
