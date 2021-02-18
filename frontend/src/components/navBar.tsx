import React from 'react';
import styled from 'styled-components';
import RootRoutes from '../pages/RootRoutes';
import Logo from '../statics/logo.svg';
import { LinkUnderline } from './generics/links';

const Navbar = () => {
  return (
    <NavWrapper>
      <ImageWrapper>
        <img src={Logo} alt="SellPoint" />
      </ImageWrapper>
      <MenuList>
        <li>
          <LinkUnderline to={RootRoutes.registerUser}>
            Registrer bruker
          </LinkUnderline>
        </li>
        <li>
          <LinkUnderline to={RootRoutes.userView}>Vis bruker</LinkUnderline>
        </li>
      </MenuList>
      <ProfileWrapper>
        <LinkUnderline to={RootRoutes.userView}>isNotLoggedIn</LinkUnderline>
      </ProfileWrapper>
    </NavWrapper>
  );
};

const ProfileWrapper = styled.div`
  position: absolute;
  right: 1.4rem;
`;

const ImageWrapper = styled.div`
  height: 2rem;
  position: absolute;
  left: 1.4rem;

  & > img {
    height: 100%;
  }
`;

/**
 * Styled component for the menu list.
 */
const MenuList = styled.ul`
  list-style-position: 0;
  list-style: none;
  padding: 0;
  display: flex;
  justify-content: center;

  & > li {
    margin: 0 1rem;
  }
`;

/**
 * Styled component for the nav wrapper.
 */
const NavWrapper = styled.nav`
  position: relative; // Change to 'relative' if it shouldnt be constantly sticking to the top
  top: 0;
  left: 0;
  right: 0;
  border-bottom: 1px solid lightgrey;
  background-color: white;
  padding: 1rem;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export default Navbar;
