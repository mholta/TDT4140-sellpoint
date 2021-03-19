import React from 'react';
import { Link } from 'react-router-dom';
import { GetReqApiService } from '../../../components/api/getUser';
import { LoadStates } from '../../../components/api/loadStates';
import RootRoutes from '../../RootRoutes';
import UserLocation from '../../../components/user/userLocation';

/**
 * Page wrapper component for User profile page.
 *
 * Fetches user data from db using api service
 *
 * @returns User profile page
 */
const OwnerDetails = ({ id }: OwnerProps) => {
  /* Use api service for getting user and showing different states */
  const service = GetReqApiService('http://127.0.0.1:8000/user/' + id);

  return (
    <div>
      {service.status === LoadStates.LOADING && <div>Loading</div>}
      {service.status === LoadStates.LOADED && (
        <>
          <div>
            <UserLocation
              latitude={service.payload.latitude}
              longitude={service.payload.longitude}
            />
          </div>
          <Link to={RootRoutes.ownerViewWithoutId + service.payload.id}>
            {service.payload.first_name + ' ' + service.payload.last_name}
          </Link>
        </>
      )}
      {service.status === LoadStates.ERROR && <div>Error</div>}
    </div>
  );
};

interface OwnerProps {
  id: string;
}
export default OwnerDetails;
