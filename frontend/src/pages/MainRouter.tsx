import { Switch, Route, useLocation } from 'react-router-dom';
import RootRoutes from './RootRoutes';
import RegisterUserPage from './registerUser/RegisterUserPage';

const MainRouter = () => {
  const location = useLocation();

  return (
    <Switch location={location} key={location.key}>
      <Route
        path={RootRoutes.registerUser}
        component={RegisterUserPage}
        key={location.key}
      />
    </Switch>
  );
};

export default MainRouter;
