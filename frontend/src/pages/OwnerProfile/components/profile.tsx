import React from 'react';
import styled from 'styled-components';
import { User } from '../../../components/api/types';
import Image from '../../../components/generics/image';
import {
  Container,
  Section,
} from '../../../components/generics/layoutGenerics';
import { LinkUnderline } from '../../../components/generics/links';
import UserLocation from '../../../components/user/userLocation';
import { BackgroundLayer } from '../../UserProfile/components/profile';

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
  latitude,
  longitude,
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
            <div>
              <UserLocation latitude={latitude} longitude={longitude} />
            </div>
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

export interface ProfileProps extends User {
  location?: string;
}

export default ProfileSection;
