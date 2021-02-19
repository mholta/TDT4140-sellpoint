import React from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import { GetReqApiService } from '../../components/api/getUser';
import { LoadStates } from '../../components/api/loadStates';
import Navbar from '../../components/navBar';
import ProductSection from './components/product';

/**
 * Page wrapper component for User profile page.
 *
 * Fetches user data from db using api service
 *
 * @returns User profile page
 */
const ProductTemplate = () => {
  let { id } = useParams<ParamTypes>();
  /* Use api service for getting user and showing different states */
  const service = GetReqApiService('http://127.0.0.1:8000/product/' + id);
  console.log(service);

  return (
    <>
      <Navbar />
      <UserProfilePageWrapper>
        {service.status === LoadStates.LOADING && <div>Loading</div>}
        {service.status === LoadStates.LOADED && (
          <ProductSection {...service.payload} id={id} />
        )}
        {service.status === LoadStates.ERROR && <div>Error</div>}
      </UserProfilePageWrapper>
    </>
  );
};

const UserProfilePageWrapper = styled.div`
  position: relative;
`;

interface ParamTypes {
  id: string | undefined;
}
export default ProductTemplate;
