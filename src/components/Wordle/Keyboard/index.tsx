import React from 'react';
import styled from 'styled-components';

import constants from '@/constants';

import Key from './Key';

const K = styled.div`
  display: flex;
  flex-direction: column;
  margin: auto 0;
  width: 100%;
`;

const R = styled.div`
  display: flex;
  flex-direction: row;
  margin: 0 auto ${constants.KEY_GAP};
`;

const Keyboard: React.FC<any> = () => {
  return (
    <K>
      {constants.KEYBOARDS.map((row, idx) => (
        <R key={new Date().getTime().toString() + idx}>
          {row.map((k, idx) => (
            <Key key={new Date().getTime().toString() + idx} letter={k} />
          ))}
        </R>
      ))}
    </K>
  );
};

export default Keyboard;
