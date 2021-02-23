import { Link } from 'react-router-dom';
import { GetReqApiService } from '../../../components/api/getUser';
import { LoadStates } from '../../../components/api/loadStates';
import RootRoutes from '../../RootRoutes';

/**
 * Page wrapper component for User profile page.
 *
 * Fetches user data from db using api service
 *
 * @returns User profile page
 */
const OwnerDetails = ({ email }: OwnerProps) => {
  /* Use api service for getting user and showing different states */
  const service = GetReqApiService('http://127.0.0.1:8000/user/' + email);
  console.log(service);

  return (
    <div>
      {service.status === LoadStates.LOADING && <div>Loading</div>}
      {service.status === LoadStates.LOADED && (
        <Link to={RootRoutes.ownerView + '/' + service.payload.email}>
          {service.payload.first_name + ' ' + service.payload.last_name}
        </Link>
      )}
      {service.status === LoadStates.ERROR && <div>Error</div>}
    </div>
  );
};

interface OwnerProps {
  email: string;
}
export default OwnerDetails;