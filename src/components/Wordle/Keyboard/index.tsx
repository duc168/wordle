import React from 'react';
import styled from 'styled-components';

import { useWordleContext } from '@/contexts/wordleContext';
import helpers from '@/helpers';

import Key from './Key';

interface Props {
  keyHeight: string;
  keyPadding: string;
  keyGap: string;
  keyboardModal: string[][];
  processingSeconds: number;
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  margin: auto 0;
  width: 100%;
`;

const Row = styled.div<{ keyGap: string }>`
  display: flex;
  flex-direction: row;
  margin: 0 auto ${(p) => p.keyGap};
`;

const Keyboard: React.FC<Props> = ({ keyboardModal, keyGap, ...otherProps }) => {
  const { keyboardDatabase } = useWordleContext();

  if (!keyboardDatabase) return null;

  return (
    <Container>
      {keyboardModal.map((row) => (
        <Row key={helpers.createRandomKey()} keyGap={keyGap}>
          {row.map((letter) => (
            <Key key={helpers.createRandomKey()} letter={letter} {...otherProps} />
          ))}
        </Row>
      ))}
    </Container>
  );
};

export default Keyboard;
