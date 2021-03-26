import React from 'react';
import styled from 'styled-components';
import { GetReqApiService } from '../../components/api/getUser';
import Navbar from '../../components/navBar';
import RootRoutes from '../RootRoutes';
import ProfileSection from './components/profile';
import { useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import { RootState } from '../../redux';
import { LoadStates } from '../../components/api/loadStates';
import UserProductList from '../UserProfile/components/productList';
import { Container, Section } from '../../components/generics/layoutGenerics';
import { CircularProgress } from '@material-ui/core';

/**
 * Page wrapper component for User profile page.
 *
 * Fetches user data from db using api service
 *
 * @returns User profile page
 */
const OwnerProfilePage = () => {
  let { id } = useParams<ParamTypes>(); /* Henter det som er bak url-en */
  // TODO: Issue with mounting
  const userState = useSelector((state: RootState) => state.user);
  const history = useHistory();

  if (userState.isLoggedIn && userState.userData.id.toString() === id)
    history.push(RootRoutes.userView);

  const service = GetReqApiService('http://127.0.0.1:8000/user/' + id);
  return (
    <>
      <Navbar />
      <OwnerProfilePageWrapper>
        {service.status === LoadStates.LOADING && <CircularProgress />}
        {service.status === LoadStates.LOADED && (
          <>
            <ProfileSection {...service.payload} />{' '}
            <Section>
              <Container>
                <h2>Produkter</h2>
                <UserProductList ownerId={id ?? ''} />
              </Container>
            </Section>
            {/* Everything (...) in payload is sent to ProductSection */}
          </>
        )}
        {service.status === LoadStates.ERROR && <div>Error</div>}
      </OwnerProfilePageWrapper>
    </>
  );
};
const OwnerProfilePageWrapper = styled.div`
  position: relative;
`;

interface ParamTypes {
  id: string | undefined;
}

export default OwnerProfilePage;
