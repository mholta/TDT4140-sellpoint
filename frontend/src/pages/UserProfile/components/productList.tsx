import { CircularProgress } from '@material-ui/core';
import React from 'react';
import { GetProdByUserIdApiService } from '../../../components/api/getProductsByUser';
import { LoadStates } from '../../../components/api/loadStates';
import ProductGrid from '../../../components/product/productGrid';

/**
 * Temporary list for viewing all products in database.
 */
const UserProductList = ({ ownerId }: UserProductListProps) => {
  const service = GetProdByUserIdApiService(
    'http://127.0.0.1:8000/product/user/',
    ownerId
  );
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

interface UserProductListProps {
  ownerId: string;
}

export default UserProductList;
