import React, { useEffect, useState } from 'react';

const ApiTest = () => {
  const service = UseApiService();

  return (
    <>
      {service.status === LoadStates.LOADING && <div>loading...</div>}
      {service.status === LoadStates.LOADED && (
        <div>
          {service.payload.map((product: any, index: number) => {
            return (
              <div key={index + 1}>
                <div> {product.product_id}</div>
                <div>{product.name}</div>
                <div> {product.price}</div>
                <br />
              </div>
            );
          })}
        </div>
      )}
      {service.status === LoadStates.ERROR && <div>error...</div>}
    </>
  );
};

const UseApiService = () => {
  const [result, setResult] = useState<Service<any>>({
    status: LoadStates.LOADING,
  });
  console.log(result);

  useEffect(() => {
    fetch('http://localhost:8000/api/products')
      .then((response) => response.json())
      .then((response) =>
        setResult({ status: LoadStates.LOADED, payload: response })
      )
      .catch((error) => setResult({ status: LoadStates.ERROR, error }));
  }, []);

  return result;
};

export interface ApiResult {
  response: any;
}

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

export type Service<T> =
  | ServiceInit
  | ServiceLoading
  | ServiceLoaded<T>
  | ServiceError;

export default ApiTest;
