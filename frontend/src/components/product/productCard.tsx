import { withTheme } from '@material-ui/core';
import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import RootRoutes from '../../pages/RootRoutes';
import Image from '../generics/image';

/**
 * Interface for defining required props when using the component.
 */
interface ProductCardProps {
  data: any;
}

/**
 * Component for displaying a product as card. Uses image component for
 * setting aspect ratio and that way preserving equal ratio on all cards.
 *
 * @param data Product data from backend
 * @returns Product card element
 */
const ProductCard = ({ data }: ProductCardProps) => {
  return (
    <ProductCardLinkWrapper
      to={RootRoutes.individualProductWithoutId + data.id}
      style={{ textDecoration: 'none' }}
    >
      <Image src={data.image} aspectRatio="1:1" alt="No product image" />
      <ProductTextContainer>
        <div>{data.title}</div>
        <div>{data.price + ' kr'}</div>
      </ProductTextContainer>
    </ProductCardLinkWrapper>
  );
};

/**
 * Syled component that (kind of) extends Link component from React
 * Router. Wraps product card content.
 */
const ProductCardLinkWrapper = withTheme(styled(Link)`
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  display: block;
  // Making shure one product does not take up too much width
  max-width: 400px;

  box-shadow: 2px 2px 7px #888888;
  transition: all 200ms ease;

  padding: 1rem;

  &:hover {
    box-shadow: 4px 4px 10px #888888;
    transform: scale(1.02);
  }

  background-color: whitesmoke;
`);

/**
 * Styled component for displaying text with space between.
 * Using grid to do this.
 */
const ProductTextContainer = styled.div`
  font-size: 1.2rem;
  margin-top: 0.8rem;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;

  display: grid;
  grid-template-columns: 1fr auto;
  justify-content: space-between;

  & :first-child {
    font-weight: bold;
  }
`;

export default ProductCard;
