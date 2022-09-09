import React from 'react';
import { motion } from 'framer-motion';
import styled from 'styled-components';

import { ITable } from '@/interfaces';

import Letter from './Letter';

interface Props {
  table: ITable;
}

const Container = styled(motion.div)`
  display: flex;
  column-gap: 5px;
  padding-block: 2.5px;
`;

const Row: React.FC<Props> = ({ table }) => {
  return (
    <Container initial={false}>
      {table.data.map((record, idx) => {
        if (table.submitted) {
          return (
            <Letter
              key={idx}
              idx={idx}
              letter={record.letter.toUpperCase()}
              type={record.type}
              submitted
            />
          );
        }

        return (
          <Letter key={idx} idx={idx} letter={record.letter.toUpperCase()} type={record.type} />
        );
      })}
    </Container>
  );
};

export default Row;
