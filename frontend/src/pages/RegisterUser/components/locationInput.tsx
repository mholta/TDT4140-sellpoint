import React, { useEffect, useState } from 'react';
import TextField from '@material-ui/core/TextField';
import GeoCode from 'react-geocode';
GeoCode.setApiKey('AIzaSyCIE3ME0YrKbmUbmUyzUfaUYNsAH1zNzqM');
GeoCode.setLanguage('no');
GeoCode.setRegion('no');
GeoCode.enableDebug();

/**
 * Interface for defining required props when using the component.
 */
interface FilterMenuProps {
  setLocationObjectCallback: Function;
  fullWidth?: boolean;
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
const LocationInput = ({
  setLocationObjectCallback,
  fullWidth = false,
}: FilterMenuProps) => {
  const [locationInput, setLocationInput] = useState<string>('');
  const [locationInputError, setLocationInputError] = useState<boolean>(false);
  const [locationInputLabel, setLocationInputLabel] = useState<string>(' ');

  /* Dont want to send HTTP request on each key press.
    Checks this by waiting for inactivity for 2 sec */
  let inputTimeout: any;

  // Runs every time input changes
  const handleTextInputChange = (event: any) => {
    setLocationInputLabel(' ');
    // Remove current timer running
    if (inputTimeout) clearTimeout(inputTimeout);
    // Set new timer
    inputTimeout = setTimeout(() => {
      setLocationInput(event.target.value);
    }, 2000);
  };

  // Prevent attempt on sending form on key press
  const handleKeyDown = (event: any) => {
    if (event.keyCode === 13) {
      event.preventDefault();
      setLocationInput(event.target.value);
    }
  };

  // Trigger handleFormSubmit when locationInput constant is changed.
  useEffect(() => {
    if (locationInput)
      GeoCode.fromAddress(locationInput)
        .then((response) => {
          const { lat, lng } = response.results[0].geometry.location;
          setLocationObjectCallback({ latitude: lat, longitude: lng });
          setLocationInputLabel(response.results[0].formatted_address);
          setLocationInputError(false);
        })
        .catch((error) => {
          console.error('Could not find requested location.');
          setLocationInputError(true);
        });
    // eslint-disable-next-line
  }, [locationInput]);

  return (
    <TextField
      fullWidth={fullWidth}
      id="location"
      label="Sted"
      onInput={handleTextInputChange}
      onKeyDown={handleKeyDown}
      error={locationInputError}
      helperText={
        locationInputError
          ? 'Fant ikke sted. Prøv igjen.'
          : locationInputLabel ?? ' '
      }
    />
  );
};

/* Specifies how the LocationObject should be */
export interface LocationObject {
  latitude: number;
  longitude: number;
}

export default LocationInput;
