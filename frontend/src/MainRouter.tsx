import { Switch, Route, useLocation } from 'react-router-dom';
import RootRoutes from './pages/RootRoutes';
import RegisterUserForm from './components/registerUserForm';

const MainRouter = () => {
  const location = useLocation();

  return (
    <Switch location={location} key={location.key}>
      <Route
        path={RootRoutes.registerUser}
        component={RegisterUserForm}
        key={location.key}
      />
    </Switch>
  );
};

export default MainRouter;
