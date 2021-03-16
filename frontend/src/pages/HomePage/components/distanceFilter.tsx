import React, { useEffect, useState } from 'react';
import { Button, Slider, TextField } from '@material-ui/core';
import styled from 'styled-components';
import { DistanceObject } from './productStateWrapper';

/**
 * Interface for defining required props when using the component.
 */
interface FilterMenuProps {
  setDistanceObjectCallback: Function;
}

const DistanceFilter = ({ setDistanceObjectCallback }: FilterMenuProps) => {
  const [locationObject, setLocationObject] = useState<LocationObject | null>({
    latitude: 100,
    longitude: 100,
  });
  const [locationInput, setLocationText] = useState<string | null>(null);
  const [sliderValue, setSliderValue] = useState<number>(1);

  const handleFormSubmit = (event?: React.FormEvent) => {
    event?.preventDefault();

    /* If input field not null -> setLocationObject */
    if (locationInput && locationObject && sliderValue) {
      const distanceObject: DistanceObject = {
        ...locationObject,
        max_distance: sliderValue,
      };
      setDistanceObjectCallback(distanceObject);
    }
  };

  useEffect(() => {
    handleFormSubmit();
  }, [sliderValue]);

  const handleTextInputChange = (event: any) => {
    setLocationText(event.target.value);
  };

  let sliderTimeout: any;

  const handleSliderChange = (event: any, value: any) => {
    if (sliderTimeout) clearTimeout(sliderTimeout);
    sliderTimeout = setTimeout(() => {
      setSliderValue(value);
    }, 1000);
  };

  return (
    <DistanceFilterForm onSubmit={handleFormSubmit}>
      <TextField id="location" label="Sted" onInput={handleTextInputChange} />
      <MaxDistanceSlider
        defaultValue={1}
        getAriaValueText={valuetext}
        min={1}
        max={100}
        valueLabelDisplay="on"
        marks={marks}
        onChange={handleSliderChange}
      />
      <Button color="primary" variant="contained" onClick={handleFormSubmit}>
        Filtrer
      </Button>
    </DistanceFilterForm>
  );
};

const marks = [
  {
    value: 1,
    label: '1km',
  },
  {
    value: 100,
    label: '100km',
  },
];

const valuetext = (value: number) => {
  return value / 1000 + 'km';
};

const DistanceFilterForm = styled.form`
  display: grid;
  gap: 2rem;
  grid-template-columns: 1fr 1fr auto;
  align-items: center;
`;

const MaxDistanceSlider = styled(Slider)`
  margin-top: 4rem;
`;

interface LocationObject {
  latitude: number;
  longitude: number;
}

export default DistanceFilter;
