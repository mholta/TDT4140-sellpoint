import { Link } from 'react-router-dom';
import { GetReqApiService } from '../../../components/api/getUser';
import { LoadStates } from '../../../components/api/loadStates';
import RootRoutes from '../../RootRoutes';
import styled from 'styled-components';
import ImageWrapper from '../../../components/generics/image';
import { inherits } from 'util';

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
                  <Link to={RootRoutes.individualProduct + data.id}>
                    <ProductImageWrapper
                      src={data.image}
                      alt="No product image"
                    />
                  </Link>
                  <ProductTextContainer>
                    <Link to={RootRoutes.individualProductWithoutId + data.id}>
                      {data.title + '       ' + data.price + 'Kr.'}
                    </Link>{' '}
                  </ProductTextContainer>
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

const ProductImageWrapper = styled.img`
  height: 80%;
  width: 500px;
  object-fit: cover;
`;

const ProductUl = styled.ul`
  list-style-type: none;
`;

const ProductContainer = styled.div`
  width: 500px;
  height: 300px;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;

  margin-top: 5px;
  margin-bottom: 15px;
  box-shadow: 2px 2px 7px #888888;
  border-radius: 3px;
`;

const ProductTextContainer = styled.div`
  height: 20%;
  margin-top: -4px;
  font-size: 25px;
  font-weight: bold;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  text-align: left;
  box-sizing: border-box;
  padding-top: 5px;

  background-color: ;
`;

const ListContainer = styled.div`
  position: relative;
  left: 30vw;
  width: 500px;
`;

export default ProductList;
