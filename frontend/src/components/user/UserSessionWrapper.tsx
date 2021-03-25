import axios from 'axios';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../redux';
import { setUser } from '../../redux/user/user.actions';

interface UserSessionWrapper {
  children: any;
}

const UserSessionWrapper = ({ children }: UserSessionWrapper) => {
  /* Try to log in user from session tokens if not logged in */
  const userState = useSelector((state: RootState) => state.user);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!userState.isLoggedIn) {
      const loggedInUserId = localStorage.getItem('user_id');
      const loggedInUserToken = localStorage.getItem('user_token');
      if (loggedInUserId && loggedInUserToken) {
        const foundUserId = loggedInUserId;
        const foundUserToken = loggedInUserToken;

        // Try to log in with session token
        axios
          .post<any>('http://127.0.0.1:8000/user/from_token/', {
            id: foundUserId,
            token: foundUserToken,
          })
          .then((response) => response.data)
          .then((response) => {
            dispatch(
              setUser({
                isLoggedIn: true,
                userData: {
                  id: response.id,
                  firstName: response.first_name,
                  lastName: response.last_name,
                  email: response.email,
                  phoneNumber: response.phone_number,
                  latitude: response.latitude,
                  longitude: response.longitude,
                  session: response.session,
                },
              })
            );
          })
          .catch((error) => {
            console.warn('Invalid session token. Log in again.');
          });
      }
    }
  }, []);

  return <>{children}</>;
};

export default UserSessionWrapper;
