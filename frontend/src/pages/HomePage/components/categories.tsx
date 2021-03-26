import { Button, CircularProgress } from '@material-ui/core';
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
      {service.status === LoadStates.LOADING && <CircularProgress />}
      {service.status === LoadStates.LOADED && (
        <CategorySectionWrapper>
          <h2>Kategorier</h2>
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
        </CategorySectionWrapper>
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
  flex-wrap: wrap;
  margin-bottom: -1rem;
  padding: 1rem 0;
  & li {
    flex-shrink: 0;
    margin-bottom: 1rem;
    margin-right: 1rem;
  }
`;

const CategorySectionWrapper = styled.div`
  margin-top: 2rem;
  & h2 {
    margin: 0;
  }
`;

export default Categories;
