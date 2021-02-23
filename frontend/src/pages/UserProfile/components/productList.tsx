import { Link } from 'react-router-dom';
import { GetProdByEmailApiService } from '../../../components/api/getProductsByUser';
import { LoadStates } from '../../../components/api/loadStates';
import RootRoutes from '../../RootRoutes';

/**
 * Temporary list for viewing all products in database.
 */
const UserProductList = ({ email }: UserProductListProps) => {
  const service = GetProdByEmailApiService(
    'http://127.0.0.1:8000/product/user/',
    email
  );
  console.log(service);
  return (
    <>
      {service.status === LoadStates.LOADING && <div>Loading</div>}
      {service.status === LoadStates.LOADED && (
        <ul>
          {service.payload.map((data: any, index: number) => (
            <li key={index}>
              <Link to={RootRoutes.individualProductWithoutId + data.id}>
                {data.title + ' - ' + data.description}
              </Link>
            </li>
          ))}
        </ul>
      )}
      {service.status === LoadStates.ERROR && <div>Error</div>}
    </>
  );
};

interface UserProductListProps {
  email: string;
}

export default UserProductList;
