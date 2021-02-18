import React from 'react';
import { Container, Section } from '../../components/generics/layoutGenerics';
import Navbar from '../../components/navBar';
import LoginForm from './components/loginForm';

const LoginUserPage = () => {
  return (
    <>
      <Navbar />
      <Section>
        <Container style={{ maxWidth: '20rem' }}>
          <h1>Logg inn</h1>
          <LoginForm />
        </Container>
      </Section>
    </>
  );
};

export default LoginUserPage;
