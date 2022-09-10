import React from 'react';
import { motion } from 'framer-motion';
import styled from 'styled-components';

import configs from '@/configs';
import { ILetterProps, LetterType } from '@/interfaces';

const colorHandler = (type: LetterType) => {
  if (type === 'typing') return '#000000';

  return '#ffffff';
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

const NormalLetter = styled(motion.div)<{
  type: LetterType;
  letter: string;
}>`
  border: 2px solid ${(props) => borderHandler(props.letter)};
  width: 100%;
  line-height: 2rem;
  user-select: none;
  display: flex;
  justify-content: center;
  box-sizing: border-box;
  align-items: center;
  font-size: 2rem;
  line-height: 2rem;
  font-weight: bold;
  user-select: none;
  scale: 1;
`;

const SubmittedLetter = styled(motion.div)<{
  type: LetterType;
  letter: string;
  processingSecond: number;
}>`
  border: 2px solid transparent;
  line-height: 2rem;
  user-select: none;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 2rem;
  line-height: 2rem;
  font-weight: bold;
  user-select: none;
  scale: 1;
`;

const ExampleLetter = styled(motion.div)<{
  type: LetterType;
  letter: string;
  letterWidth: string;
  letterHeight: string;
  processingSecond: number;
}>`
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

const Letter: React.FC<ILetterProps> = ({
  letter,
  type,
  idx,
  submitted,
  isExample,
  processingSeconds,
  ...otherProps
}) => {
  if (isExample) {
    return (
      <ExampleLetter
        {...otherProps}
        processingSecond={processingSeconds}
        type={type}
        letter={letter}
        initial={{
          borderColor: '#d3d6da',
          rotateX: 0,
        }}
        animate={{
          opacity: 1,
          rotateX: [90, 0],
          color: colorHandler(type),
          backgroundColor: backgroundColorHandler(type),
          borderColor: borderHandler(letter),
          scale: 1,
        }}
        transition={{
          duration: processingSeconds / 2,
          delay: ((idx ?? 0) + 1) * (processingSeconds / 2 / configs.characterPerWord),
        }}
      >
        {letter}
      </ExampleLetter>
    );
  }

  if (submitted) {
    return (
      <SubmittedLetter
        // {...otherProps}
        processingSecond={processingSeconds}
        type={type}
        letter={letter}
        animate={{
          rotateX: [0, 90, 0],
          color: ['#000000', '#000000', colorHandler(type)],
          backgroundColor: backgroundColorHandler(type),
          scale: 1,
        }}
        transition={{
          duration: processingSeconds / 2,
          delay: ((idx ?? 0) + 1) * (processingSeconds / 4 / configs.characterPerWord),
        }}
      >
        {letter}
      </SubmittedLetter>
    );
  }

  return (
    <NormalLetter
      {...otherProps}
      type={type}
      letter={letter}
      animate={{
        color: colorHandler(type),
        backgroundColor: backgroundColorHandler(type),
        borderColor: borderHandler(letter),
        scale: letter === '' ? 1 : [1.25, 1],
      }}
      transition={{
        duration: type === 'typing' ? 0.1 : processingSeconds / 2,
      }}
      exit={{
        rotateX: 90,
      }}
    >
      {letter}
    </NormalLetter>
  );
};

export default Letter;
