import { Box, Button } from '@material-ui/core';
import React from 'react';
import styled from 'styled-components';
import Navbar from '../../components/navBar';
import RootRoutes from '../RootRoutes';
import ProfileSection from './components/profile';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { RootState } from '../../redux';
import { Container, Section } from '../../components/generics/layoutGenerics';
import ProfileTabs from './components/profileTabs';

/**
 * Page wrapper component for User profile page.
 *
 * Fetches user data from db using api service
 *
 * @returns User profile page
 */
const UserProfilePage = () => {
  // TODO: Issue with mounting
  const userState = useSelector((state: RootState) => state.user);
  const history = useHistory();

  return (
    <>
      {userState.isLoggedIn && (
        <>
          <Navbar />
          <UserProfilePageWrapper>
            <ProfileSection
              first_name={userState.userData.firstName}
              last_name={userState.userData.lastName}
              email={userState.userData.email}
              phone_number={userState.userData.phoneNumber}
              latitude={userState.userData.latitude}
              longitude={userState.userData.longitude}
            />
            <Section>
              <Container>
                <Box mb={2}>
                  <Button
                    href={RootRoutes.newProduct}
                    onClick={(e: any) => {
                      e.preventDefault();
                      history.push(RootRoutes.newProduct);
                    }}
                    color="primary"
                    variant="contained"
                  >
                    Opprett annonse
                  </Button>
                </Box>
                <ProfileTabs userData={userState.userData} />
              </Container>
            </Section>
          </UserProfilePageWrapper>
        </>
      )}
    </>
  );
};

const UserProfilePageWrapper = styled.div`
  position: relative;
`;

export default UserProfilePage;
