import React from 'react';
import styled from 'styled-components';
import { ProductDb } from '../../../components/api/types';
import Image from '../../../components/generics/image';
import {
  Container,
  Section,
} from '../../../components/generics/layoutGenerics';
import DeleteProduct from './deleteProductButton';
import OwnerDetails from './ownerDetails';
import EditProduct from './editProductButton';
import EditProductForm from './editProductForm';

const ProductSection = ({
  title = '',
  description = '',
  price = 0,
  image = '',
  email = '',
  id,
}: ProductProps) => {
  /* Fall back to default image if no image url is passed in */
  const defaultImageUrl =
    'https://images.unsplash.com/photo-1492546662075-aabebf46dee2?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80';

  return (
    <Section>
      <Container>
        <ProfileInfoGrid>
          <ProfileDataWrapper>
            <h1>{title}</h1>
            <div>{price} kr</div>
            <p>{description}</p>
            <div>{price}</div>
            <OwnerDetails email={email} />
          </ProfileDataWrapper>
          <Image
            src={image ?? defaultImageUrl} // add 'image ?? ' in front of this to provide given image url it set, else fall back to default image
            borderRadius={5}
            aspectRatio="4:3"
          />
        </ProfileInfoGrid>
        <EditProduct id={id} />
        <DeleteProduct id={id} />
        <EditProductForm
          title={title}
          description={description}
          price={price}
          image={image}
        />
      </Container>
    </Section>
  );
};

/**
 * Wrapper for holding name, email and phone number.
 */
const ProfileDataWrapper = styled.div`
  align-self: center;

  & > h1 {
    font-size: 3rem;
    margin-top: 0;
    margin-bottom: 0.8rem;
  }

  & > div {
    font-size: 1.4rem;
    font-weight: 300;
    margin-bottom: 0;
  }
`;

/**
 * Grid for placing info to the left and image to the right
 */
const ProfileInfoGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  column-gap: 2rem;
`;

export interface ProductProps extends ProductDb {
  location?: string;
  id: number;
}

export default ProductSection;
