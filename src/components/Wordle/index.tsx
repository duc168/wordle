import React, { useEffect } from 'react';
import styled from 'styled-components';

import constants from '@/constants';
import { useWordleContext } from '@/contexts/wordleContext';
import local from '@/services/local';

import Counter from './Counter';
import HowToPlay from './HowToPlay';
import Keyboard from './Keyboard';
import SharePopup from './SharePopup';
import Tiles from './Tiles';

const Main = styled.div<{ headerHeight: string }>`
  width: 100%;
  max-width: 500px;
  margin: 0 auto;
  height: calc(100vh - 70px);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  overflow: hidden;
`;

const Wordle: React.FC<any> = () => {
  const howToPlayDefaultValue = local.getHowToPlayStatus();

  const { init } = useWordleContext();

  useEffect(() => {
    init(constants.DEFAULT_DATABASE);
  }, []);

  return (
    <Main headerHeight={'70px'}>
      <div></div>
      <HowToPlay
        defaultValue={howToPlayDefaultValue}
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
      <Counter />
      <Keyboard keyboardModal={constants.KEYBOARDS} processingSeconds={constants.COMPARE_SECONDS} />
      <SharePopup defaultDatabase={constants.DEFAULT_DATABASE} />
    </Main>
  );
};

export default Wordle;
