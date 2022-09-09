import React from 'react';
import Popup from 'reactjs-popup';
import styled from 'styled-components';

import { useWordleContext } from '@/contexts/wordleContext';
import { IDatabase } from '@/interfaces';
import { deviceMax } from '@/services/css';

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 1rem;
  background-color: #ffffff;
  border-radius: 8px;
  border: 1px solid #f6f7f8;
  color: #000000;
  box-shadow: 0 4px 23px 0 rgb(0 0 0 / 20%);
  position: relative;
  column-gap: 1rem;
  /* height: 50vh; */
  /* width: 50vw; */
  max-height: 100vh;
  max-width: 100vw;
  @media ${deviceMax.tablet} {
    flex-direction: column;
    row-gap: 0.5rem;
  }
  @media ${deviceMax.laptop} {
    column-gap: 0.5rem;
  }
`;

const CommonButton = styled.button`
  font-weight: 700;
  font-size: 30px;
  text-transform: uppercase;
  padding: 1rem;
  border: none;
  cursor: pointer;
  &:hover {
    opacity: 0.9;
  }
`;

const ShareButton = styled(CommonButton)`
  color: #ffffff;
  background-color: #6aaa64;
`;

const RetryButton = styled(CommonButton)`
  color: #ffffff;
  background-color: #c9b458;
`;

const CloseButton = styled(CommonButton)`
  color: #ffffff;
  background-color: #787c7e;
`;

const SharePopup: React.FC<{ defaultDatabase: IDatabase }> = ({ defaultDatabase }) => {
  const { sharePopupStatus, updateSharePopupStatus, retry, share } = useWordleContext();

  const closeHandler = () => {
    updateSharePopupStatus(false);
  };

  const retryHandler = () => {
    retry(defaultDatabase);
  };

  const shareHandler = () => {
    share();
  };

  return (
    <Popup
      open={sharePopupStatus}
      onClose={closeHandler}
      position="top center"
      {...{
        overlayStyle: {
          backgroundColor: 'rgba(0,0,0,0.5)',
        },
      }}
    >
      <Container>
        <ShareButton onClick={shareHandler}>Share</ShareButton>
        <RetryButton onClick={retryHandler}>Retry</RetryButton>
        <CloseButton onClick={closeHandler}>Close</CloseButton>
      </Container>
    </Popup>
  );
};

export default SharePopup;
