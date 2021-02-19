import axios from 'axios';
import { useEffect, useState } from 'react';
import { LoadStates, Service } from './loadStates';
import { User } from './types';

/**
 * Service for getting user data by HTTP GET.
 *
 * @param url
 */
export const GetUserApiService = (url: string) => {
  const [result, setResult] = useState<Service<any>>({
    status: LoadStates.LOADING,
  });
  console.log(result);

  useEffect(() => {
    axios
      .get<User>(url)
      .then((response) => response.data)
      .then((response) =>
        setResult({ status: LoadStates.LOADED, payload: response })
      )
      .catch((error) => {
        setResult({ status: LoadStates.ERROR, error });
        console.error('Failed to get user from db -' + error.message);
      });
  }, [url]);

  return result;
};
