import { useState } from 'react';
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
  const [currentSortMethod, setCurrentSortMethod] = useState<string | null>(
    null
  );
  return (
    <>
      <FilterMenu
        setCategoryCallback={setCurrentCategoryId}
        setSortMethodCallback={setCurrentSortMethod}
      />
      <ProductList
        currentCategoryId={currentCategoryId}
        currentSortMethod={currentSortMethod}
      />
    </>
  );
};

export default ProductStateWrapper;
