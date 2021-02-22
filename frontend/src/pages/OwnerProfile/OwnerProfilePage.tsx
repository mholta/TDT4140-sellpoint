import { Button } from '@material-ui/core';
import React, { useEffect } from 'react';
import styled from 'styled-components';
import { GetReqApiService } from '../../components/api/getUser';
import Navbar from '../../components/navBar';
import RootRoutes from '../RootRoutes';
import UserProductList from './components/productList';
import ProfileSection from './components/profile';
import { useDispatch, useSelector } from 'react-redux';
import { logOut } from '../../redux/user/user.actions';
import { useHistory, useParams } from 'react-router-dom';
import { RootState } from '../../redux';
import { LoadStates } from '../../components/api/loadStates';

/**
 * Page wrapper component for User profile page.
 *
 * Fetches user data from db using api service
 *
 * @returns User profile page
 */
const OwnerProfilePage = () => {
  let { email } = useParams<ParamTypes>(); /* Henter det som er bak url-en */
  // TODO: Issue with mounting
  const userState = useSelector((state: RootState) => state.user);
  const history = useHistory();

  const dispatch = useDispatch();
  console.log(email);
  const service = GetReqApiService('http://127.0.0.1:8000/user/' + email);
  return (
    <>
      <Navbar />
      <OwnerProfilePageWrapper>
        {service.status === LoadStates.LOADING && <div>Loading</div>}
        {service.status === LoadStates.LOADED && (
          <>
            <ProfileSection {...service.payload} />{' '}
            {/* Everything (...) in payload is sent to ProductSection */}
          </>
        )}
        {service.status === LoadStates.ERROR && <div>Error</div>}

        <UserProductList />
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
      </OwnerProfilePageWrapper>
    </>
  );
};

const OwnerProfilePageWrapper = styled.div`
  position: relative;
`;

interface ParamTypes {
  email: string | undefined;
}

export default OwnerProfilePage;
