import React from 'react';
import { Container, Section } from '../../components/generics/layoutGenerics';
import Navbar from '../../components/navBar';
import RegisterForm from '../RegisterUser/components/registerUserForm';

const RegisterUserPage = () => {
  return (
    <>
      <Navbar />
      <Section>
        <Container style={{ maxWidth: '20rem' }}>
          <h1>Registrer bruker</h1>
          <RegisterForm />
        </Container>
      </Section>
    </>
  );
};

export default RegisterUserPage;
