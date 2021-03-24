import { Link } from 'react-router-dom';
import styled from 'styled-components';

/**
 * Styled link component. "Extends" Link component from React.
 */
export const LinkUnderline = styled(Link)`
  position: relative;
  display: inline-block;
  padding: 0.2rem;
  transition: all 200ms cubic-bezier(0.25, 0.46, 0.45, 0.94);

  &:hover {
    opacity: 0.9;
  }

  &:active {
    transform: scale(0.96);
  }

  &:hover,
  &:active {
    text-decoration: none;
  }

  &::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 50%;
    width: 0%;
    height: 1px;
    background-color: black;
    transition: all 200ms cubic-bezier(0.25, 0.46, 0.45, 0.94);
  }
  &:hover::after {
    width: 50%;
  }

  &::before {
    content: '';
    position: absolute;
    bottom: 0;
    left: 50%;
    width: 0%;
    height: 1px;
    background-color: black;
    transition: all 200ms cubic-bezier(0.25, 0.46, 0.45, 0.94);
  }
  &:hover::before {
    left: 0%;
    width: 50%;
  }
`;
