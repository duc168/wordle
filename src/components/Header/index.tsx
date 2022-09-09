import React from 'react';
import styled from 'styled-components';

import configs from '@/configs';
import constants from '@/constants';

const TITLE = configs.title;

const Container = styled.header`
  margin: 0 0 1rem;
`;

const Title = styled.div<{ height: string }>`
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 36px;
  font-weight: 700;
  letter-spacing: 0.01em;
  border-bottom: 1px solid #d3d6da;
  height: ${(props) => props.height};
`;

const Header: React.FC<any> = () => {
  return (
    <Container>
      <Title height={constants.HEADER_HEIGHT}>{TITLE}</Title>
    </Container>
  );
};

export default Header;
