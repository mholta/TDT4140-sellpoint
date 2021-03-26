import { LoadStates, Service } from '../../../components/api/loadStates';
import ProductGrid from '../../../components/product/productGrid';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { DistanceObject } from './productStateWrapper';
import CircularProgress from '@material-ui/core/CircularProgress';
import Backdrop from '@material-ui/core/Backdrop';
import styled from 'styled-components';

/**
 * Interface for defining required props when using the component.
 */
interface ProductListProps {
  currentCategoryId: number | null;
  currentSortMethod: string | null;
  currentDistanceObject: DistanceObject | null;
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
  currentDistanceObject,
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
        distance_object: currentDistanceObject,
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
  }, [url, currentCategoryId, currentSortMethod, currentDistanceObject]);

  return (
    <>
      {service.status === LoadStates.LOADING && <CircularProgress />}
      {service.status === LoadStates.LOADED && (
        <ProductGrid productList={service.payload} />
      )}
      {service.status === LoadStates.ERROR && <div>Error</div>}
    </>
  );
};

export default ProductList;
