import { LOG_OUT, SET_USER } from './user.actionTypes';

export const userReducerInitialState: UserState = {
  isLoggedIn: false,
};

export const userReducer = (
  state: UserState = userReducerInitialState,
  action: any
) => {
  switch (action.type) {
    case SET_USER:
      const userState: UserStateData = action.payload.userState;
      return { ...userState };
    case LOG_OUT:
      return { ...action.payload };
    default:
      return state;
  }
};

export type UserState = UserNotLoggedIn | UserLoggedIn;

export interface UserLoggedIn {
  isLoggedIn: true;
  userData: UserStateData;
}

export interface UserNotLoggedIn {
  isLoggedIn: false;
}

export interface UserStateData {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  latitude: number;
  longitude: number;
}
