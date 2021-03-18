import { LoadStates, Service } from '../../../components/api/loadStates';
import ProductGrid from '../../../components/product/productGrid';
import { useEffect, useState } from 'react';
import axios from 'axios';

/**
 * Interface for defining required props when using the component.
 */
interface ProductListProps {
  currentCategoryId: number | null;
  currentSortMethod: string | null;
}

/**
 * Product list component. Has functionality for filter and sorting.
 *
 * @param currentCategoryId
 * @param currentSortMethod
 * @returns filtered product list
 */
const ProductList = ({
  currentCategoryId,
  currentSortMethod,
}: ProductListProps) => {
  const url = 'http://127.0.0.1:8000/product/fs/';
  const [service, setResult] = useState<Service<any>>({
    status: LoadStates.LOADING,
  });

  // This means that a new http request is being sent every time
  // currentCategoryId og -sortMethod updates
  useEffect(() => {
    axios
      .post<any>(url, {
        categoryId: currentCategoryId,
        sortMethod: currentSortMethod,
      })
      .then((response) => response.data)
      .then((response) =>
        setResult({ status: LoadStates.LOADED, payload: response })
      )
      .catch((error) => {
        setResult({ status: LoadStates.ERROR, error });
        console.error('Failed to get user from db -' + error.message);
      });
  }, [url, currentCategoryId, currentSortMethod]);

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
