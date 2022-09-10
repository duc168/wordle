import React from 'react';
import styled from 'styled-components';

import { useWordleContext } from '@/contexts/wordleContext';
import { ITileProps } from '@/interfaces';

import Row from './Row';

const Container = styled.div`
  /* display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column; */

  /* margin-bottom: 1rem; */

  display: flex;
  justify-content: center;
  align-items: center;
  flex-grow: 1;
  overflow: hidden;
`;

const Grid = styled.div`
  width: 350px;
  /* height: 420px; */
  min-height: 420px;
  display: grid;
  grid-template-rows: repeat(6, 1fr);
  grid-gap: 5px;
  padding: 10px;
  box-sizing: border-box;
`;

const Tiles: React.FC<ITileProps> = (props) => {
  const { database } = useWordleContext();

  return (
    <Container>
      <Grid>
        {database?.map((table) => {
          return <Row {...props} key={table.id} table={table} />;
        })}
      </Grid>
    </Container>
  );
};

export default Tiles;
