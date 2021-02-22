import { Link } from 'react-router-dom';
import { GetReqApiService } from '../../../components/api/getUser';
import { LoadStates } from '../../../components/api/loadStates';
import RootRoutes from '../../RootRoutes';
import styled from 'styled-components';

/**
 * Temporary list for viewing all products in database.
 */
const ProductList = () => {
  const service = GetReqApiService('http://127.0.0.1:8000/product/all/');
  console.log(service);
  return (
    <>
      <ListContainer>
        {service.status === LoadStates.LOADING && <div>Loading</div>}
        {service.status === LoadStates.LOADED && (
          <ProductUl>
            {service.payload.map((data: any, index: number) => (
              <li key={index}>
                <ProductContainer>
                  <Link to={RootRoutes.individualProductWithoutId + data.id}>
                    {data.title + ' - ' + data.description}
                  </Link>{' '}
                </ProductContainer>
              </li>
            ))}
          </ProductUl>
        )}
        {service.status === LoadStates.ERROR && <div>Error</div>}
      </ListContainer>
    </>
  );
};

const ProductUl = styled.ul`
  list-style-type: none;
`;

const ProductContainer = styled.div`
  width: 500px;
  height: 300px;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  font-style: italic;
  background-color: red;
`;
const ListContainer = styled.div`
  position: relative;
  left: 30vw;
`;

export default ProductList;
