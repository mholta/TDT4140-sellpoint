import { useState } from 'react';
import GeoCode from 'react-geocode';
GeoCode.setApiKey('AIzaSyCIE3ME0YrKbmUbmUyzUfaUYNsAH1zNzqM');
GeoCode.setLanguage('no');
GeoCode.setRegion('no');
GeoCode.enableDebug();

/**
 * Different component types coming from Google Geocode Api
 */
enum ComponentTypes {
  POSTAL_CODE = 'postal_code',
  COUNTRY = 'country',
  POSTAL_TOWN = 'postal_town',
  REGION = 'administrative_area_level_1',
}

/**
 * Function for getting location in a defined format from latitude and
 * longitude. Uses Googles Geocode API.
 *
 * @param lat - latitude to search with
 * @param lng - longitude to search with
 * @returns string in format (if found) `"postal code, postal town, region, country"`
 */
export const GetUserLocationFromLatLng = async (lat: number, lng: number) => {
  const [addressString, setResult] = useState<string | null>(null);

  await GeoCode.fromLatLng(lat.toString(), lng.toString()).then(
    async (response) => {
      let newAddress: string = '';
      const results = response.results;

      /* Should search for these components */
      let country: string | null = '';
      let postalCode: string | null = '';
      let postalTown: string | null = '';
      let region: string | null = '';

      /* Search after location parts listed above */
      // eslint-disable-next-line
      await (() => {
        for (let resultIndex = 0; resultIndex < results.length; resultIndex++) {
          const result = results[resultIndex];
          const addressComponents = result.address_components;
          for (
            let componentIndex = 0;
            componentIndex < addressComponents.length;
            componentIndex++
          ) {
            /* Find and set components. Using function gives ability to return from switch. */
            // eslint-disable-next-line
            (() => {
              const component = addressComponents[componentIndex];
              /* Check type */
              const types = component.types;
              for (let typeIndex = 0; typeIndex < types.length; typeIndex++) {
                switch (types[typeIndex]) {
                  case ComponentTypes.COUNTRY:
                    if (!country) country = component.long_name;
                    return;
                  case ComponentTypes.POSTAL_CODE:
                    if (!postalCode) postalCode = component.long_name;
                    return;
                  case ComponentTypes.POSTAL_TOWN:
                    if (!postalTown) postalTown = component.long_name;
                    return;
                  case ComponentTypes.REGION:
                    if (!region) region = component.long_name;
                    return;
                }
                if (country && postalCode && postalTown && region) return;
              }
            })();
            if (country && postalCode && postalTown && region) return;
          }
        }
      })();

      /* Join result into formatted string */
      console.log(postalCode, postalTown, region, country);
      newAddress = [postalCode, postalTown, region, country].join(', ');

      setResult(newAddress);
    },
    (error) => {
      console.error(error);
    }
  );

  return addressString;
};
