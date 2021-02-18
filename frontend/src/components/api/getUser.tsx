import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Profile } from './types';

export const UseApiService = (url: string) => {
  const [result, setResult] = useState<Service<any>>({
    status: LoadStates.LOADING,
  });
  console.log(result);

  useEffect(() => {
    axios
      .get<Profile>(url)
      .then((response) => response.data)
      .then((response) =>
        setResult({ status: LoadStates.LOADED, payload: response })
      )
      .catch((error) => {
        setResult({ status: LoadStates.ERROR, error });
        console.error('Failed to get user from db -' + error.message);
      });
  }, []);

  return result;
};

export type Service<T> =
  | ServiceInit
  | ServiceLoading
  | ServiceLoaded<T>
  | ServiceError;

interface ServiceInit {
  status: LoadStates.INIT;
}

interface ServiceLoading {
  status: LoadStates.LOADING;
}

interface ServiceLoaded<T> {
  status: LoadStates.LOADED;
  payload: T;
}

interface ServiceError {
  status: LoadStates.ERROR;
  error: Error;
}

export enum LoadStates {
  INIT = 'init',
  LOADING = 'loading',
  LOADED = 'loaded',
  ERROR = 'error',
}
