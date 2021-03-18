import React from 'react';
import { withTheme } from '@material-ui/core';
import styled from 'styled-components';
import Categories from './categories';
import DistanceFilter from './distanceFilter';
import Sort from './sort';

/**
 * Interface for defining required props when using the component.
 */
interface FilterMenuProps {
  setCategoryCallback: Function;
  setSortMethodCallback: Function;
  setDistanceObjectCallback: Function;
}

/**
 * Filter menu component. Contains categories from backend. Sorting is yet to be implemented.
 *
 * @param setCategoryCallback callback function for setting current category
 * @returns filter menu component
 */
const FilterMenu = ({
  setCategoryCallback,
  setDistanceObjectCallback,
  setSortMethodCallback,
}: FilterMenuProps) => {
  return (
    <FilterMenuWrapper>
      <TopGrid>
        <h1>Den som leter skal finne</h1>
        <Sort setSortMethodCallback={setSortMethodCallback} />
      </TopGrid>
      <DistanceFilter setDistanceObjectCallback={setDistanceObjectCallback} />
      <Categories setCategoryCallback={setCategoryCallback} />
    </FilterMenuWrapper>
  );
};

/**
 * Styled component for filter menu top grid.
 */

const TopGrid = withTheme(styled.div`
  display: grid;
  grid-template-columns: 1fr auto;
  align-items: center;
  margin-top: -0.8rem;

  & h1 {
    color: ${(props) => props.theme.palette.primary.main};
  }
`);

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
