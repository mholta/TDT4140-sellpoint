import { Button } from '@material-ui/core';
import React, { useEffect } from 'react';
import styled from 'styled-components';
import { GetReqApiService } from '../../components/api/getUser';
import Navbar from '../../components/navBar';
import RootRoutes from '../RootRoutes';
import UserProductListasdlkjasd from './components/productList';
import ProfileSection from './components/profile';
import { useDispatch, useSelector } from 'react-redux';
import { logOut } from '../../redux/user/user.actions';
import { useHistory } from 'react-router-dom';
import { RootState } from '../../redux';
import EditUserForm from './components/editUserForm';
import { Container, Section } from '../../components/generics/layoutGenerics';

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
  if (!userState.isLoggedIn) history.push(RootRoutes.loginUser);

  const dispatch = useDispatch();
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
            />
            <UserProductListasdlkjasd email={userState.userData.email} />
            <Section>
              <Container>
                <Button
                  href={RootRoutes.newProduct}
                  onClick={(e: any) => {
                    e.preventDefault();
                    history.push(RootRoutes.newProduct);
                  }}
                  color="primary"
                  variant="contained"
                >
                  Opprett produkt
                </Button>
                <Button
                  onClick={() => {
                    dispatch(logOut());
                    history.push(RootRoutes.loginUser);
                  }}
                  color="secondary"
                  variant="contained"
                >
                  Logg ut
                </Button>
                <EditUserForm
                  firstName={userState.userData.firstName}
                  lastName={userState.userData.lastName}
                  email={userState.userData.email}
                  phoneNumber={userState.userData.phoneNumber}
                />
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
