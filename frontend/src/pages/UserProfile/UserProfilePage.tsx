import React from 'react';
import styled from 'styled-components';
import { LoadStates, UseApiService } from '../../components/api/getUser';
import { Profile } from '../../components/api/types';
import { Container, Section } from '../../components/generics/layoutGenerics';
import Navbar from '../../components/navBar';
import ProfileSection, { ProfileProps } from './components/profile';

/**
 * Page wrapper component for User profile page.
 *
 * Fetches user data from db using api service
 *
 * @returns User profile page
 */
const UserProfilePage = () => {
  /* Dummy data for running without db */
  const defaultProfile: Profile = {
    name: 'Test bruker',
    email: 'test@email.com',
    phone_number: '12345678',
  };

  const service = UseApiService('http://127.0.0.1:8000/user/1');
  console.log(service);
  return (
    <>
      <Navbar />
      <UserProfilePageWrapper>
        {service.status === LoadStates.LOADING && <div>Loading</div>}
        {service.status === LoadStates.LOADED && (
          <ProfileSection {...service.payload} />
        )}
        {service.status === LoadStates.ERROR && <div>Error</div>}
      </UserProfilePageWrapper>
    </>
  );
};

const BackgroundLayer = styled.div`
  position: absolute;
  z-index: -1;
  top: -10rem;
  left: -3rem;
  width: 200%;
  height: 40rem;
  transform: rotateZ(-4deg);
  background-color: #0093e9;
  background-image: linear-gradient(160deg, #0093e9 0%, #80d0c7 100%);
`;

const UserProfilePageWrapper = styled.div`
  position: relative;
`;

export default UserProfilePage;
