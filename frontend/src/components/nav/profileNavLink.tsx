import RootRoutes from '../../pages/RootRoutes';
import { LinkUnderline } from '../generics/links';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux';

const ProfileNavLink = () => {
  const userState = useSelector((state: RootState) => state.user);
  console.log(userState);
  return (
    <>
      {userState.isLoggedIn ? (
        <LinkUnderline to={RootRoutes.userView}>
          {userState.isLoggedIn && userState.userData.email
            ? userState.userData.firstName + ' ' + userState.userData.lastName
            : 'Profil'}
        </LinkUnderline>
      ) : (
        <LinkUnderline to={RootRoutes.loginUser}>Logg inn</LinkUnderline>
      )}
    </>
  );
};

export default ProfileNavLink;
