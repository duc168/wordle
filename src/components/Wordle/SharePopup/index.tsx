import React from 'react';
import Popup from 'reactjs-popup';
import styled from 'styled-components';

import { useWordleContext } from '@/contexts/wordleContext';
import { IDatabase } from '@/interfaces';
import colors from '@/services/colors';
import { deviceMax } from '@/services/css';

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 1rem;
  background-color: ${colors.SharePopup.Container.backgroundColor};
  border-radius: 8px;
  border: 1px solid ${colors.SharePopup.Container.borderColor};
  color: ${colors.SharePopup.Container.color};
  box-shadow: 0 4px 23px 0 ${colors.SharePopup.Container.boxShadowColor};
  position: relative;
  column-gap: 1rem;
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
  color: ${colors.SharePopup.ShareButton.color};
  background-color: ${colors.SharePopup.ShareButton.backgroundColor};
`;

const RetryButton = styled(CommonButton)`
  color: ${colors.SharePopup.RetryButton.color};
  background-color: ${colors.SharePopup.RetryButton.backgroundColor};
`;

const CloseButton = styled(CommonButton)`
  color: ${colors.SharePopup.CloseButton.color};
  background-color: ${colors.SharePopup.CloseButton.backgroundColor};
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
          backgroundColor: colors.SharePopup.Overlay.backgroundColor,
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
