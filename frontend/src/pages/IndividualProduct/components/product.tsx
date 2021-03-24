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
import CategoryDetails from './categoryDetails';
import EditProductForm from './editProductForm';
import { RootState } from '../../../redux';
import { useSelector } from 'react-redux';
import FavoriteHeart from './favouriteHeart';
import CountFavorites from './countFavorites';

const ProductSection = ({
  title = '',
  description = '',
  price = 0,
  image = '',
  ownerId = '',
  categoryId = '',
  id,
}: ProductProps) => {
  const userState = useSelector((state: RootState) => state.user);
  /* Fall back to default image if no image url is passed in */
  const defaultImageUrl =
    'https://images.unsplash.com/photo-1492546662075-aabebf46dee2?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80';

  return (
    <Section>
      <Container>
        <ProfileInfoGrid>
          <ProfileDataWrapper>
            {userState.isLoggedIn &&
              (userState.userData.id !== ownerId ? (
                <FavoriteHeart productId={id} ownerId={userState.userData.id} />
              ) : (
                <CountFavorites productId={id} />
              ))}
            <h1>{title}</h1>
            <div>{price} kr</div>
            <p>{description}</p>
            <CategoryDetails id={categoryId} />
            <OwnerDetails id={ownerId} />
          </ProfileDataWrapper>
          <Image
            src={image ?? defaultImageUrl} // add 'image ?? ' in front of this to provide given image url it set, else fall back to default image
            borderRadius={5}
            aspectRatio="4:3"
          />
        </ProfileInfoGrid>
        {/* If user is logged in and user is owner (ids matches) */}
        {userState.isLoggedIn && userState.userData.id === ownerId && (
          <>
            <DeleteProduct id={id} />
            <EditProductForm
              title={title}
              description={description}
              price={price}
              image={image}
              ownerId={ownerId}
              id={id}
              categoryId={categoryId}
            />
          </>
        )}
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
