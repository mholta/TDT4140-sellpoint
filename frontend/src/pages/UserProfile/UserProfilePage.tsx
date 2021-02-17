import React from 'react';
import { Container, Section } from '../../components/generics/layoutGenerics';
import Profile, { ProfileProps } from './components/profile';

const UserProfilePage = () => {
  const profileProps: ProfileProps = {
    name: 'Test bruker',
    email: 'test@email.com',
    phone: '12345678',
  };
  return (
    <Section>
      <Container>
        <Profile {...profileProps} />
      </Container>
    </Section>
  );
};

export default UserProfilePage;
