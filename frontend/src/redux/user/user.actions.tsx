import { LOG_OUT, SET_USER } from './user.actionTypes';
import { UserState } from './user.reducer';
import { userReducerInitialState } from './user.reducer';

export const setUser = (userState: UserState) => ({
  type: SET_USER,
  payload: {
    userState,
  },
});

export const logOut = () => ({
  type: LOG_OUT,
  payload: {
    userReducerInitialState,
  },
});
