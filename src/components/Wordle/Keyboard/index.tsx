import React from 'react';
import styled from 'styled-components';

import { useWordleContext } from '@/contexts/wordleContext';

import Key from './Key';

interface Props {
  keyboardModal: string[][];
  processingSeconds: number;
}

const Container = styled.div`
  height: 200px;
  margin: 0 8px;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
`;

const Row = styled.div`
  display: flex;
  width: 100%;
  margin: 0 auto 8px;
  touch-action: manipulation;
`;

const Spacer = styled.div`
  flex: 0.5;
`;

const Keyboard: React.FC<Props> = ({ keyboardModal, ...otherProps }) => {
  const { keyboardDatabase } = useWordleContext();

  if (!keyboardDatabase) return null;

  return (
    <Container>
      {keyboardModal.map((row, idx) => (
        <Row key={new Date().getTime() + idx}>
          {idx === 1 && <Spacer />}
          {row.map((letter, idx) => (
            <Key key={new Date().getTime() + idx} letter={letter} {...otherProps} />
          ))}
          {idx === 1 && <Spacer />}
        </Row>
      ))}
    </Container>
  );
};

export default Keyboard;
