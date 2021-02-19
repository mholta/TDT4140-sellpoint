import { Switch, Route, useLocation } from 'react-router-dom';
import RootRoutes from './RootRoutes';
import RegisterUserPage from './RegisterUser/RegisterUserPage';
import LoginUserPage from './LoginUser/LoginUserPage';
import UserProfilePage from './UserProfile/UserProfilePage';

const MainRouter = () => {
  const location = useLocation();

  return (
    <Switch location={location} key={location.key}>
      <Route
        path={RootRoutes.registerUser}
        component={RegisterUserPage}
        key={location.key}
      />
      <Route
        path={RootRoutes.userView}
        component={UserProfilePage}
        key={location.key}
      />
      <Route
        path={RootRoutes.loginUser}
        component={LoginUserPage}
        key={location.key}
      />
    </Switch>
  );
};

export default MainRouter;
