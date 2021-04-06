import { CircularProgress } from '@material-ui/core';
import React from 'react';
import { GetProdByUserIdApiService } from '../../../components/api/getProductsByUser';
import { LoadStates } from '../../../components/api/loadStates';
import ProductGrid from '../../../components/product/productGrid';

/**
 * Component for showing favorite products of a user.
 *
 * @param ownerId - id of the user to show favorite products of
 */
const UserFavoritesList = ({ ownerId }: UserFavoritesListProps) => {
  /* Reusing with another URL */
  const service = GetProdByUserIdApiService(
    'http://127.0.0.1:8000/product/favorites_list/',
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

interface UserFavoritesListProps {
  ownerId: string;
}

export default UserFavoritesList;
