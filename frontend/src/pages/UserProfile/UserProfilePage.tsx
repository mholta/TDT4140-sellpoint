import { Button } from '@material-ui/core';
import React from 'react';
import styled from 'styled-components';
import { GetReqApiService } from '../../components/api/getUser';
import { LoadStates } from '../../components/api/loadStates';
import Navbar from '../../components/navBar';
import RootRoutes from '../RootRoutes';
import UserProductList from './components/productList';
import ProfileSection from './components/profile';

/**
 * Page wrapper component for User profile page.
 *
 * Fetches user data from db using api service
 *
 * @returns User profile page
 */
const UserProfilePage = () => {
  /* Use api service for getting user and showing different states */
  const service = GetReqApiService('http://127.0.0.1:8000/user/1');
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
        <UserProductList />
        <Button
          href={RootRoutes.newProduct}
          color="primary"
          variant="contained"
        >
          Opprett produkt
        </Button>
      </UserProfilePageWrapper>
    </>
  );
};

const UserProfilePageWrapper = styled.div`
  position: relative;
`;

export default UserProfilePage;
