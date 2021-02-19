import React from 'react';
import styled from 'styled-components';
import { ProductDb, User } from '../../../components/api/types';
import Image from '../../../components/generics/image';
import {
  Container,
  Section,
} from '../../../components/generics/layoutGenerics';
import { LinkUnderline } from '../../../components/generics/links';

const ProductSection = ({
  title = '',
  description = '',
  price = 0,
  image = '',
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
            <p>{description}</p>
            <div>{price}</div>
          </ProfileDataWrapper>
          <Image
            src={image ?? defaultImageUrl} // add 'image ?? ' in front of this to provide given image url it set, else fall back to default image
            borderRadius={5}
            aspectRatio="4:3"
          />
        </ProfileInfoGrid>
      </Container>
    </Section>
  );
};

/**
 * Background component
 */
const BackgroundLayer = styled.div`
  position: absolute;
  z-index: -2;
  top: 0;
  right: 0;
  bottom: -10rem;
  left: 0;

  &::after {
    content: '';
    position: absolute;
    z-index: -1;
    top: -5rem;
    left: -3rem;
    width: 200%;
    height: calc(100% - 4rem);
    transform: rotateZ(-4deg);
    background-color: #d9afd9;
    background-image: linear-gradient(0deg, #d9afd9 0%, #97d9e1 100%);
  }
`;

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
}

export default ProductSection;
