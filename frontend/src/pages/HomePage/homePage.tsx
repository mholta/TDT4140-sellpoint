import { Container, Section } from '../../components/generics/layoutGenerics';
import Navbar from '../../components/navBar';
import ProfileTabs from '../UserProfile/components/profileTabs';
import ProductStateWrapper from './components/productStateWrapper';

const HomePage = () => {
  return (
    <>
      <Navbar />
      <Section>
        <Container style={{ maxWidth: '1200px' }}>
          <ProductStateWrapper />
        </Container>
      </Section>
    </>
  );
};

export default HomePage;
