import React from 'react';
import styled from 'styled-components';
import Image from '../../../components/generics/image';

const Profile = ({ name, email, phone, image }: ProfileProps) => {
  /* Fall back to default image if no image url is passed in */
  const defaultImageUrl =
    'https://images.unsplash.com/photo-1529903543134-d2d0b6858e21';

  return (
    <ProfileInfoGrid>
      <div>
        <h1>{name}</h1>
        <div>{email}</div>
        <div>{phone}</div>
      </div>
      <Image src={defaultImageUrl} />
    </ProfileInfoGrid>
  );
};

const ProfileInfoGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
`;

export interface ProfileProps {
  name: string;
  email: string;
  phone: string;
  image?: string;
}

export default Profile;
