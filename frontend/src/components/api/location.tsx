import { useEffect, useState } from 'react';
import GeoCode from 'react-geocode';
GeoCode.setApiKey('AIzaSyCIE3ME0YrKbmUbmUyzUfaUYNsAH1zNzqM');
GeoCode.setLanguage('no');
GeoCode.setRegion('no');
GeoCode.enableDebug();

export const GetLocationFromLatLng = async (lat: number, lng: number) => {
  const [result, setResult] = useState<string | null>(null);

  await GeoCode.fromLatLng(lat.toString(), lng.toString()).then(
    (response) => {
      console.log(response);
      const address = response.results[0].formatted_address;
      console.log(address);
      setResult(address);
    },
    (error) => {
      console.error(error);
    }
  );

  return result;
};
