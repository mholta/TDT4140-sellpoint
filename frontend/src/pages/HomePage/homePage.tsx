import { Container, Section } from '../../components/generics/layoutGenerics';
import Navbar from '../../components/navBar';
import ProductStateWrapper from './components/productStateWrapper';

const HomePage = () => {
  return (
    <>
      <Navbar />
      <Section>
        <Container>
          <ProductStateWrapper />
        </Container>
      </Section>
    </>
  );
};

export default HomePage;
