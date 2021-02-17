import React from 'react';
import styled from 'styled-components';

// TODO: Add ratio support

const Image = ({ src, alt = '', loading = 'lazy', width }: ImageProps) => {
  return (
    <ImageWrapper width={width}>
      <img src={src} alt={alt} loading={loading} />
    </ImageWrapper>
  );
};

const ImageWrapper = styled.div<ImageWrapperProps>`
  position: relative;
  align-self: flex-start;
  flex-grow: 0;

  ${(props) => {
    return `
    width: ${props.width ?? 'auto'};
    padding-bottom: ${'100%'};
    `;
  }}
  & > img {
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    width: 100%;
    background-position: center;
    background-size: cover;
  }
`;

type ImageLoadingTypes = 'lazy' | 'eager';

export interface ImageWrapperProps {
  width?: string;
}

export interface ImageProps extends ImageWrapperProps {
  src: string;
  alt?: string;
  loading?: ImageLoadingTypes;
}

export default Image;
