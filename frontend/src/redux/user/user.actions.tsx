import { LOG_OUT, SET_USER } from './user.actionTypes';
import { UserState } from './user.reducer';
import { userReducerInitialState } from './user.reducer';

export const setUser = (userState: UserState) => {
  /* Set localstorage on log in */
  if (userState.isLoggedIn && userState.userData.session) {
    localStorage.setItem('user_id', userState.userData.id);
    localStorage.setItem('user_token', userState.userData.session);
  }

  return {
    type: SET_USER,
    payload: {
      userState,
    },
  };
};

export const logOut = () => {
  /* Clear localstorage on log out */
  localStorage.clear();

  return {
    type: LOG_OUT,
    payload: {
      userReducerInitialState,
    },
  };
};
