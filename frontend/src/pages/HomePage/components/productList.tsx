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
    <ListContainer>
      {service.status === LoadStates.LOADING && <div>Loading</div>}
      {service.status === LoadStates.LOADED && (
        <ProductUl>
          {service.payload.map((data: any, index: number) => (
            <li key={index}>
              <Link
                to={RootRoutes.individualProductWithoutId + data.id}
                style={{ textDecoration: 'none' }}
              >
                <ProductContainer>
                  <ProductImageWrapper
                    src={data.image}
                    alt="No product image"
                  />
                  <ProductTextContainer>
                    <div>{data.title}</div>
                    <div>{data.price + ' kr'}</div>
                  </ProductTextContainer>
                </ProductContainer>
              </Link>
            </li>
          ))}
        </ProductUl>
      )}
      {service.status === LoadStates.ERROR && <div>Error</div>}
    </ListContainer>
  );
};

const ProductImageWrapper = styled.img`
  height: 80%;
  width: 100%;
  object-fit: cover;
  border-radius: 5px 5px 0px 0px;
`;

const ProductUl = styled.ul`
  list-style-type: none;
  padding: 0;
  margin: 0;
  & > li {
    padding: 0;
    margin: 0;
  }
`;

const ProductContainer = styled.div`
  max-width: 500px;
  margin: 0 auto;
  height: 300px;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;

  margin-top: 5px;
  margin-bottom: 15px;
  box-shadow: 2px 2px 7px #888888;
  border-radius: 5px;

  &:hover {
    box-shadow: 4px 4px 10px #888888;
    transform: scale(1.02);
  }

  background-color: whitesmoke;
`;

const ProductTextContainer = styled.div`
  height: 20%;
  margin: -4px 10px 15px 15px;
  font-size: 25px;
  font-weight: bold;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  border-radius: 5px;
  display: flex;
  align-items: center;

  display: grid;
  grid-template-columns: 80% auto;
  justify-content: space-between;
`;

const ListContainer = styled.div`
  position: relative;
  min-width: 500px;
`;

export default ProductList;
