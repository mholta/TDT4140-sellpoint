import { GetReqApiService } from '../../../components/api/getUser';
import { LoadStates } from '../../../components/api/loadStates';

/**
 * Temporary list for viewing all products in database.
 */
const UserProductList = () => {
  const service = GetReqApiService('http://127.0.0.1:8000/product/all/');
  console.log(service);
  return (
    <>
      {service.status === LoadStates.LOADING && <div>Loading</div>}
      {service.status === LoadStates.LOADED && (
        <ul>
          {service.payload.map((data: any, index: number) => (
            <li key={index}>{data.title + ' - ' + data.description}</li>
          ))}
        </ul>
      )}
      {service.status === LoadStates.ERROR && <div>Error</div>}
    </>
  );
};

export default UserProductList;
