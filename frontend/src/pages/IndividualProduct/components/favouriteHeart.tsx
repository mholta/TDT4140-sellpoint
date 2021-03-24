import React, { useState } from 'react';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import FavoriteIcon from '@material-ui/icons/Favorite';
import styled from 'styled-components';
import { IconButton } from '@material-ui/core';

interface FavoriteHeartProps {
  productId: number;
}

const FavoriteHeart = ({ productId }: FavoriteHeartProps) => {
  const [isFavorite, setIsFavorite] = useState<boolean>(false);

  const handleOnClick = () => {
    setIsFavorite(!isFavorite);
  };

  return (
    <HeartWrapper color="secondary" onClick={handleOnClick}>
      {isFavorite ? <FavoriteIcon /> : <FavoriteBorderIcon />}
    </HeartWrapper>
  );
};

const HeartWrapper = styled(IconButton)``;

export default FavoriteHeart;
