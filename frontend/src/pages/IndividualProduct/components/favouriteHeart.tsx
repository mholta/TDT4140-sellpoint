import React, { useEffect, useState } from 'react';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import FavoriteIcon from '@material-ui/icons/Favorite';
import styled from 'styled-components';
import { IconButton } from '@material-ui/core';
import axios from 'axios';

interface FavoriteHeartProps {
  productId: number;
  ownerId: string;
}

/**
 * Component for showing heart button.
 *
 * @param productId - id of product to mark as favorite
 * @param ownerId - signed in user
 * @returns
 */
const FavoriteHeart = ({ productId, ownerId }: FavoriteHeartProps) => {
  const [isFavorite, setIsFavorite] = useState<boolean>(false);

  const handleOnClick = () => {
    isFavorite ? removeProductFromFavoriteList() : addProductToFavoriteList();
  };

  useEffect(() => {
    checkIfProductIsFavorite();
  }, []);

  const checkIfProductIsFavorite = () => {
    axios
      .post<any>('http://127.0.0.1:8000/product/favorites/', {
        product: productId,
        user: ownerId,
      })
      .then((response) => {
        if (response.status === 200) setIsFavorite(true);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const addProductToFavoriteList = () => {
    axios
      .put<any>('http://127.0.0.1:8000/product/favorites/', {
        product: productId,
        user: ownerId,
      })
      .then((response) => {
        if (response.status === 201) setIsFavorite(true);
      })
      .catch((error) => {
        /* If product already is a favorite */
        if (error.response?.status === 409) setIsFavorite(true);
        else console.error(error);
      });
  };

  const removeProductFromFavoriteList = () => {
    axios
      .delete<any>('http://127.0.0.1:8000/product/favorites/', {
        data: { product: productId, user: ownerId },
      })
      .then((response) => {
        if (response.status === 200) setIsFavorite(false);
      })
      .catch((error) => console.error(error));
  };

  return (
    <HeartWrapper color="secondary" onClick={handleOnClick}>
      {isFavorite ? <FavoriteIcon /> : <FavoriteBorderIcon />}
    </HeartWrapper>
  );
};

const HeartWrapper = styled(IconButton)``;

export default FavoriteHeart;
