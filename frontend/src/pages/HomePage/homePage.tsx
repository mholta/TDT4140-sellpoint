import { Container, Section } from '../../components/generics/layoutGenerics';
import Navbar from '../../components/navBar';
import ProductList from './components/productList';

const HomePage = () => {
  return (
    <>
      <Navbar />
      <Section>
        <Container>
          <ProductList />
        </Container>
      </Section>
    </>
  );
};

export default HomePage;
