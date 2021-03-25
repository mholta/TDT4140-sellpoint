import { Button } from '@material-ui/core';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import { Container, Section } from '../../components/generics/layoutGenerics';
import Navbar from '../../components/navBar';
import { RootState } from '../../redux';
import RootRoutes from '../RootRoutes';
import ProductStateWrapper from './components/productStateWrapper';

const HomePage = () => {
  const history = useHistory();
  const userState = useSelector((state: RootState) => state.user);

  return (
    <>
      <Navbar />
      <Section>
        <Container style={{ maxWidth: '1200px' }}>
          <Button
            href={
              userState.isLoggedIn
                ? RootRoutes.newProduct
                : RootRoutes.loginUser
            }
            onClick={(e: any) => {
              e.preventDefault();
              history.push(
                userState.isLoggedIn
                  ? RootRoutes.newProduct
                  : RootRoutes.loginUser
              );
            }}
            color="primary"
            variant="contained"
            style={{ marginBottom: '5rem', marginLeft: '5rem' }}
          >
            Opprett annonse
          </Button>
          <ProductStateWrapper />
        </Container>
      </Section>
    </>
  );
};

export default HomePage;
