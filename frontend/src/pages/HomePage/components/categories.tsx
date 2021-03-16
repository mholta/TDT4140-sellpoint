import { Button } from '@material-ui/core';
import React, { useState } from 'react';
import styled from 'styled-components';
import { GetReqApiService } from '../../../components/api/getUser';
import { LoadStates } from '../../../components/api/loadStates';

/**
 * Interface for defining required props when using the component.
 */
interface CategoriesProps {
  setCategoryCallback: Function;
}

/**
 * Component for showing all categories in database
 *
 * @param setCategoryCallback function to set category id and update product list
 * @returns list over categories
 */
const Categories = ({ setCategoryCallback }: CategoriesProps) => {
  const service = GetReqApiService('http://127.0.0.1:8000/category/all/');
  const [currentCategory, setCurrentCategory] = useState<number | null>(null);

  return (
    <>
      {service.status === LoadStates.LOADING && <div></div>}
      {service.status === LoadStates.LOADED && (
        <CategoriesList>
          <li key={'showall'}>
            <Button
              variant="contained"
              color={currentCategory ? 'default' : 'primary'}
              onClick={() => {
                setCurrentCategory(null);
                setCategoryCallback(null);
              }}
            >
              Vis alle
            </Button>
          </li>
          {service.payload.map((data: any, index: number) => (
            <li key={'category' + index}>
              <Button
                variant="contained"
                color={currentCategory === data.id ? 'primary' : 'default'}
                onClick={() => {
                  setCurrentCategory(data.id);
                  setCategoryCallback(data.id);
                }}
              >
                {data.title}
              </Button>
            </li>
          ))}
        </CategoriesList>
      )}
      {service.status === LoadStates.ERROR && <div>Error</div>}
    </>
  );
};

/**
 * Styled components for showing a horizontal list of categories
 */
const CategoriesList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  overflow: auto;
  padding: 1rem 0;
  & li {
    flex-shrink: 0;
    margin-right: 1rem;
  }
`;

export default Categories;
