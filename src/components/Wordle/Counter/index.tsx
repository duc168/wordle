import React from 'react';
import styled from 'styled-components';

import { useWordleContext } from '@/contexts/wordleContext';
import helpers from '@/helpers';

const Container = styled.div`
  display: flex;
  text-align: center;
  justify-content: center;
`;

const Counter: React.FC<any> = () => {
  const { counter } = useWordleContext();

  if (counter <= 0) {
    return null;
  }

  return (
    <Container>
      <p>
        Next word:{' '}
        {`${helpers.getTwoDigits(Math.floor(counter / 60))}:${helpers.getTwoDigits(
          Math.floor(counter % 60),
        )}`}
      </p>
    </Container>
  );
};

export default Counter;
