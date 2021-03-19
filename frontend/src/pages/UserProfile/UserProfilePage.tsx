import { Box, Button } from '@material-ui/core';
import React from 'react';
import styled from 'styled-components';
import Navbar from '../../components/navBar';
import RootRoutes from '../RootRoutes';
import UserProductList from './components/productList';
import ProfileSection from './components/profile';
import { /*useDispatch,*/ useSelector } from 'react-redux';
// import { logOut } from '../../redux/user/user.actions';
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

  //const dispatch = useDispatch();
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
            <Section>
              <Container>
                <h2>Mine annonser</h2>
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
                <UserProductList ownerId={userState.userData.id} />

                {/* <Button
                  onClick={() => {
                    dispatch(logOut());
                    history.push(RootRoutes.loginUser);
                  }}
                  color="secondary"
                  variant="contained"
                >
                  Logg ut
                </Button>  */}
                <h2>Rediger profil</h2>
                <EditUserForm
                  id={userState.userData.id}
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
