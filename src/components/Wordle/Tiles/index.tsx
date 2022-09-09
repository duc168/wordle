import React from 'react';
import styled from 'styled-components';

import { useWordleContext } from '@/contexts/wordleContext';

import Row from './Row';

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  margin-bottom: 1rem;
`;

const Tiles: React.FC<any> = () => {
  const { database } = useWordleContext();

  return (
    <Container>
      {database.map((table) => {
        return <Row key={table.id} table={table} />;
      })}
    </Container>
  );
};

export default Tiles;
