import React from 'react';
import { motion } from 'framer-motion';
import styled from 'styled-components';

import configs from '@/configs';
import { ILetterProps, LetterType } from '@/interfaces';

const colorHandler = (type: LetterType) => {
  if (type === 'typing') return '#000000';

  return 'white';
};

const backgroundColorHandler = (status: LetterType) => {
  if (status === 'correct') return '#6aaa64';

  if (status === 'wrong-spot') return '#c9b458';

  if (status === 'not-include') return '#787c7e';

  return 'transparent';
};

const borderHandler = (letter: string) => {
  return letter.length > 0 ? '#878a8c' : '#d3d6da';
};

const L = styled(motion.div)<{
  type: LetterType;
  letter: string;
  letterWidth: string;
  letterHeight: string;
}>`
  border: 2px solid ${(props) => borderHandler(props.letter)};
  width: ${(p) => p.letterWidth};
  line-height: 2rem;
  user-select: none;
  height: ${(p) => p.letterHeight};
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 2rem;
  line-height: 2rem;
  font-weight: bold;
  user-select: none;
  scale: 1;
`;

const L2 = styled(motion.div)<{
  type: LetterType;
  letter: string;
  letterWidth: string;
  letterHeight: string;
  processingSecond: number;
}>`
  border: 2px solid transparent;
  width: ${(p) => p.letterWidth};
  line-height: 2rem;
  user-select: none;
  height: ${(p) => p.letterHeight};
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 2rem;
  line-height: 2rem;
  font-weight: bold;
  user-select: none;
  scale: 1;
  /* opacity: 0; */
  transform: rotateX(-90deg);
  transition: ${(p) => p.processingSecond / 2}s;
`;

const Letter: React.FC<ILetterProps> = ({
  letter,
  type,
  idx,
  submitted,
  processingSeconds,
  ...otherProps
}) => {
  if (submitted) {
    return (
      <L2
        {...otherProps}
        processingSecond={processingSeconds}
        type={type}
        letter={letter}
        initial={false}
        animate={{
          opacity: [1, 0.9, 1],
          rotateX: [0, 90, 0],
          color: ['black', 'black', colorHandler(type)],
          backgroundColor: ['transparent', 'transparent', backgroundColorHandler(type)],
          // borderColor: ['none', 'none', borderHandler(letter)],
          scale: 1,
        }}
        transition={{
          duration: processingSeconds / 2,
          delay: ((idx ?? 0) + 1) * (processingSeconds / 2 / configs.characterPerWord),
        }}
      >
        {letter}
      </L2>
    );
  }

  return (
    <L
      {...otherProps}
      type={type}
      letter={letter}
      initial={false}
      animate={{
        color: colorHandler(type),
        backgroundColor: backgroundColorHandler(type),
        borderColor: borderHandler(letter),
        scale: letter === '' ? 1 : [1.25, 1],
      }}
      transition={{
        duration: type === 'typing' ? 0.1 : processingSeconds,
      }}
      exit={{
        opacity: 0,
        rotateX: 90,
      }}
    >
      {letter}
    </L>
  );
};

export default Letter;
