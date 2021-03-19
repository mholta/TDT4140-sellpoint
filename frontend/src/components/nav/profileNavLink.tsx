import RootRoutes from '../../pages/RootRoutes';
import { LinkUnderline } from '../generics/links';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux';
import ProfileDropDown from './profileDropDown';

const ProfileNavLink = () => {
  const userState = useSelector((state: RootState) => state.user);
  return (
    <>
      {userState.isLoggedIn ? (
        <ProfileDropDown />
      ) : (
        <LinkUnderline to={RootRoutes.loginUser}>Logg inn</LinkUnderline>
      )}
    </>
  );
};

export default ProfileNavLink;
