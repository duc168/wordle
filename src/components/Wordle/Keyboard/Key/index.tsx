import React, { useEffect } from 'react';
import styled from 'styled-components';

import configs from '@/configs';
import keyCodes from '@/constants/keycodes';
import { useWordleContext } from '@/contexts/wordleContext';
import { IDatabase, ITable } from '@/interfaces';
import { deviceMin } from '@/services/css';

import BackspaceSvg from './BackspaceSvg';

interface Props {
  letter: string;
  processingSeconds: number;
}

type KeyType = 'included' | 'not-include' | 'not-selected-yet';

const backgroundColorHandler = (type: KeyType) => {
  if (type === 'included') return '#6aaa64';

  if (type === 'not-include') return '#787c7e';

  return '#d3d6da';
};

const colorHandler = (type: KeyType) => {
  if (type === 'included') return '#ffffff';

  if (type === 'not-include') return '#ffffff';

  return '#000000';
};

const Button = styled.button<{ keyType: KeyType }>`
  font-family: inherit;
  font-weight: bold;
  border: 0;
  padding: 0;
  /* margin: 0 6px 0 0; */
  height: 40px;
  /* width: 40px; */
  padding-left: 10px;
  padding-right: 10px;
  border-radius: 4px;
  cursor: pointer;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  background-color: ${(props) => backgroundColorHandler(props.keyType)};
  color: ${(props) => colorHandler(props.keyType)};
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  text-transform: uppercase;
  -webkit-tap-highlight-color: rgba(0, 0, 0, 0.3);
  font-size: 14px;
  @media ${deviceMin.laptop} {
    height: 58px;
    /* width: 58px; */
    padding-left: 20px;
    padding-right: 20px;
    font-size: 16px;
  }
`;

const getKeyType = (currentDatabase: IDatabase | undefined, letter: string): KeyType => {
  if (!currentDatabase) return 'not-selected-yet';

  const submittedTables: ITable[] = currentDatabase.filter((table) => table.submitted === true);

  if (submittedTables.length === 0) return 'not-selected-yet';

  const currentTableData = submittedTables
    .map((table) => table.data)
    .reduce((pre, cur) => {
      return [...pre, ...cur];
    });

  const alreadyTypeLetter = currentTableData.filter((item) => item.letter === letter);

  if (alreadyTypeLetter.length > 0) {
    const isIncluded =
      alreadyTypeLetter.filter((item) => item.type === 'correct' || item.type === 'wrong-spot')
        .length > 0;

    if (isIncluded === true) return 'included';

    return 'not-include';
  } else {
    return 'not-selected-yet';
  }
};

const KEY_CODES = keyCodes;

const Key: React.FC<Props> = ({ letter, processingSeconds, ...otherProps }) => {
  const { addLetter, removeLetter, compare, keyboardDatabase } = useWordleContext();

  const keyType = getKeyType(keyboardDatabase, letter);

  const keyInteractHandler = (inputLetter: string) => {
    if (inputLetter === 'backspace') {
      removeLetter();

      return;
    }

    if (inputLetter === 'enter') {
      compare(processingSeconds, configs.tryTimes);

      return;
    }

    addLetter(inputLetter);
  };

  useEffect(() => {
    const LETTER = letter as string;

    const handler = (e: KeyboardEvent) => {
      if (e.keyCode == KEY_CODES[LETTER]) {
        keyInteractHandler(letter);
      }
    };

    document.addEventListener('keydown', handler);

    return () => {
      document.removeEventListener('keydown', handler);
    };
  }, [letter]);

  if (letter === 'backspace') {
    return (
      <Button keyType={keyType} {...otherProps} onClick={() => keyInteractHandler(letter)}>
        <BackspaceSvg />
      </Button>
    );
  }

  return (
    <Button keyType={keyType} {...otherProps} onClick={() => keyInteractHandler(letter)}>
      {letter}
    </Button>
  );
};

export default Key;
