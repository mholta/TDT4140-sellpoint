import React from 'react';
import styled from 'styled-components';
import { User } from '../../../components/api/types';
import Image from '../../../components/generics/image';
import {
  Container,
  Section,
} from '../../../components/generics/layoutGenerics';
import { LinkUnderline } from '../../../components/generics/links';

/**
 * Component for the user info part of UserProfilePage
 *
 * @param name - A users name
 * @param email - A users email
 * @param phonenumber - A users phonenumber
 * @param image - A users profilepicture (falls back to default image if not provided)
 *
 * @returns profile page element
 */
const ProfileSection = ({
  first_name,
  last_name,
  email,
  phone_number,
  location = 'Trondheim, Norge',
}: ProfileProps) => {
  /* Fall back to default image if no image url is passed in */
  const defaultImageUrl =
    'https://images.unsplash.com/photo-1492546662075-aabebf46dee2?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80';

  return (
    <Section>
      <BackgroundLayer />
      <Container>
        <ProfileInfoGrid>
          <ProfileDataWrapper>
            <h1>{first_name + ' ' + last_name}</h1>
            <div>{location}</div>
            <div>{phone_number}</div>
            <LinkUnderline
              to={'mailto:' + email}
              style={{ margin: '1rem', fontWeight: 'bold', padding: '0.6rem' }}
            >
              Ta kontakt
            </LinkUnderline>
          </ProfileDataWrapper>
          <Image src={defaultImageUrl} borderRadius={50} aspectRatio="1:1" />
        </ProfileInfoGrid>
      </Container>
    </Section>
  );
};

/**
 * Background component
 */
export const BackgroundLayer = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  bottom: -10rem;
  left: 0;
  z-index: -1;

  &::after {
    content: '';
    position: absolute;
    z-index: -1;
    top: -10rem;
    left: -3rem;
    bottom: 10rem;
    width: 200%;
    //height: calc(100% - 4rem);
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
  grid-template-columns: 2fr 1.5fr;
  column-gap: 2rem;
`;

export interface ProfileProps extends Partial<User> {
  location?: string;
}

export default ProfileSection;
