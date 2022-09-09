import React from 'react';
import styled from 'styled-components';

import constants from '@/constants';
import { WordleContextProvider } from '@/contexts/wordleContext';

import Keyboard from './Keyboard';
import Tiles from './Tiles';

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
  return (
    <Main headerHeight={constants.HEADER_HEIGHT}>
      <WordleContextProvider>
        <Tiles />
        <Keyboard />
      </WordleContextProvider>
    </Main>
  );
};

export default Wordle;
