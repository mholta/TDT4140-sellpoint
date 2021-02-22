import { Switch, Route, useLocation } from 'react-router-dom';
import RootRoutes from './RootRoutes';
import RegisterUserPage from './RegisterUser/RegisterUserPage';
import LoginUserPage from './LoginUser/LoginUserPage';
import UserProfilePage from './UserProfile/UserProfilePage';
import NewProductPage from './NewProduct/NewProductPage';
import ProductTemplate from './IndividualProduct/ProductTemplate';
import OwnerProfilePage from './OwnerProfile/OwnerProfilePage';

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
        exact /* */
        path={RootRoutes.userView}
        component={UserProfilePage}
        key={location.key}
      />
      <Route
        path={RootRoutes.ownerView}
        component={OwnerProfilePage}
        key={location.key}
      />
      <Route
        path={RootRoutes.loginUser}
        component={LoginUserPage}
        key={location.key}
      />
      <Route
        path={RootRoutes.newProduct}
        component={NewProductPage}
        key={location.key}
      />
      <Route
        path={RootRoutes.individualProduct}
        component={ProductTemplate}
        key={location.key}
      />
    </Switch>
  );
};

export default MainRouter;
