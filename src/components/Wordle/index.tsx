import React, { useEffect } from 'react';
import styled from 'styled-components';

import constants from '@/constants';
import { useWordleContext } from '@/contexts/wordleContext';

import HowToPlay from './HowToPlay';
import Keyboard from './Keyboard';
import Tiles from './Tiles';
import Toast from './Toast';

const Main = styled.div<{ headerHeight: string }>`
  max-width: 500px;
  margin: 0 auto;
  width: 100%;
  height: calc(100vh - ${(props) => props.headerHeight});
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: space-evenly;
`;

const Wordle: React.FC<any> = () => {
  const { initDatabase } = useWordleContext();

  useEffect(() => {
    initDatabase(constants.DEFAULT_DATABASE);
  }, []);

  return (
    <Main headerHeight={constants.HEADER_HEIGHT}>
      <HowToPlay
        tileProps={{
          letterHeight: constants.LETTER_HEIGHT_HOW_TO_PLAY,
          letterWidth: constants.LETTER_WIDTH_HOW_TO_PLAY,
          processingSeconds: constants.COMPARE_SECONDS,
        }}
      />
      <Tiles
        letterHeight={constants.LETTER_HEIGHT}
        letterWidth={constants.LETTER_WIDTH}
        processingSeconds={constants.COMPARE_SECONDS}
      />
      <Keyboard
        keyGap={constants.KEY_GAP}
        keyHeight={constants.KEY_HEIGHT}
        keyPadding={constants.KEY_PADDING}
        keyboardModal={constants.KEYBOARDS}
      />
      <Toast />
    </Main>
  );
};

export default Wordle;
