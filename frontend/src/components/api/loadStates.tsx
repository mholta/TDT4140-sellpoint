export type Service<T> =
  | ServiceInit
  | ServiceLoading
  | ServiceLoaded<T>
  | ServiceError;

export interface ServiceInit {
  status: LoadStates.INIT;
}

export interface ServiceLoading {
  status: LoadStates.LOADING;
}

export interface ServiceLoaded<T> {
  status: LoadStates.LOADED;
  payload: T;
}

export interface ServiceError {
  status: LoadStates.ERROR;
  error: Error;
}

export enum LoadStates {
  INIT = 'init',
  LOADING = 'loading',
  LOADED = 'loaded',
  ERROR = 'error',
}
