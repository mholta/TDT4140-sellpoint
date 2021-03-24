import React, { useEffect, useState } from 'react';
import FavoriteIcon from '@material-ui/icons/Favorite';
import styled from 'styled-components';
import { Icon } from '@material-ui/core';
import axios from 'axios';
import CountUp from 'react-countup';

interface CountFavoritesProps {
  productId: number;
}

/**
 * Component for counting favorite products.
 *
 * @param productId - choose id to count
 */
const CountFavorites = ({ productId }: CountFavoritesProps) => {
  const [favoritesCount, updateFavoritesCount] = useState<number>(0);

  useEffect(() => {
    countFavoriteMarks();
  }, []);

  /** Get "likes" count from backend */
  const countFavoriteMarks = () => {
    axios
      .post<any>('http://127.0.0.1:8000/product/favorites_count/', {
        product: productId,
      })
      .then((response) => {
        if (response.status === 200) updateFavoritesCount(response.data.count);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <HeartWrapper color="secondary">
      <CountUp
        end={favoritesCount}
        duration={favoritesCount > 1 ? 0 : Math.ceil(favoritesCount / 8)}
      />
      <FavoriteIcon />
    </HeartWrapper>
  );
};

const HeartWrapper = styled(Icon)``;

export default CountFavorites;
