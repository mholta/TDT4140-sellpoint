import { GetReqApiService } from '../../../components/api/getUser';
import { LoadStates } from '../../../components/api/loadStates';
import ProductGrid from '../../../components/product/productGrid';

/**
 * Component that gets all products and shows in as product grid.
 */
const ProductList = () => {
  const service = GetReqApiService('http://127.0.0.1:8000/product/all/');
  console.log(service);
  return (
    <>
      {service.status === LoadStates.LOADING && <div>Loading</div>}
      {service.status === LoadStates.LOADED && (
        <ProductGrid productList={service.payload} />
      )}
      {service.status === LoadStates.ERROR && <div>Error</div>}
    </>
  );
};

export default ProductList;
