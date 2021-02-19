import { combineReducers } from 'redux';
import { userReducer, UserState } from './user/user.reducer';
export interface RootState {
  user: UserState;
}

export default combineReducers({
  user: userReducer,
});
