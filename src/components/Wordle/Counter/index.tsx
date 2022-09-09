import React from 'react';
import styled from 'styled-components';

import { useWordleContext } from '@/contexts/wordleContext';

const Container = styled.div`
  display: flex;
  text-align: center;
`;

const Counter: React.FC<any> = () => {
  const { counter } = useWordleContext();

  if (counter <= 0) {
    return null;
  }

  return (
    <Container>
      <p>Next word: {counter}s</p>
    </Container>
  );
};

export default Counter;
