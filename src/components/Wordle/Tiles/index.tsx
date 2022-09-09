import React from 'react';
import styled from 'styled-components';

import { useWordleContext } from '@/contexts/wordleContext';

import Row from './Row';

interface Props {
  letterWidth: string;
  letterHeight: string;
  processingSeconds: number;
}

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  margin-bottom: 1rem;
`;

const Tiles: React.FC<Props> = (props) => {
  const { database } = useWordleContext();

  return (
    <Container>
      {database?.map((table) => {
        return <Row {...props} key={table.id} table={table} />;
      })}
    </Container>
  );
};

export default Tiles;
