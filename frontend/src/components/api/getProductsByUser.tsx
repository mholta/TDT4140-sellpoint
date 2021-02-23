import axios from 'axios';
import { useEffect, useState } from 'react';
import { LoadStates, Service } from './loadStates';

/**
 * Service for getting user data by HTTP GET.
 *
 * @param url
 */
export const GetProdByEmailApiService = (url: string, email: string) => {
  const [result, setResult] = useState<Service<any>>({
    status: LoadStates.LOADING,
  });
  console.log(result);

  useEffect(() => {
    axios
      .post<any>(url, { email: email })
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
