import React from 'react';
import styled from 'styled-components';

import { useWordleContext } from '@/contexts/wordleContext';

import Key from './Key';

interface Props {
  keyboardModal: string[][];
  processingSeconds: number;
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  justify-content: flex-end;
  row-gap: 4px;
`;

const Row = styled.div`
  display: flex;
  flex-direction: row;
  margin: 0 auto 0px;
  justify-content: center;
  align-items: center;
  width: 100%;
  column-gap: 4px;
`;

const Keyboard: React.FC<Props> = ({ keyboardModal, ...otherProps }) => {
  const { keyboardDatabase } = useWordleContext();

  if (!keyboardDatabase) return null;

  return (
    <Container>
      {keyboardModal.map((row, idx) => (
        <Row key={new Date().getTime() + idx}>
          {row.map((letter, idx) => (
            <Key key={new Date().getTime() + idx} letter={letter} {...otherProps} />
          ))}
        </Row>
      ))}
    </Container>
  );
};

export default Keyboard;
