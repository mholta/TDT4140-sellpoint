import React, { useEffect, useState } from 'react';
import {
  FormControl,
  InputLabel,
  makeStyles,
  MenuItem,
  Select,
} from '@material-ui/core';

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
  const [value, setValue] = useState<string | null>('newest');
  const handleChange = (event: any) => {
    setValue((event.target as HTMLInputElement).value);
  };
  useEffect(() => {
    setSortMethodCallback(value);
    // eslint-disable-next-line
  }, [value]);

  const classes = useStyles();

  return (
    <>
      <h2>Sorter</h2>
      <FormControl component="fieldset" fullWidth>
        <FormControl className={classes.formControl}>
          <Select
            labelId="sort-select-label"
            id="sort-select"
            value={value}
            onChange={handleChange}
          >
            <MenuItem value={'random'}>Tilfeldig</MenuItem>
            <MenuItem value={'newest'}>Nyeste annonser</MenuItem>
            <MenuItem value={'price_asc'}>Pris lav-høy</MenuItem>
            <MenuItem value={'price_desc'}>Pris høy-lav</MenuItem>
          </Select>
        </FormControl>
      </FormControl>
    </>
  );
};

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: 0,
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

export default Sort;
