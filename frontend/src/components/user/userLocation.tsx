import React, { useState } from 'react';
import { GetUserLocationFromLatLng } from '../api/location';

interface LocationProps {
  latitude: number;
  longitude: number;
}

/**
 * Component fetching location and returning result as react fragment.
 *
 * @param latitude
 * @param longitude
 * @returns formatted result as react fragment
 */
const UserLocation = ({ latitude, longitude }: LocationProps) => {
  const [location, setLocation] = useState<string | null>(null);
  GetUserLocationFromLatLng(latitude, longitude).then((response) =>
    setLocation(response)
  );
  return <>{location}</>;
};

export default UserLocation;
