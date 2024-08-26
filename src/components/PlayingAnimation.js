import React from 'react';
import styled, { keyframes, css } from 'styled-components';

const PlayingAnimation = ({ hidden }) => {
  return (
    <Playing hidden={hidden}>
      <span />
      <span />
      <span />
    </Playing>
  );
};

export default PlayingAnimation;

const Animation = keyframes`
  10% {
    transform: scaleY(0.3);
  }

  30% {
    transform: scaleY(1);
  }

  60% {
    transform: scaleY(0.5);
  }

  80% {
    transform: scaleY(0.75);
  }

  100% {
    transform: scaleY(0.5);
  }
`;

const Playing = styled.div`
  position: relative;
  display: flex;
  justify-content: space-between;
  width: 13px;
  height: 13px;

  span {
    width: 3px;
    height: 100%;
    background-color: #1ED760;
    border-radius: 3px;
    content: '';
    transform-origin: bottom;

    ${({ hidden }) =>
      hidden
        ? css`
            animation: none;
            height: 4px;
            align-self: flex-end; /* Align the static dots to the bottom */
          `
        : css`
            animation: ${Animation} 2.2s ease infinite alternate;
          `}

    &:nth-of-type(2) {
      animation-delay: ${({ hidden }) => (hidden ? '0s' : '-2.2s')};
    }

    &:nth-of-type(3) {
      animation-delay: ${({ hidden }) => (hidden ? '0s' : '-3.7s')};
    }
  }
`;
