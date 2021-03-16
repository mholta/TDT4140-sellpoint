import React, { useEffect, useState } from 'react';
import { Button, Slider, TextField } from '@material-ui/core';
import styled from 'styled-components';
import { DistanceObject } from './productStateWrapper';
import GeoCode from 'react-geocode';
GeoCode.setApiKey('AIzaSyCIE3ME0YrKbmUbmUyzUfaUYNsAH1zNzqM');
GeoCode.setLanguage('no');
GeoCode.setRegion('no');
GeoCode.enableDebug();

/**
 * Interface for defining required props when using the component.
 */
interface FilterMenuProps {
  setDistanceObjectCallback: Function;
}

/**
 * Component for filtering products based on distance from given location.
 * Uses GeoCode API from Google to search and get lat/long for requested
 * location. Automaticly sends HTTP request to Google when slider has been
 * inactive for 1000 ms.
 *
 * @param setDistanceObjectCallback callback function for updating state in parent component
 * @returns filter component
 */
const DistanceFilter = ({ setDistanceObjectCallback }: FilterMenuProps) => {
  console.log('key ', process.env);
  const [locationObject, setLocationObject] = useState<LocationObject | null>(
    null
  );
  const [locationInput, setLocationText] = useState<string>('');
  const [locationInputError, setLocationInputError] = useState<boolean>(false);
  const [locationInputLabel, setLocationInputLabel] = useState<string>(' ');
  const [sliderValue, setSliderValue] = useState<number>(1);

  // When pressing enter in input or slider has been inactive for 1000ms
  const handleFormSubmit = async (event?: React.FormEvent) => {
    // Prevent page reload
    event?.preventDefault();

    // If text input is not null, get address from GeoCode API
    if (locationInput)
      await GeoCode.fromAddress(locationInput)
        .then((response) => {
          const { lat, lng } = response.results[0].geometry.location;
          setLocationObject({ latitude: lat, longitude: lng });
          setLocationInputLabel(response.results[0].formatted_address);
          setLocationInputError(false);
        })
        .catch((error) => {
          console.error('Could not find requested location.');
          setLocationInputError(true);
        });

    // If locationObject and max distance value is set, run callback with current data.
    if (locationObject && sliderValue) {
      const distanceObject: DistanceObject = {
        ...locationObject,
        max_distance: sliderValue,
      };
      setDistanceObjectCallback(distanceObject);
    }
  };

  // Update locationText-state when input is changed.
  const handleTextInputChange = (event: any) => {
    setLocationText(event.target.value);
    setLocationInputLabel(' ');
  };

  /* Dont want to send HTTP request before slider is released. 
    Checks this by waiting for inactivity for 1 sec */
  let sliderTimeout: any;

  // Runs every time slider changes
  const handleSliderChange = (event: any, value: any) => {
    // Remove current timer running
    if (sliderTimeout) clearTimeout(sliderTimeout);
    // Set new timer
    sliderTimeout = setTimeout(() => {
      setSliderValue(value);
    }, 1000);
  };

  // Trigger handleFormSubmit when slideValue constant is changed.
  useEffect(() => {
    handleFormSubmit();
  }, [sliderValue]);

  return (
    <DistanceFilterForm onSubmit={handleFormSubmit}>
      <TextField
        id="location"
        label="Sted"
        onInput={handleTextInputChange}
        error={locationInputError}
        helperText={
          locationInputError
            ? 'Fant ikke sted. Prøv igjen.'
            : locationInputLabel ?? ' '
        }
      />
      <MaxDistanceSlider
        defaultValue={1}
        min={1}
        max={100}
        valueLabelDisplay="on"
        marks={sliderMarks}
        onChange={handleSliderChange}
      />
      <Button color="primary" variant="contained" onClick={handleFormSubmit}>
        Filtrer
      </Button>
    </DistanceFilterForm>
  );
};

/* Marks at start and end of slider */
const sliderMarks = [
  {
    value: 1,
    label: '1km',
  },
  {
    value: 100,
    label: '100km',
  },
];

/* Styled component for displaying filtermenu form properly */
const DistanceFilterForm = styled.form`
  display: grid;
  gap: 2rem;
  grid-template-columns: 1fr 1fr auto;
  align-items: center;
`;

/* Styled component for vertically aligning the Slider component */
const MaxDistanceSlider = styled(Slider)`
  margin-top: 2.8rem;
`;

/* Specifies how the LocationObject should be */
interface LocationObject {
  latitude: number;
  longitude: number;
}

export default DistanceFilter;
