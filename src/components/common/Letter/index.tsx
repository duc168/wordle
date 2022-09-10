import React from 'react';
import { motion } from 'framer-motion';
import styled from 'styled-components';

import configs from '@/configs';
import { ILetterProps, LetterType } from '@/interfaces';
import colors from '@/services/colors';

const colorHandler = (type: LetterType) => {
  if (type === 'typing') return colors.Letter.color1;

  return colors.Letter.color2;
};

const backgroundColorHandler = (status: LetterType) => {
  if (status === 'correct') return colors.Letter.backgroundColor1;

  if (status === 'wrong-spot') return colors.Letter.backgroundColor2;

  if (status === 'not-include') return colors.Letter.backgroundColor3;

  return colors.Letter.backgroundColor4;
};

const borderHandler = (letter: string) => {
  return letter.length > 0 ? colors.Letter.borderColor1 : colors.Letter.borderColor2;
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

const ExampleSubmitLetter = styled(motion.div)<{
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

const ExampleLetter = styled(motion.div)<{
  type: LetterType;
  letter: string;
  letterWidth: string;
  letterHeight: string;
}>`
  border: 2px solid ${(props) => borderHandler(props.letter)};
  width: 100%;
  width: ${(p) => p.letterWidth};
  line-height: 2rem;
  user-select: none;
  height: ${(p) => p.letterHeight};
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

const Letter: React.FC<ILetterProps> = ({
  letter,
  type,
  idx,
  submitted,
  isExample,
  processingSeconds,
  ...otherProps
}) => {
  if (isExample && submitted) {
    return (
      <ExampleSubmitLetter
        {...otherProps}
        processingSecond={processingSeconds}
        type={type}
        letter={letter}
        initial={{
          borderColor: colors.Letter.borderColor2,
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
      </ExampleSubmitLetter>
    );
  }

  if (isExample && !submitted) {
    return (
      <ExampleLetter
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
      </ExampleLetter>
    );
  }

  if (submitted) {
    return (
      <SubmittedLetter
        processingSecond={processingSeconds}
        type={type}
        letter={letter}
        animate={{
          rotateX: [0, 90, 0],
          color: [colors.Letter.color1, colors.Letter.color1, colorHandler(type)],
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
