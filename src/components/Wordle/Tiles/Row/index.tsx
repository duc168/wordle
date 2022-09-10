import React from 'react';
import { motion } from 'framer-motion';
import styled from 'styled-components';

import Letter from '@/components/common/Letter';
import { ITable } from '@/interfaces';

interface Props {
  table: ITable;
  letterWidth: string;
  letterHeight: string;
  processingSeconds: number;
}

const Container = styled(motion.div)`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  grid-gap: 5px;
`;

const Row: React.FC<Props> = ({ table, ...otherProps }) => {
  return (
    <Container initial={false}>
      {table.data.map((record, idx) => {
        if (table.submitted) {
          return (
            <Letter
              {...otherProps}
              key={idx}
              idx={idx}
              letter={record.letter.toUpperCase()}
              type={record.type}
              submitted
            />
          );
        }

        return (
          <Letter
            key={idx}
            idx={idx}
            letter={record.letter.toUpperCase()}
            type={record.type}
            {...otherProps}
          />
        );
      })}
    </Container>
  );
};

export default Row;
