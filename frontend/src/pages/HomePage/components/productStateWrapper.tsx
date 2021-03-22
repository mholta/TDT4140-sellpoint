import { useState } from 'react';
import styled from 'styled-components';
import FilterMenu from './filterMenu';
import ProductList from './productList';

/**
 * Component for holding product list state on home page.
 *
 * CategoryId:
 * - null equals no filtering
 * - insert categoryId instead of null in category useState to filter
 *   list on products with that id.
 *
 * @returns Product list with filter menu
 */
const ProductStateWrapper = () => {
  const [currentCategoryId, setCurrentCategoryId] = useState<number | null>(
    null
  );
  const [
    currentDistanceObject,
    setCurrentDistanceObject,
  ] = useState<DistanceObject | null>(null);
  const [currentSortMethod, setCurrentSortMethod] = useState<string | null>(
    'none'
  );

  return (
    <MainGrid>
      <div>
        <FilterMenu
          setCategoryCallback={setCurrentCategoryId}
          setSortMethodCallback={setCurrentSortMethod}
          setDistanceObjectCallback={setCurrentDistanceObject}
        />
      </div>
      <ProductList
        currentCategoryId={currentCategoryId}
        currentSortMethod={currentSortMethod}
        currentDistanceObject={currentDistanceObject}
      />
    </MainGrid>
  );
};

const MainGrid = styled.div`
  display: grid;
  grid-template-columns: 300px 1fr;
  gap: 2rem;
`;

export interface DistanceObject {
  latitude: number;
  longitude: number;
  max_distance: number;
}

export default ProductStateWrapper;
