import { Container, Section } from '../../components/generics/layoutGenerics';
import Navbar from '../../components/navBar';
import NewProductForm from './components/newProductForm';

const NewProductPage = () => {
  return (
    <>
      <Navbar />
      <Section>
        <Container style={{ maxWidth: '20rem' }}>
          <h1>Registrer bruker</h1>
          <NewProductForm />
        </Container>
      </Section>
    </>
  );
};

export default NewProductPage;
