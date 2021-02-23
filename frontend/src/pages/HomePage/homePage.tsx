import { Container, Section } from '../../components/generics/layoutGenerics';
import Navbar from '../../components/navBar';
import ProductList from './components/productList';

const HomePage = () => {
  return (
    <>
      <Navbar />
      <Section>
        <Container>
          <h1 style={{ fontSize: '6em', marginTop: 0 }}>Sellpoint</h1>
          <ProductList />
        </Container>
      </Section>
    </>
  );
};

export default HomePage;
