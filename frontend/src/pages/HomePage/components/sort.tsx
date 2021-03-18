import { FormControl, Radio } from '@material-ui/core';
import { FormControlLabel } from '@material-ui/core';
import { RadioGroup } from '@material-ui/core';
import { FormLabel } from '@material-ui/core';
import { Button } from '@material-ui/core';
import { type } from 'os';
import React, { useEffect, useState } from 'react';
import { ChangeEvent } from 'react';
import styled from 'styled-components';
import { GetReqApiService } from '../../../components/api/getUser';
import { LoadStates } from '../../../components/api/loadStates';

/**
 * Interface for defining required props when using the component.
 */
interface SortProps {
  setSortMethodCallback: Function;
}

/**
 * Component for showing all categories in database
 *
 * @param setSortMethodCallback function to set category id and update product list
 * @returns list over categories
 */

const Sort = ({ setSortMethodCallback }: SortProps) => {
  const [value, setValue] = useState<string | null>('random');
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue((event.target as HTMLInputElement).value);
  };
  useEffect(() => {
    setSortMethodCallback(value);
  }, [value]);

  return (
    <>
      <FormControl component="fieldset">
        <FormLabel component="legend">Sorter på</FormLabel>
        <RadioGroup
          aria-label="Sortering"
          name="Sortering"
          value={value}
          onChange={handleChange}
        >
          <FormControlLabel
            value={'random'}
            control={<Radio />}
            label="Tilfeldig"
          />
          <FormControlLabel value="newest" control={<Radio />} label="Nyeste" />
          <FormControlLabel
            value="price_asc"
            control={<Radio />}
            label="Pris lav-høy"
          />
          <FormControlLabel
            value="price_desc"
            control={<Radio />}
            label="Pris høy-lav"
          />
        </RadioGroup>
      </FormControl>
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

export default Sort;
