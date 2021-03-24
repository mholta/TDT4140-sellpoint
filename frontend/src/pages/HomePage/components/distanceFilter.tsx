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
  const [isFiltered, setIsFiltered] = useState<boolean>(false);
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
        .then(async (response) => {
          const { lat, lng } = response.results[0].geometry.location;
          setLocationObject({ latitude: lat, longitude: lng });
          setLocationInputLabel(response.results[0].formatted_address);
          setLocationInputError(false);
        })
        .catch((error) => {
          console.error('Could not find requested location.');
          setLocationInputError(true);
        });
  };

  const resetFilter = () => {
    setDistanceObjectCallback(null);
    setIsFiltered(false);
  };

  // Filter and do callback function
  useEffect(() => {
    // If locationObject and max distance value is set, run callback with current data.
    if (locationObject && sliderValue) {
      const distanceObject: DistanceObject = {
        ...locationObject,
        max_distance: sliderValue,
      };
      setDistanceObjectCallback(distanceObject);
      setIsFiltered(true);
    }
  }, [locationObject, sliderValue]);

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

  return (
    <DistanceFilterForm onSubmit={handleFormSubmit}>
      <h2>Sted</h2>
      <TextField
        id="location"
        label="Sted"
        onInput={handleTextInputChange}
        error={locationInputError}
        fullWidth
        helperText={
          locationInputError
            ? 'Fant ikke sted. Prøv igjen.'
            : locationInputLabel ?? ' '
        }
      />
      <SliderWrapper>
        <MaxDistanceSlider
          defaultValue={1}
          min={1}
          max={100}
          valueLabelDisplay="on"
          marks={sliderMarks}
          onChange={handleSliderChange}
        />
      </SliderWrapper>
      <ButtonsWrapper>
        <Button
          color="primary"
          disabled={!locationInput.trim()}
          variant="contained"
          onClick={handleFormSubmit}
        >
          Filtrer
        </Button>
        <Button
          color="secondary"
          disabled={!isFiltered}
          variant="contained"
          onClick={resetFilter}
        >
          Fjern stedfilter
        </Button>
      </ButtonsWrapper>
    </DistanceFilterForm>
  );
};

/* Marks at start and end of slider */
const sliderMarks = [
  {
    value: 0,
    label: '1km',
  },
  {
    value: 100,
    label: '100km',
  },
];

/* Styled component for displaying filtermenu form properly */
const DistanceFilterForm = styled.form`
  margin-top: 2rem;

  & h2 {
    margin: 0;
  }
`;

const SliderWrapper = styled.div`
  padding: 0 1rem;
`;

/* Styled component for vertically aligning the Slider component */
const MaxDistanceSlider = styled(Slider)`
  margin-top: 2rem;
  & > span.MuiSlider-markLabel {
    margin-left: 0.9em;
    & ~ span.MuiSlider-markLabel {
      margin-left: -1.4em;
    }
  }
`;

const ButtonsWrapper = styled.div`
  display: grid;
  grid-template-columns: auto auto;
  gap: 1rem;

  & > button {
    font-size: 12px;
    padding: 6px;
    margin: 0;
  }
`;

/* Specifies how the LocationObject should be */
interface LocationObject {
  latitude: number;
  longitude: number;
}

export default DistanceFilter;
