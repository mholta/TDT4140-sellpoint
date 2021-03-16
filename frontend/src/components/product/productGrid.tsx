import React from 'react';
import styled from 'styled-components';
import ProductCard from './productCard';

/**
 * Interface for defining required props when using the component.
 */
interface ProductListProps {
  productList: any;
}

/**
 * Component for showing a list of products in a grid. Takes in a list of products as parameter.
 *
 * @param productList to show
 * @returns product list
 */
const ProductGrid = ({ productList }: ProductListProps) => {
  return (
    <ProductGridWrapper>
      {productList.map((data: any, index: number) => (
        <li key={index}>
          <ProductCard data={data} />
        </li>
      ))}
    </ProductGridWrapper>
  );
};

/**
 * Styled component for showing elements in a grid.
 */
const ProductGridWrapper = styled.ul`
  display: grid;
  // To adjust sizing of cards, change the first prop of the minmax function
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;

  list-style-type: none;
  padding: 0;
  margin: 0;
  & > li {
    padding: 0;
    margin: 0;
  }
`;

export default ProductGrid;
