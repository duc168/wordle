import React, { useEffect } from 'react';
import styled from 'styled-components';

import keyCodes from '@/constants/keycodes';
import { useWordleContext } from '@/contexts/wordleContext';
import { IDatabase, ITable } from '@/interfaces';
import colors from '@/services/colors';

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
  margin: 0 6px 0 0;
  height: 58px;
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
  -webkit-tap-highlight-color: ${colors.Keyboard.highlightColor};
`;

const BigButton = styled(Button)`
  flex: 1.5;
  font-size: 12px;
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
      compare(processingSeconds);

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
      <BigButton keyType={keyType} {...otherProps} onClick={() => keyInteractHandler(letter)}>
        <BackspaceSvg />
      </BigButton>
    );
  }

  if (letter === 'enter') {
    return (
      <BigButton keyType={keyType} {...otherProps} onClick={() => keyInteractHandler(letter)}>
        {letter}
      </BigButton>
    );
  }

  return (
    <Button keyType={keyType} {...otherProps} onClick={() => keyInteractHandler(letter)}>
      {letter}
    </Button>
  );
};

export default Key;
