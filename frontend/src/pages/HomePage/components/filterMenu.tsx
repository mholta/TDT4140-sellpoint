import React from 'react';
import styled from 'styled-components';
import { GetReqApiService } from '../../../components/api/getUser';
import Categories from './categories';

/**
 * Interface for defining required props when using the component.
 */
interface FilterMenuProps {
  setCategoryCallback: Function;
  setSortMethodCallback: Function;
}

/**
 * Filter menu component. Contains categories from backend. Sorting is yet to be implemented.
 *
 * @param setCategoryCallback callback function for setting current category
 * @returns filter menu component
 */
const FilterMenu = ({ setCategoryCallback }: FilterMenuProps) => {
  return (
    <FilterMenuWrapper>
      <h1>Filtrering</h1>
      <Categories setCategoryCallback={setCategoryCallback} />
    </FilterMenuWrapper>
  );
};

/**
 * Styled component for wrapping filter menu content.
 */
const FilterMenuWrapper = styled.div`
  border: 2px solid #ddd;
  background-color: white;
  padding: 2rem;
  box-shadow: 1px 0px 10px rgba(1, 1, 1, 0.2);
  border-radius: 1rem;
  margin-bottom: 4rem;
`;

export default FilterMenu;
